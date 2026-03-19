import * as THREE from 'three';

// 1. Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
// Default to dark mode logic based on previous React app
let isDark = true;
const updateTheme = () => {
  if (isDark) {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = 'Light';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.textContent = 'Dark';
  }
};
updateTheme();

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  updateTheme();
});

// 2. Scroll Animation Setup (replaces Framer Motion)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// 3. Impact Section Tabs
const tabContent = {
  laut: {
    img: "/img/laut.png",
    text: "Sampah yang dibuang ke sungai dan laut dapat merusak ekosistem perairan serta membahayakan kehidupan makhluk hidup di dalamnya. Plastik yang sulit terurai sering dimakan oleh ikan, penyu, dan hewan laut lainnya sehingga menyebabkan kematian. Selain itu, pencemaran laut juga mengganggu keseimbangan ekosistem dan dapat berdampak pada manusia melalui makanan laut yang telah terkontaminasi. Jika tidak dikendalikan, sampah di laut akan terus menumpuk dan merusak keindahan serta kelestarian alam."
  },
  tanah: {
    img: "/img/tanah.png",
    text: "Sampah yang dibuang sembarangan di tanah dapat menyebabkan pencemaran lingkungan dan menurunkan kualitas tanah. Sampah plastik dan bahan kimia berbahaya sulit terurai sehingga merusak kesuburan tanah dan mengganggu pertumbuhan tanaman. Selain itu, tumpukan sampah juga dapat menjadi sumber penyakit karena menjadi tempat berkembangnya bakteri dan serangga. Jika kondisi ini terus terjadi, lingkungan akan menjadi kotor, tidak sehat, dan berbahaya bagi kehidupan manusia maupun hewan."
  },
  udara: {
    img: "/img/udara.png",
    text: "Pembakaran sampah secara sembarangan dapat menghasilkan asap beracun yang mencemari udara dan membahayakan kesehatan. Gas yang dihasilkan dari pembakaran sampah, terutama plastik, dapat menyebabkan gangguan pernapasan, iritasi mata, dan penyakit paru-paru. Selain itu, bau tidak sedap dari tumpukan sampah juga membuat lingkungan menjadi tidak nyaman. Udara yang tercemar dalam jangka panjang dapat berdampak buruk bagi kesehatan manusia dan merusak keseimbangan alam."
  },
  lingkungan: {
    img: "/img/lingkungan.png",
    text: "Sampah yang tidak dikelola dengan baik dapat merusak keseimbangan lingkungan dan menimbulkan berbagai masalah bagi kehidupan. Lingkungan yang kotor dapat menyebabkan banjir, pencemaran air, serta meningkatnya penyebaran penyakit. Selain itu, keindahan alam akan berkurang dan kualitas hidup manusia juga menurun. Oleh karena itu, menjaga kebersihan dan mengelola sampah dengan benar merupakan tanggung jawab bersama agar lingkungan tetap sehat, nyaman, dan lestari untuk generasi sekarang maupun yang akan datang."
  }
};

const impactTabs = document.querySelectorAll('.impact-tab');
const impactImage = document.getElementById('impact-image');
const impactText = document.getElementById('impact-text');

function updateImpactTab(key) {
  // Animate image out (fade out and scale slightly up)
  impactImage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  impactImage.style.opacity = '0';
  impactImage.style.transform = 'scale(1.05)';

  // Animate text out (fade out and slide down)
  impactText.style.transition = 'all 0.3s ease-out';
  impactText.style.opacity = '0';
  impactText.style.transform = 'translateY(10px)';

  setTimeout(() => {
    // Set immediate "before-in" states
    impactImage.style.transition = 'none';
    impactImage.src = tabContent[key].img;
    impactImage.style.transform = 'scale(0.95)';

    impactText.style.transition = 'none';
    impactText.textContent = tabContent[key].text;
    impactText.style.transform = 'translateY(-10px)';

    // Trigger explicit reflow to apply transformations immediately before restoring transitions
    void impactImage.offsetWidth;
    void impactText.offsetWidth;

    // Animate image and text in (restoring normal scales and positions)
    impactImage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    impactImage.style.opacity = '1';
    impactImage.style.transform = 'scale(1)';

    impactText.style.transition = 'all 0.3s ease-out';
    impactText.style.opacity = '1';
    impactText.style.transform = 'translateY(0)';
  }, 300);

  // Update styles for buttons
  impactTabs.forEach(btn => {
    const btnKey = btn.dataset.impact;
    if (btnKey === key) {
      btn.className = "impact-tab rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 bg-emerald-400 text-slate-950 shadow-card";
    } else {
      btn.className = "impact-tab rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 border border-slate-300 bg-white/70 text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100";
    }
  });
}

impactTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    updateImpactTab(btn.dataset.impact);
  });
});

// 4. Three.js Ocean Waves
const container = document.getElementById('impact-canvas-container');
if (container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / 384, 0.1, 100);
  camera.position.set(0, 2.4, 5.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  const rect = container.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xe0f2fe, 0.9);
  dirLight1.position.set(3, 4, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x020617, 0.4);
  dirLight2.position.set(-2, 3, -4);
  scene.add(dirLight2);

  const uniforms = {
    uTime: { value: 0 },
    uAmplitude: { value: 0.16 },
    uFrequency: { value: 2.4 },
    uSpeed: { value: 0.8 },
    uDeepColor: { value: new THREE.Color("#020617") },
    uSurfaceColor: { value: new THREE.Color("#38bdf8") }
  };

  const vertexShader = `
    uniform float uTime;
    uniform float uAmplitude;
    uniform float uFrequency;
    uniform float uSpeed;
    varying float vWaveStrength;
    void main() {
      vec3 pos = position;
      float waveX = sin(pos.x * uFrequency + uTime * uSpeed);
      float waveY = cos(pos.y * uFrequency * 1.3 + uTime * (uSpeed * 1.2));
      float height = (waveX + waveY) * 0.5 * uAmplitude;
      pos.z += height;
      vWaveStrength = height;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uDeepColor;
    uniform vec3 uSurfaceColor;
    varying float vWaveStrength;
    void main() {
      float strength = vWaveStrength * 8.0 + 0.5;
      strength = clamp(strength, 0.0, 1.0);
      vec3 color = mix(uDeepColor, uSurfaceColor, strength);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const geometry = new THREE.PlaneGeometry(6.2, 3.4, 160, 80);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -0.9;
  mesh.position.y = -0.9;
  scene.add(mesh);

  const clock = new THREE.Clock();
  function animateThree() {
    requestAnimationFrame(animateThree);
    uniforms.uTime.value += clock.getDelta();
    
    // Check if container was resized
    if (container) {
        const currentRect = container.getBoundingClientRect();
        if (currentRect.width !== renderer.domElement.clientWidth || currentRect.height !== renderer.domElement.clientHeight) {
            renderer.setSize(currentRect.width, currentRect.height, false);
            camera.aspect = currentRect.width / currentRect.height;
            camera.updateProjectionMatrix();
        }
    }
    
    renderer.render(scene, camera);
  }
  animateThree();

  window.addEventListener('resize', () => {
    if (container) {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }
  });
}

// 5. Ranking Section
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
  leaderboard: Array.from({length: 20}).map((_, i) => {
    const names = [
      "Jakarta Selatan, DKI", "Surabaya, Jatim", "Bandung, Jabar", "Medan, Sumut", 
      "Denpasar, Bali", "Makassar, Sulsel", "Semarang, Jateng", "Balikpapan, Kaltim",
      "Yogyakarta, DIY", "Malang, Jatim", "Bogor, Jabar", "Padang, Sumbar",
      "Banjarmasin, Kalsel", "Manado, Sulut", "Pontianak, Kalbar", "Palembang, Sumsel",
      "Pekanbaru, Riau", "Samarinda, Kaltim", "Mataram, NTB", "Ambon, Maluku"
    ];
    return {
      rank: i + 1,
      name: names[i] || `Daerah ${i+1}`,
      points: Math.floor(12500 - (i * 450) - (Math.random() * 200)),
      lastAction: ["5 menit lalu", "30 menit lalu", "1 jam lalu", "Hari ini", "Kemarin"][Math.floor(Math.random() * 5)]
    };
  })
};

function renderRanking(data) {
  const listContainer = document.getElementById('ranking-list');
  const chartContainer = document.getElementById('ranking-chart');
  const totalLabel = document.getElementById('total-actions-label');
  
  if(totalLabel) totalLabel.textContent = data.totalActions.toLocaleString("id-ID");
  
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
    data.leaderboard.forEach((item, idx) => {
      // Adding animated delay classes for a neat cascading effect
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

  // Re-observe injected elements for animation
  setTimeout(() => {
    document.querySelectorAll('#ranking .animate-on-scroll').forEach(el => observer.observe(el));
    
    // For manual bar width fill that IntersectionObserver can trigger:
    // We add another observer just for chart container
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
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
    if(chartContainer) chartObserver.observe(chartContainer);
  }, 100);
}

// Fetch Ranking Data (Using fallback immediately if no API)
fetch("/api/eco-ranking")
  .then(res => {
    if (!res.ok) throw new Error("No API");
    return res.json();
  })
  .then(payload => {
    renderRanking(fallbackRankingData); // Use fallback for demonstration
  })
  .catch(() => renderRanking(fallbackRankingData));

// 6. Map Section
const mapLocations = [
  // Jawa & Bali
  { id: "jkt01", name: "Bank Sampah Hijau Nusantara (Jakarta)", type: ["plastik", "organik"], distance: "? km", lat: -6.2005, lng: 106.8169 },
  { id: "bdg01", name: "Bank Sampah Pasundan (Bandung)", type: ["kertas", "plastik"], distance: "? km", lat: -6.9175, lng: 107.6191 },
  { id: "smg01", name: "Bank Sampah Lawang Sewu (Semarang)", type: ["elektronik", "logam"], distance: "? km", lat: -6.9932, lng: 110.4203 },
  { id: "srb01", name: "Bank Sampah Pahlawan (Surabaya)", type: ["organik", "plastik"], distance: "? km", lat: -7.2504, lng: 112.7688 },
  { id: "dps01", name: "Bank Sampah Dewata (Denpasar)", type: ["kertas", "plastik"], distance: "? km", lat: -8.6705, lng: 115.2126 },
  
  // Sumatra
  { id: "ach01", name: "Bank Sampah Serambi Mekkah (Banda Aceh)", type: ["plastik"], distance: "? km", lat: 5.5483, lng: 95.3238 },
  { id: "mdn01", name: "Bank Sampah Mutiara Deli (Medan)", type: ["plastik", "kertas"], distance: "? km", lat: 3.5952, lng: 98.6722 },
  { id: "pdg01", name: "Bank Sampah Minang Lestari (Padang)", type: ["organik"], distance: "? km", lat: -0.9471, lng: 100.3697 },
  { id: "plb01", name: "Bank Sampah Musi Bersih (Palembang)", type: ["elektronik"], distance: "? km", lat: -2.9909, lng: 104.7566 },
  
  // Kalimantan
  { id: "ptk01", name: "Bank Sampah Khatulistiwa (Pontianak)", type: ["kertas", "plastik"], distance: "? km", lat: -0.0227, lng: 109.3333 },
  { id: "bjm01", name: "Bank Sampah Seribu Sungai (Banjarmasin)", type: ["plastik", "organik"], distance: "? km", lat: -3.3167, lng: 114.5900 },
  { id: "bkp01", name: "Bank Sampah Etam (Balikpapan)", type: ["logam", "elektronik"], distance: "? km", lat: -1.2654, lng: 116.8312 },
  
  // Sulawesi & Nusa Tenggara
  { id: "mks01", name: "Bank Sampah Losari (Makassar)", type: ["plastik", "kertas"], distance: "? km", lat: -5.1477, lng: 119.4327 },
  { id: "mnd01", name: "Bank Sampah Nyiur Melambai (Manado)", type: ["plastik", "elektronik"], distance: "? km", lat: 1.4822, lng: 124.8489 },
  { id: "mtr01", name: "Bank Sampah Rinjani (Mataram)", type: ["organik", "kertas"], distance: "? km", lat: -8.5833, lng: 116.1167 },
  { id: "kpg01", name: "Bank Sampah Flobamora (Kupang)", type: ["plastik"], distance: "? km", lat: -8.5986, lng: 123.6339 },

  // Maluku & Papua
  { id: "amb01", name: "Bank Sampah Manise (Ambon)", type: ["plastik", "organik"], distance: "? km", lat: -3.6954, lng: 128.1814 },
  { id: "jyp01", name: "Bank Sampah Cendrawasih (Jayapura)", type: ["kertas", "plastik"], distance: "? km", lat: -2.5337, lng: 140.7181 },
  { id: "srq01", name: "Bank Sampah Raja Ampat (Sorong)", type: ["logam"], distance: "? km", lat: -0.8762, lng: 131.2559 }
];

let mapInstance;
const markers = {};

function initMap(locations) {
  if (typeof L === 'undefined') return;
  const container = document.getElementById('leaflet-map-container');
  if (!container || mapInstance) return;

  mapInstance = L.map(container, {
    zoomControl: false
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: ""
  }).addTo(mapInstance);

  const icon = L.divIcon({
    className: "",
    html: '<div style="width:22px;height:22px;border-radius:999px;background:linear-gradient(135deg,#95d5b2,#4dabf7);box-shadow:0 0 0 4px rgba(15,23,42,0.8);"></div>',
    iconSize: [22, 22]
  });

  const bounds = [];
  locations.forEach(item => {
    const marker = L.marker([item.lat, item.lng], { icon }).addTo(mapInstance);
    marker.bindPopup(`<strong>${item.name}</strong><br>${item.distance}`);
    markers[item.id] = marker;
    bounds.push([item.lat, item.lng]);
  });
  
  if (bounds.length > 0) {
    mapInstance.fitBounds(bounds, { padding: [40, 40] });
  }

  let userMarker = null;

  const locateUser = () => {
    const btnLocate = document.getElementById('btn-locate');
    if (btnLocate) btnLocate.innerHTML = 'Mendeteksi...';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        if (userMarker) {
          mapInstance.removeLayer(userMarker);
        }

        const userIcon = L.divIcon({
          className: "",
          html: '<div style="width:16px;height:16px;border-radius:999px;background:#3b82f6;box-shadow:0 0 0 4px rgba(59,130,246,0.3); border: 2px solid white;"></div>',
          iconSize: [16, 16]
        });

        userMarker = L.marker([userLat, userLng], { icon: userIcon, zIndexOffset: 1000 }).addTo(mapInstance);
        userMarker.bindPopup("<strong>Lokasi Kamu</strong>").openPopup();
        
        const userLatLng = L.latLng(userLat, userLng);
        const mappedWithDistance = locations.map(loc => {
          const distMeters = userLatLng.distanceTo(L.latLng(loc.lat, loc.lng));
          return {
             ...loc,
             rawDist: distMeters,
             distance: distMeters > 1000 ? (distMeters / 1000).toFixed(1) + ' km' : Math.round(distMeters) + ' m'
          };
        }).sort((a,b) => a.rawDist - b.rawDist);

        const closest = mappedWithDistance.slice(0, 3);
        renderMapList(closest);

        const fitBoundsTop3 = closest.map(loc => [loc.lat, loc.lng]);
        fitBoundsTop3.push([userLat, userLng]);
        mapInstance.fitBounds(fitBoundsTop3, { padding: [50, 50], animate: true, duration: 1.5 });

        if (btnLocate) btnLocate.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg> Lokasi Ditemukan';
      }, (error) => {
        console.warn("Geolocation Error:", error);
        if (btnLocate) btnLocate.innerHTML = 'Gagal Deteksi Lokasi';
        renderMapList(locations.slice(0, 3)); // Fallback
      }, { timeout: 10000 });
    } else {
      if (btnLocate) btnLocate.innerHTML = 'Browser Tidak Mendukung';
      renderMapList(locations.slice(0, 3)); // Fallback
    }
  };

  const btnLocate = document.getElementById('btn-locate');
  if (btnLocate) {
    btnLocate.addEventListener('click', locateUser);
  }

  // Attempt automatic detection
  locateUser();
}

function renderMapList(locations) {
  const container = document.getElementById('map-locations-list');
  if(!container) return;
  
  container.innerHTML = '';
  locations.forEach((item, index) => {
    const html = `
      <button data-id="${item.id}" type="button" class="animate-on-scroll fade-up flex w-full items-center justify-between rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-left text-sm text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 hover:border-emerald-400/70 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100" style="transition-delay: ${100 + index * 100}ms">
        <div>
          <p class="font-semibold">${item.name}</p>
          <p class="text-xs text-slate-700 dark:text-slate-300">Jenis: ${item.type.join(", ")} • ${item.distance}</p>
        </div>
        <span class="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">Lihat di peta</span>
      </button>
    `;
    container.innerHTML += html;
  });

  container.querySelectorAll('button').forEach(btn => {
    observer.observe(btn);
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (mapInstance && markers[id]) {
        mapInstance.setView(markers[id].getLatLng(), 15, { animate: true, duration: 0.6 });
        markers[id].openPopup();
      }
    });
  });
}

// Ensure Leaflet is loaded since it's an async script
if (typeof L !== 'undefined') {
  initMap(mapLocations);
} else {
  const checkL = setInterval(() => {
    if (typeof L !== 'undefined') {
      clearInterval(checkL);
      initMap(mapLocations);
    }
  }, 100);
}

// 7. Floating Action Buttons
const btnBackToTop = document.getElementById('btn-back-to-top');

if (btnBackToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnBackToTop.style.pointerEvents = 'auto';
      btnBackToTop.classList.remove('opacity-0', 'translate-y-10');
      btnBackToTop.classList.add('opacity-100', 'translate-y-0');
    } else {
      btnBackToTop.style.pointerEvents = 'none';
      btnBackToTop.classList.remove('opacity-100', 'translate-y-0');
      btnBackToTop.classList.add('opacity-0', 'translate-y-10');
    }
  });

  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 8. Agent Chat Logic */
const chatPanel = document.getElementById('chat-panel');
const btnAgentChat = document.getElementById('btn-agent-chat');
const btnCloseChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const chatOptionsContainer = document.getElementById('chat-options');

const chatBadge = btnAgentChat?.querySelector('span');

const qsAndAs = [
  { q: "Apa itu Re-Cycle?", a: "Re-Cycle adalah platform digital interaktif yang membantu masyarakat melacak, menemukan bank sampah teredekat, dan melihat peringkat kontribusi mereka dalam pengelolaan sampah terpadu." },
  { q: "Cara setor sampah?", a: "Pilih menu 'Bank Sampah' atau gunakan peta interaktif kami untuk menemukan bank sampah terdekat, lalu bawa sampah terpilah Anda ke sana." },
  { q: "Berapa lama poin masuk?", a: "Setelah Anda menyetor ke Bank Sampah resmi, poin dan riwayat pengelolaan Anda akan terupdate otomatis dalam waktu 1x24 jam." },
  { q: "Apa itu Eco Ranking?", a: "Eco Ranking adalah leaderboard yang menampilkan daerah, kampus, atau komunitas mana yang memiliki kontribusi pengelolaan sampah terbaik." },
  { q: "Jenis sampah apa saja?", a: "Kami menerima sampah organik, plastik, kertas, logam, dan elektronik, menyesuaikan dengan kebijakan masing-masing fasilitas Bank Sampah." },
  { q: "Butuh Bantuan Lain", a: "Anda bisa menghubungi tim Customer Service kami melalui email support@re-cycle.id atau WhatsApp di 0812-3456-7890." }
];

let isChatOpen = false;

function toggleChat() {
  isChatOpen = !isChatOpen;
  if(isChatOpen) {
    if (chatBadge) chatBadge.style.display = 'none';
    chatPanel.classList.remove('opacity-0', 'translate-y-8', 'scale-95', 'pointer-events-none');
    chatPanel.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
  } else {
    chatPanel.classList.remove('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
    chatPanel.classList.add('opacity-0', 'translate-y-8', 'scale-95', 'pointer-events-none');
  }
}

if (btnAgentChat && btnCloseChat) {
  btnAgentChat.addEventListener('click', toggleChat);
  btnCloseChat.addEventListener('click', toggleChat);
}

function appendUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = "flex w-full justify-end mb-2";
  msg.innerHTML = `
    <div class="rounded-2xl rounded-tr-sm bg-emerald-500 px-3 py-2 text-white shadow-sm max-w-[85%] break-words">
      ${text}
    </div>
  `;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMessage(text) {
  const msg = document.createElement('div');
  msg.className = "flex gap-2 w-5/6 mb-2 mt-1";
  msg.innerHTML = `
    <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mt-0.5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Z"/></svg>
    </div>
    <div class="rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-200 max-w-[85%] break-words shadow-sm leading-relaxed">
      ${text}
    </div>
  `;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function initChatOptions() {
  if (!chatOptionsContainer) return;

  // Add drag-to-scroll functionality for desktop mice
  let isDown = false;
  let isDragging = false;
  let startX;
  let scrollLeft;

  chatOptionsContainer.style.cursor = 'grab';

  chatOptionsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    chatOptionsContainer.style.cursor = 'grabbing';
    startX = e.pageX - chatOptionsContainer.offsetLeft;
    scrollLeft = chatOptionsContainer.scrollLeft;
  });
  chatOptionsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    chatOptionsContainer.style.cursor = 'grab';
  });
  chatOptionsContainer.addEventListener('mouseup', () => {
    isDown = false;
    chatOptionsContainer.style.cursor = 'grab';
  });
  chatOptionsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - chatOptionsContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (Math.abs(walk) > 2) isDragging = true;
    if (isDragging) {
      e.preventDefault();
      chatOptionsContainer.scrollLeft = scrollLeft - walk;
    }
  });

  chatOptionsContainer.innerHTML = '';
  qsAndAs.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = "shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:bg-slate-700/50 shadow-sm";
    btn.textContent = item.q;
    
    // Use capture logic or click handler to prevent firing if dragged
    btn.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // Once clicked, slightly fade it out or leave it
      appendUserMessage(item.q);
      
      const typingId = 'typing-' + Date.now();
      const typingIndicator = document.createElement('div');
      typingIndicator.id = typingId;
      typingIndicator.className = "flex gap-2 w-5/6 mb-2 mt-1";
      typingIndicator.innerHTML = `
        <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mt-0.5">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Z"/></svg>
        </div>
        <div class="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 dark:bg-slate-800 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400/70 animate-bounce"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400/70 animate-bounce" style="animation-delay: 0.15s"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400/70 animate-bounce" style="animation-delay: 0.3s"></span>
        </div>
      `;
      chatBody.appendChild(typingIndicator);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        const el = document.getElementById(typingId);
        if(el) el.remove();
        appendBotMessage(item.a);
      }, Math.random() * 500 + 600); // 600-1100ms delay realistically
    });
    chatOptionsContainer.appendChild(btn);
  });
}
initChatOptions();

// 9. Hero Parallax Effect
const heroEarth = document.getElementById('hero-earth');
const heroParticles = document.getElementById('hero-particles');
const heroText = document.getElementById('hero-text');

if (heroEarth || heroParticles || heroText) {
  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  const parallaxLoop = () => {
    // Only process if we are reasonably close to top to save CPU
    if (targetScrollY < 1200) {
      // Linear Interpolation (Lerp) for butter-smooth scrolling effect
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;

      // Update transforms if there's a meaningful change (delta > 0.1px)
      if (Math.abs(targetScrollY - currentScrollY) > 0.1) {
        if (heroEarth) {
          heroEarth.style.transform = `translateY(${currentScrollY * 0.15}px)`;
        }
        if (heroParticles) {
          heroParticles.style.transform = `translateY(${currentScrollY * 0.3}px)`;
        }
        if (heroText) {
          heroText.style.transform = `translateY(${currentScrollY * 0.05}px)`;
        }
      }
    }
    window.requestAnimationFrame(parallaxLoop);
  };

  // Start the render loop
  parallaxLoop();
}

// 10. Hero Typing Effect
const typeText1 = document.getElementById('type-text-1');
const typeText2 = document.getElementById('type-text-2');
const typeCursor = document.getElementById('type-cursor');

if (typeText1 && typeText2 && typeCursor) {
  const text1 = "Ubah Jejak Sampahmu Menjadi";
  const text2 = "Cerita Baik Bumi";
  
  let i = 0;
  let j = 0;
  let isTypingText1 = true;
  let blinkInterval;
  
  // Initially, put the cursor right after text 1
  if (typeText1.nextSibling) {
    typeText1.parentNode.insertBefore(typeCursor, typeText1.nextSibling);
  } else {
    typeText1.parentNode.appendChild(typeCursor);
  }

  function startBlinking() {
    // Only blink after typing finishes
    if (blinkInterval) clearInterval(blinkInterval);
    blinkInterval = setInterval(() => {
      typeCursor.style.opacity = typeCursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }

  function typeWriter() {
    if (isTypingText1) {
      if (i < text1.length) {
        typeText1.textContent += text1.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 30 + 40); // 40-70ms per char
      } else {
        isTypingText1 = false;
        
        // Pause briefly, then move cursor to line 2
        setTimeout(() => {
          if (typeText2.nextSibling) {
            typeText2.parentNode.insertBefore(typeCursor, typeText2.nextSibling);
          } else {
            typeText2.parentNode.appendChild(typeCursor);
          }
          setTimeout(typeWriter, 100);
        }, 400); // 400ms pause before starting the second line
      }
    } else {
      if (j < text2.length) {
        typeText2.textContent += text2.charAt(j);
        j++;
        setTimeout(typeWriter, Math.random() * 40 + 50); // Little bit slower for emphasis
      } else {
        // Typing completely finished -> blink the cursor
        startBlinking();
      }
    }
  }

  // Start typing after a short delay to sync with page load animation
  setTimeout(typeWriter, 500);
}

