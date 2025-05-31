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
 * Custom SolidJS hook for interacting with the OpenRouter AI API.
 * Encapsulates the fetching logic, loading state, and error handling.
 *
 * @param model - The AI model to use (e.g., "google/gemma-3-27b-it:free").
 * @returns An object with response, loading, error accessors, and a generate function.
 * @throws Error if the VITE_OPENROUTER_API_KEY environment variable is not set.
 */
function useOpenRouterAI(model: string) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    // Signal to hold the prompt that triggers the API call
    const [inputPrompt, setInputPrompt] = createSignal<string | null>(null);

    // createResource to handle the asynchronous data fetching
    const [resource, { refetch }] = createResource(inputPrompt, async (currentPrompt) => {
        // If no prompt is provided, don't make a request
        if (!currentPrompt) {
            return null;
        }

        if (!apiKey) {
            throw new Error("VITE_OPENROUTER_API_KEY is not set in your environment variables.");
        }

        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
            });

            // Check if the response was successful
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`API error: ${res.status} - ${errorData.message || res.statusText}`);
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
            console.error("Error fetching AI response:", error);
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
    };

    // Explicitly create accessors for loading and error states from the resource.
    // This makes the hook's returned reactive values consistently accessors.
    const loadingAccessor = () => resource.loading;
    const errorAccessor = () => resource.error;

    return {
        response: resource as Accessor<AiResumeJsonResponse | null>, // Updated response type
        loading: loadingAccessor, // Accessor: () => boolean
        error: errorAccessor,     // Accessor: () => Error | undefined
        generate,
    };
}

export default useOpenRouterAI;