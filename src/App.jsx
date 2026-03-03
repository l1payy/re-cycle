import { useEffect, useState } from "react";
import Hero3D from "./components/Hero3D.jsx";
import ImpactSection from "./components/ImpactSection.jsx";
import RankingSection from "./components/RankingSection.jsx";
import MapSection from "./components/MapSection.jsx";

function App() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/70 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-400 px-2.5 py-1 text-xs font-semibold text-slate-950">
              Re
            </span>
            <span className="font-display text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">Cycle</span>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-700 dark:text-slate-200 md:flex">
            <a href="#home" className="hover:text-emerald-600 dark:hover:text-emerald-200">
              Home
            </a>
            <a href="#impact" className="hover:text-emerald-600 dark:hover:text-emerald-200">
              Dampak
            </a>
            <a href="#ranking" className="hover:text-emerald-600 dark:hover:text-emerald-200">
              Eco Ranking
            </a>
            <a href="#map" className="hover:text-emerald-600 dark:hover:text-emerald-200">
              Bank Sampah
            </a>
          </nav>
          <a
            href="#ranking"
            className="hidden rounded-full bg-emerald-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-card transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Mulai Kontribusi
          </a>
          <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            className="ml-3 inline-flex rounded-full border border-slate-300 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </header>
      <main>
        <Hero3D />
        <ImpactSection />
        <RankingSection />
        <MapSection />
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-xs text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Re-Cycle. Digital Hub Penanganan Sampah Terpadu.</p>
          <p>Dirancang dengan fokus pada kreativitas, imersi, dan pengalaman pengguna.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
