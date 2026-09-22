import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2, GitFork, Star } from "lucide-react";
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

const EVENT_LABELS = {
  en: {
    PushEvent: "pushed to",
    CreateEvent: "created",
    IssuesEvent: "opened an issue in",
    PullRequestEvent: "opened a PR in",
    ForkEvent: "forked",
    ReleaseEvent: "released in",
    WatchEvent: "starred",
  },
  id: {
    PushEvent: "push ke",
    CreateEvent: "membuat",
    IssuesEvent: "membuka issue di",
    PullRequestEvent: "membuka PR di",
    ForkEvent: "fork",
    ReleaseEvent: "rilis di",
    WatchEvent: "star",
  },
} as const;

function getLevelBg(count: number, isDark: boolean): string {
  if (isDark) {
    if (count === 0) return "hsla(0, 0%, 18%, 1)";
    if (count <= 2) return "hsla(0, 80%, 16%, 1)";
    if (count <= 5) return "hsla(0, 86%, 25%, 1)";
    if (count <= 10) return "hsla(0, 92%, 36%, 1)";
    return "hsla(0, 94%, 50%, 1)";
  }

  if (count === 0) return "rgba(225,6,0,0.045)";
  if (count <= 2) return "rgba(225,6,0,0.14)";
  if (count <= 5) return "rgba(225,6,0,0.25)";
  if (count <= 10) return "rgba(225,6,0,0.4)";
  return "rgba(225,6,0,0.62)";
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
  return `${Math.floor(days / 30)}mo ago`;
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
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    days.push({ count: eventCounts[key] || 0, date: key });
  }

  return days;
}

function ContributionCalendar({
  days,
  isDark,
}: {
  days: ActivityDay[];
  isDark: boolean;
}) {
  return (
    <div
      className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
      aria-label="GitHub contribution activity"
    >
      {days.map((day) => (
        <div
          key={day.date}
          className="h-[10px] w-[10px] shrink-0 rounded-[2px]"
          style={{ backgroundColor: getLevelBg(day.count, isDark) }}
          title={`${day.count} public event${day.count === 1 ? "" : "s"} on ${day.date}`}
        />
      ))}
    </div>
  );
}

