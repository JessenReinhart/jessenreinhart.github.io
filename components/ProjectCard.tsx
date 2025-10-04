import { For, Show } from 'solid-js';
import { Project } from '../types';
import { ExternalLinkIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = (props: ProjectCardProps) => {
  const isClickable = () => !!props.project.url;

  const content = () => (
    <>
      <div class="flex items-center justify-between">
        <h3 class="font-serif text-2xl text-white">{props.project.title}</h3>
        <Show when={isClickable()}>
          <ExternalLinkIcon class="w-5 h-5 text-brand-gold/70" />
        </Show>
      </div>
      <p class="text-md text-brand-gold mb-4">{props.project.subtitle}</p>
      <ul class="list-none space-y-2 mt-auto">
        <For each={props.project.description}>
          {(item) => (
             <li class="flex items-start">
               <span class="text-brand-gold mr-3 mt-1">&#8227;</span>
               <span class="text-gray-300 text-sm leading-relaxed">{item}</span>
            </li>
          )}
        </For>
      </ul>
    </>
  );

  const baseClasses = "bg-brand-dark-blue/30 dark:bg-gray-800/30 p-6 rounded-lg border border-brand-dark-blue/50 dark:border-gray-700/50 flex flex-col h-full transition-all duration-300";
  const hoverClasses = "hover:border-brand-gold/50 dark:hover:border-gray-500/50 hover:shadow-lg hover:shadow-brand-maroon/20 dark:hover:shadow-gray-900/40 hover:-translate-y-1";

  return (
    <Show 
      when={isClickable()} 
      fallback={
        <div class={baseClasses}>
          {content()}
        </div>
      }
    >
      <a 
        href={props.project.url} 
        target="_blank" 
        rel="noopener noreferrer"
        class={`${baseClasses} ${hoverClasses}`}
        aria-label={`View project: ${props.project.title}`}
      >
        {content()}
      </a>
    </Show>
  );
};

export default ProjectCard;