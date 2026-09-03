import { useState } from "react";
import { Modal, IconButton, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Code2, Shield, Star } from "lucide-react";
import ProjectPageShell, { metricAccentClasses } from "../components/ProjectPageShell";

const METRICS = [
  { value: "4", label: "Unit tests passing (format + webhook behavior)", accent: "green" },
  { value: "5", label: "Weekdays posted automatically (Mon–Fri)", accent: "blue" },
  { value: "0", label: "Manual morning messages required", accent: "purple" },
  { value: "7AM", label: "Asia/Manila local post time via EventBridge", accent: "pink" },
];

const BADGES = [
  { label: "AWS Lambda", tone: "green" },
  { label: "EventBridge", tone: "green" },
  { label: "SSM Parameter Store", tone: "blue" },
  { label: "Terraform", tone: "blue" },
  { label: "Python 3.12", tone: "amber" },
  { label: "Slack Webhooks", tone: "purple" },
];

const PIPELINE = [
  { icon: "⏰", label: "EventBridge", sub: "cron SUN–THU UTC" },
  { icon: "λ", label: "Lambda", sub: "Python 3.12" },
  { icon: "🔐", label: "SSM", sub: "SecureString" },
  { icon: "💬", label: "Slack", sub: "#team-daily-standup" },
];

const FEATURES = [
  {
    icon: "📅",
    title: "Slack mrkdwn Date Format",
    desc: "format_today() builds bold+italic Slack mrkdwn (*_YYYY-MM-DD Weekday_*) using zoneinfo Asia/Manila for DST-safe local time.",
  },
  {
    icon: "⏰",
    title: "Weekday Cron Trigger",
    desc: "EventBridge cron(0 23 ? * SUN-THU *) UTC fires at 7:00 AM Monday–Friday Asia/Manila — no always-on server required.",
  },
  {
    icon: "🔐",
    title: "Secrets in SSM",
    desc: "Slack webhook URL stored as an SSM SecureString and decrypted at runtime with least-privilege IAM — never hardcoded or committed.",
  },
  {
    icon: "🏗️",
    title: "Terraform IaC",
    desc: "Lambda, EventBridge rule, and permissions defined as code (hashicorp/aws ~> 5.0), reusing a shared IAM execution role instead of new IAM resources.",
  },
  {
    icon: "🧪",
    title: "Unit Test Coverage",
    desc: "Four unittest cases cover bold/italic format, day padding, expected webhook payload, and RuntimeError on webhook failure.",
  },
  {
    icon: "👥",
    title: "Ownerless Automation",
    desc: "Runs as infrastructure rather than under a personal Slack identity — keeps posting even when ownership or team members change.",
  },
];

const DECISIONS = [
  {
    title: "Why Lambda + Terraform over GitHub Actions?",
    desc: "The target repository already standardized on Lambda + Terraform + EventBridge for Slack automations. Matching team conventions beat introducing a new pattern.",
  },
  {
    title: "Why SSM instead of env vars in code?",
    desc: "No secrets in code or version control. The webhook URL lives only in Parameter Store and is decrypted at runtime with least-privilege permissions.",
  },
  {
    title: "Why reuse shared infrastructure?",
    desc: "Reused the shared IAM role and Lambda layer for dependencies instead of duplicating resources per bot — keeping the addition lightweight.",
  },
];

const EVIDENCE = [
  {
    src: "/daily-date-slack-message-mockup.png",
    title: "Slack message mockup",
    caption: "Daily Date Bot posts *_YYYY-MM-DD Weekday_* to #team-daily-standup at 7:00 AM.",
  },
  {
    src: "/daily-date-code-and-tests-passing.png",
    title: "Code + tests",
    caption: "lambda_function.py with format_today / lambda_handler — 4/4 unittest cases OK.",
  },
  {
    src: "/daily-date-terraform-validate.png",
    title: "Terraform validate",
    caption: "terraform init + validate succeeded (hashicorp/aws v5.60.0).",
  },
];

