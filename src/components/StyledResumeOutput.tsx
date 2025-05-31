import { Component, For, Show } from 'solid-js';
import type { AiResumeJsonResponse, AiResumeWorkExperience, AiResumeEducation } from '../hooks'; // Import the types

interface StyledResumeOutputProps {
    resumeData: AiResumeJsonResponse | null | undefined;
}

const StyledResumeOutput: Component<StyledResumeOutputProps> = (props) => {
    return (
        <Show when={props.resumeData}>
            {(data) => (
                <article class="bg-white shadow-2xl rounded-lg p-8 md:p-12 my-10 max-w-4xl mx-auto text-gray-800">
                    {/* Header: Name and Aspiring Role */}
                    <header class="text-center mb-10 pb-6 border-b border-gray-200">
                        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-1">{data().name}</h1>
                        <p class="text-xl md:text-2xl text-green-700 font-medium">{data().aspiringRole}</p>
                    </header>

                    {/* Summary Section */}
                    <Show when={data().summary}>
                        <section class="mb-8">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300">Summary</h2>
                            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{data().summary}</p>
                        </section>
                    </Show>

                    {/* Skills Section */}
                    <Show when={data().skills && data().skills.length > 0}>
                        <section class="mb-8">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">Skills</h2>
                            <ul class="flex flex-wrap gap-2">
                                <For each={data().skills}>
                                    {(skill) => (
                                        <li class="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                                            {skill}
                                        </li>
                                    )}
                                </For>
                            </ul>
                        </section>
                    </Show>

                    {/* Work Experience Section */}
                    <Show when={data().workExperience && data().workExperience.length > 0}>
                        <section class="mb-8">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">Work Experience</h2>
                            <For each={data().workExperience}>
                                {(exp: AiResumeWorkExperience) => (
                                    <div class="mb-6 last:mb-0">
                                        <h3 class="text-xl font-semibold text-gray-800">{exp.position}</h3>
                                        <p class="text-md font-medium text-gray-700">{exp.company} | <span class="text-sm text-gray-500">{exp.duration}</span></p>
                                        <ul class="list-disc list-inside pl-5 mt-2 space-y-1 text-gray-700 leading-relaxed">
                                            <For each={exp.responsibilities}>
                                                {(responsibility) => <li>{responsibility}</li>}
                                            </For>
                                        </ul>
                                    </div>
                                )}
                            </For>
                        </section>
                    </Show>

                    {/* Education Section */}
                    <Show when={data().education}>
                        <section>
                            <h2 class="text-2xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300">Education</h2>
                            <p class="text-lg font-medium text-gray-800">{data().education.degreeAndUniversity}</p>
                            <p class="text-sm text-gray-600">{data().education.graduationDate}</p>
                        </section>
                    </Show>
                </article>
            )}
        </Show>
    );
};

export default StyledResumeOutput;