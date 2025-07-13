import { For } from "solid-js";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";
import Section from "../layout/Section";
import Layout from "../layout/Layout";

export default function PortfolioPage() {
  return (
    <Layout>
      <Section id="portfolio">
        <div class="py-12 px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
              Projects
            </h2>
            <p class="mt-4 text-lg text-gray-400">
              Here are some of the projects I've worked on.
            </p>
          </div>
          <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            <For each={projects}>{(project) => <ProjectCard project={project} />}</For>
          </div>

        </div>
      </Section>
    </Layout>
  );
}