const STACK = [
  "AWS Lambda",
  "Amazon EventBridge",
  "AWS SSM Parameter Store",
  "Terraform",
  "Python 3.12",
  "zoneinfo (Asia/Manila)",
  "Slack Webhooks",
  "unittest",
];

export default function ProjectDailyDateSlackBot() {
  const [previewSrc, setPreviewSrc] = useState(null);

  return (
    <ProjectPageShell
      breadcrumbTitle="Daily Date Slack Bot"
      eyebrow="DevOps · Serverless · Slack Automation"
      title="Daily Date"
      titleHighlight="Slack Bot"
      description="A serverless automation that posts the current date and day of the week to a Slack channel every weekday morning — filling a gap Slack's native Scheduled Messages and Workflow Builder can't solve with dynamic dates."
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
          A recurring Slack message had to be typed by hand every weekday — a bolded/italicized date
          + day of week (e.g.{" "}
          <span className="font-mono text-xs">*_2026-09-03 Thursday_*</span>). Slack&apos;s built-in
          scheduling tools can only send static text, and tying the message to one person&apos;s account
          was a risk if ownership changed with a role change or departure.
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

      {/* Evidence / screenshots */}
      <div
        className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-light-text-secondary dark:text-dark-text-secondary mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
          Project Evidence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EVIDENCE.map((item, idx) => (
            <figure
              key={item.src}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-light-bg-secondary/70 dark:bg-black/20"
            >
              <button
                type="button"
                onClick={() => setPreviewSrc(item.src)}
                className="block w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-light-accent/40 dark:focus:ring-dark-accent/40"
                aria-label={`View ${item.title} fullscreen`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-40 object-cover object-top hover:opacity-90 transition-opacity"
                />
              </button>
              <figcaption className="p-3">
                <div className="text-sm font-semibold text-light-text dark:text-dark-text">{item.title}</div>
                <p className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(previewSrc)}
        onClose={() => setPreviewSrc(null)}
        aria-labelledby="evidence-preview-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(5px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <div className="relative m-0 p-0 outline-none max-w-[90vw] max-h-[90vh]">
          <IconButton
            onClick={() => setPreviewSrc(null)}
            size="large"
            aria-label="Close preview"
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              zIndex: 1,
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.8)",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
          {previewSrc ? (
            <img
              id="evidence-preview-title"
              src={previewSrc}
              alt="Project evidence full view"
              className="block max-w-full max-h-[90vh] mx-auto object-contain"
            />
          ) : null}
        </div>
      </Modal>

      {/* Architecture */}
      <div
        className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-light-text-secondary dark:text-dark-text-secondary mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
          Architecture
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

      {/* Outcome */}
      <div
        className="mt-10 rounded-3xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-500/10 p-6"
        data-aos="fade-up"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300 mb-3">
          Outcome
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          A fully automated, ownerless daily message that requires no manual input and no dependency on
          any individual&apos;s Slack session or credentials — deployed through the team&apos;s standard
          infrastructure-as-code and pull-request review process. Infrastructure changes were validated
          with <code className="text-xs px-1.5 py-0.5 rounded bg-white/60 dark:bg-black/30">terraform init</code>,{" "}
          <code className="text-xs px-1.5 py-0.5 rounded bg-white/60 dark:bg-black/30">validate</code>, and a
          partial <code className="text-xs px-1.5 py-0.5 rounded bg-white/60 dark:bg-black/30">plan</code> before
          reviewed deployment.
        </p>
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
            <strong className="text-emerald-700 dark:text-emerald-300">Role:</strong> Built end-to-end —
            Lambda function (<span className="font-mono text-xs">format_today</span> /{" "}
            <span className="font-mono text-xs">lambda_handler</span>), EventBridge schedule, SSM secret
            wiring, Terraform definitions, and unit tests — following existing team conventions for Slack
            automations.
          </p>
        </div>
      </div>
    </ProjectPageShell>
  );
}
