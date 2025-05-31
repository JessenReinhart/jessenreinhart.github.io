import SkillCategoryCard from './SkillCategoryCard';
import { SkillCategory } from '../types';
import { For } from 'solid-js';
import { SKILLS_DATA } from '../const';
import Section from '../layout/Section';

const SkillsSection = () => {
  return (
    <Section id="skills">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center text-white">
          <span class="text-gray-500">// </span>Technical Skills
        </h2>
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={SKILLS_DATA}>
              {(category: SkillCategory) => (
                <SkillCategoryCard category={category} />
              )}
            </For>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
