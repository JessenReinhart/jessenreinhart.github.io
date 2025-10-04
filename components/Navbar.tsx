import { For } from 'solid-js';
import { useTheme } from '../App';
import { SunIcon, MoonIcon } from './Icons';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      class="text-brand-yellow hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-blue/50 dark:focus:ring-offset-gray-800/50 focus:ring-brand-gold dark:focus:ring-gray-500"
      aria-label={`Switch to ${theme() === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme() === 'light' ? (
        <MoonIcon class="w-5 h-5" />
      ) : (
        <SunIcon class="w-5 h-5" />
      )}
    </button>
  );
};

const navLinks = [
    { href: '#summary', label: 'Summary' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
    return (
        <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" aria-label="Main Navigation">
            <div class="max-w-4xl mx-auto px-6">
                <div class="flex justify-center items-center h-20">
                    <div class="flex items-center space-x-4 md:space-x-6 bg-brand-dark-blue/30 dark:bg-gray-800/50 backdrop-blur-lg border border-brand-dark-blue/50 dark:border-gray-700/50 rounded-full px-4 md:px-6 py-3">
                        <For each={navLinks}>
                            {(link) => (
                                <a 
                                    href={link.href} 
                                    class="text-brand-yellow hover:text-white transition-colors text-sm font-medium"
                                >
                                    {link.label}
                                </a>
                            )}
                        </For>
                        <div class="border-l border-brand-dark-blue/50 dark:border-gray-600/50 h-5 ml-1 md:ml-2"></div>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;