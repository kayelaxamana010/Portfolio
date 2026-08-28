import { ArrowLeft, Code2, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import ThemeToggleButton from "../components/ThemeToggleButton";

const METRICS = [
  { value: "584", label: "Events processed per daily run", accent: "blue" },
  { value: "15", label: "IP violations & MFA alerts surfaced", accent: "pink" },
  { value: "95", label: "Unit tests passing", accent: "purple" },
  { value: "7", label: "Severity tiers classified", accent: "amber" },
  { value: "64", label: "VPN users monitored daily", accent: "indigo" },
];

const BADGES = [
  { label: "AWS Lambda", tone: "green" },
  { label: "EventBridge", tone: "green" },
  { label: "S3", tone: "green" },
  { label: "Secrets Manager", tone: "green" },
  { label: "AWS CDK", tone: "blue" },
  { label: "Python 3.12", tone: "blue" },
  { label: "TypeScript", tone: "blue" },
  { label: "Google Sheets", tone: "amber" },
  { label: "Apps Script", tone: "amber" },
  { label: "Defguard VPN", tone: "purple" },
  { label: "freeipapi.com", tone: "purple" },
];

const LOG_LINES = [
  { ts: "2026-06-19 09:05:01", sev: "INFO", msg: "Auditing Defguard activity — lookback 24h" },
  { ts: "2026-06-19 09:05:02", sev: "INFO", msg: "Loaded 87 users from Defguard" },
  { ts: "2026-06-19 09:05:04", sev: "INFO", msg: "Pulled 403 raw activity events" },
  { ts: "2026-06-19 09:05:06", sev: "OK", msg: "Severity breakdown — compliant: 126  ip_violation: 11  alert: 1" },
  { ts: "2026-06-19 09:05:07", sev: "WARN", msg: "IP-unverifiable users: ['user1', 'user2', 'user3']" },
  { ts: "2026-06-19 09:05:08", sev: "INFO", msg: "Saved current state for 54 users → s3://…/state/latest_user_state.json" },
  { ts: "2026-06-19 09:05:09", sev: "OK", msg: "Sheet update OK — user_state: 54  violations: 12  summary_upserted: True" },
  { ts: "2026-06-19 09:05:10", sev: "OK", msg: "Slack EOD summary posted → #dev-platform-monthly-audit-test" },
];

const ARCH_ROW_1 = [
  { icon: "⏰", label: "EventBridge", sub: "18:00 KST" },
  { icon: "λ", label: "Lambda", sub: "Python 3.12" },
  { icon: "🔍", label: "Defguard", sub: "REST API" },
  { icon: "🌍", label: "GeoIP", sub: "Enrichment" },
  { icon: "🗄", label: "S3", sub: "JSONL Archive" },
];

const ARCH_ROW_2 = [
  { icon: "📊", label: "Google", sub: "Sheets" },
  { icon: "📜", label: "Apps Script", sub: "Webhook" },
  { icon: "💬", label: "Slack", sub: "EOD Alert" },
  { icon: "🔔", label: "Slack", sub: "Notifier" },
];

const FEATURES = [
  {
    icon: "🔐",
    title: "MFA Compliance Classifier",
    desc: "Per-event classification of TOTP, Email OTP, WebAuthn, and proxy methods extracted from Defguard event description text via regex.",
  },
  {
    icon: "🌍",
    title: "IP & Country Allowlist",
    desc: "Real-time geolocation of client IPs against an office IP + allowed-country policy. Only applied to direct connect events — Cloudflare proxy events correctly excluded.",
  },
  {
    icon: "🗺️",
    title: "Country-Change Detection",
    desc: "Per-user state persisted to S3 between runs. Alerts when a user's country shifts run-over-run — a compromise signal Ritan specifically requested.",
  },
  {
    icon: "⚠️",
    title: "IP_UNVERIFIABLE Tier",
    desc: "Detects users with only MFA proxy events (Cloudflare IPs) and no direct connect event — a Defguard data gap caused by older client versions not logging tunnel events.",
  },
  {
    icon: "📊",
    title: "Live Google Sheets Dashboard",
    desc: "Lambda POSTs enriched data to an Apps Script webhook after each run. Three tabs auto-populate: User State, Violations, and Daily Summary with upsert-by-date logic.",
  },
  {
    icon: "🏗️",
    title: "Full IaC with AWS CDK",
    desc: "All resources defined in TypeScript CDK — Lambda, S3, EventBridge Scheduler, Secrets Manager, IAM roles — with least-privilege grants and per-prefix S3 policies.",
  },
];

const STACK = [
  "Python 3.12",
  "TypeScript",
  "AWS CDK",
  "AWS Lambda",
  "Amazon S3",
  "EventBridge Scheduler",
  "Secrets Manager",
  "CloudWatch Logs",
  "Google Sheets API",
  "Google Apps Script",
  "Defguard REST API",
  "freeipapi.com",
  "Slack Webhooks",
  "pytest",
  "PowerShell",
];

const badgeToneClasses = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
  blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300",
  amber: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
  purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300",
};

