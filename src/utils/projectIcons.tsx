import React from "react";
import {
  Scissors,
  Minimize2,
  Compass,
  Heart,
  Activity,
  Terminal,
  Bot,
  Gamepad2,
  Code,
  type LucideProps,
} from "lucide-react";

export function getProjectIcon(idOrTitle?: string): React.ComponentType<LucideProps> {
  const key = (idOrTitle || "").toLowerCase();

  if (key.includes("tokenslash")) return Scissors;
  if (key.includes("snapcompact")) return Minimize2;
  if (key.includes("tripcore")) return Compass;
  if (key.includes("wedding")) return Heart;
  if (key.includes("soulsync")) return Activity;
  if (key.includes("shareterm") || key.includes("share-term")) return Terminal;
  if (key.includes("chef")) return Bot;
  if (key.includes("civstrategy")) return Gamepad2;

  return Code;
}

export function renderProjectIcon(idOrTitle?: string, className = "w-10 h-10") {
  const IconComponent = getProjectIcon(idOrTitle);
  return <IconComponent className={className} />;
}
