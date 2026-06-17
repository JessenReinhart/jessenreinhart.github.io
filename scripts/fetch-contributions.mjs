import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "jessenreinhart";

async function main() {
  if (!TOKEN) {
    console.log("No GITHUB_TOKEN set — skipping contribution data fetch");
    return;
  }

  const now = new Date();
  const past = new Date(now);
  past.setDate(past.getDate() - 190); // buffer a few extra days

  const query = `
    query {
      user(login: "${USERNAME}") {
        contributionsCollection(from: "${past.toISOString()}", to: "${now.toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `.trim();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GraphQL API error ${res.status}: ${body}`);
  }

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));

  const calendar = json.data.user.contributionsCollection.contributionCalendar;

  const days = calendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ count: d.contributionCount, date: d.date }));

  // trim to last 181 days, newest first, then re-sort ascending
  days.sort((a, b) => a.date.localeCompare(b.date));
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - 181);
  const trimmed = days.filter((d) => d.date >= cutoff.toISOString().split("T")[0]);

  const output = {
    totalContributions: calendar.totalContributions,
    days: trimmed,
    fetchedAt: now.toISOString(),
  };

  const outDir = resolve(__dirname, "..", "public");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "github-contributions.json"), JSON.stringify(output));
  console.log(
    `Wrote ${trimmed.length} contribution days (${output.totalContributions} total) to public/github-contributions.json`
  );
}

main().catch((err) => {
  console.error("Failed to fetch contributions:", err);
  process.exit(1);
});
