// Three.js Ocean Waves Animation
import * as THREE from 'three';

export function initOceanWaves() {
  const container = document.getElementById('impact-canvas-container');
  if (!container) return;

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

    const currentRect = container.getBoundingClientRect();
    if (
      currentRect.width !== renderer.domElement.clientWidth ||
      currentRect.height !== renderer.domElement.clientHeight
    ) {
      renderer.setSize(currentRect.width, currentRect.height, false);
      camera.aspect = currentRect.width / currentRect.height;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }
  animateThree();

  window.addEventListener('resize', () => {
    const r = container.getBoundingClientRect();
    renderer.setSize(r.width, r.height);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  });
}
