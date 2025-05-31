import { EXPERIENCE_DATA } from "../const";
import Section from "../layout/Section";
import { Experience } from '../types';
import ExperienceCard from './ExperienceCard';
import { For } from 'solid-js';

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center text-white">
          <span class="text-gray-500">// </span>Work Experience
        </h2>
        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            <For each={EXPERIENCE_DATA}>
              {(exp: Experience) => (
                <ExperienceCard experience={exp} />
              )}
            </For>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
