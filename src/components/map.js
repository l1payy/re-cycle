// Map Section (Leaflet) & Bank Sampah Locations
const mapLocations = [
  // Jawa & Bali
  { id: "jkt01", name: "Bank Sampah Hijau Nusantara (Jakarta)", type: ["plastik", "organik"], distance: "? km", lat: -6.2005, lng: 106.8169, capacity: { total: 500, used: 320 } },
  { id: "bdg01", name: "Bank Sampah Pasundan (Bandung)", type: ["kertas", "plastik"], distance: "? km", lat: -6.9175, lng: 107.6191, capacity: { total: 300, used: 210 } },
  { id: "smg01", name: "Bank Sampah Lawang Sewu (Semarang)", type: ["elektronik", "logam"], distance: "? km", lat: -6.9932, lng: 110.4203, capacity: { total: 200, used: 80 } },
  { id: "srb01", name: "Bank Sampah Pahlawan (Surabaya)", type: ["organik", "plastik"], distance: "? km", lat: -7.2504, lng: 112.7688, capacity: { total: 400, used: 390 } },
  { id: "dps01", name: "Bank Sampah Dewata (Denpasar)", type: ["kertas", "plastik"], distance: "? km", lat: -8.6705, lng: 115.2126, capacity: { total: 250, used: 100 } },

  // Sumatra
  { id: "ach01", name: "Bank Sampah Serambi Mekkah (Banda Aceh)", type: ["plastik"], distance: "? km", lat: 5.5483, lng: 95.3238, capacity: { total: 150, used: 60 } },
  { id: "mdn01", name: "Bank Sampah Mutiara Deli (Medan)", type: ["plastik", "kertas"], distance: "? km", lat: 3.5952, lng: 98.6722, capacity: { total: 350, used: 280 } },
  { id: "pdg01", name: "Bank Sampah Minang Lestari (Padang)", type: ["organik"], distance: "? km", lat: -0.9471, lng: 100.3697, capacity: { total: 180, used: 45 } },
  { id: "plb01", name: "Bank Sampah Musi Bersih (Palembang)", type: ["elektronik"], distance: "? km", lat: -2.9909, lng: 104.7566, capacity: { total: 120, used: 115 } },

  // Kalimantan
  { id: "ptk01", name: "Bank Sampah Khatulistiwa (Pontianak)", type: ["kertas", "plastik"], distance: "? km", lat: -0.0227, lng: 109.3333, capacity: { total: 200, used: 140 } },
  { id: "bjm01", name: "Bank Sampah Seribu Sungai (Banjarmasin)", type: ["plastik", "organik"], distance: "? km", lat: -3.3167, lng: 114.5900, capacity: { total: 300, used: 220 } },
  { id: "bkp01", name: "Bank Sampah Etam (Balikpapan)", type: ["logam", "elektronik"], distance: "? km", lat: -1.2654, lng: 116.8312, capacity: { total: 160, used: 30 } },

  // Sulawesi & Nusa Tenggara
  { id: "mks01", name: "Bank Sampah Losari (Makassar)", type: ["plastik", "kertas"], distance: "? km", lat: -5.1477, lng: 119.4327, capacity: { total: 280, used: 200 } },
  { id: "mnd01", name: "Bank Sampah Nyiur Melambai (Manado)", type: ["plastik", "elektronik"], distance: "? km", lat: 1.4822, lng: 124.8489, capacity: { total: 130, used: 50 } },
  { id: "mtr01", name: "Bank Sampah Rinjani (Mataram)", type: ["organik", "kertas"], distance: "? km", lat: -8.5833, lng: 116.1167, capacity: { total: 170, used: 90 } },
  { id: "kpg01", name: "Bank Sampah Flobamora (Kupang)", type: ["plastik"], distance: "? km", lat: -8.5986, lng: 123.6339, capacity: { total: 100, used: 20 } },

  // Maluku & Papua
  { id: "amb01", name: "Bank Sampah Manise (Ambon)", type: ["plastik", "organik"], distance: "? km", lat: -3.6954, lng: 128.1814, capacity: { total: 120, used: 70 } },
  { id: "jyp01", name: "Bank Sampah Cendrawasih (Jayapura)", type: ["kertas", "plastik"], distance: "? km", lat: -2.5337, lng: 140.7181, capacity: { total: 90, used: 40 } },
  { id: "srq01", name: "Bank Sampah Raja Ampat (Sorong)", type: ["logam"], distance: "? km", lat: -0.8762, lng: 131.2559, capacity: { total: 80, used: 10 } }
];

let mapInstance;
const markers = {};

/**
 * Menghasilkan HTML popup dengan info jarak & kapasitas
 */
