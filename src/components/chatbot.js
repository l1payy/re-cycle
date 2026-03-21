// Agent Chat Panel & Q&A Logic
const qsAndAs = [
  { q: "Apa itu Re-Cycle?", a: "Re-Cycle adalah platform digital interaktif yang membantu masyarakat melacak, menemukan bank sampah teredekat, dan melihat peringkat kontribusi mereka dalam pengelolaan sampah terpadu." },
  { q: "Cara setor sampah?", a: "Pilih menu 'Bank Sampah' atau gunakan peta interaktif kami untuk menemukan bank sampah terdekat, lalu bawa sampah terpilah Anda ke sana." },
  { q: "Berapa lama poin masuk?", a: "Setelah Anda menyetor ke Bank Sampah resmi, poin dan riwayat pengelolaan Anda akan terupdate otomatis dalam waktu 1x24 jam." },
  { q: "Apa itu Eco Ranking?", a: "Eco Ranking adalah leaderboard yang menampilkan daerah, kampus, atau komunitas mana yang memiliki kontribusi pengelolaan sampah terbaik." },
  { q: "Jenis sampah apa saja?", a: "Kami menerima sampah organik, plastik, kertas, logam, dan elektronik, menyesuaikan dengan kebijakan masing-masing fasilitas Bank Sampah." },
  { q: "Butuh Bantuan Lain", a: "Anda bisa menghubungi tim Customer Service kami melalui email support@re-cycle.id atau WhatsApp di 0812-3456-7890." }
];

function appendUserMessage(chatBody, text) {
  const msg = document.createElement('div');
  msg.className = "flex w-full justify-end mb-2";
  msg.innerHTML = `
    <div class="rounded-2xl rounded-tr-sm bg-emerald-500 px-3 py-2 text-white shadow-sm max-w-[85%] break-words">
      ${text}
    </div>
  `;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMessage(chatBody, text) {
  const msg = document.createElement('div');
  msg.className = "flex gap-2 w-5/6 mb-2 mt-1";
  msg.innerHTML = `
    <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mt-0.5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Z"/></svg>
    </div>
    <div class="rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-200 max-w-[85%] break-words shadow-sm leading-relaxed">
      ${text}
    </div>
  `;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function initChatOptions(chatBody, chatOptionsContainer) {
  if (!chatOptionsContainer) return;

  // Drag-to-scroll untuk mouse desktop
  let isDown = false;
  let isDragging = false;
  let startX;
  let scrollLeft;

  chatOptionsContainer.style.cursor = 'grab';

  chatOptionsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    chatOptionsContainer.style.cursor = 'grabbing';
    startX = e.pageX - chatOptionsContainer.offsetLeft;
    scrollLeft = chatOptionsContainer.scrollLeft;
  });
  chatOptionsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    chatOptionsContainer.style.cursor = 'grab';
  });
  chatOptionsContainer.addEventListener('mouseup', () => {
    isDown = false;
    chatOptionsContainer.style.cursor = 'grab';
  });
  chatOptionsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - chatOptionsContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 2) isDragging = true;
    if (isDragging) {
      e.preventDefault();
      chatOptionsContainer.scrollLeft = scrollLeft - walk;
    }
  });

  chatOptionsContainer.innerHTML = '';
  qsAndAs.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = "shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:bg-slate-700/50 shadow-sm";
    btn.textContent = item.q;

    btn.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      appendUserMessage(chatBody, item.q);

      const typingId = 'typing-' + Date.now();
      const typingIndicator = document.createElement('div');
      typingIndicator.id = typingId;
      typingIndicator.className = "flex gap-2 w-5/6 mb-2 mt-1";
      typingIndicator.innerHTML = `
        <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 mt-0.5">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Z"/></svg>
        </div>
        <div class="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 dark:bg-slate-800 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400/70 animate-bounce"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400/70 animate-bounce" style="animation-delay: 0.15s"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400/70 animate-bounce" style="animation-delay: 0.3s"></span>
        </div>
      `;
      chatBody.appendChild(typingIndicator);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        const el = document.getElementById(typingId);
        if (el) el.remove();
        appendBotMessage(chatBody, item.a);
      }, Math.random() * 500 + 600);
    });

    chatOptionsContainer.appendChild(btn);
  });
}

export function initChatbot() {
  const chatPanel = document.getElementById('chat-panel');
  const btnAgentChat = document.getElementById('btn-agent-chat');
  const btnCloseChat = document.getElementById('close-chat');
  const chatBody = document.getElementById('chat-body');
  const chatOptionsContainer = document.getElementById('chat-options');
  const chatBadge = btnAgentChat?.querySelector('span');

  if (!chatPanel || !btnAgentChat || !btnCloseChat) return;

  let isChatOpen = false;

  function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      if (chatBadge) chatBadge.style.display = 'none';
      chatPanel.classList.remove('opacity-0', 'translate-y-8', 'scale-95', 'pointer-events-none');
      chatPanel.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
    } else {
      chatPanel.classList.remove('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
      chatPanel.classList.add('opacity-0', 'translate-y-8', 'scale-95', 'pointer-events-none');
    }
  }

  btnAgentChat.addEventListener('click', toggleChat);
  btnCloseChat.addEventListener('click', toggleChat);

  initChatOptions(chatBody, chatOptionsContainer);
}
