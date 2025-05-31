import { Component, createSignal, For, Show } from 'solid-js';
import { createStore, SetStoreFunction } from 'solid-js/store';
import Section from '../layout/Section';
import type { JSX } from 'solid-js';
import useOpenRouterAI, { type ResumeData, type AiResumeJsonResponse } from '../hooks'; // Import the hook and types
import StyledResumeOutput from '../components/StyledResumeOutput'; // Import the new component

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

  const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = (e) => {
    e.preventDefault();

    const resumePayload: ResumeData = {
      name: name(),
      job: job(),
      description: description(),
      education: education(),
      educationFinishDate: educationFinishDate(),
      skills: skills(),
      // Make sure the experiences store matches the structure expected by ResumeData
      // The current 'experiences' store is already compatible.
      experiences: experiences.map(exp => ({ ...exp })), // Create a shallow copy if needed, or pass directly
    };

    // Call the AI to generate the resume
    generateResume(resumePayload);
  };

  return (
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
            <p class="text-red-300">{(aiError() as Error)?.message || 'An unknown error occurred.'}</p>
          </div>
        </Show>
        <Show when={aiResponse() && !aiLoading() && !aiError()}>
          <StyledResumeOutput resumeData={aiResponse() as AiResumeJsonResponse | null} />
        </Show>
      </div>
    </Section>
  );
};

export default NewFormPage;