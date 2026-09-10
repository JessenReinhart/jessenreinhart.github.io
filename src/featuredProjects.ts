import { PROJECTS } from "./data";
import type { Project } from "./types";

const FEATURED_PROJECTS: Project[] = [
  {
    id: "proj-chef",
    title: "Chef",
    tagline: "Living AI Agent Workspace",
    description:
      "A local-first TypeScript runtime and visual workbench for coordinating AI agents, terminal tools, durable context, missions, approvals, artifacts, and repeatable automations in one live workspace.",
    descriptionId:
      "Runtime TypeScript local-first dan visual workbench untuk mengoordinasikan agen AI, terminal, konteks persisten, mission, approval, artifact, dan automation berulang dalam satu workspace.",
    motivation:
      "AI coding tools often feel like isolated chat or terminal sessions. I wanted a workspace where multiple agents and tools can share scoped context, stay observable, and turn one human intent into verifiable work without losing the thread.",
    motivationId:
      "Tool coding AI sering terasa seperti sesi chat atau terminal yang terpisah. Saya ingin workspace tempat banyak agen dan tool bisa berbagi konteks terarah, tetap bisa dipantau, dan mengubah satu intent manusia menjadi pekerjaan yang dapat diverifikasi tanpa kehilangan konteks.",
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
    tagline: "Browser-Based Real-Time Strategy Game",
    description:
      "A browser RTS built with React and Phaser, combining settlement building, economy, population, research, combat, fog of war, enemy AI, and procedurally generated isometric terrain.",
    descriptionId:
      "Game RTS berbasis browser dengan React dan Phaser yang menggabungkan pembangunan settlement, ekonomi, populasi, riset, combat, fog of war, enemy AI, dan terrain isometrik procedural.",
    motivation:
      "I wanted to see how far a browser-first TypeScript stack could be pushed toward the systemic feel of classic RTS games, not just rendering a map, but making economy, AI, combat, progression, and world simulation work together.",
    motivationId:
      "Saya ingin melihat seberapa jauh stack TypeScript berbasis browser bisa didorong menuju rasa sistemik RTS klasik, bukan hanya merender map, tapi membuat ekonomi, AI, combat, progression, dan simulasi dunia bekerja bersama.",
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