function buildPopupHTML(item) {
  const available = item.capacity.total - item.capacity.used;
  const usedPct = Math.round((item.capacity.used / item.capacity.total) * 100);

  // Warna progress bar & status berdasarkan persentase
  const barColor =
    usedPct >= 90 ? '#ef4444' :   // penuh → merah
    usedPct >= 60 ? '#f59e0b' :   // sedang → kuning
    '#10b981';                     // longgar → hijau

  const statusLabel =
    usedPct >= 90 ? 'Hampir Penuh' :
    usedPct >= 60 ? 'Cukup Tersedia' :
    'Tersedia';

  const distanceRow = item.distance && item.distance !== '? km'
    ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;color:#64748b;font-size:12px;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
        <span><strong style="color:#0f172a;">${item.distance}</strong> dari lokasi kamu</span>
      </div>`
    : '';

  return `
    <div style="min-width:200px;font-family:system-ui,sans-serif;">
      <p style="font-weight:700;font-size:13px;color:#0f172a;margin:0 0 4px;">${item.name}</p>
      <p style="font-size:11px;color:#64748b;margin:0 0 10px;">Jenis: ${item.type.join(', ')}</p>
      ${distanceRow}
      <div style="background:#f1f5f9;border-radius:8px;padding:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:11px;font-weight:600;color:#475569;">Kapasitas</span>
          <span style="font-size:11px;font-weight:700;color:${barColor};">${statusLabel}</span>
        </div>
        <div style="background:#e2e8f0;border-radius:999px;height:6px;overflow:hidden;margin-bottom:6px;">
          <div style="width:${usedPct}%;height:100%;background:${barColor};border-radius:999px;transition:width 0.6s ease;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;">
          <span>Terisi: <strong style="color:#0f172a;">${item.capacity.used} kg</strong></span>
          <span>Sisa: <strong style="color:${barColor};">${available} kg</strong></span>
        </div>
      </div>
    </div>
  `;
}

function renderMapList(locations, observer) {
  const container = document.getElementById('map-locations-list');
  if (!container) return;

  container.innerHTML = '';
  locations.forEach((item, index) => {
    const available = item.capacity.total - item.capacity.used;
    const usedPct = Math.round((item.capacity.used / item.capacity.total) * 100);
    const capacityColor =
      usedPct >= 90 ? 'text-red-500 dark:text-red-400' :
      usedPct >= 60 ? 'text-amber-500 dark:text-amber-400' :
      'text-emerald-600 dark:text-emerald-400';

    const html = `
      <button data-id="${item.id}" type="button" class="animate-on-scroll fade-up flex w-full items-center justify-between rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-left text-sm text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 hover:border-emerald-400/70 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100" style="transition-delay: ${100 + index * 100}ms">
        <div class="flex-1 min-w-0">
          <p class="font-semibold truncate">${item.name}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Jenis: ${item.type.join(", ")} • ${item.distance}</p>
          <p class="text-xs mt-1 ${capacityColor} font-medium">Sisa kapasitas: ${available} kg (${100 - usedPct}%)</p>
        </div>
        <span class="ml-3 shrink-0 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">Lihat di peta</span>
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

function initLeafletMap(locations, observer) {
  if (typeof L === 'undefined') return;
  const container = document.getElementById('leaflet-map-container');
  if (!container || mapInstance) return;

  mapInstance = L.map(container, { zoomControl: false });

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
    marker.bindPopup(buildPopupHTML(item), { maxWidth: 260, className: 'rc-popup' });
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

        if (userMarker) mapInstance.removeLayer(userMarker);

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
          const distLabel = distMeters > 1000
            ? (distMeters / 1000).toFixed(1) + ' km'
            : Math.round(distMeters) + ' m';
          const updated = { ...loc, rawDist: distMeters, distance: distLabel };

          // Update popup marker dengan jarak yang sudah diketahui
          if (markers[loc.id]) {
            markers[loc.id].setPopupContent(buildPopupHTML(updated));
          }

          return updated;
        }).sort((a, b) => a.rawDist - b.rawDist);

        const closest = mappedWithDistance.slice(0, 3);
        renderMapList(closest, observer);

        const fitBoundsTop3 = closest.map(loc => [loc.lat, loc.lng]);
        fitBoundsTop3.push([userLat, userLng]);
        mapInstance.fitBounds(fitBoundsTop3, { padding: [50, 50], animate: true, duration: 1.5 });

        if (btnLocate) {
          btnLocate.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg> Lokasi Ditemukan';
        }
      }, (error) => {
        console.warn("Geolocation Error:", error);
        const btnLocate = document.getElementById('btn-locate');
        if (btnLocate) btnLocate.innerHTML = 'Gagal Deteksi Lokasi';
        renderMapList(locations.slice(0, 3), observer);
      }, { timeout: 10000 });
    } else {
      const btnLocate = document.getElementById('btn-locate');
      if (btnLocate) btnLocate.innerHTML = 'Browser Tidak Mendukung';
      renderMapList(locations.slice(0, 3), observer);
    }
  };

  const btnLocate = document.getElementById('btn-locate');
  if (btnLocate) {
    btnLocate.addEventListener('click', locateUser);
  }

  locateUser();
}

export function initMap(observer) {
  if (typeof L !== 'undefined') {
    initLeafletMap(mapLocations, observer);
  } else {
    const checkL = setInterval(() => {
      if (typeof L !== 'undefined') {
        clearInterval(checkL);
        initLeafletMap(mapLocations, observer);
      }
    }, 100);
  }
}
