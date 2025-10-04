import { JSX } from 'solid-js';

interface SectionProps {
  title: string;
  children: JSX.Element;
  id?: string;
}

const Section = (props: SectionProps) => {
  return (
    <section id={props.id} class="mb-16 scroll-mt-20">
      <h2 class="font-serif text-3xl md:text-4xl text-brand-gold mb-6 pb-2 border-b-2 border-brand-gold/20 dark:border-gray-600/50">
        {props.title}
      </h2>
      {props.children}
    </section>
  );
};

export default Section;