// Impact Section Tabs (Laut / Tanah / Udara / Lingkungan)
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

function updateImpactTab(key, impactTabs, impactImage, impactText) {
  // Animate image out
  impactImage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  impactImage.style.opacity = '0';
  impactImage.style.transform = 'scale(1.05)';

  // Animate text out
  impactText.style.transition = 'all 0.3s ease-out';
  impactText.style.opacity = '0';
  impactText.style.transform = 'translateY(10px)';

  setTimeout(() => {
    impactImage.style.transition = 'none';
    impactImage.src = tabContent[key].img;
    impactImage.style.transform = 'scale(0.95)';

    impactText.style.transition = 'none';
    impactText.textContent = tabContent[key].text;
    impactText.style.transform = 'translateY(-10px)';

    void impactImage.offsetWidth;
    void impactText.offsetWidth;

    impactImage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    impactImage.style.opacity = '1';
    impactImage.style.transform = 'scale(1)';

    impactText.style.transition = 'all 0.3s ease-out';
    impactText.style.opacity = '1';
    impactText.style.transform = 'translateY(0)';
  }, 300);

  // Update tab button styles
  impactTabs.forEach(btn => {
    const btnKey = btn.dataset.impact;
    if (btnKey === key) {
      btn.className = "impact-tab rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 bg-emerald-400 text-slate-950 shadow-card";
    } else {
      btn.className = "impact-tab rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 border border-slate-300 bg-white/70 text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100";
    }
  });
}

export function initImpactTabs() {
  const impactTabs = document.querySelectorAll('.impact-tab');
  const impactImage = document.getElementById('impact-image');
  const impactText = document.getElementById('impact-text');

  if (!impactTabs.length || !impactImage || !impactText) return;

  impactTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      updateImpactTab(btn.dataset.impact, impactTabs, impactImage, impactText);
    });
  });
}
