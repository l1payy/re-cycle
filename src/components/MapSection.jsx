import { useEffect, useRef, useState } from "react";

const defaultLocations = [
  {
    id: "bs01",
    name: "Bank Sampah Hijau Kampus",
    type: ["plastik", "organik"],
    distance: "0.8 km",
    lat: -6.2005,
    lng: 106.8169
  },
  {
    id: "bs02",
    name: "Bank Sampah Elektronik Nusantara",
    type: ["elektronik"],
    distance: "2.1 km",
    lat: -6.199,
    lng: 106.822
  },
  {
    id: "bs03",
    name: "Bank Sampah Bersemi",
    type: ["plastik", "organik", "elektronik"],
    distance: "3.4 km",
    lat: -6.205,
    lng: 106.812
  }
];

function MapSection() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRefs = useRef({});
  const [locations, setLocations] = useState(defaultLocations);

  useEffect(() => {
    if (!mapRef.current || typeof L === "undefined") return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-6.2, 106.816666],
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: ""
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof L === "undefined") return;
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markerRefs.current).forEach((marker) => {
      if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    });
    markerRefs.current = {};

    const icon = L.divIcon({
      className: "",
      html: '<div style="width:22px;height:22px;border-radius:999px;background:linear-gradient(135deg,#95d5b2,#4dabf7);box-shadow:0 0 0 4px rgba(15,23,42,0.8);"></div>',
      iconSize: [22, 22]
    });

    locations.forEach((item) => {
      const marker = L.marker([item.lat, item.lng], { icon }).addTo(map);
      const distanceLabel = item.distance || "";
      marker.bindPopup(`<strong>${item.name}</strong><br>${distanceLabel}`);
      markerRefs.current[item.id] = marker;
    });
  }, [locations]);

  useEffect(() => {
    fetch("/api/waste-banks")
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((payload) => {
        if (!payload || !Array.isArray(payload)) {
          return;
        }
        const mapped = payload
          .map((item) => {
            const rawTypes = Array.isArray(item.types)
              ? item.types
              : String(item.types_set || item.types || "")
                  .split(",")
                  .map((value) => value.trim())
                  .filter(Boolean);
            const distanceKm = typeof item.distance_km === "number" ? item.distance_km : null;
            return {
              id: String(item.id),
              name: item.name,
              type: rawTypes,
              distance: distanceKm !== null ? `${distanceKm.toFixed(1)} km` : "",
              lat: Number(item.latitude),
              lng: Number(item.longitude)
            };
          })
          .filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));
        if (mapped.length) {
          setLocations(mapped);
        }
      })
      .catch(() => {});
  }, []);

  function focusLocation(id) {
    const map = mapInstanceRef.current;
    const marker = markerRefs.current[id];
    if (map && marker) {
      const position = marker.getLatLng();
      map.setView(position, 15, { animate: true, duration: 0.6 });
      marker.openPopup();
    }
  }

  return (
    <section id="map" className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <div className="space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Peta Bank Sampah Terintegrasi
          </p>
          <h2 className="font-display text-2xl text-slate-900 dark:text-slate-50 md:text-3xl">Temukan Titik Aksi Terdekat</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 md:text-base max-w-xl">
            Lihat sebaran bank sampah di sekitarmu, lalu setorkan sampah terpilah untuk mencatat kontribusimu di
            ranking eco.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-3xl border border-slate-300 bg-white/80 shadow-card dark:border-slate-800 dark:bg-slate-900/80">
            <div ref={mapRef} className="h-80 w-full" />
          </div>
          <div className="space-y-3">
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Pilih titik bank sampah untuk melihat detail dan memperkirakan jarak dari lokasimu.
            </p>
            <div className="space-y-2">
              {locations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-left text-sm text-slate-900 transition-transform duration-150 hover:-translate-y-0.5 hover:border-emerald-400/70 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
                  onClick={() => focusLocation(item.id)}
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      Jenis: {item.type.join(", ")} • {item.distance}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] text-emerald-200">
                    Lihat di peta
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
