import { PROJECTS } from "./data";
import type { Project } from "./types";

const FEATURED_PROJECTS: Project[] = [
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
 * Keep the portfolio's existing data source intact while promoting the
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
