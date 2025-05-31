import { EDUCATION_INFO } from "../const";
import Section from "../layout/Section";


const EducationSection = () => {
  return (
    <Section id="education">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center text-white">
          <span class="text-gray-500">// </span>Education
        </h2>
        <div class="max-w-2xl mx-auto">
          <div class="card p-8 rounded-lg text-center">
            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-graduation-cap text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-semibold text-green-400 mb-2">{EDUCATION_INFO.degree}</h3>
            <p class="text-white mb-2">{EDUCATION_INFO.major}</p>
            <p class="text-gray-400 mb-4">{EDUCATION_INFO.university}</p>
            <p class="text-gray-400 text-sm">
              <i class="fas fa-calendar mr-2"></i>{EDUCATION_INFO.period}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EducationSection;
