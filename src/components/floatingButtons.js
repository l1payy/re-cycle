// Floating Action Buttons (Back to Top)
export function initFloatingButtons() {
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (!btnBackToTop) return;

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
