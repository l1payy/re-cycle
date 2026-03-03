import { motion } from "framer-motion";

function Hero3D() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-emerald-50 to-white pt-24 pb-16 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
    >
      <div className="mouse-light" id="mouse-light" />
      <div className="floating-particles">
        <span style={{ width: 80, height: 80, left: "10%", bottom: "-20%", animationDuration: "18s" }} />
        <span style={{ width: 120, height: 120, right: "8%", bottom: "-30%", animationDuration: "24s" }} />
        <span style={{ width: 60, height: 60, left: "45%", bottom: "-25%", animationDuration: "20s" }} />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center">
        <motion.div
          className="relative z-10 max-w-xl space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            Re-Cycle
            <span className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-300" />
            Digital Hub Lingkungan
          </motion.p>
          <motion.h1
            className="font-display text-3xl leading-tight text-slate-900 dark:text-slate-50 md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Ubah Jejak Sampahmu Menjadi
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-200 bg-clip-text text-transparent">
              {" "}
              Cerita Baik Bumi
            </span>
          </motion.h1>
          <motion.p
            className="text-sm text-slate-700 dark:text-slate-300 md:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            Re-Cycle mengubah data, story, dan aksimu menjadi gerakan kolektif pengelolaan sampah terintegrasi,
            lengkap dengan Eco Contribution Ranking dan peta bank sampah interaktif.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
          >
            <a
              href="#ranking"
              className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Mulai Kontribusi
            </a>
            <a
              href="#impact"
              className="rounded-full border border-slate-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-emerald-400/70 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100"
            >
              Lihat dampak sampah
            </a>
          </motion.div>
          <motion.div
            className="mt-4 flex flex-wrap gap-4 text-xs text-slate-700 dark:text-slate-300 md:text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
          >
            {/* <div className="rounded-2xl border border-slate-300 bg-white/80 px-3 py-2 dark:border-emerald-500/20 dark:bg-slate-900/60">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-200">Bank Sampah</p>
              <p className="text-base font-semibold text-emerald-800 dark:text-emerald-100">120+</p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/80 px-3 py-2 dark:border-sky-500/20 dark:bg-slate-900/60">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-700 dark:text-sky-200">Kota & Kampus</p>
              <p className="text-base font-semibold text-sky-800 dark:text-sky-100">36</p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/80 px-3 py-2 dark:border-emerald-500/20 dark:bg-slate-900/60">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-200">Ton Sampah Dikelola</p>
              <p className="text-base font-semibold text-emerald-800 dark:text-emerald-100">5.2</p>
            </div> */}
          </motion.div>
        </motion.div>
        <motion.div
          className="relative z-1 h-[450px] flex-1 lg:flex-[2.3] lg:min-w-[600px]"
          // initial={{ opacity: 0, y: 24 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-0 translate-y-4 bg-gradient-to-b from-emerald-300/20 via-sky-300/15 to-transparent blur-3xl dark:from-sky-500/40 dark:via-emerald-500/35 dark:to-slate-900" />
          <img
            src="/img/bumi.png"
            alt="Ilustrasi Bumi"
            width="800"
            height="800"
            className="relative z-10 mx-auto object-contain"
          />
          <div className="pointer-events-none absolute inset-0">
            <span className="absolute left-8 top-10 h-6 w-10 rotate-12 rounded-[12px] bg-gradient-to-br from-emerald-300 to-emerald-500 blur-sm" />
            <span className="absolute right-16 top-20 h-4 w-8 -rotate-12 rounded-[10px] bg-gradient-to-br from-green-300 to-emerald-400 blur-sm" />
            <span className="absolute left-1/3 bottom-10 h-3 w-3 rounded-full bg-emerald-300" />
            <span className="absolute right-1/4 bottom-6 h-3 w-3 rounded-full bg-sky-300" />
            <span className="absolute left-24 bottom-20 h-5 w-5 rounded-full bg-emerald-200" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero3D;
