
import { A } from '@solidjs/router';
import { NAV_LINKS } from '../const';
import { NavLink } from '../types';
import { For } from 'solid-js';
import { createSignal } from 'solid-js';

const UPDATED_NAV_LINKS: NavLink[] = [
  ...NAV_LINKS,
  { href: "/portfolio", label: "Portfolio" },
];


const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);
  return (
    <nav class="fixed top-0 w-full z-50 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-700">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="text-xl font-bold text-green-400">~/jessen-reinhart</div>
          <div class="hidden md:flex space-x-8">
            <For each={UPDATED_NAV_LINKS}>
              {(link: NavLink) => (
                <A href={link.href} class="hover:text-green-300 transition-colors">
                  {link.label}
                </A>
              )}
            </For>
          </div>
          {/* Basic mobile menu toggle (can be expanded) */}
          <div class="md:hidden">
            <button class="text-green-400 focus:outline-none" onClick={() => setIsSidebarOpen(true)}>
              <i class="fas fa-bars"></i>
            </button>
          </div>
          {/* Mobile sidebar */}
          <div class={`bg-gray-900 bg-opacity-90 fixed inset-y-0 right-0 transform ${isSidebarOpen() ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-64 p-6 md:hidden`}>
            <div class="flex justify-end">
              <button
                onClick={() => setIsSidebarOpen(false)}
                class="text-green-400 hover:text-green-300 focus:outline-none"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="flex flex-col space-y-6 mt-8 p-6 rounded-lg card shadow-lg">
              <For each={UPDATED_NAV_LINKS}>
                {(link: NavLink) => (
                  <A
                    href={link.href}
                    class="text-white hover:text-green-300 transition-colors text-lg"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {link.label}
                  </A>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
