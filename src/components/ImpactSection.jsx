import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function OceanWavePlane() {
  const materialRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.16 },
      uFrequency: { value: 2.4 },
      uSpeed: { value: 0.8 },
      uDeepColor: { value: new THREE.Color("#020617") },
      uSurfaceColor: { value: new THREE.Color("#38bdf8") }
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

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

  return (
    <mesh rotation={[-0.9, 0, 0]} position={[0, -0.9, 0]}>
      <planeGeometry args={[6.2, 3.4, 160, 80]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={false}
      />
    </mesh>
  );
}

function OceanWaves() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.4, 5.2], fov: 40 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#e0f2fe" />
      <directionalLight position={[-2, 3, -4]} intensity={0.4} color="#020617" />
      <OceanWavePlane />
    </Canvas>
  );
}

const tabContent = {
  laut: {
    key: "laut",
    text: "Sampah yang dibuang ke sungai dan laut dapat merusak ekosistem perairan serta membahayakan kehidupan makhluk hidup di dalamnya. Plastik yang sulit terurai sering dimakan oleh ikan, penyu, dan hewan laut lainnya sehingga menyebabkan kematian. Selain itu, pencemaran laut juga mengganggu keseimbangan ekosistem dan dapat berdampak pada manusia melalui makanan laut yang telah terkontaminasi. Jika tidak dikendalikan, sampah di laut akan terus menumpuk dan merusak keindahan serta kelestarian alam.",
    render: () => (
      <motion.img
        src="/img/laut.png"
        alt="Pencemaran Laut"
        className="h-[460px] w-full object-cover md:h-[560px]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    )
  },
  tanah: {
    key: "tanah",
    text: "Sampah yang dibuang sembarangan di tanah dapat menyebabkan pencemaran lingkungan dan menurunkan kualitas tanah. Sampah plastik dan bahan kimia berbahaya sulit terurai sehingga merusak kesuburan tanah dan mengganggu pertumbuhan tanaman. Selain itu, tumpukan sampah juga dapat menjadi sumber penyakit karena menjadi tempat berkembangnya bakteri dan serangga. Jika kondisi ini terus terjadi, lingkungan akan menjadi kotor, tidak sehat, dan berbahaya bagi kehidupan manusia maupun hewan.",
    render: () => (
      <motion.img
        src="/img/tanah.png"
        alt="Pencemaran Tanah"
        className="h-[460px] w-full object-cover md:h-[560px]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    )
  },
  udara: {
    key: "udara",
    text: "Pembakaran sampah secara sembarangan dapat menghasilkan asap beracun yang mencemari udara dan membahayakan kesehatan. Gas yang dihasilkan dari pembakaran sampah, terutama plastik, dapat menyebabkan gangguan pernapasan, iritasi mata, dan penyakit paru-paru. Selain itu, bau tidak sedap dari tumpukan sampah juga membuat lingkungan menjadi tidak nyaman. Udara yang tercemar dalam jangka panjang dapat berdampak buruk bagi kesehatan manusia dan merusak keseimbangan alam.",
    render: () => (
      <motion.img
        src="/img/udara.png"
        alt="Pencemaran Udara"
        className="h-[460px] w-full object-cover md:h-[560px]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    )
  },
  lingkungan: {
    key: "lingkungan",
    text: "Sampah yang tidak dikelola dengan baik dapat merusak keseimbangan lingkungan dan menimbulkan berbagai masalah bagi kehidupan. Lingkungan yang kotor dapat menyebabkan banjir, pencemaran air, serta meningkatnya penyebaran penyakit. Selain itu, keindahan alam akan berkurang dan kualitas hidup manusia juga menurun. Oleh karena itu, menjaga kebersihan dan mengelola sampah dengan benar merupakan tanggung jawab bersama agar lingkungan tetap sehat, nyaman, dan lestari untuk generasi sekarang maupun yang akan datang.",
    render: () => (
      <motion.img
        src="/img/lingkungan.png"
        alt="Lingkungan Bersih"
        className="h-[460px] w-full object-cover md:h-[560px]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    )
  }
};

function ImpactSection() {
  const [active, setActive] = useState("laut");

  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-emerald-50 to-white py-16 dark:from-slate-900 dark:via-brand.dark dark:to-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0,_rgba(148,213,178,0.14),transparent_60%),radial-gradient(circle_at_90%_0,_rgba(77,171,247,0.12),transparent_55%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid items-start gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {tabContent[active].render()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="space-y-3">
              <h2 className="font-display text-2xl text-slate-900 md:text-3xl dark:text-slate-50">
                Dampak Sampah terhadap Laut, Tanah, Udara, dan Lingkungan
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                Sampah yang kita buang dapat mencemari berbagai elemen alam. Klik untuk melihat dampaknya.
              </p>
              <motion.div
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-slate-800 dark:border-emerald-500/20 dark:bg-slate-900/60 dark:text-slate-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              >
                <p className="text-sm">{tabContent[active].text}</p>
              </motion.div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {["laut", "tanah", "udara", "lingkungan"].map((key) => {
                  const activeStyle =
                    key === active
                      ? "bg-emerald-400 text-slate-950 shadow-card"
                      : "border border-slate-300 bg-white/70 text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100";
                  const label =
                    key === "laut" ? "Laut" : key === "tanah" ? "Tanah" : key === "udara" ? "Udara" : "Lingkungan";
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActive(key)}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 ${activeStyle}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;
