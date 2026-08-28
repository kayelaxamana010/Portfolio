import { Code2, Shield, Star } from "lucide-react";
import ProjectPageShell, { metricAccentClasses } from "../components/ProjectPageShell";

const METRICS = [
  { value: "5", label: "Evaluation dimensions scored per team member", accent: "blue" },
  { value: "2", label: "Phases — manual prototype then n8n automation", accent: "purple" },
  { value: "2", label: "Data sources — Jira delivery + Slack support quality", accent: "pink" },
  { value: "1", label: "Monthly automated pipeline with Slack notification", accent: "green" },
];

const BADGES = [
  { label: "n8n", tone: "green" },
  { label: "Claude API", tone: "purple" },
  { label: "Jira REST API", tone: "blue" },
  { label: "Slack API", tone: "blue" },
  { label: "AWS S3", tone: "amber" },
  { label: "Static HTML Reports", tone: "pink" },
];

const EVALUATION_DIMENSIONS = [
  { source: "Jira", title: "Delivery rate", desc: "Tickets committed vs completed in the evaluation month, filtered for quality." },
  { source: "Jira", title: "Complexity handling", desc: "Mix of issue types (Story, Bug, Task) and relative complexity." },
  { source: "Jira", title: "Blocker resolution", desc: "Time tickets spent in BLOCKED or stalled states without movement." },
  { source: "Slack", title: "Support responsiveness", desc: "Time from a support request to first meaningful reply." },
  { source: "Slack", title: "Answer quality", desc: "LLM-assessed: did the reply actually resolve the request?" },
];

const FEATURES = [
  {
    icon: "🎯",
    title: "Output-Based Scoring",
    desc: "Evaluates actual deliverables and communication quality — not keystrokes or hours logged.",
  },
  {
    icon: "📝",
    title: "AI Qualitative Summaries",
    desc: "Per-person written evaluations that surface patterns a raw dashboard cannot capture.",
  },
  {
    icon: "🛡️",
    title: "Ticket Quality Detection",
    desc: "Pre-scoring filter flags vague, same-day, orphaned, or duplicate tickets to prevent metric gaming.",
  },
  {
    icon: "🔄",
    title: "Dynamic Context Fetching",
    desc: "LLM can pull additional Jira and Slack data mid-evaluation for richer analysis.",
  },
  {
    icon: "👤",
    title: "Lead Override Authority",
    desc: "AI flags and recommends — humans make the final call on evaluations.",
  },
  {
    icon: "⏰",
    title: "Monthly Automated Pipeline",
    desc: "Cron-triggered n8n workflow generates HTML reports to S3 and notifies Slack on completion.",
  },
];

const STACK = [
  "n8n (self-hosted)",
  "Claude API (Anthropic)",
  "Jira REST API",
  "Slack API",
  "AWS S3",
  "Static HTML",
  "n8n Cron trigger",
];

