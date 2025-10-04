import { For } from 'solid-js';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = (props: ExperienceCardProps) => {
  return (
    <div class="relative pl-8 border-l-2 border-brand-dark-blue dark:border-gray-700">
      <div class="absolute -left-[9px] top-1 w-4 h-4 bg-brand-gold dark:bg-gray-400 rounded-full border-4 border-brand-dark-blue dark:border-gray-800"></div>
      <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
          <h3 class="font-serif text-2xl text-white">{props.experience.role}</h3>
          <p class="text-sm text-gray-400 font-medium sm:text-right">{props.experience.duration}</p>
      </div>
      <p class="text-lg text-brand-gold mb-3">{props.experience.company}</p>
      
      <ul class="list-none space-y-2">
        <For each={props.experience.description}>
          {(item) => (
            <li class="flex items-start">
               <span class="text-brand-gold mr-3 mt-1">&#8227;</span>
               <span class="text-gray-300 leading-relaxed">{item}</span>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default ExperienceCard;