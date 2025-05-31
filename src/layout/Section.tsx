import { createEffect, onCleanup } from 'solid-js';
import type { FlowProps } from 'solid-js'; // For children prop type

interface SectionProps extends FlowProps { // Use FlowProps for children
  id: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const VISIBLE_CLASS_NAMES = ['opacity-100', 'translate-y-0'];
const HIDDEN_CLASS_NAMES = ['opacity-0', 'translate-y-10'];

const Section = (props: SectionProps) => {
  let sectionRef: HTMLElement | undefined;

  // Default values for observer options, accessed as functions
  const observerThreshold = () => props.threshold ?? 0.1;
  const observerRootMargin = () => props.rootMargin ?? '0px 0px -50px 0px';
  const observerTriggerOnce = () => props.triggerOnce ?? true;

  // Compute classes, including initial hidden state
  const computedSectionClasses = () => `
    py-20 
    ${props.className || ''} 
    ${HIDDEN_CLASS_NAMES.join(' ')}
    transition-all 
    duration-700 
    ease-out
  `.trim().replace(/\s+/g, ' ');

  createEffect(() => {
    if (!sectionRef) {
      // This warning helps catch issues if the ref isn't assigned as expected.
      console.warn('Section ref not available in createEffect for ID:', props.id);
      return;
    }

    const currentElement = sectionRef; // Capture for use in cleanup and observer

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove(...HIDDEN_CLASS_NAMES);
            el.classList.add(...VISIBLE_CLASS_NAMES);
            el.setAttribute('aria-busy', 'false');
            if (observerTriggerOnce()) {
              observer.unobserve(el);
            }
          }
        });
      },
      {
        threshold: observerThreshold(),
        rootMargin: observerRootMargin(),
      }
    );

    observer.observe(currentElement);

    onCleanup(() => {
      observer.unobserve(currentElement); // Good practice to unobserve specific element
      observer.disconnect();
    });
  }); // Runs once after mount and cleans up on unmount

  return (
    <section
      ref={sectionRef} // Assign the ref to the DOM element
      id={props.id}
      class={computedSectionClasses()}
      aria-busy="true"
    >
      {props.children}
    </section>
  );
};

export default Section;
