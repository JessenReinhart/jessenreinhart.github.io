import { PROJECTS } from "./data";
import type { Project } from "./types";

const FEATURED_PROJECTS: Project[] = [
  {
    id: "proj-chef",
    title: "Chef",
    tagline: "Coordinate coding agents in one workspace",
    description:
      "I wanted one workspace where coding agents, terminals, context, approvals, and artifacts could stay connected instead of living in separate sessions. Chef is the local-first TypeScript runtime I built around that idea.",
    descriptionId:
      "Saya ingin satu workspace tempat agent coding, terminal, context, approval, dan artifact tetap terhubung, bukan tersebar di sesi yang berbeda. Chef adalah runtime TypeScript local-first yang saya bangun untuk itu.",
    motivation:
      "I was tired of treating each AI coding session as a separate workspace. Chef is my attempt to make the work observable and coordinated while keeping the human in control.",
    motivationId:
      "Saya bosan memperlakukan setiap sesi coding AI sebagai workspace terpisah. Chef adalah usaha saya membuat pekerjaan lebih mudah dipantau dan dikoordinasikan, sambil tetap menempatkan manusia sebagai pengendali.",
    technologies: ["TypeScript", "React", "XYFlow", "Node.js", "SQLite"],
    features: [
      "Mission orchestration across multiple AI workers and terminal harnesses",
      "Live React/XYFlow workspace with durable nodes and scoped context",
      "Embedded terminal, browser, approval, artifact, and collaboration surfaces",
      "SQLite-backed persistence, live SSE events, and repeatable automations",
    ],
    featuresId: [
      "Orkestrasi mission di banyak AI worker dan terminal harness",
      "Workspace React/XYFlow dengan node persisten dan scoped context",
      "Terminal, browser, approval, artifact, dan collaboration surface dalam satu workspace",
      "Persistensi berbasis SQLite, live SSE events, dan automation berulang",
    ],
    imageSrc:
      "https://raw.githubusercontent.com/JessenReinhart/chef/master/docs/mockups/LIVING_WORKSPACE_NORTH_STAR.svg",
    githubUrl: "https://github.com/JessenReinhart/chef",
  },
  {
    id: "proj-civstrategy",
    title: "CivStrategy: Ancient Realms",
    tagline: "Build and fight in a browser RTS",
    description:
      "I built a browser RTS with React and Phaser where settlement building, economy, combat, AI, fog of war, and procedural terrain all have to work together instead of acting like separate demos.",
    descriptionId:
      "Saya membuat RTS berbasis browser dengan React dan Phaser, tempat settlement, ekonomi, combat, AI, fog of war, dan terrain procedural harus bekerja bersama, bukan sekadar menjadi demo terpisah.",
    motivation:
      "The goal was not another map renderer. I wanted to see how far a browser-first TypeScript stack could go toward the systemic feel of the RTS games I grew up with.",
    motivationId:
      "Tujuannya bukan sekadar membuat map renderer. Saya ingin melihat seberapa jauh stack TypeScript berbasis browser bisa mendekati rasa sistemik game RTS klasik.",
    technologies: ["React", "TypeScript", "Phaser", "Vite", "Game Systems"],
    features: [
      "20-system architecture spanning terrain, economy, combat, research, enemy AI, minimap, and fog of war",
      "JPS pathfinding, flow fields, formations, and SpatialHash-based simulation",
      "Procedural isometric terrain with Perlin heightmaps, biomes, cliffs, lighting, and water effects",
      "React ↔ Phaser event bridge with performance budgets, LOD, pooling, and save/load systems",
    ],
    featuresId: [
      "Arsitektur 20 sistem untuk terrain, ekonomi, combat, research, enemy AI, minimap, dan fog of war",
      "JPS pathfinding, flow fields, formations, dan simulasi berbasis SpatialHash",
      "Terrain isometrik procedural dengan Perlin heightmap, biome, cliff, lighting, dan efek air",
      "Event bridge React ↔ Phaser dengan performance budget, LOD, pooling, serta save/load",
    ],
    imageSrc:
      "https://raw.githubusercontent.com/JessenReinhart/CivStrategy/main/screenshots/gameplay.png",
    githubUrl: "https://github.com/JessenReinhart/CivStrategy",
  },
];

/**
 * Keep the portfolio's existing data source intact while promoting the two
 * current flagship builds everywhere PROJECTS is consumed (editorial work,
 * legacy project views, and hire-intent lookup). The ID guard makes this safe
 * under React/Vite hot module reloads.
 */
export function registerFeaturedProjects() {
  const existingIds = new Set(PROJECTS.map((project) => project.id));
  const additions = FEATURED_PROJECTS.filter(
    (project) => !existingIds.has(project.id),
  );

  if (additions.length > 0) {
    PROJECTS.unshift(...additions);
  }
}
