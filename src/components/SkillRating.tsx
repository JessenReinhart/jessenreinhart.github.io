import { For } from "solid-js";

interface SkillRatingProps {
    level: number;
    maxLevel?: number;
}

const SkillRating = ({ level, maxLevel = 5 }: SkillRatingProps) => {
    return (
        <div class="flex space-x-1">
            <For each={Array.from({ length: maxLevel })}>
                {(_, index) => (
                    <div
                        class={`w-2 h-2 rounded-full ${index() < level ? 'bg-green-400' : 'bg-gray-600'
                            }`}
                    ></div>
                )}
            </For>
        </div>
    );
};

export default SkillRating;
