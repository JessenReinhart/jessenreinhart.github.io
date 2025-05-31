import { Experience } from '../types';
import { For } from 'solid-js';

interface ExperienceCardProps {
    experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
    return (
        <div class="card p-6 rounded-lg">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-green-400">{experience.jobTitle}</h3>
                    <p class="text-white">{experience.company}</p>
                    <p class="text-gray-400 text-sm">{experience.location}</p>
                </div>
                <div class="text-gray-400 text-sm mt-2 md:mt-0 md:text-right shrink-0">
                    <i class="fas fa-calendar mr-2"></i>{experience.period}
                </div>
            </div>
            <ul class="text-gray-300 text-sm space-y-2">
                <For each={experience.responsibilities}>
                    {(responsibility) => (
                        <li class="flex items-start">
                            <i class="fas fa-code text-green-400 mr-2 mt-1 shrink-0"></i>
                            <span>{responsibility}</span>
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
};

export default ExperienceCard;
