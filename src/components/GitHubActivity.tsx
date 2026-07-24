import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Star, GitFork, Code2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { translations } from "../i18n/translations";

const GITHUB_USERNAME = "jessenreinhart";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

interface ActivityDay {
  count: number;
  date: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
};

const EVENT_LABELS: Record<string, string> = {
  PushEvent: "pushed to",
  CreateEvent: "created",
  IssuesEvent: "opened issue in",
  IssueCommentEvent: "commented on",
  PullRequestEvent: "opened PR in",
  ForkEvent: "forked",
  ReleaseEvent: "released in",
  WatchEvent: "starred",
};

const LEVEL_OPACITIES = [0.04, 0.12, 0.22, 0.35, 0.55];

function getBaseColor(theme: string): string {
  return theme === "dark" ? "255,255,255" : "0,0,0";
}

function getLevelBg(count: number, baseColor: string): string {
  if (count === 0) return `rgba(${baseColor},0.04)`;
  if (count <= 2) return `rgba(${baseColor},0.12)`;
  if (count <= 5) return `rgba(${baseColor},0.22)`;
  if (count <= 10) return `rgba(${baseColor},0.35)`;
  return `rgba(${baseColor},0.55)`;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function generateContributionCalendar(events: GitHubEvent[]): ActivityDay[] {
  const today = new Date();
  const eventCounts: Record<string, number> = {};
  for (const event of events) {
    const date = event.created_at.split("T")[0];
    eventCounts[date] = (eventCounts[date] || 0) + 1;
  }
  const days: ActivityDay[] = [];
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({ count: eventCounts[dateStr] || 0, date: dateStr });
  }
  return days;
}

function ContributionCalendar({ days, baseColor }: { days: ActivityDay[]; baseColor: string }) {
  const getTooltipText = (day: ActivityDay): string => {
    const date = new Date(day.date + "T00:00:00");
    const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (day.count === 0) return `No activity on ${formatted}`;
    return `${day.count} event${day.count > 1 ? "s" : ""} on ${formatted}`;
  };

  return (
    <div
      className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-2"
      style={{ scrollbarWidth: "none" }}
    >
      {days.map((day, i) => (
        <div
          key={i}
          className="w-[10px] h-[10px] rounded-[2px] flex-shrink-0 transition-all duration-150 cursor-default"
          style={{ backgroundColor: getLevelBg(day.count, baseColor) }}
          title={getTooltipText(day)}
        />
      ))}
    </div>
  );
}

export default function GitHubActivity() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = translations[lang];
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [staticContribs, setStaticContribs] = useState<ActivityDay[] | null>(null);
  const [staticTotal, setStaticTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
        ]);
        if (!userRes.ok) throw new Error("Failed to fetch GitHub profile");
        setUser(await userRes.json());
        setRepos(await reposRes.json());
        setEvents(await eventsRes.json());

        // Try loading static contribution data (built at deploy time with token)
        const staticRes = await fetch("/github-contributions.json");
        if (staticRes.ok) {
          const data = await staticRes.json();
          setStaticContribs(data.days);
          setStaticTotal(data.totalContributions);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || error || !user) return null;

  const contributionDays = staticContribs ?? generateContributionCalendar(events);
  const totalContributions = staticTotal ?? contributionDays.reduce((sum, d) => sum + d.count, 0);
  const recentEvents = events
    .filter((e) => ["PushEvent", "CreateEvent", "PullRequestEvent", "IssuesEvent", "ForkEvent", "ReleaseEvent", "WatchEvent"].includes(e.type))
    .slice(0, 8);
  const baseColor = getBaseColor(theme);

  return (
    <section
      id="github"
      className="relative py-24 md:py-32 overflow-hidden scroll-mt-20 border-t"
      style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase" style={{ color: "var(--color-text-primary)" }}>
              {t.ghTitle}
            </h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors group hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Github className="w-4 h-4" />
            {t.ghViewProfile}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Calendar + Stats + Repos */}
          <div className="lg:col-span-7 space-y-12">
            {/* Contribution Calendar */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                  {totalContributions.toLocaleString()} {t.ghContributions}
                </h3>
              </div>
              <div className="me-panel p-5 md:p-6">
                <ContributionCalendar days={contributionDays} baseColor={baseColor} />
                <div className="flex items-center gap-2 mt-3 justify-end">
                  <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>Less</span>
                  {LEVEL_OPACITIES.map((opacity, i) => (
                    <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: `rgba(${baseColor},${opacity})` }} />
                  ))}
                  <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "var(--color-text-dim)" }}>More</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { value: user.public_repos, label: t.ghRepos },
                { value: user.followers, label: t.ghFollowers },
                { value: user.following, label: t.ghFollowing },
              ].map((stat) => (
                <div key={stat.label} className="me-panel me-panel-hover p-4 sm:p-5 text-left">
                  <div className="font-display font-black text-2xl sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>{stat.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider mt-1" style={{ color: "var(--color-text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Recent Repositories */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "var(--color-text-muted)" }}>{t.ghRecentRepos}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-panel me-panel-hover p-5 text-left group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-display font-bold tracking-tight truncate pr-4 transition-colors" style={{ color: "var(--color-text-primary)" }}>
                        {repo.name}
                      </h4>
                      <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-accent)" }} />
                    </div>
                    {repo.description && (
                      <p className="text-xs font-light leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--color-text-muted)" }}>
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || "var(--color-text-dim)" }} />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--color-text-dim)" }}>
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--color-text-dim)" }}>
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Activity Feed */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5">
            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "var(--color-text-muted)" }}>{t.ghRecentActivity}</h3>
            <div className="me-panel overflow-hidden">
              {recentEvents.map((event) => {
                const repoShort = event.repo.name.split("/")[1] || event.repo.name;
                const action = EVENT_LABELS[event.type] || event.type.replace("Event", "");
                return (
                  <div key={event.id} className="flex items-start gap-3 p-5 group transition-colors" style={{ borderBottom: "1px solid var(--color-border-primary)" }}>
                    <div className="mt-0.5 flex-shrink-0 w-7 h-7 flex items-center justify-center" style={{ color: "var(--color-accent)" }}>
                      <Code2 className="w-3 h-3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-light leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        <span style={{ color: "var(--color-text-muted)" }}>{action} </span>
                        <a
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium transition-colors hover:text-[var(--color-accent)]"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {repoShort}
                        </a>
                      </p>
                      <p className="text-[10px] font-mono mt-1" style={{ color: "var(--color-text-dim)" }}>{timeAgo(event.created_at)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