const metricAccentClasses = {
  blue: "from-blue-500 to-indigo-500",
  pink: "from-pink-500 to-rose-500",
  purple: "from-purple-500 to-violet-500",
  amber: "from-amber-500 to-orange-500",
  indigo: "from-indigo-500 to-blue-500",
};

const sevClasses = {
  INFO: "text-blue-400",
  OK: "text-emerald-400",
  WARN: "text-amber-400",
  ALERT: "text-red-400",
};

export default function ProjectDefguard() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    sessionStorage.setItem("returnToProjects", "true");
    navigate("/#Portfolio");
  };

  return (
    <div className="min-h-screen w-full bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <ThemeToggleButton />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 pt-24">
        <div
          className="mb-6 flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
          data-aos="fade-down"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/80 dark:bg-white/5 hover:bg-light-bg-secondary dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 shadow-soft dark:shadow-none transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="opacity-60">›</span>
          <span className="opacity-80">Projects</span>
          <span className="opacity-60">›</span>
          <span className="font-medium text-light-text dark:text-dark-text">
            Defguard MFA + IP Audit Pipeline
          </span>
        </div>

        <div data-aos="fade-right">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-light-accent dark:text-dark-accent mb-3">
            DevOps · Security Automation · AWS
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-light-text dark:text-dark-text font-poppins">
            Defguard MFA +{" "}
            <span className="bg-gradient-to-r from-light-accent via-light-accent-secondary to-pink-500 dark:from-dark-accent dark:via-dark-accent-secondary dark:to-pink-400 bg-clip-text text-transparent">
              IP Audit Pipeline
            </span>
          </h1>
          <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-light-accent via-light-accent-secondary to-pink-500 dark:from-dark-accent dark:via-dark-accent-secondary dark:to-pink-400" />

          <p className="mt-5 max-w-3xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            Serverless daily audit pipeline that classifies VPN authentication events by MFA
            compliance, geolocation risk, and country-change anomalies — with automated Slack
            alerts and a live Google Sheets dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${badgeToneClasses[badge.tone]}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div
          className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-[#0b1220] overflow-hidden shadow-soft-lg dark:shadow-none"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              defguard-audit-dev-auditor — CloudWatch Logs
            </span>
          </div>
          <div className="space-y-2 p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            {LOG_LINES.map((line, index) => (
              <div key={line.ts} className="flex flex-wrap gap-x-3 gap-y-1" style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="text-slate-500 shrink-0">{line.ts}</span>
                <span className={`shrink-0 font-semibold ${sevClasses[line.sev] || "text-slate-300"}`}>
                  {line.sev}
                </span>
                <span className="text-slate-300">{line.msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" data-aos="fade-up">
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

        {/* Architecture */}
        <div
          className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg"
          data-aos="fade-up"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-light-text-secondary dark:text-dark-text-secondary mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
            Architecture
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {ARCH_ROW_1.map((node, index) => (
              <div key={node.label} className="flex items-center gap-2">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-light-bg-secondary dark:bg-black/20 px-3 py-2 text-center min-w-[92px]">
                  <div className="text-lg">{node.icon}</div>
                  <div className="text-xs font-semibold text-light-text dark:text-dark-text">{node.label}</div>
                  <div className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary">{node.sub}</div>
                </div>
                {index < ARCH_ROW_1.length - 1 && (
                  <span className="text-light-text-secondary dark:text-dark-text-secondary text-lg">→</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 pl-0 sm:pl-8">
            {ARCH_ROW_2.map((node, index) => (
              <div key={`${node.label}-${node.sub}`} className="flex items-center gap-2">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-light-bg-secondary dark:bg-black/20 px-3 py-2 text-center min-w-[92px]">
                  <div className="text-lg">{node.icon}</div>
                  <div className="text-xs font-semibold text-light-text dark:text-dark-text">{node.label}</div>
                  <div className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary">{node.sub}</div>
                </div>
                {index < ARCH_ROW_2.length - 1 && (
                  <span className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
                    {index === 1 ? "←" : "←"}
                  </span>
                )}
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
            <span className="font-semibold">What I Built</span>
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
              <strong className="text-emerald-700 dark:text-emerald-300">Role:</strong> Sole engineer —
              architecture, implementation, testing, IaC, and operations. Built iteratively over multiple
              weeks at MUST Company as part of the DevOps platform team&apos;s security compliance initiative.
              All design decisions, debugging, and incident response documented and reviewed with Lead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
