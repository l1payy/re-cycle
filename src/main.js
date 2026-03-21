// Entry Point - Re-Cycle App
// Semua logika dipecah ke masing-masing file di src/components/

import { initThemeToggle } from './components/themeToggle.js';
import { initScrollAnimation } from './components/scrollAnimation.js';
import { initImpactTabs } from './components/impactTabs.js';
import { initOceanWaves } from './components/oceanWaves.js';
import { initRanking } from './components/ranking.js';
import { initMap } from './components/map.js';
import { initFloatingButtons } from './components/floatingButtons.js';
import { initChatbot } from './components/chatbot.js';
import { initHeroParallax } from './components/heroParallax.js';
import { initHeroTyping } from './components/heroTyping.js';

// Inisialisasi semua component
initThemeToggle();
const observer = initScrollAnimation();
initImpactTabs();
initOceanWaves();
initRanking(observer);
initMap(observer);
initFloatingButtons();
initChatbot();
initHeroParallax();
initHeroTyping();
