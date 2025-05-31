const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
        const scrollProgress = (window.scrollY / scrollHeight) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
    } else {
        document.documentElement.style.setProperty('--scroll-progress', '0%');
    }
};
window.addEventListener('scroll', handleScroll);
handleScroll();

const ScrollIndicator = () => {
    return <div class="scroll-indicator" id="scrollIndicator" aria-hidden="true"></div>;
};

export default ScrollIndicator;
