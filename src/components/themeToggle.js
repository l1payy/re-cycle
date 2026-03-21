// Theme Toggle (Dark / Light Mode) — Sun & Moon Icon with smooth animation
export function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  if (!themeToggle) return;

  let isDark = true;

  const applyTheme = (animate = false) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (!iconSun || !iconMoon) return;

    if (isDark) {
      // Show sun (we're in dark mode → click will switch to light)
      iconSun.style.opacity   = '1';
      iconSun.style.transform = 'rotate(0deg) scale(1)';
      iconMoon.style.opacity  = '0';
      iconMoon.style.transform = 'rotate(-90deg) scale(0.5)';
    } else {
      // Show moon (we're in light mode → click will switch to dark)
      iconMoon.style.opacity   = '1';
      iconMoon.style.transform = 'rotate(0deg) scale(1)';
      iconSun.style.opacity    = '0';
      iconSun.style.transform  = 'rotate(90deg) scale(0.5)';
    }
  };

  // Apply without animation on first load
  applyTheme(false);

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(true);
  });
}
