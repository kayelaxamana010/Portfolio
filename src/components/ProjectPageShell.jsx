import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

export const badgeToneClasses = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
  blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300",
  amber: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
  purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300",
  pink: "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-500/30 dark:bg-pink-500/10 dark:text-pink-300",
};

export const metricAccentClasses = {
  blue: "from-blue-500 to-indigo-500",
  pink: "from-pink-500 to-rose-500",
  purple: "from-purple-500 to-violet-500",
  amber: "from-amber-500 to-orange-500",
  indigo: "from-indigo-500 to-blue-500",
  green: "from-emerald-500 to-teal-500",
};

export default function ProjectPageShell({
  breadcrumbTitle,
  eyebrow,
  title,
  titleHighlight,
  description,
  badges = [],
  children,
}) {
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
          <span className="font-medium text-light-text dark:text-dark-text">{breadcrumbTitle}</span>
        </div>

        <div data-aos="fade-right">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-light-accent dark:text-dark-accent mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-light-text dark:text-dark-text font-poppins">
            {title}{" "}
            {titleHighlight ? (
              <span className="bg-gradient-to-r from-light-accent via-light-accent-secondary to-pink-500 dark:from-dark-accent dark:via-dark-accent-secondary dark:to-pink-400 bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            ) : null}
          </h1>
          <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-light-accent via-light-accent-secondary to-pink-500 dark:from-dark-accent dark:via-dark-accent-secondary dark:to-pink-400" />
          <p className="mt-5 max-w-3xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {description}
          </p>
          {badges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border ${badgeToneClasses[badge.tone]}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
