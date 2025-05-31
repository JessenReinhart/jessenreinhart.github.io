import { TYPING_TEXTS } from '../const';
import './HeroSection.style.css'
import { createEffect, createSignal, onCleanup } from 'solid-js';



const HeroSection = () => {
    const [currentText, setCurrentText] = createSignal('');

    createEffect(() => {
        const type = () => {
            const textLengths = TYPING_TEXTS.length;
            if (textLengths === 0) return; // Do nothing if there are no texts

            let currentIndex = 0;
            setCurrentText(TYPING_TEXTS[currentIndex]);

            const intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % textLengths; // Simpler way to loop
                setCurrentText(TYPING_TEXTS[currentIndex]);
            }, 5000);

            // Cleanup function:
            // This function will be called when the component is unmounted
            // or if the effect re-runs (though it won't re-run in this case without dependencies).
            onCleanup(() => clearInterval(intervalId));
        };
        type();
    });

    return (
        <section id="home" class="min-h-screen flex items-center justify-center relative pt-20">
            <div class="text-center z-10 px-4">
                <div class="mb-6">
                    <span class="text-gray-500 text-lg">const developer = &#123;</span>
                </div>
                <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">
                    Muhammad Jessen<br />
                    <span class="text-green-400">Reinhart Sugiarto</span>
                </h1>
                <div class="text-xl md:text-2xl mb-8 h-8" aria-live="polite" aria-atomic="true">
                    <div class="typing-cursor">
                        <span>{currentText()}</span>
                    </div>
                </div>
                <div class="mb-6">
                    <span class="text-gray-500 text-lg">&#125;</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
                    <a href="#contact" class="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md transition-colors glow text-white">
                        <i class="fas fa-terminal mr-2"></i>Get In Touch
                    </a>
                    <a href="#about" class="border border-green-600 hover:bg-green-600 hover:text-gray-900 px-6 py-3 rounded-md transition-colors text-green-400">
                        <i class="fas fa-user mr-2"></i>Learn More

                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;