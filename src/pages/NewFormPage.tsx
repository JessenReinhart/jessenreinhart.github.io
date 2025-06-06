import { Component, createSignal, For, Show } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';
import Section from '../layout/Section';
import type { JSX } from 'solid-js';
import useOpenRouterAI, { type ResumeData, type AiResumeJsonResponse } from '../hooks'; // Import the hook and types
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions, Content, ContentText, ContentUnorderedList } from 'pdfmake/interfaces'; // Import specific content types

import StyledResumeOutput from '../components/StyledResumeOutput'; // Import the new component
import Layout from '../layout/Layout';

interface ExperienceEntry {
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description: string;
}

interface ExperienceFormProps {
  exp: ExperienceEntry;
  index: number;
  removeExperience: (index: number) => void;
  handleSubmit: () => void;
  setExperiences: SetStoreFunction<ExperienceEntry[]>;
}

// Setup pdfmake
pdfMake.vfs = pdfFonts.vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

const ExperienceForm: Component<ExperienceFormProps> = (props) => {
  const handleChange = (field: keyof ExperienceEntry, value: string | boolean) => {
    props.setExperiences(props.index, field, value);
  };

  return (
    <section class="p-4 border border-gray-700 rounded-lg space-y-4">
      <form onSubmit={(e: Event) => {
        e.preventDefault();
        props.handleSubmit();
      }}>
        <h4 class="text-md font-medium text-gray-300">Experience #{props.index + 1}</h4>
        <div>
          <label id={`companyName-label-${props.index}`} for={`companyName-${props.index}`} class="block text-gray-400 text-sm mb-1">
            Company Name
          </label>
          <input
            type="text"
            id={`companyName-${props.index}`}
            name={`companyName-${props.index}`}
            value={props.exp.companyName}
            onInput={(e) => handleChange('companyName', (e.target as HTMLInputElement).value)}
            class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
            aria-labelledby={`companyName-label-${props.index}`}
            required
          />
        </div>
        <div>
          <label for={`position-${props.index}`} class="block text-gray-400 text-sm mb-1">Position</label>
          <input
            type="text"
            id={`position-${props.index}`}
            value={props.exp.position}
            onInput={(e) => handleChange('position', e.currentTarget.value)}
            class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
            required
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label for={`startDate-${props.index}`} class="block text-gray-400 text-sm mb-1">Start Date</label>
            <input
              type="date"
              id={`startDate-${props.index}`}
              value={props.exp.startDate}
              onInput={(e) => handleChange('startDate', e.currentTarget.value)}
              class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label for={`endDate-${props.index}`} class="block text-gray-400 text-sm mb-1">End Date</label>
            <input
              type="date"
              id={`endDate-${props.index}`}
              value={props.exp.endDate}
              disabled={props.exp.isCurrentJob}
              onInput={(e) => handleChange('endDate', e.currentTarget.value)}
              class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
        </div>
        <div class="flex items-center mt-2">
          <input
            type="checkbox"
            id={`isCurrentJob-${props.index}`}
            checked={props.exp.isCurrentJob}
            onChange={(e) => handleChange('isCurrentJob', e.currentTarget.checked)}
            class="h-4 w-4 text-green-600 border-gray-500 rounded focus:ring-green-500 mr-2"
          />
          <label for={`isCurrentJob-${props.index}`} class="text-gray-400 text-sm">I currently work here</label>
        </div>
        <div>
          <label for={`description-${props.index}`} class="block text-gray-400 text-sm mb-1">Description</label>
          <textarea
            id={`description-${props.index}`}
            value={props.exp.description}
            onInput={(e) => handleChange('description', e.currentTarget.value)}
            rows={3}
            class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
          />
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors mt-4 cursor-pointer">
          + Add New Experience
        </button>
        {props.index > 0 && (
          <button
            type="button"
            onClick={() => props.removeExperience(props.index)}
            class="text-red-500 hover:text-red-600 text-sm mt-2 cursor-pointer"
          >
            Remove Experience
          </button>
        )}
      </form>
    </section>
  );
};

