import { Code2, Shield, Star } from "lucide-react";
import ProjectPageShell, { metricAccentClasses } from "../components/ProjectPageShell";

const METRICS = [
  { value: "64", label: "Domains monitored automatically with daily sync", accent: "blue" },
  { value: "33", label: "Previously expired domains identified and flagged", accent: "pink" },
  { value: "7", label: "Grafana dashboard panels (KPI cards + tables)", accent: "purple" },
  { value: "0", label: "New infrastructure provisioned", accent: "green" },
];

const BADGES = [
  { label: "WhoisXML API", tone: "green" },
  { label: "Google Apps Script", tone: "green" },
  { label: "Google Sheets", tone: "blue" },
  { label: "Grafana", tone: "blue" },
  { label: "Slack Alerts", tone: "amber" },
  { label: "Notion Runbook", tone: "purple" },
];

const PIPELINE = [
  { icon: "🌐", label: "WhoisXML API", sub: "Live whois data" },
  { icon: "📜", label: "Apps Script", sub: "Daily 9 AM KST" },
  { icon: "📊", label: "Google Sheets", sub: "Dashboard + Raw" },
  { icon: "📈", label: "Grafana", sub: "Infinity plugin" },
  { icon: "💬", label: "Slack", sub: "Critical alerts" },
];

const FEATURES = [
  {
    icon: "🔍",
    title: "Domain Audit",
    desc: "Identified all 64 domains, expiry dates, and registrar metadata from the existing Excel spreadsheet.",
  },
  {
    icon: "📜",
    title: "DomainMonitor_v4.gs",
    desc: "Production Google Apps Script with dual data source logic, WhoisXML API integration, seeded Excel fallbacks, and automatic Column M updates when live dates differ.",
  },
  {
    icon: "📅",
    title: "Date Normalization",
    desc: "_fmtDate() strips full ISO/GMT timestamps into clean YYYY-MM-DD format and fixes Korean TLD day-rounding issues from WhoisXML.",
  },
  {
    icon: "🧭",
    title: "Sheets Menu System",
    desc: "Custom menu with Sync Now, Quick Refresh, Setup Sheets, Lock Raw Data, daily auto-sync trigger, and Slack alert testing.",
  },
  {
    icon: "🔒",
    title: "Sheet Protection",
    desc: "Programmatically locks the Raw Data tab to the owner account using SpreadsheetApp protection APIs.",
  },
  {
    icon: "📈",
    title: "Grafana Dashboard",
    desc: "Seven panels including KPI stat cards and domain tables, built on the Grafana Infinity plugin pulling published Google Sheets CSV.",
  },
];

const DECISIONS = [
  {
    title: "Why Google Sheets instead of a database?",
    desc: "Zero new infrastructure, data already structured from the existing Excel file, and Grafana Infinity reads the published CSV directly — no ETL pipeline needed.",
  },
  {
    title: "Why not fix the existing internal tool?",
    desc: "Five structural blockers: internal-only URL, 502 errors on whois, no REST API, no alerting, and no maintenance owner. Replacing it was faster than fixing it.",
  },
  {
    title: "Why WhoisXML API over free RDAP?",
    desc: "Free RDAP APIs don't reliably return day-level expiry dates for Korean TLDs (.co.kr, .kr). WhoisXML has full coverage for 7,596 TLDs including Korean ccTLDs.",
  },
];

const STACK = [
  "WhoisXML API",
  "Google Apps Script",
  "Google Sheets",
  "Grafana",
  "Grafana Infinity Plugin",
  "Slack Webhooks",
  "Notion",
];

export default function ProjectDomainMonitor() {
  return (
    <ProjectPageShell
      breadcrumbTitle="Domain Monitoring Automation"
      eyebrow="DevOps · Automation · Observability"
      title="Domain Monitoring"
      titleHighlight="Automation"
      description="End-to-end domain expiry monitoring for 64 domains across multiple registrars and TLDs — replacing an unreliable internal tool with a fully automated pipeline integrating Google Sheets, WhoisXML API, and Grafana."
      badges={BADGES}
    >
      {/* Problem */}
      <div
        className="mt-10 rounded-3xl border border-red-200 dark:border-red-500/30 bg-red-50/70 dark:bg-red-500/10 p-6"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-red-700 dark:text-red-300 mb-3">
          Problem
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          The company had no reliable way to track domain expiries across 4+ registrars and mixed TLDs.
          The existing internal monitoring tool was returning 502 errors, was unreachable from external
          automation, had no alerting, and no REST API. An audit revealed 33 domains had already expired silently.
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

      {/* Architecture */}
      <div
        className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-light-text-secondary dark:text-dark-text-secondary mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
          Solution Pipeline
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE.map((node, index) => (
            <div key={node.label} className="flex items-center gap-2">
              <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-light-bg-secondary dark:bg-black/20 px-3 py-2 text-center min-w-[92px]">
                <div className="text-lg">{node.icon}</div>
                <div className="text-xs font-semibold text-light-text dark:text-dark-text">{node.label}</div>
                <div className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary">{node.sub}</div>
              </div>
              {index < PIPELINE.length - 1 && (
                <span className="text-light-text-secondary dark:text-dark-text-secondary text-lg">→</span>
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

      {/* Key Decisions */}
      <div className="mt-10 grid gap-4 md:grid-cols-3" data-aos="fade-up">
        {DECISIONS.map((item, idx) => (
          <div
            key={item.title}
            data-aos="fade-up"
            data-aos-delay={idx * 80}
            className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5 shadow-soft dark:shadow-none"
          >
            <h3 className="text-sm font-semibold text-light-accent dark:text-dark-accent mb-2">{item.title}</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
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
            <strong className="text-emerald-700 dark:text-emerald-300">Role:</strong> DevOps Engineer — domain
            audit, Apps Script automation (v1–v4), Google Sheets dashboard, Grafana integration, solution
            evaluation report, and operational runbook. Timeline: June 2026.
          </p>
        </div>
      </div>
    </ProjectPageShell>
  );
}
