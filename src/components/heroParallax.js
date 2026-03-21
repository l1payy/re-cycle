// Hero Section Parallax Effect
export function initHeroParallax() {
  const heroEarth = document.getElementById('hero-earth');
  const heroParticles = document.getElementById('hero-particles');
  const heroText = document.getElementById('hero-text');

  if (!heroEarth && !heroParticles && !heroText) return;

  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  const parallaxLoop = () => {
    // Hanya proses jika mendekati bagian atas untuk hemat CPU
    if (targetScrollY < 1200) {
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;

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

  parallaxLoop();
}