const NewFormPage: Component = () => {
  const [name, setName] = createSignal('');
  const [job, setJob] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [education, setEducation] = createSignal('');
  const [educationFinishDate, setEducationFinishDate] = createSignal('');
  const [skills, setSkills] = createSignal<string[]>([]);
  const [userSkill, setUserSkill] = createSignal('');
  const [experiences, setExperiences] = createStore<ExperienceEntry[]>([{
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: '',
  }]);

  // Initialize the OpenRouter AI hook
  // You can choose a different model if you prefer.
  // Ensure VITE_OPENROUTER_API_KEY is set in your .env file
  const { response: aiResponse, loading: aiLoading, error: aiError, generate: generateResume } = useOpenRouterAI("mistralai/mistral-7b-instruct:free");

  const handleSkillInputChange = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    setUserSkill(e.currentTarget.value);
  };

  const addSkill = () => {
    const currentSkill = userSkill();
    if (currentSkill && !skills().includes(currentSkill)) {
      setSkills([...skills(), currentSkill]);
      setUserSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills().filter(skill => skill !== skillToRemove));
  };

  const handleSkillKeyPress: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
    }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const handleExperienceSubmit = () => {
    addExperience();
  };

  const createResumePayload = () => ({
    name: name(),
    job: job(),
    description: description(),
    education: education(),
    educationFinishDate: educationFinishDate(),
    skills: skills(),
    experiences: experiences.map(exp => ({ ...exp })),
  });

  const submit = () => {
    const resumePayload = createResumePayload();
    generateResume(resumePayload);
  }

  const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = (e) => {
    e.preventDefault();
    submit()
  };

  const createResumePdfDefinition = (data: AiResumeJsonResponse): TDocumentDefinitions => {
    // Use flatMap to build a flat array of Content items directly
    const workExperienceContent: Content[] = data.workExperience.flatMap(exp => {
      const items: Content[] = [ // Explicitly type the array of items for each experience
        { text: `${exp.position} at ${exp.company}`, style: 'itemHeader', margin: [0, 8, 0, 2] } as ContentText,
        { text: exp.duration, style: 'dateRange', margin: [0, 0, 0, 4] } as ContentText,
        {
          ul: exp.responsibilities.map(r => ({ text: r, margin: [0, 0, 0, 2] } as ContentText)), // Assert inner list items
          margin: [15, 0, 0, 10] // Indent responsibilities list
        } as ContentUnorderedList // Assert the UL object itself
      ];
      return items; // flatMap will incorporate these items into workExperienceContent
    });

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: data.name, style: 'header' } as ContentText,
        { text: data.aspiringRole, style: 'subheader' } as ContentText,
        { text: data.summary, style: 'paragraph', margin: [0, 0, 0, 15] } as ContentText,

        { text: 'Skills', style: 'sectionHeader' } as ContentText,
        {
          ul: data.skills.map(s => ({ text: s, margin: [0, 0, 0, 2] } as ContentText)),
          margin: [0, 5, 0, 15]
        } as ContentUnorderedList,

        { text: 'Education', style: 'sectionHeader' } as ContentText,
        { text: data.education.degreeAndUniversity, style: 'itemHeader', margin: [0, 5, 0, 2] } as ContentText,
        { text: `Graduation: ${data.education.graduationDate}`, style: 'paragraph', margin: [0, 2, 0, 15] } as ContentText,

        { text: 'Work Experience', style: 'sectionHeader' } as ContentText,
        ...workExperienceContent, // Spread the already flattened and typed Content[]
      ],
      styles: {
        header: { fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 5] },
        subheader: { fontSize: 16, bold: true, alignment: 'center', margin: [0, 0, 0, 20], color: 'gray' },
        sectionHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5], color: '#16a34a' /* A green color */ },
        itemHeader: { fontSize: 12, bold: true },
        dateRange: { fontSize: 10, italics: true, color: '#555555' },
        paragraph: { fontSize: 10, margin: [0, 0, 0, 10], lineHeight: 1.3 },
      },
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
      }
    };
    return docDefinition;
  };

  const handleDownloadPdf = () => {
    const resumeJson = aiResponse();
    if (resumeJson) {
      const docDefinition = createResumePdfDefinition(resumeJson as AiResumeJsonResponse);
      pdfMake.createPdf(docDefinition).download(`${resumeJson.name.replace(/\s+/g, '_')}_Resume.pdf`);
    }
  };


  return (
    <Layout>
      <Section id="new-form">
        <div class="container mx-auto px-6 py-12">
          <h2 class="text-3xl font-bold mb-12 text-center text-white">
            <span class="text-gray-500">{"//"}</span> Submit Your Profile
          </h2>
          <form onSubmit={handleSubmit} class="card p-8 rounded-lg max-w-3xl mx-auto">
            <div class="space-y-6">
              {/* Personal Information */}
              <div>
                <label for="name" class="block text-gray-400 text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name()}
                  onInput={(e) => setName((e.target as HTMLInputElement).value)}
                  class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                  required
                  aria-labelledby="name-label"
                />
              </div>
              <div>
                <label for="job" class="block text-gray-400 text-sm mb-2">Current Job/Role</label>
                <input
                  type="text" id="job"
                  value={job()}
                  onInput={(e) => setJob((e.target as HTMLInputElement).value)}
                  class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label for="description" class="block text-gray-400 text-sm mb-2">Brief Description/Bio</label>
                <textarea
                  id="description"
                  value={description()}
                  onInput={(e) => setDescription(e.currentTarget.value)}
                  rows={3}
                  class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Education */}
              <div>
                <label for="education" class="block text-gray-400 text-sm mb-2">Education (e.g., Degree and University)</label>
                <input
                  type="text" id="education"
                  value={education()}
                  onInput={(e) => setEducation((e.target as HTMLInputElement).value)}
                  class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label for="educationFinishDate" class="block text-gray-400 text-sm mb-2">Education Finish Date</label>
                <input
                  type="date" id="educationFinishDate"
                  value={educationFinishDate()}
                  onInput={(e) => setEducationFinishDate(e.currentTarget.value)}
                  class="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Skills */}
              <div class="space-y-2">
                <label class="block text-gray-400 text-sm mb-2">Skills</label>
                <div class="flex items-center space-x-2">
                  <input
                    type="text"
                    value={userSkill()}
                    onInput={handleSkillInputChange}
                    placeholder="Enter a skill"
                    onKeyPress={handleSkillKeyPress}
                    class="flex-grow bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
                  >
                    Add Skill
                  </button>
                </div>
                <div class="flex flex-wrap gap-2 mt-2">
                  <For each={skills()}>
                    {(skill) => (
                      <span class="bg-gray-700 text-green-400 px-3 py-1 rounded-full text-sm flex items-center">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          class="ml-2 text-red-400 hover:text-red-600 cursor-pointer"
                        >
                          &times;
                        </button>
                      </span>
                    )}
                  </For>
                </div>
              </div>

              {/* Experiences */}
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-green-400 mb-2">Work Experiences</h3>
                <For each={experiences}>
                  {(exp, index) => (
                    <ExperienceForm
                      exp={exp}
                      index={index()}
                      removeExperience={removeExperience}
                      handleSubmit={handleExperienceSubmit}
                      setExperiences={setExperiences}
                    />
                  )}
                </For>
              </div>

              <button
                type="submit"
                disabled={aiLoading()}
                class="disabled:bg-gray-600 disabled:cursor-not-allowed w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded transition-colors glow text-lg font-semibold cursor-pointer"
              >
                <i class="fas fa-paper-plane mr-2"></i>{
                  aiLoading() ? 'Generating...' :
                    'Submit Profile'}
              </button>
            </div>
          </form>

          {/* Display AI Response, Loading, or Error */}
          <Show when={aiLoading()}>
            <div class="mt-8 p-6 card rounded-lg text-center">
              <p class="text-lg text-yellow-400 animate-pulse">Generating your ATS-friendly resume...</p>
              <p class="text-sm text-gray-400 mt-2">This might take a moment. Please wait.</p>
            </div>
          </Show>
          <Show when={aiError()}>
            <div class="mt-8 p-6 card rounded-lg bg-red-900 border border-red-700">
              <h3 class="text-xl font-semibold text-red-400 mb-2">Error Generating Resume</h3>
              <p class="text-red-300">{aiError()?.message}</p>
              <button
                onClick={submit}
                class="mt-4 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          </Show>
          <Show when={aiResponse() && !aiLoading() && !aiError()}>
            <StyledResumeOutput resumeData={aiResponse() as AiResumeJsonResponse | null} />
            <div class="mt-6 text-center">
              <button
                onClick={handleDownloadPdf}
                class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded transition-colors glow text-md font-semibold cursor-pointer"
              >
                <i class="fas fa-file-pdf mr-2"></i>Download Resume as PDF
              </button>
            </div>
          </Show>
        </div>
      </Section>
    </Layout>
  );
};

export default NewFormPage;