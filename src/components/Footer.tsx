
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="py-8 border-t border-gray-700">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-400">
          <span class="text-gray-500">~/</span>
          Built with <span class="text-red-500 animate-pulse">♥</span> using
          <a href="https://solidjs.com" target="_blank" rel="noopener noreferrer" class="text-green-400 hover:text-green-300"> SolidJS</a> &
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300"> TailwindCSS</a>
        </p>
        <p class="text-gray-500 text-sm mt-2">
          © {currentYear} <a href="https://github.com/JessenReinhart" target="_blank" rel="noopener noreferrer" class="hover:text-gray-400">Muhammad Jessen Reinhart Sugiarto</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
