import { SkillCategory, Skill } from '../types';
import { For } from 'solid-js';
import SkillRating from './SkillRating';

interface SkillCategoryCardProps {
    category: SkillCategory;
}

const SkillCategoryCard = ({ category }: SkillCategoryCardProps) => {
    return (
        <div class="card p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4 text-green-400">
                <i class={category.iconClass}></i>{category.title}
            </h3>
            <div class="space-y-3">
                <For each={category.skills}>
                    {(skill: Skill) => (
                        <div class="flex items-center justify-between">
                            <span class="text-gray-300">{skill.name}</span>
                            <SkillRating level={skill.level} />
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default SkillCategoryCard;