export default function ProjectAIPerformanceEval() {
  return (
    <ProjectPageShell
      breadcrumbTitle="AI Performance Evaluation System"
      eyebrow="System Design · DevOps · AI Automation"
      title="AI-Powered Member"
      titleHighlight="Performance Evaluation"
      description="AI-powered performance evaluation system that replaces activity-based tracking with output-based scoring derived from Jira and Slack work artifacts — generating monthly evaluation reports for HR, management, and team leads."
      badges={BADGES}
    >
      {/* Challenge */}
      <div
        className="mt-10 rounded-3xl border border-red-200 dark:border-red-500/30 bg-red-50/70 dark:bg-red-500/10 p-6"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-red-700 dark:text-red-300 mb-3">
          The Challenge
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          The company relied on Hubstaff activity and time logs for performance evaluation — measuring presence
          rather than contribution. A previous Agile-based output system failed due to management readiness gaps.
          The new system needed to extract signal from tools the team already used (Jira and Slack) with zero
          training required to interpret results.
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
        {METRICS.map((metric, idx) => (
          <div
            key={metric.label}
            data-aos="fade-up"
            data-aos-delay={idx * 80}
            className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg px-5 py-4 shadow-soft dark:shadow-none"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${metricAccentClasses[metric.accent]}`} />
            <div className="text-3xl font-bold text-light-text dark:text-dark-text font-poppins">
              {metric.value}
            </div>
            <div className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary leading-snug">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Solution phases */}
      <div className="mt-10 grid gap-4 md:grid-cols-2" data-aos="fade-up">
        <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none">
          <h3 className="text-lg font-semibold text-light-accent dark:text-dark-accent mb-2">
            Phase 1 — Manual Prototype
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            Data was manually crawled from Jira and Slack to validate the scoring rubric with real artifacts
            before investing in automation. Each dimension scored 1–5 with qualitative summaries per person.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none">
          <h3 className="text-lg font-semibold text-light-accent-secondary dark:text-dark-accent-secondary mb-2">
            Phase 2 — n8n Automation
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            Production pipeline on the company&apos;s self-hosted n8n instance — scheduled monthly ingestion,
            LLM evaluation via Claude API, static HTML report generation to S3, and Slack notification on completion.
          </p>
        </div>
      </div>

      {/* Workflow diagram */}
      <div
        className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-[#0b1220] overflow-hidden shadow-soft-lg dark:shadow-none"
        data-aos="fade-up"
      >
        <div className="border-b border-white/10 bg-white/5 px-4 py-3">
          <span className="font-mono text-xs text-slate-400">n8n workflow — scheduled 1st of each month</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
{`Jira node ────────────────┐
  └ tickets closed        │
     this month           ├──► Structured JSON per member
                          │         │
Slack node ───────────────┘         ▼
  └ support channel msgs     LLM Evaluation (Claude API)
                                    │
                                    ▼
                             Static HTML report → S3
                             One card per person + team overview`}
        </pre>
      </div>

      {/* Evaluation dimensions */}
      <div
        className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-light-text-secondary dark:text-dark-text-secondary mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
          Evaluation Dimensions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EVALUATION_DIMENSIONS.map((dim, idx) => (
            <div
              key={dim.title}
              data-aos="fade-up"
              data-aos-delay={idx * 60}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-light-bg-secondary/70 dark:bg-black/20 p-4"
            >
              <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-light-accent/10 text-light-accent dark:bg-dark-accent/20 dark:text-dark-accent mb-2">
                {dim.source}
              </span>
              <h3 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">{dim.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div
        className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg"
        data-aos="fade-up"
      >
        <div className="mb-5 flex items-center gap-2 text-light-text dark:text-dark-text">
          <Star className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
          <span className="font-semibold">Key Features</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={idx * 60}
              className="flex gap-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-light-bg-secondary/70 dark:bg-black/20 p-4"
            >
              <span className="text-xl shrink-0">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why n8n */}
      <div
        className="mt-10 rounded-3xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-500/10 p-6"
        data-aos="fade-up"
      >
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-purple-700 dark:text-purple-300 mb-3">
          Why n8n over AWS Lambda + EventBridge?
        </h3>
        <ul className="space-y-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
            Self-hosted instance already available — no additional infrastructure.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
            Visual debugging made prompt iteration faster during rubric tuning.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
            Dynamic mid-flow API calls let the AI fetch additional Jira/Slack context on demand.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
            Native Jira and Slack integrations reduced boilerplate code.
          </li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="mt-10" data-aos="fade-up">
        <div className="flex items-center gap-2 text-sm font-semibold text-light-text dark:text-dark-text mb-4">
          <Code2 className="h-5 w-5" /> Tech Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {STACK.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-xl bg-white/80 dark:bg-white/5 px-3 py-2 text-sm border border-gray-200 dark:border-white/10 text-light-text dark:text-dark-text-secondary shadow-soft dark:shadow-none"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Role note */}
      <div
        className="mt-10 rounded-3xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-500/10 p-6"
        data-aos="fade-up"
      >
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-300 shrink-0 mt-0.5" />
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            <strong className="text-emerald-700 dark:text-emerald-300">Role:</strong> System Designer &amp;
            DevOps Engineer — rubric design, manual prototype validation, n8n workflow automation, Claude API
            integration, and HTML report pipeline. Designed with a validate-before-automating approach.
          </p>
        </div>
      </div>
    </ProjectPageShell>
  );
}
