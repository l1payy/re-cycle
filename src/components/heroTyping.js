// Hero Typing Animation
export function initHeroTyping() {
  const typeText1 = document.getElementById('type-text-1');
  const typeText2 = document.getElementById('type-text-2');
  const typeCursor = document.getElementById('type-cursor');

  if (!typeText1 || !typeText2 || !typeCursor) return;

  const text1 = "Ubah Jejak Sampahmu Menjadi";
  const text2 = "Cerita Baik Bumi";

  let i = 0;
  let j = 0;
  let isTypingText1 = true;
  let blinkInterval;

  // Tempatkan cursor setelah text1
  if (typeText1.nextSibling) {
    typeText1.parentNode.insertBefore(typeCursor, typeText1.nextSibling);
  } else {
    typeText1.parentNode.appendChild(typeCursor);
  }

  function startBlinking() {
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
        setTimeout(typeWriter, Math.random() * 30 + 40);
      } else {
        isTypingText1 = false;

        // Pindah cursor ke baris 2
        setTimeout(() => {
          if (typeText2.nextSibling) {
            typeText2.parentNode.insertBefore(typeCursor, typeText2.nextSibling);
          } else {
            typeText2.parentNode.appendChild(typeCursor);
          }
          setTimeout(typeWriter, 100);
        }, 400);
      }
    } else {
      if (j < text2.length) {
        typeText2.textContent += text2.charAt(j);
        j++;
        setTimeout(typeWriter, Math.random() * 40 + 50);
      } else {
        // Selesai mengetik → mulai blinking
        startBlinking();
      }
    }
  }

  // Mulai setelah delay singkat untuk sinkronisasi dengan animasi halaman
  setTimeout(typeWriter, 500);
}
