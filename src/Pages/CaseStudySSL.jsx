import { Star, ArrowLeft, Code2, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { useEffect, useState } from "react";

/**
 * Case Study Detail Page: SSL Renewal for Power BI Report Server
 * Matches the main portfolio theme (light/dark mode aware)
 */

export default function CaseStudySSL() {
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
          <span className="font-medium text-light-text dark:text-dark-text">SSL Renewal (PBIRS)</span>
        </div>

        {/* Title Row */}
        <div className="grid gap-8 lg:grid-cols-1">
          {/* Main content */}
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-light-text dark:text-dark-text font-poppins">
              Mobile‑Safe SSL Renewal
            </h1>
            <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-light-accent via-light-accent-secondary to-pink-500 dark:from-dark-accent dark:via-dark-accent-secondary dark:to-pink-400" />

            <p className="mt-5 max-w-2xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              Replaced and deployed a new Entrust certificate across AWS ACM, Load Balancer, and Power BI Report Server. Ensured secure mobile access on corporate Wi‑Fi with clear verification and a documented rollback plan.
            </p>

            {/* Stats tiles */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Continuity", value: "Service maintained" },
                { label: "Validation", value: "Mobile verified" },
                { label: "Safety", value: "Rollback ready" },
              ].map((m, idx) => (
                <div
                  key={m.label}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg px-5 py-4 shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{m.label}</div>
                  <div className="text-lg font-semibold text-light-text dark:text-dark-text mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mt-10" data-aos="fade-up">
              <div className="flex items-center gap-2 text-sm font-semibold text-light-text dark:text-dark-text mb-4">
                <Code2 className="h-5 w-5" /> Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Venafi",
                  "Entrust",
                  "OpenSSL",
                  "AWS ACM",
                  "AWS Load Balancer",
                  "Windows Server",
                  "Power BI Report Server",
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

        {/* Key Features */}
        <div className="mt-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg" data-aos="fade-up">
              <div className="mb-4 flex items-center gap-2 text-light-text dark:text-dark-text">
                <Star className="h-5 w-5 text-yellow-500 dark:text-yellow-300" /> 
                <span className="font-semibold">Key Features</span>
              </div>
              <ul className="space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-light-accent dark:bg-dark-accent flex-shrink-0"></span>
                  <span>End‑to‑end renewal (Venafi → ACM → LB → PBIRS) with zero downtime.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-light-accent dark:bg-dark-accent flex-shrink-0"></span>
                  <span>Deterministic extraction of certificate, private key, and CA chain with OpenSSL.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-light-accent dark:bg-dark-accent flex-shrink-0"></span>
                  <span>Mobile validation on the corporate network and a clear rollback plan.</span>
                </li>
              </ul>
            </div>

        {/* Additional Section: Context, Objective, Approach */}
        <div className="mt-16 grid gap-6 md:grid-cols-3" data-aos="fade-up">
          {/* Context */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-light-accent dark:text-dark-accent mb-3">Context</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              The client's Power BI Report Server needed an SSL renewal so users could securely access reports from mobile devices on the corporate network.
            </p>
          </div>

          {/* Objective */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-light-accent-secondary dark:text-dark-accent-secondary mb-3">Objective</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              Renew and deploy the SSL certificate end to end (Venafi → AWS ACM → Load Balancer → PBIRS) while maintaining availability and validating mobile access.
            </p>
          </div>

          {/* Approach */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-3">Approach</h3>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              Requested Entrust certificate via Venafi; prepared OpenSSL artifacts (cert, key, CA chain). Re‑imported the certificate in AWS ACM and associated it with the Load Balancer.
            </p>
          </div>
        </div>

        {/* Validation & Rollback */}
        <div className="mt-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 shadow-soft dark:shadow-none backdrop-blur-lg" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">Validation & Rollback</h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
            Verified the certificate chain and HTTPS lock on mobile; defined rollback via ACM re‑import and PBIRS binding revert.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-light-bg-secondary dark:bg-black/20 p-4 border border-gray-200 dark:border-white/5">
              <h4 className="font-semibold text-light-text dark:text-dark-text mb-2 text-sm">Outcome</h4>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Updated SSL chain deployed across ACM, LB, and PBIRS, enabling secure mobile access with a documented rollback path.
              </p>
            </div>
            <div className="rounded-2xl bg-light-bg-secondary dark:bg-black/20 p-4 border border-gray-200 dark:border-white/5">
              <h4 className="font-semibold text-light-text dark:text-dark-text mb-2 text-sm">Impact</h4>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Zero downtime, verified mobile SSL trust, and clear rollback procedures for future renewals.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

