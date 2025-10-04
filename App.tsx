import { createContext, useContext, createSignal, createEffect, JSX, For } from 'solid-js';
import { personalData } from './constants';
import { MailIcon, LinkedInIcon } from './components/Icons';
import Section from './components/Section';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import Navbar from './components/Navbar';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: () => Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>();

export const ThemeProvider = (props: { children: JSX.Element }) => {
  const [theme, setTheme] = createSignal<Theme>('light');

  createEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setTheme(isDarkMode ? 'dark' : 'light');
  });
  
  createEffect(() => {
    const root = window.document.documentElement;
    if (theme() === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const GrainyBackground = () => {
    const { theme } = useTheme();
    const [scrollOpacity, setScrollOpacity] = createSignal(0);

    createEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = 500;
            const maxOpacity = 0.4;
            const newOpacity = Math.min(scrollY / maxScroll, 1) * maxOpacity;
            setScrollOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div class="fixed inset-0 -z-10">
            <div
                class="absolute inset-0 bg-gradient-to-br from-brand-maroon via-brand-red to-brand-dark-blue transition-opacity duration-1000 ease-in-out"
                style={{ opacity: theme() === 'light' ? 1 : 0 }}
            />
            <div
                class="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-900 to-black transition-opacity duration-1000 ease-in-out"
                style={{ opacity: theme() === 'dark' ? 1 : 0 }}
            />
            <div
                class="absolute inset-0 bg-black transition-opacity duration-300"
                style={{ opacity: scrollOpacity() }}
            />
            <div 
                class="absolute inset-0 mix-blend-overlay" 
                style={{
                    "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`,
                    opacity: 0.30
                }}>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <>
            <GrainyBackground />
            <Navbar />
            <div class="min-h-screen bg-transparent text-brand-yellow font-sans antialiased">
                <header class="min-h-screen flex flex-col justify-center items-center text-center p-6 relative">
                    <div class="max-w-4xl">
                        <h1 class="font-serif text-6xl md:text-8xl text-white mb-3 tracking-wider">{personalData.name}</h1>
                        <h2 class="font-sans text-xl md:text-2xl text-brand-gold mb-8">{personalData.title}</h2>
                        <div class="flex justify-center items-center space-x-6 text-brand-yellow">
                            <a href={`mailto:${personalData.email}`} class="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                                <MailIcon class="w-5 h-5" />
                                <span class="text-sm hidden md:inline">{personalData.email}</span>
                            </a>
                            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" class="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                                <LinkedInIcon class="w-5 h-5" />
                                <span class="text-sm hidden md:inline">jessenreinhart</span>
                            </a>
                        </div>
                    </div>
                    <a href="#summary" class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg class="w-8 h-8 text-brand-yellow/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </a>
                </header>

                <main class="max-w-4xl mx-auto p-6 md:p-12">
                    <Section id="summary" title="Summary">
                        <p class="text-base leading-relaxed text-gray-300">
                            {personalData.summary}
                        </p>
                    </Section>

                    <Section id="skills" title="Skills">
                        <div class="flex flex-wrap gap-2">
                            <For each={personalData.skills}>
                                {(skill) => (
                                    <span class="bg-brand-dark-blue/50 dark:bg-gray-800/50 text-brand-yellow text-sm font-medium px-4 py-1.5 rounded-full border border-brand-dark-blue dark:border-gray-700">
                                        {skill}
                                    </span>
                                )}
                            </For>
                        </div>
                    </Section>

                    <Section id="experience" title="Experience">
                        <div class="space-y-12">
                            <For each={personalData.experience}>
                                {(job) => (
                                    <ExperienceCard experience={job} />
                                )}
                            </For>
                        </div>
                    </Section>

                    <Section id="projects" title="Projects">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <For each={personalData.projects}>
                                {(project) => (
                                    <ProjectCard project={project} />
                                )}
                            </For>
                        </div>
                    </Section>

                    <Section id="education" title="Education">
                        <div class="bg-brand-dark-blue/30 dark:bg-gray-800/30 p-6 rounded-lg border border-brand-dark-blue/50 dark:border-gray-700/50">
                            <h3 class="font-serif text-xl text-white">{personalData.education.degree}</h3>
                            <p class="text-brand-gold">{personalData.education.university}</p>
                            <p class="text-gray-400 text-sm mt-1">{personalData.education.duration}</p>
                        </div>
                    </Section>

                     <footer id="contact" class="text-center mt-20 pt-8 border-t border-brand-dark-blue/50 dark:border-gray-700/50 scroll-mt-20">
                        <p class="text-gray-400 text-sm mb-4 font-serif text-lg">Get in Touch</p>
                         <div class="flex justify-center items-center space-x-6 text-brand-yellow mb-6">
                            <a href={`mailto:${personalData.email}`} class="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                                <MailIcon class="w-5 h-5" />
                                <span class="text-sm">{personalData.email}</span>
                            </a>
                            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" class="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                                <LinkedInIcon class="w-5 h-5" />
                                <span class="text-sm">linkedin.com/in/jessenreinhart</span>
                            </a>
                        </div>
                        <p class="text-gray-400 text-sm">© {new Date().getFullYear()} Muhammad Jessen Reinhart Sugiarto</p>
                    </footer>
                </main>
            </div>
        </>
    );
};

export default App;