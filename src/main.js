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
  // Animate image container
  impactImage.style.opacity = '0';
  setTimeout(() => {
    impactImage.src = tabContent[key].img;
    impactImage.style.opacity = '1';
  }, 200);

  impactText.textContent = tabContent[key].text;

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
  ]
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
        <div class="animate-on-scroll fade-up fill-container relative h-10 overflow-visible" style="transition-delay: ${150 + idx * 60}ms" data-ratio="${ratio}">
          <div class="mb-1 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <span>${item.label}</span>
            <span>${item.value.toLocaleString("id-ID")} aksi</span>
          </div>
          <div class="relative h-7 w-full origin-bottom">
            <div class="absolute inset-0 translate-y-3 rounded-xl bg-slate-900"></div>
            <div class="fill-bar absolute inset-y-0 left-0 origin-left rounded-xl bg-gradient-to-r from-emerald-300 via-sky-400 to-emerald-300" style="transform: scaleX(0); transition: transform 0.6s ease-out; transition-delay: ${200 + idx * 60}ms;"></div>
            <div class="absolute inset-y-0 left-0 w-full rounded-xl bg-gradient-to-b from-white/25 via-transparent to-transparent mix-blend-overlay"></div>
            <div class="absolute inset-y-0 left-0 w-full origin-bottom -skew-x-[18deg] scale-y-75 bg-slate-900/60 opacity-70"></div>
          </div>
        </div>
      `;
      chartContainer.innerHTML += html;
    });
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
  { id: "bs01", name: "Bank Sampah Hijau Kampus", type: ["plastik", "organik"], distance: "0.8 km", lat: -6.2005, lng: 106.8169 },
  { id: "bs02", name: "Bank Sampah Elektronik Nusantara", type: ["elektronik"], distance: "2.1 km", lat: -6.199, lng: 106.822 },
  { id: "bs03", name: "Bank Sampah Bersemi", type: ["plastik", "organik", "elektronik"], distance: "3.4 km", lat: -6.205, lng: 106.812 }
];

let mapInstance;
const markers = {};

function initMap(locations) {
  if (typeof L === 'undefined') return;
  const container = document.getElementById('leaflet-map-container');
  if (!container || mapInstance) return;

  mapInstance = L.map(container, {
    center: [-6.2, 106.816666],
    zoom: 13,
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

  locations.forEach(item => {
    const marker = L.marker([item.lat, item.lng], { icon }).addTo(mapInstance);
    marker.bindPopup(`<strong>${item.name}</strong><br>${item.distance}`);
    markers[item.id] = marker;
  });

  renderMapList(locations);
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
        <span class="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] text-emerald-200">Lihat di peta</span>
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
