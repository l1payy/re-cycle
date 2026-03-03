import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function getFallbackRankingData() {
  return {
    totalActions: 3275,
    topThree: [
      {
        name: "Kampus Hijau Nusantara",
        actions: 1240,
        waste: 1.8,
        trend: "Naik 2 peringkat"
      },
      {
        name: "Kota Laut Biru",
        actions: 980,
        waste: 1.2,
        trend: "Stabil di 3 besar"
      },
      {
        name: "Komunitas Bersemi",
        actions: 655,
        waste: 0.9,
        trend: "Pendatang baru"
      }
    ],
    chart: [
      { label: "Kampus Hijau", value: 1240 },
      { label: "Kota Laut Biru", value: 980 },
      { label: "Komunitas Bersemi", value: 655 },
      { label: "Desa Organik", value: 540 },
      { label: "Zona Bebas Plastik", value: 360 }
    ]
  };
}

function mapRankingPayload(payload) {
  if (!payload || !Array.isArray(payload.regions) || typeof payload.total_actions !== "number") {
    return getFallbackRankingData();
  }
  const sorted = [...payload.regions].sort((a, b) => {
    const ap = typeof a.rank_position === "number" ? a.rank_position : 99;
    const bp = typeof b.rank_position === "number" ? b.rank_position : 99;
    return ap - bp;
  });
  const topThree = sorted.slice(0, 3).map((item) => ({
    name: item.name,
    actions: Number(item.actions || 0),
    waste: Number(item.waste_tons || 0),
    trend: item.trend_label || ""
  }));
  const chart = sorted.map((item) => ({
    label: item.short_label || item.name,
    value: Number(item.actions || 0)
  }));
  const totalActions = sorted.reduce((sum, item) => sum + Number(item.actions || 0), 0);
  return {
    totalActions: totalActions || payload.total_actions,
    topThree,
    chart: chart.length ? chart : getFallbackRankingData().chart
  };
}

function RankingSection() {
  const [rankingData, setRankingData] = useState(getFallbackRankingData());

  useEffect(() => {
    fetch("/api/eco-ranking")
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((payload) => {
        if (!payload) {
          return;
        }
        setRankingData(mapRankingPayload(payload));
      })
      .catch(() => {});
  }, []);

  const maxValue = useMemo(
    () => Math.max(...rankingData.chart.map((item) => item.value)),
    [rankingData.chart]
  );

  return (
    <section id="ranking" className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <div className="space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Eco Contribution Ranking
          </p>
          <h2 className="font-display text-2xl text-slate-900 dark:text-slate-50 md:text-3xl">
            Daerah Paling Aktif Menjaga Lingkungan
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 md:text-base max-w-xl">
            Ranking ini menampilkan bagaimana komunitas, kampus, dan kota berkontribusi mengelola sampah secara kolektif
            melalui Re-Cycle.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            {rankingData.topThree.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-slate-100 to-white p-[1px] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="relative flex items-center gap-4 rounded-3xl bg-white/80 px-4 py-3 shadow-card transition-transform duration-150 hover:-translate-y-1 dark:bg-slate-950/80">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-300 to-orange-500"
                        : index === 1
                        ? "bg-gradient-to-br from-slate-200 to-slate-500"
                        : "bg-gradient-to-br from-amber-200 to-amber-500"
                    }`}
                  >
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.name}</p>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-700 dark:text-emerald-200">
                        {item.trend}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                      <span>{item.actions.toLocaleString("id-ID")} aksi tercatat</span>
                      <span>{item.waste.toFixed(1)} ton sampah dikelola</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-slate-300 bg-white/80 p-5 shadow-card dark:border-slate-800 dark:bg-slate-900/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="mb-4 flex items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display text-lg text-slate-900 dark:text-slate-50">Kontribusi Kolektif</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Bar chart ini mensimulasikan jumlah aksi yang tercatat di setiap daerah.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                  Total aksi tercatat
                </p>
                <p className="text-xl font-semibold text-emerald-800 dark:text-emerald-100">
                  {rankingData.totalActions.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {rankingData.chart.map((item, idx) => {
                const ratio = item.value / maxValue;
                return (
                  <motion.div
                    key={item.label}
                    className="relative h-10 overflow-visible"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.45 }}
                  >
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-300">
                      <span>{item.label}</span>
                      <span>{item.value.toLocaleString("id-ID")} aksi</span>
                    </div>
                    <div className="relative h-7 w-full origin-bottom">
                      <div className="absolute inset-0 translate-y-3 rounded-xl bg-slate-900" />
                      <motion.div
                        className="absolute inset-y-0 left-0 origin-left rounded-xl bg-gradient-to-r from-ocean via-sky-400 to-emerald-300"
                        style={{
                          width: `${ratio * 100}%`
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                      <div className="absolute inset-y-0 left-0 w-full rounded-xl bg-gradient-to-b from-white/25 via-transparent to-transparent mix-blend-overlay" />
                      <div className="absolute inset-y-0 left-0 w-full origin-bottom -skew-x-[18deg] scale-y-75 bg-slate-900/60 opacity-70" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default RankingSection;
