import Section from "../layout/Section";

const AboutSection = () => {
    return (
        <Section id='about'>
            <div class="container mx-auto px-6">
                <h2 class="text-3xl font-bold mb-12 text-center text-white">
                    <span class="text-gray-500">// </span>About Me
                </h2>
                <div class="max-w-4xl mx-auto">
                    <div class="card p-8 rounded-lg">
                        <div class="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 class="text-2xl font-semibold mb-4 text-green-400">Hello World!</h3>
                                <p class="text-gray-300 leading-relaxed mb-4">
                                    I am a Frontend Web Developer based in South Tangerang. I mainly use ReactJS & TypeScript as my primary tools, but I am adaptable and open to learn any frameworks and technologies.
                                </p>
                                <p class="text-gray-300 leading-relaxed">
                                    With over 5 years of experience in frontend development, I've worked on everything from e-commerce platforms to banking systems, always focusing on creating clean, efficient, and user-friendly interfaces.
                                </p>
                            </div>
                            <div class="card p-6 rounded-lg mt-6 md:mt-0">
                                <h4 class="text-lg font-semibold mb-4 text-green-400">Quick Stats</h4>
                                <div class="space-y-3 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-400">Experience:</span>
                                        <span class="text-white">5+ Years</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-400">Location:</span>
                                        <span class="text-white">South Tangerang</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-400">Education:</span>
                                        <span class="text-white">B.Eng Informatics</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-400">Primary Stack:</span>
                                        <span class="text-white">React + TypeScript</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default AboutSection;
