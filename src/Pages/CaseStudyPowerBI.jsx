import { Star, ArrowLeft, Code2, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { useEffect, useState } from "react";

/**
 * Case Study Detail Page: Power BI On-premises Data Gateway Restart
 * Matches the main portfolio theme (light/dark mode aware)
 */

export default function CaseStudyPowerBI() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 1000,
    });
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleBack = () => {
    // Set flag to return to Case Studies tab
    sessionStorage.setItem('returnToCaseStudies', 'true');
    // Navigate to home with portfolio hash - App.jsx will handle skipping welcome screen
    navigate('/#Portofolio');
  };

  return (
    <div className="min-h-screen w-full bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Dark Mode Toggle - Fixed Position */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-light-bg-secondary dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 shadow-soft dark:shadow-none transition-all duration-200 hover:scale-105"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-light-text" />
        )}
      </button>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 pt-24">
        {/* Breadcrumb / Back */}
        <div className="mb-6 flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary" data-aos="fade-down">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/80 dark:bg-white/5 hover:bg-light-bg-secondary dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 shadow-soft dark:shadow-none transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="opacity-60">›</span>
          <span className="opacity-80">Case Studies</span>
          <span className="opacity-60">›</span>
          <span className="font-medium text-light-text dark:text-dark-text">Power BI Gateway Restart</span>
        </div>

        {/* Title Row */}
        <div className="grid gap-8 lg:grid-cols-1">
          {/* Main content */}
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-light-text dark:text-dark-text font-poppins leading-tight">
              Restoring Connectivity via Power BI On‑premises Data Gateway Restart
            </h1>
            <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-light-accent via-light-accent-secondary to-pink-500 dark:from-dark-accent dark:via-dark-accent-secondary dark:to-pink-400" />

            <p className="mt-5 max-w-2xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              A repeatable, low‑risk procedure to restart the on‑premises data gateway when refreshes or live connections fail. Covers Gateway UI restart and Windows Services fallback, with sign‑in and status checks.
            </p>

            {/* Stats tiles */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Scope", value: "Power BI On-premises Data Gateway" },
                { label: "Path", value: "UI restart + Services fallback" },
                { label: "Access", value: "RDP to gateway server" },
              ].map((m, idx) => (
                <div
                  key={m.label}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg px-5 py-4 shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{m.label}</div>
                  <div className="text-base font-semibold text-light-text dark:text-dark-text mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mt-10" data-aos="fade-up">
              <div className="flex items-center gap-2 text-sm font-semibold text-light-text dark:text-dark-text mb-4">
                <Code2 className="h-5 w-5" /> Tools & Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Power BI On-premises Data Gateway",
                  "Windows Server / Services",
                  "RDP",
                  "Azure sign-in",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/5 px-4 py-2 text-sm border border-gray-200 dark:border-white/10 text-light-text dark:text-dark-text-secondary shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:shadow-purple-500/20 transition-all duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Validation & Notes */}
        <div className="mt-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg" data-aos="fade-up">
              <div className="mb-4 flex items-center gap-2 text-light-text dark:text-dark-text">
                <Star className="h-5 w-5 text-yellow-500 dark:text-yellow-300" /> 
                <span className="font-semibold">Validation & Notes</span>
              </div>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                After restart, verify scheduled refreshes and live connections. If sign‑in fails or the service won't start, check Event Viewer and outbound connectivity to Power BI endpoints.
              </p>
            </div>

        {/* Additional Section: Context, Objective */}
        <div className="mt-16 grid gap-6 md:grid-cols-2" data-aos="fade-up">
          {/* Context */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-light-accent dark:text-dark-accent mb-3">Context</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-3">
              Teams observed refresh failures and connectivity issues for reports routed through the on‑premises data gateway. Ops required a minimal‑risk restart path to restore connectivity.
            </p>
          </div>

          {/* Objective */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-light-accent-secondary dark:text-dark-accent-secondary mb-3">Objective</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              Deliver a clear restart procedure covering the Gateway UI and a Windows Services fallback, including sign‑in and status verification.
            </p>
          </div>
        </div>

        {/* Approach Sections */}
        <div className="mt-8 space-y-6" data-aos="fade-up">
          {/* Approach A */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Approach A — Restart via Gateway UI</h3>
            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                <span>RDP to the Power BI Gateway server.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                <span>Open the <em>On-premises data gateway</em> app and continue if prompted.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                <span>Click <strong>Sign in</strong> and authenticate with your corporate Azure account.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                <span>Go to <strong>Service settings</strong> → <strong>Restart now</strong>.</span>
              </li>
            </ul>
          </div>

          {/* Approach B */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Approach B — Fallback via Windows Services</h3>
            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                <span>Open <strong>Services</strong> (services.msc).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                <span>Find <em>On-premises data gateway</em>, then <strong>Stop / Restart</strong> (or <strong>Start</strong> if stopped).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                <span>Confirm the service <strong>Status</strong> is <em>Running</em>.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

