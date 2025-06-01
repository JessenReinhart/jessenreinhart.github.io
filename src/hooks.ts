import { createSignal, createResource, Show, Accessor } from "solid-js";

/**
 * Interface for the data required to generate a resume.
 */
export interface ResumeData {
    name: string;
    job: string;
    description: string;
    education: string;
    educationFinishDate: string;
    skills: string[];
    experiences: Array<{
        companyName: string;
        position: string;
        startDate: string;
        endDate?: string;
        isCurrentJob: boolean;
        description: string;
    }>;
}

// --- New Interfaces for AI JSON Response ---
export interface AiResumeWorkExperience {
    company: string;
    position: string;
    duration: string;
    responsibilities: string[]; // Array of bullet points
}

export interface AiResumeEducation {
    degreeAndUniversity: string; // e.g., "B.S. in Computer Science - University of Example"
    graduationDate: string;    // e.g., "May 2020"
}

export interface AiResumeJsonResponse {
    name: string;
    aspiringRole: string;
    summary: string;           // A concise professional summary
    skills: string[];          // Array of skills
    education: AiResumeEducation;
    workExperience: AiResumeWorkExperience[];
}
// --- End of New Interfaces ---

/**
 * Fetches a resource with a specified timeout.
 * @param resource The URL to fetch.
 * @param options Fetch options.
 * @param timeout Timeout in milliseconds.
 * @returns A Promise that resolves with the Response object.
 * @throws {Error} If the request times out (AbortError).
 */
async function fetchWithTimeout(resource: RequestInfo | URL, options: RequestInit = {}, timeout: number = 15000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal  // Pass the AbortSignal to fetch
    });
    clearTimeout(id);
    return response;
}
/**
 * Custom SolidJS hook for interacting with the OpenRouter AI API.
 * Encapsulates the fetching logic, loading state, and error handling.
 *
 * @param model - The AI model to use (e.g., "google/gemma-3-27b-it:free").
 * @returns An object with response, loading, error accessors, and a generate function.
 * @throws Error if the VITE_OPENROUTER_API_KEY environment variable is not set.
 */