export default function GitHubActivity() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const t = translations[lang];

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [staticContribs, setStaticContribs] = useState<ActivityDay[] | null>(null);
  const [staticTotal, setStaticTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const [profileResult, reposResult, eventsResult, contributionsResult] =
        await Promise.allSettled([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then((res) =>
            res.ok ? res.json() : Promise.reject(new Error("profile fetch failed")),
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
          ).then((res) =>
            res.ok ? res.json() : Promise.reject(new Error("repos fetch failed")),
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
          ).then((res) =>
            res.ok ? res.json() : Promise.reject(new Error("events fetch failed")),
          ),
          fetch("/github-contributions.json").then((res) =>
            res.ok ? res.json() : Promise.reject(new Error("static contributions unavailable")),
          ),
        ]);

      if (cancelled) return;

      if (profileResult.status === "fulfilled") {
        setUser(profileResult.value as GitHubUser);
      }

      if (
        reposResult.status === "fulfilled" &&
        Array.isArray(reposResult.value)
      ) {
        setRepos(reposResult.value as GitHubRepo[]);
      }

      if (
        eventsResult.status === "fulfilled" &&
        Array.isArray(eventsResult.value)
      ) {
        setEvents(eventsResult.value as GitHubEvent[]);
      }

      if (
        contributionsResult.status === "fulfilled" &&
        contributionsResult.value?.days
      ) {
        setStaticContribs(contributionsResult.value.days);
        setStaticTotal(contributionsResult.value.totalContributions ?? null);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const contributionDays =
    staticContribs ?? generateContributionCalendar(events);
  const totalContributions =
    staticTotal ?? contributionDays.reduce((sum, day) => sum + day.count, 0);
  const recentRepos = repos.slice(0, 4);
  const recentEvents = events
    .filter((event) =>
      [
        "PushEvent",
        "CreateEvent",
        "PullRequestEvent",
        "IssuesEvent",
        "ForkEvent",
        "ReleaseEvent",
        "WatchEvent",
      ].includes(event.type),
    )
    .slice(0, 5);
  const isDark = theme === "dark";

  const copy =
    lang === "id"
      ? {
          description:
            "Jejak engineering publik dari repository, kontribusi, dan aktivitas terbaru saya di GitHub.",
          contributions: "kontribusi / aktivitas dalam 6 bulan terakhir",
          repos: "repository publik",
          followers: "followers",
          recentRepos: "Repository terbaru",
          recentActivity: "Aktivitas terbaru",
          quiet: "Aktivitas publik terbaru belum tersedia.",
        }
      : {
          description:
            "A live-ish view of my public engineering work across repositories, contributions, and recent GitHub activity.",
          contributions: "contributions / public events in the last 6 months",
          repos: "public repositories",
          followers: "followers",
          recentRepos: "Recently updated",
          recentActivity: "Recent activity",
          quiet: "Recent public activity is not available right now.",
        };

  const reveal = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: {
      duration: reduceMotion ? 0 : 0.58,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  };

  return (
    <section
      id="github"
      className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        borderColor: "var(--color-border-primary)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...reveal}
          className="mb-10 grid gap-6 md:grid-cols-2 md:items-end"
        >
          <div>
            <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              {t.ghTitle}
            </h2>
          </div>

          <div className="md:justify-self-end">
            <p
              className="max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {copy.description}
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold transition-colors hover:text-[var(--color-accent)]"
            >
              github.com/{GITHUB_USERNAME}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="mb-5 grid border-y sm:grid-cols-3"
          style={{ borderColor: "var(--color-border-primary)" }}
        >
          <div
            className="border-b py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0"
            style={{ borderColor: "var(--color-border-primary)" }}
          >
            <div className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
              {totalContributions.toLocaleString()}
            </div>
            <div
              className="mt-1 text-[11px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {copy.contributions}
            </div>
          </div>
          <div
            className="border-b py-5 sm:border-b-0 sm:border-r sm:px-6"
            style={{ borderColor: "var(--color-border-primary)" }}
          >
            <div className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
              {user?.public_repos ?? "—"}
            </div>
            <div
              className="mt-1 text-[11px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {copy.repos}
            </div>
          </div>
          <div className="py-5 sm:px-6">
            <div className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
              {user?.followers ?? "—"}
            </div>
            <div
              className="mt-1 text-[11px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {copy.followers}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="mb-5 border p-5 md:p-6"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border-primary)",
          }}
        >
          <ContributionCalendar days={contributionDays} isDark={isDark} />
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-12">
          <motion.div
            {...reveal}
            className="border p-6 lg:col-span-7"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-primary)",
            }}
          >
            <div
              className="mb-5 font-mono text-[10px] tracking-[0.2em]"
              style={{ color: "var(--color-text-dim)" }}
            >
              {copy.recentRepos.toUpperCase()}
            </div>

            <div className="grid gap-x-8 sm:grid-cols-2">
              {recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-t py-4"
                  style={{ borderColor: "var(--color-border-primary)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold transition-colors group-hover:text-[var(--color-accent)]">
                        {repo.name}
                      </h3>
                      {repo.description && (
                        <p
                          className="mt-2 line-clamp-2 text-xs leading-relaxed"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {repo.description}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-35 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div
                    className="mt-3 flex items-center gap-3 font-mono text-[9px]"
                    style={{ color: "var(--color-text-dim)" }}
                  >
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              LANGUAGE_COLORS[repo.language] ??
                              "var(--color-text-dim)",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}

              {recentRepos.length === 0 && (
                <p
                  className="border-t py-4 text-xs"
                  style={{
                    color: "var(--color-text-muted)",
                    borderColor: "var(--color-border-primary)",
                  }}
                >
                  {copy.quiet}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="border p-6 lg:col-span-5"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border-primary)",
            }}
          >
            <div
              className="mb-5 font-mono text-[10px] tracking-[0.2em]"
              style={{ color: "var(--color-text-dim)" }}
            >
              {copy.recentActivity.toUpperCase()}
            </div>

            <div>
              {recentEvents.map((event) => {
                const repoShort =
                  event.repo.name.split("/")[1] || event.repo.name;
                const labels = EVENT_LABELS[lang];
                const action =
                  labels[event.type as keyof typeof labels] ??
                  event.type.replace("Event", "");

                return (
                  <div
                    key={event.id}
                    className="flex gap-3 border-t py-4"
                    style={{ borderColor: "var(--color-border-primary)" }}
                  >
                    <div
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                      style={{
                        color: "var(--color-accent)",
                        borderColor: "var(--color-border-primary)",
                      }}
                    >
                      <Code2 className="h-3 w-3" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {action}{" "}
                        <a
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold transition-colors hover:text-[var(--color-accent)]"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {repoShort}
                        </a>
                      </p>
                      <p
                        className="mt-1 font-mono text-[9px]"
                        style={{ color: "var(--color-text-dim)" }}
                      >
                        {timeAgo(event.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {recentEvents.length === 0 && (
                <p
                  className="border-t py-4 text-xs"
                  style={{
                    color: "var(--color-text-muted)",
                    borderColor: "var(--color-border-primary)",
                  }}
                >
                  {copy.quiet}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
