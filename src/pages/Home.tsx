import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import HeroSection from '../components/HeroSection';
import SkillsSection from "../components/SkillSection";
import Layout from "../layout/Layout";

const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    document.documentElement.style.setProperty('--mouse-x', mouseX.toString());
    document.documentElement.style.setProperty('--mouse-y', mouseY.toString());
};

document.addEventListener('mousemove', handleMouseMove);

const Home = () => (
    <Layout>
        <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <EducationSection />
            <ContactSection />
        </main>
    </Layout>
);

export default Home;
