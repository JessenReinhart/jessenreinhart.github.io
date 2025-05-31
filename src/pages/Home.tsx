import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import HeroSection from '../components/HeroSection';
import SkillsSection from "../components/SkillSection";

const smoothScroll = (e: Event) => {
    const anchor = e.target as HTMLAnchorElement;
    if (anchor.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
};

const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    document.documentElement.style.setProperty('--mouse-x', mouseX.toString());
    document.documentElement.style.setProperty('--mouse-y', mouseY.toString());
};

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('click', smoothScroll);

const Home = () => (
    <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
    </main>
);

export default Home;