function useOpenRouterAI(model: string) {
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
        throw new Error("VITE_OPENROUTER_API_KEY environment variable is not set.");
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    // Signal to hold the prompt that triggers the API call
    const [inputPrompt, setInputPrompt] = createSignal<string | null>(null);

    // createResource to handle the asynchronous data fetching
    const [resource, { mutate, refetch }] = createResource(inputPrompt, async (currentPrompt) => {
        // If no prompt is provided, don't make a request
        if (!currentPrompt) {
            return null;
        }

        if (!apiKey) {
            throw new Error("VITE_OPENROUTER_API_KEY is not set in your environment variables.");
        }

        try {
            const res = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    // Optional: For OpenRouter leaderboards
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "My SolidJS AI App",
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: "user", content: currentPrompt },
                    ],
                }),
            }, 15000); // 15 second timeout

            // Check if the response was successful
            if (!res.ok) {
                let errorMessage = `API error: ${res.status} ${res.statusText || '(Unknown Status)'}`;
                try {
                    const errorBody = await res.text(); // Read body as text first
                    if (errorBody) {
                        try {
                            const errorJson = JSON.parse(errorBody); // Try to parse as JSON
                            if (errorJson.error && errorJson.error.message) {
                                errorMessage += ` - Message: ${errorJson.error.message}`;
                            } else if (errorJson.message) { // Some APIs use 'message' at the root
                                errorMessage += ` - Message: ${errorJson.message}`;
                            } else { // Fallback to showing part of the body if parsing fails or structure is unexpected
                                errorMessage += ` - Body: ${errorBody.substring(0, 200)}${errorBody.length > 200 ? "..." : ""}`;
                            }
                        } catch (parseError) { // Not JSON
                            errorMessage += ` - Body: ${errorBody.substring(0, 200)}${errorBody.length > 200 ? "..." : ""}`;
                        }
                    }
                } catch (bodyError) { /* Failed to read error body, errorMessage already has status */ }
                throw new Error(errorMessage);
            }

            const data = await res.json();
            let rawContent = data.choices[0].message.content.trim();

            // Attempt to parse JSON, cleaning up potential code block fences if necessary
            try {
                // Check if the content is wrapped in markdown-style code blocks
                if ((rawContent.startsWith("```json") && rawContent.endsWith("```")) ||
                    (rawContent.startsWith("```") && rawContent.endsWith("```"))) {
                    // Extract content within the fences
                    // This tries to find the first newline after ```json or ``` and the last ```
                    const startIndex = rawContent.indexOf('\n') + 1;
                    const endIndex = rawContent.lastIndexOf('\n```');
                    if (rawContent.startsWith("```json\n")) { // More specific for ```json\n
                        rawContent = rawContent.substring("```json\n".length, rawContent.length - 3).trim();
                    } else if (rawContent.startsWith("```\n")) { // For ```\n
                        rawContent = rawContent.substring("```\n".length, rawContent.length - 3).trim();
                    } else { // For ```json { "foo": "bar" } ``` (no newlines immediately after opening fence)
                        rawContent = rawContent.substring(rawContent.indexOf('{'), rawContent.lastIndexOf('}') + 1).trim();
                    }
                }
                return JSON.parse(rawContent) as AiResumeJsonResponse;
            } catch (parseError) {
                console.error("Failed to parse AI response as JSON:", parseError);
                console.error("Raw AI content:", data.choices[0].message.content);
                throw new Error("AI response was not valid JSON. Raw content logged to console.");
            }
        } catch (error) {
            // Diagnostic log
            console.error("Error caught in useOpenRouterAI fetcher:", error);
            // Re-throw the error so createResource can catch and expose it
            throw error;
        }
    });

    /**
     * Function to trigger the AI response generation.
     * @param resumeDetails The structured data for generating the resume.
     */
    const generate = (resumeDetails: ResumeData) => {
        const experiencesString = resumeDetails.experiences.map(exp => `
  - Company: ${exp.companyName}
    Position: ${exp.position}
    Duration: ${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate || 'N/A'}
    Description (convert to bulleted responsibilities under 'responsibilities' key): ${exp.description}
`).join('');

        const constructedPrompt = `
You are an expert resume writer. Based on the provided information, generate a professional, ATS-friendly resume.
Return the output STRICTLY as a JSON object. Do NOT include any explanatory text, markdown formatting, or anything else outside of the JSON object itself.
The JSON object must conform to the following structure:
{
  "name": "string (Full Name)",
  "aspiringRole": "string (Current or Desired Job Title)",
  "summary": "string (A concise 2-4 sentence professional summary. Highlight key skills and career goals. Use action verbs.)",
  "skills": ["string", "string", ...],
  "education": {
    "degreeAndUniversity": "string (e.g., 'B.S. in Computer Science - University of Example')",
    "graduationDate": "string (e.g., 'May 2020' or 'Expected May 2025')"
  },
  "workExperience": [
    {
      "company": "string (Company Name)",
      "position": "string (Job Title)",
      "duration": "string (e.g., 'Jan 2021 - Present' or 'Mar 2019 - Dec 2020')",
      "responsibilities": [
        "string (Bullet point achievement/responsibility. Start with an action verb. Quantify if possible.)",
        "string (Another bullet point achievement/responsibility.)"
      ]
    }
    // ... more work experience objects if applicable
  ]
}
note: the date format that i've sent you is YYYY-MM-DD, you must convert it to a more human-readable format like 'January 2021 - Present' or 'March 2019 - December 2020'.
**Personal Information:**
Name: ${resumeDetails.name}
Current Role/Aspiring Role: ${resumeDetails.job}
Bio/Summary: ${resumeDetails.description}

**Education:**
Degree & University: ${resumeDetails.education}
Graduation Date: ${resumeDetails.educationFinishDate}

**Skills:**
${resumeDetails.skills.join(', ')}

**Work Experience (use this to populate the 'workExperience' array in the JSON):**
${experiencesString.trim()}

Remember to output ONLY the JSON object.
`;
        setInputPrompt(constructedPrompt); // Update the signal, which triggers createResource
    };    // Explicitly create accessors for loading and error states from the resource.
    // This makes the hook's returned reactive values consistently accessors.
    const loadingAccessor = () => resource.loading;
    const errorAccessor = () => {
        const error = resource.error;
        if (!error) return undefined;

        // If it's already an Error instance, return it
        if (error instanceof Error) return error;

        // If it's a string, wrap it in an Error
        if (typeof error === 'string') return new Error(error);

        // If it's an object with a message property
        if (error && typeof error === 'object' && 'message' in error) {
            return new Error(error.message as string);
        }

        // For any other case, stringify the error
        return new Error(JSON.stringify(error));
    };

    return {
        response: resource as Accessor<AiResumeJsonResponse | null>, // Updated response type
        loading: loadingAccessor, // Accessor: () => boolean
        error: errorAccessor,     // Accessor: () => Error | undefined
        generate,
        refetch,   // Add refetch capability
        mutate,    // Add mutate capability
    };
}

export default useOpenRouterAI;