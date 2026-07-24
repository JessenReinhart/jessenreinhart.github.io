export type HireLang = "en" | "id";

export const HIRE_INTENT_EVENT = "hire-intent";

export function buildHireMessage(
  project: { title: string; technologies: string[] },
  lang: HireLang
): string {
  const stack = project.technologies.slice(0, 4).join(", ");
  if (lang === "id") {
    return `Tertarik membuat sesuatu seperti ${project.title} (${stack}) untuk [produk/perusahaan saya] — lingkup serupa. Silakan balas via email.`;
  }
  return `Interested in something like ${project.title} (${stack}) for [my product/company] — similar scope. Happy to discuss over email.`;
}

export function getHireProjectId(): string | null {
  return new URLSearchParams(window.location.search).get("project");
}

/** Sets ?project= id, notifies Contact without full navigation. */
export function setHireProjectParam(projectId: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set("project", projectId);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(
    new CustomEvent(HIRE_INTENT_EVENT, { detail: { projectId } })
  );
}
