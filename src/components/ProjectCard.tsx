import { For } from "solid-js";

export function ProjectCard({ project }) {
  return (
    <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      <div class="p-6 flex flex-row gap-6">
        {project.image && (
          <img src={project.image} alt={project.name} class="w-full h-full object-contain rounded-lg" />
        )}
        <div class="flex flex-col">
          <h3 class="text-xl font-bold text-white">{project.name}</h3>
          <p class="mt-2 text-gray-400">{project.description}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <For each={project.tech}>{(tech) => <span class="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">{tech}</span>}</For>
          </div>
          <div class="mt-6 flex justify-end gap-4">
            <a href={project.live} target="_blank" rel="noopener noreferrer" class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">
              Live Preview
            </a>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" class="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}