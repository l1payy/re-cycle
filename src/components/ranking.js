// Ranking Section & Leaderboard
const fallbackRankingData = {
  totalActions: 3275,
  topThree: [
    { name: "Kampus Hijau Nusantara", actions: 1240, waste: 1.8, trend: "Naik 2 peringkat" },
    { name: "Kota Laut Biru", actions: 980, waste: 1.2, trend: "Stabil di 3 besar" },
    { name: "Komunitas Bersemi", actions: 655, waste: 0.9, trend: "Pendatang baru" }
  ],
  chart: [
    { label: "Kampus Hijau", value: 1240 },
    { label: "Kota Laut Biru", value: 980 },
    { label: "Komunitas Bersemi", value: 655 },
    { label: "Desa Organik", value: 540 },
    { label: "Zona Bebas Plastik", value: 360 }
  ],
  leaderboard: Array.from({ length: 20 }).map((_, i) => {
    const names = [
      "Jakarta Selatan, DKI", "Surabaya, Jatim", "Bandung, Jabar", "Medan, Sumut",
      "Denpasar, Bali", "Makassar, Sulsel", "Semarang, Jateng", "Balikpapan, Kaltim",
      "Yogyakarta, DIY", "Malang, Jatim", "Bogor, Jabar", "Padang, Sumbar",
      "Banjarmasin, Kalsel", "Manado, Sulut", "Pontianak, Kalbar", "Palembang, Sumsel",
      "Pekanbaru, Riau", "Samarinda, Kaltim", "Mataram, NTB", "Ambon, Maluku"
    ];
    return {
      rank: i + 1,
      name: names[i] || `Daerah ${i + 1}`,
      points: Math.floor(12500 - (i * 450) - (Math.random() * 200)),
      lastAction: ["5 menit lalu", "30 menit lalu", "1 jam lalu", "Hari ini", "Kemarin"][Math.floor(Math.random() * 5)]
    };
  })
};

function renderRanking(data, observer) {
  const listContainer = document.getElementById('ranking-list');
  const chartContainer = document.getElementById('ranking-chart');
  const totalLabel = document.getElementById('total-actions-label');

  if (totalLabel) totalLabel.textContent = data.totalActions.toLocaleString("id-ID");

  if (listContainer) {
    listContainer.innerHTML = '';
    data.topThree.forEach((item, index) => {
      const medals = ["🥇", "🥈", "🥉"];
      const colors = [
        "from-yellow-300 to-orange-500",
        "from-slate-200 to-slate-500",
        "from-amber-200 to-amber-500"
      ];
      const html = `
        <div class="animate-on-scroll fade-up relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-slate-100 to-white p-[1px] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950" style="transition-delay: ${index * 80 + 100}ms">
          <div class="relative flex items-center gap-4 rounded-3xl bg-white/80 px-4 py-3 shadow-card transition-transform duration-150 hover:-translate-y-1 dark:bg-slate-950/80">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl text-xl bg-gradient-to-br ${colors[index]}">
              ${medals[index]}
            </div>
            <div class="flex-1 space-y-1">
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">${item.name}</p>
                <span class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-700 dark:text-emerald-200">
                  ${item.trend}
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                <span>${item.actions.toLocaleString("id-ID")} aksi tercatat</span>
                <span>${item.waste.toFixed(1)} ton sampah dikelola</span>
              </div>
            </div>
          </div>
        </div>
      `;
      listContainer.innerHTML += html;
    });
  }

  if (chartContainer) {
    const maxValue = Math.max(...data.chart.map(i => i.value));
    chartContainer.innerHTML = '';
    data.chart.forEach((item, idx) => {
      const ratio = item.value / maxValue;
      const html = `
        <div class="animate-on-scroll fade-up fill-container relative mb-5" style="transition-delay: ${150 + idx * 60}ms" data-ratio="${ratio}">
          <div class="flex items-end justify-between mb-2">
            <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">${item.label}</span>
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">${item.value.toLocaleString("id-ID")} <span class="font-normal text-slate-500 dark:text-slate-400">aksi</span></span>
          </div>
          <div class="relative h-3 w-full rounded-full bg-slate-100 shadow-inner dark:bg-slate-800 overflow-hidden">
            <div class="fill-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-ocean" style="transform: scaleX(0); transform-origin: left; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: ${200 + idx * 60}ms;">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 animate-shimmer"></div>
            </div>
          </div>
        </div>
      `;
      chartContainer.innerHTML += html;
    });
  }

  const leaderboardTbody = document.getElementById('leaderboard-table');
  if (leaderboardTbody && data.leaderboard) {
    let tbodyHtml = '';
    data.leaderboard.forEach((item) => {
      tbodyHtml += `
        <tr class="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
          <td class="px-5 py-4 font-medium text-slate-900 dark:text-slate-200">
            ${item.rank <= 3 ? `
              <div class="inline-flex h-7 w-7 items-center justify-center rounded-full font-bold shadow-sm ${
                item.rank === 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                item.rank === 2 ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400'
              }">
                ${item.rank}
              </div>
            ` : `<span class="pl-2 font-semibold text-slate-500 dark:text-slate-400">${item.rank}</span>`}
          </td>
          <td class="px-5 py-4 font-semibold text-emerald-700 dark:text-emerald-400">${item.name}</td>
          <td class="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">${item.points.toLocaleString('id-ID')}</td>
          <td class="px-5 py-4 text-xs font-medium text-slate-500 dark:text-slate-500">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> ${item.lastAction}
            </span>
          </td>
        </tr>
      `;
    });
    leaderboardTbody.innerHTML = tbodyHtml;
  }

  // Re-observe elements yang baru di-inject
  setTimeout(() => {
    document.querySelectorAll('#ranking .animate-on-scroll').forEach(el => observer.observe(el));

    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.fill-container');
          bars.forEach(bar => {
            const ratio = parseFloat(bar.dataset.ratio);
            const fill = bar.querySelector('.fill-bar');
            if (fill) fill.style.transform = `scaleX(${ratio})`;
          });
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (chartContainer) chartObserver.observe(chartContainer);
  }, 100);
}

export function initRanking(observer) {
  fetch("/api/eco-ranking")
    .then(res => {
      if (!res.ok) throw new Error("No API");
      return res.json();
    })
    .then(() => {
      renderRanking(fallbackRankingData, observer);
    })
    .catch(() => renderRanking(fallbackRankingData, observer));
}
