/**
 * A Game of Chromes - Authentic Google Chrome Simulator & Meme Picture Gallery
 * Replicates the authentic Google Chrome browser UI (tabs, omnibox, toolbar, bookmarks)
 * with visual picture memes (Doge, This Is Fine, Stonks, PopCat, Galaxy Brain, Drake, Gigachad)
 * and working browser navigation.
 */

// Visual Picture Meme definitions (Rendered with pure SVG and CSS meme graphics)
export const MEME_PICTURES = {
  doge: {
    id: 'doge',
    title: 'Doge - Much Chrome',
    url: 'https://reddit.com/r/doge/much-shortcuts',
    icon: '🐕',
    renderPicture: () => `
      <div class="meme-picture-frame doge-frame">
        <div class="meme-top-text">MUCH TAB. VERY CHROME.</div>
        <div class="meme-image-wrapper">
          <svg viewBox="0 0 400 320" class="meme-svg">
            <defs>
              <radialGradient id="dogeBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#fff8db"/>
                <stop offset="100%" stop-color="#e8c872"/>
              </radialGradient>
            </defs>
            <rect width="400" height="320" fill="url(#dogeBg)"/>
            <!-- Shiba Inu Head & Fur -->
            <ellipse cx="200" cy="180" rx="110" ry="100" fill="#e5a65d"/>
            <ellipse cx="200" cy="195" rx="85" ry="75" fill="#fdf4e3"/>
            <!-- Ears -->
            <polygon points="120,110 150,40 180,95" fill="#cf863c"/>
            <polygon points="135,100 155,55 170,95" fill="#fae1c3"/>
            <polygon points="220,95 250,40 280,110" fill="#cf863c"/>
            <polygon points="230,95 245,55 265,100" fill="#fae1c3"/>
            <!-- Eyes -->
            <ellipse cx="160" cy="155" rx="14" ry="18" fill="#2c1a0e"/>
            <circle cx="164" cy="150" r="5" fill="#ffffff"/>
            <ellipse cx="240" cy="155" rx="14" ry="18" fill="#2c1a0e"/>
            <circle cx="244" cy="150" r="5" fill="#ffffff"/>
            <!-- Eyebrow dots -->
            <circle cx="155" cy="132" r="8" fill="#fef6e9"/>
            <circle cx="245" cy="132" r="8" fill="#fef6e9"/>
            <!-- Snout & Nose -->
            <ellipse cx="200" cy="190" rx="36" ry="26" fill="#fef6e9"/>
            <path d="M188,180 Q200,174 212,180 Q200,196 188,180 Z" fill="#2c1a0e"/>
            <!-- Smile -->
            <path d="M192,192 Q200,202 208,192" stroke="#2c1a0e" stroke-width="3" fill="none"/>
            <!-- Doge words -->
            <text x="30" y="70" fill="#e63946" font-family="'Comic Sans MS', cursive" font-size="22" font-weight="bold">much shortcut</text>
            <text x="270" y="80" fill="#a855f7" font-family="'Comic Sans MS', cursive" font-size="24" font-weight="bold">so speed</text>
            <text x="40" y="270" fill="#0284c7" font-family="'Comic Sans MS', cursive" font-size="26" font-weight="bold">very ctrl+w</text>
            <text x="280" y="260" fill="#16a34a" font-family="'Comic Sans MS', cursive" font-size="28" font-weight="bold">wow</text>
          </svg>
        </div>
        <div class="meme-bottom-text">SUCH KEYBOARD. SO PRODUCTIVE.</div>
      </div>
    `
  },
  thisisfine: {
    id: 'thisisfine',
    title: 'This Is Fine - 99 Tabs',
    url: 'https://reddit.com/r/memes/this-is-fine-chrome-tabs',
    icon: '🔥',
    renderPicture: () => `
      <div class="meme-picture-frame fine-frame">
        <div class="meme-top-text">WHEN YOU HAVE 99 CHROME TABS OPEN</div>
        <div class="meme-image-wrapper">
          <svg viewBox="0 0 400 320" class="meme-svg">
            <!-- Room Background with Flames -->
            <rect width="400" height="320" fill="#d97706"/>
            <!-- Flame Pillars -->
            <path d="M0,320 Q30,120 70,320 Q110,80 150,320 Q200,40 250,320 Q300,100 350,320 Q380,140 400,320 Z" fill="#ef4444"/>
            <path d="M20,320 Q60,160 90,320 Q140,120 180,320 Q230,80 270,320 Q320,150 370,320 Z" fill="#f59e0b"/>
            <path d="M40,320 Q80,200 110,320 Q160,160 200,320 Q250,140 290,320 Z" fill="#fef08a"/>
            <!-- Table -->
            <rect x="110" y="220" width="180" height="15" fill="#78350f" rx="3"/>
            <rect x="130" y="235" width="15" height="85" fill="#582407"/>
            <rect x="255" y="235" width="15" height="85" fill="#582407"/>
            <!-- Coffee Mug -->
            <rect x="230" y="195" width="26" height="25" fill="#f8fafc" rx="2"/>
            <path d="M256,200 Q266,207 256,215" stroke="#f8fafc" stroke-width="4" fill="none"/>
            <!-- Dog Body & Hat -->
            <ellipse cx="170" cy="190" rx="35" ry="30" fill="#fde047"/>
            <ellipse cx="170" cy="140" rx="28" ry="24" fill="#fde047"/>
            <!-- Small Hat -->
            <ellipse cx="170" cy="118" rx="18" ry="5" fill="#1e293b"/>
            <rect x="160" y="98" width="20" height="20" fill="#1e293b"/>
            <!-- Dog Face (Calm smile) -->
            <circle cx="160" cy="138" r="4" fill="#0f172a"/>
            <circle cx="180" cy="138" r="4" fill="#0f172a"/>
            <path d="M165,148 Q170,155 175,148" stroke="#0f172a" stroke-width="3" fill="none"/>
            <ellipse cx="170" cy="144" rx="4" ry="3" fill="#0f172a"/>
            <!-- Speech Bubble -->
            <rect x="20" y="20" width="190" height="50" fill="#ffffff" rx="8" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"/>
            <polygon points="120,70 140,70 155,95" fill="#ffffff"/>
            <text x="35" y="52" fill="#0f172a" font-family="'Impact', Arial Black, sans-serif" font-size="22" letter-spacing="1">THIS IS FINE.</text>
          </svg>
        </div>
        <div class="meme-bottom-text">RAM USAGE: 31.9 GB / 32 GB</div>
      </div>
    `
  },
  stonks: {
    id: 'stonks',
    title: 'Stonks - Diamond Hands',
    url: 'https://reddit.com/r/wallstreetbets/stonks-shortcuts',
    icon: '📈',
    renderPicture: () => `
      <div class="meme-picture-frame stonks-frame">
        <div class="meme-top-text">PRESSING CTRL + W INSTEAD OF USING MOUSE</div>
        <div class="meme-image-wrapper">
          <svg viewBox="0 0 400 320" class="meme-svg">
            <!-- Dark Grid Stock Background -->
            <rect width="400" height="320" fill="#09131e"/>
            <!-- Grid Lines -->
            <line x1="0" y1="80" x2="400" y2="80" stroke="#1e293b" stroke-width="1"/>
            <line x1="0" y1="160" x2="400" y2="160" stroke="#1e293b" stroke-width="1"/>
            <line x1="0" y1="240" x2="400" y2="240" stroke="#1e293b" stroke-width="1"/>
            <line x1="100" y1="0" x2="100" y2="320" stroke="#1e293b" stroke-width="1"/>
            <line x1="200" y1="0" x2="200" y2="320" stroke="#1e293b" stroke-width="1"/>
            <line x1="300" y1="0" x2="300" y2="320" stroke="#1e293b" stroke-width="1"/>
            <!-- Ascending Stock Curve -->
            <path d="M0,280 Q80,260 140,210 T240,120 T360,30" stroke="#22c55e" stroke-width="8" fill="none"/>
            <polygon points="350,20 380,25 365,55" fill="#22c55e"/>
            <!-- Meme Man (Meme Head) -->
            <g transform="translate(180, 70)">
              <!-- Suit & Tie -->
              <path d="M-20,150 L60,150 L40,110 L0,110 Z" fill="#1e293b"/>
              <polygon points="15,110 25,110 23,145 17,145" fill="#dc2626"/>
              <polygon points="12,110 28,110 20,118" fill="#ffffff"/>
              <!-- Head -->
              <ellipse cx="20" cy="50" rx="38" ry="48" fill="#e2b897"/>
              <ellipse cx="10" cy="45" rx="5" ry="3" fill="#334155"/>
              <ellipse cx="32" cy="45" rx="5" ry="3" fill="#334155"/>
              <ellipse cx="20" cy="62" rx="4" ry="4" fill="#b98a69"/>
              <path d="M12,75 Q20,78 28,75" stroke="#78350f" stroke-width="2" fill="none"/>
            </g>
            <!-- Big Bold STONKS Word -->
            <text x="30" y="270" fill="#ffffff" stroke="#000" stroke-width="2" font-family="'Impact', Arial Black, sans-serif" font-size="52" letter-spacing="2">STONKS ↗</text>
          </svg>
        </div>
        <div class="meme-bottom-text">PRODUCTIVITY TO THE MOON</div>
      </div>
    `
  },
  popcat: {
    id: 'popcat',
    title: 'PopCat - 100 Million Pops',
    url: 'https://popcat.click/leaderboard',
    icon: '🐱',
    renderPicture: () => `
      <div class="meme-picture-frame popcat-frame">
        <div class="meme-top-text">WHEN YOU CHAIN 10 SHORTCUTS IN A ROW</div>
        <div class="meme-image-wrapper">
          <svg viewBox="0 0 400 320" class="meme-svg">
            <rect width="400" height="320" fill="#38bdf8"/>
            <!-- Cute Oatmeal Cat Body -->
            <ellipse cx="200" cy="270" rx="140" ry="110" fill="#faf5eb"/>
            <!-- Cat Head -->
            <ellipse cx="200" cy="170" rx="105" ry="90" fill="#faf5eb"/>
            <!-- Ears -->
            <polygon points="110,120 130,40 170,95" fill="#faf5eb"/>
            <polygon points="125,110 135,55 160,95" fill="#f43f5e" opacity="0.4"/>
            <polygon points="230,95 270,40 290,120" fill="#faf5eb"/>
            <polygon points="240,95 265,55 275,110" fill="#f43f5e" opacity="0.4"/>
            <!-- Big Black Eyes -->
            <circle cx="150" cy="135" r="20" fill="#0f172a"/>
            <circle cx="145" cy="130" r="7" fill="#ffffff"/>
            <circle cx="250" cy="135" r="20" fill="#0f172a"/>
            <circle cx="245" cy="130" r="7" fill="#ffffff"/>
            <!-- Giant Iconic Pop Mouth (O) -->
            <ellipse cx="200" cy="210" rx="42" ry="52" fill="#7f1d1d"/>
            <ellipse cx="200" cy="210" rx="36" ry="46" fill="#be123c"/>
            <ellipse cx="200" cy="235" rx="22" ry="14" fill="#fb7185"/>
          </svg>
        </div>
        <div class="meme-bottom-text">POPCAT APPROVES THIS SPEED</div>
      </div>
    `
  },
  galaxybrain: {
    id: 'galaxybrain',
    title: 'Galaxy Brain - The 4 Stages',
    url: 'https://reddit.com/r/pcmasterrace/galaxy-brain-browsing',
    icon: '🧠',
    renderPicture: () => `
      <div class="meme-picture-frame galaxy-frame">
        <div class="meme-top-text">EXPANDING KEYBOARD ENLIGHTENMENT</div>
        <div class="meme-image-wrapper">
          <div class="galaxy-4panel-grid">
            <div class="brain-panel">
              <span class="brain-desc">Clicking tab 'x' with mouse</span>
              <div class="brain-icon-box b-dim">🧠</div>
            </div>
            <div class="brain-panel">
              <span class="brain-desc">Pressing Ctrl + W</span>
              <div class="brain-icon-box b-glow1">💡🧠</div>
            </div>
            <div class="brain-panel">
              <span class="brain-desc">Ctrl+Shift+T Necromancy</span>
              <div class="brain-icon-box b-glow2">⚡🧠⚡</div>
            </div>
            <div class="brain-panel b-cosmic-bg">
              <span class="brain-desc">Playing Game of Chromes</span>
              <div class="brain-icon-box b-glow3">🌌🧠✨</div>
            </div>
          </div>
        </div>
        <div class="meme-bottom-text">COSMIC PRODUCTIVITY ACHIEVED</div>
      </div>
    `
  },
  drake: {
    id: 'drake',
    title: 'Drake - The True Way',
    url: 'https://reddit.com/r/ProgrammerHumor/drake-shortcuts',
    icon: '🕺',
    renderPicture: () => `
      <div class="meme-picture-frame drake-frame">
        <div class="meme-top-text">HOW REAL PROS BROWSE</div>
        <div class="meme-image-wrapper">
          <div class="drake-2panel-grid">
            <div class="drake-row">
              <div class="drake-face reject-face">🙅‍♂️</div>
              <div class="drake-text">Moving mouse to click address bar</div>
            </div>
            <div class="drake-row">
              <div class="drake-face approve-face">👉😎👉</div>
              <div class="drake-text">Hitting <strong>Ctrl + L</strong> instantly</div>
            </div>
          </div>
        </div>
        <div class="meme-bottom-text">PERFECTION.</div>
      </div>
    `
  },
  gigachad: {
    id: 'gigachad',
    title: 'GigaChad - Average Enjoyer',
    url: 'https://reddit.com/r/gigachad/average-shortcut-enjoyer',
    icon: '🗿',
    renderPicture: () => `
      <div class="meme-picture-frame chad-frame">
        <div class="meme-top-text">AVERAGE SHORTCUT ENJOYER</div>
        <div class="meme-image-wrapper">
          <svg viewBox="0 0 400 320" class="meme-svg">
            <rect width="400" height="320" fill="#18181b"/>
            <!-- Monochrome Chad Silhouette & Jawline -->
            <defs>
              <linearGradient id="chadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#71717a"/>
                <stop offset="100%" stop-color="#27272a"/>
              </linearGradient>
            </defs>
            <!-- Jawline & Neck -->
            <polygon points="120,320 280,320 250,190 150,190" fill="#3f3f46"/>
            <!-- Head & Chiseled Jaw -->
            <polygon points="140,80 260,80 250,180 200,240 150,180" fill="url(#chadGrad)"/>
            <!-- Iconic Beard & Cheekbones -->
            <path d="M145,160 L180,185 L200,235 L220,185 L255,160 L245,210 L200,240 L155,210 Z" fill="#09090b"/>
            <!-- Aviator Sunglasses -->
            <polygon points="145,110 190,110 185,135 150,135" fill="#09090b"/>
            <polygon points="210,110 255,110 250,135 215,135" fill="#09090b"/>
            <line x1="190" y1="115" x2="210" y2="115" stroke="#09090b" stroke-width="4"/>
            <!-- Smirk -->
            <path d="M185,175 Q200,180 215,172" stroke="#ffffff" stroke-width="3" fill="none"/>
            <!-- Sparkles -->
            <text x="50" y="80" fill="#ffd700" font-size="28">✨</text>
            <text x="320" y="100" fill="#ffd700" font-size="28">✨</text>
          </svg>
        </div>
        <div class="meme-bottom-text">"YES, I NEVER TOUCH THE MOUSE."</div>
      </div>
    `
  }
};

export class BrowserSimulator {
  constructor(containerEl) {
    this.container = containerEl;
    this.tabs = [
      {
        id: 1,
        memeKey: 'doge',
        title: MEME_PICTURES.doge.title,
        url: MEME_PICTURES.doge.url,
        icon: MEME_PICTURES.doge.icon,
        active: true,
        history: [MEME_PICTURES.doge.url],
        historyIndex: 0
      },
      {
        id: 2,
        memeKey: 'thisisfine',
        title: MEME_PICTURES.thisisfine.title,
        url: MEME_PICTURES.thisisfine.url,
        icon: MEME_PICTURES.thisisfine.icon,
        active: false,
        history: [MEME_PICTURES.thisisfine.url],
        historyIndex: 0
      },
      {
        id: 3,
        memeKey: 'stonks',
        title: MEME_PICTURES.stonks.title,
        url: MEME_PICTURES.stonks.url,
        icon: MEME_PICTURES.stonks.icon,
        active: false,
        history: [MEME_PICTURES.stonks.url],
        historyIndex: 0
      }
    ];

    this.closedTabsStack = [];
    this.nextTabId = 4;
    this.isIncognito = false;
    this.zoomLevel = 100;
    this.bookmarks = ['doge', 'thisisfine', 'stonks', 'popcat', 'galaxybrain', 'drake', 'gigachad'];
    this.omniboxFocused = false;
    this.findOverlayOpen = false;
    this.historyPanelOpen = false;
    this.isReloading = false;
    this.animTabId = null;
    this.animTabClass = '';
    this.isAnimEntering = false;
    this.bookmarksBarVisible = true;

    // Chrome-like overlay / DevTools state
    this.devtoolsOpen = false;
    this.devtoolsTab = 'elements'; // elements | console | performance
    this.inspectMode = false;
    this.inspectTargetLabel = 'div.meme-picture-frame';
    this.deviceMode = false;
    this.simFullscreen = false;
    this.downloadsShelfOpen = false;
    this.clearDataDialogOpen = false;
    this.sourceOverlayOpen = false;
    this.printOverlayOpen = false;
    this.saveToastVisible = false;
    this.findHighlightActive = false;

    this.render();
  }

  getActiveTab() {
    return this.tabs.find(t => t.active) || this.tabs[0];
  }

  showActionBanner(text, icon = '⚡') {
    this.showHeroBadge(text, '', icon);
  }

  triggerLaserSlash() {
    const win = this.container.querySelector('#chromeBrowserWindow');
    if (!win) return;
    const slash = document.createElement('div');
    slash.className = 'cinematic-laser-slash';
    win.appendChild(slash);

    win.classList.remove('shake-screen');
    void win.offsetWidth;
    win.classList.add('shake-screen');

    setTimeout(() => {
      if (slash.parentNode) slash.remove();
      win.classList.remove('shake-screen');
    }, 450);
  }

  triggerWarpSweep() {
    const win = this.container.querySelector('#chromeBrowserWindow');
    if (!win) return;
    const sweep = document.createElement('div');
    sweep.className = 'cinematic-warp-sweep';
    win.appendChild(sweep);
    setTimeout(() => {
      if (sweep.parentNode) sweep.remove();
    }, 520);
  }

  showHeroBadge(title, desc, icon = '⚡') {
    const existing = this.container.querySelector('.cinematic-hero-badge');
    if (existing) existing.remove();

    const badge = document.createElement('div');
    badge.className = 'cinematic-hero-badge';
    badge.innerHTML = `
      <span class="hero-badge-icon">${icon}</span>
      <div class="hero-badge-text-group">
        <span class="hero-badge-title">${title}</span>
        ${desc ? `<span class="hero-badge-desc">${desc}</span>` : ''}
      </div>
    `;
    const win = this.container.querySelector('#chromeBrowserWindow');
    if (win) {
      win.appendChild(badge);
      setTimeout(() => {
        if (badge.parentNode) badge.remove();
      }, 1250);
    }
  }

  render() {
    if (!this.container) return;

    const activeTab = this.getActiveTab();
    const canGoBack = activeTab && activeTab.historyIndex > 0;
    const canGoForward = activeTab && activeTab.historyIndex < activeTab.history.length - 1;
    const isBookmarked = activeTab && this.bookmarks.includes(activeTab.memeKey);

    this.container.innerHTML = `
      <!-- Authentic Chrome Browser Window Container -->
      <div class="chrome-browser-window ${this.isIncognito ? 'chrome-incognito' : ''} ${this.simFullscreen ? 'sim-fullscreen' : ''}" id="chromeBrowserWindow">
        
        <!-- Authentic Chrome Tab Strip Bar -->
        <div class="chrome-tab-strip-bar">
          <div class="chrome-tabs-container" id="chromeTabsContainer">
            ${this.renderTabs()}
            <button class="chrome-new-tab-btn" id="simNewTabBtn" title="New Tab (Ctrl+T)">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z"/>
              </svg>
            </button>
          </div>

          <!-- Chrome Window Controls (Minimize, Maximize, Close) -->
          <div class="chrome-window-controls">
            <button class="chrome-win-btn win-min" id="simWinMin" title="Minimize">−</button>
            <button class="chrome-win-btn win-max" id="simWinMax" title="Maximize">□</button>
            <button class="chrome-win-btn win-close" id="simWinClose" title="Close Tab (Ctrl+W)">✕</button>
          </div>
        </div>

        <!-- Authentic Chrome Toolbar (Navigation + Omnibox) -->
        <div class="chrome-toolbar">
          <div class="chrome-nav-group">
            <button class="chrome-icon-btn ${!canGoBack ? 'disabled' : ''}" id="navBack" title="Click to go back (Alt+Left)" ${!canGoBack ? 'disabled' : ''}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M11 2a1 1 0 0 1 0 1.414L6.414 8 11 12.586A1 1 0 0 1 9.586 14l-6-6a1 1 0 0 1 0-1.414l6-6A1 1 0 0 1 11 2Z"/></svg>
            </button>
            <button class="chrome-icon-btn ${!canGoForward ? 'disabled' : ''}" id="navForward" title="Click to go forward (Alt+Right)" ${!canGoForward ? 'disabled' : ''}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 14a1 1 0 0 1 0-1.414L9.586 8 5 3.414A1 1 0 0 1 6.414 2l6 6a1 1 0 0 1 0 1.414l-6 6A1 1 0 0 1 5 14Z"/></svg>
            </button>
            <button class="chrome-icon-btn ${this.isReloading ? 'spinning' : ''}" id="navRefresh" title="Reload this page (Ctrl+R / F5)">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 3a5 5 0 1 0 4.546 2.914.75.75 0 0 1 1.37-.607A6.5 6.5 0 1 1 8 1.5v-1a.5.5 0 0 1 .854-.354l2 2a.5.5 0 0 1 0 .708l-2 2A.5.5 0 0 1 8 4.5V3Z"/></svg>
            </button>
          </div>

          <!-- Chrome Omnibox Pill Address Bar -->
          <form class="chrome-omnibox-pill ${this.omniboxFocused ? 'focused' : ''}" id="simOmniboxForm">
            <span class="omnibox-security-icon" title="View site information">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="#9aa0a6"><path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H3.75A1.75 1.75 0 0 0 2 7.75v5.5C2 14.216 2.784 15 3.75 15h8.5A1.75 1.75 0 0 0 14 13.25v-5.5A1.75 1.75 0 0 0 12.25 6H11.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z"/></svg>
            </span>
            <input type="text" class="chrome-omnibox-input" id="simOmniboxInput" value="${activeTab?.url || 'about:blank'}" placeholder="Search Google or type a URL (doge, stonks, popcat, fine, drake, chad)..." autocomplete="off" />
            <button type="button" class="chrome-star-btn ${isBookmarked ? 'bookmarked' : ''}" id="simBookmarkBtn" title="Bookmark this tab (Ctrl+D)">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </form>

          <!-- Chrome Toolbar Actions & Profile -->
          <div class="chrome-actions-group">
            <button class="chrome-icon-btn" id="simHistoryBtn" title="History (Ctrl+H)">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8.75-4.25a.75.75 0 0 0-1.5 0V8c0 .2.08.39.22.53l3 3a.75.75 0 0 0 1.06-1.06L8.75 7.69V3.75Z"/></svg>
            </button>
            <button class="chrome-icon-btn" id="simFindBtn" title="Find in page (Ctrl+F)">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1Z"/></svg>
            </button>
            <div class="chrome-profile-circle" title="Google Account: Speed Champion">G</div>
            <button class="chrome-icon-btn" title="Customize and control Google Chrome">⋮</button>
          </div>
        </div>

        <!-- Authentic Chrome Bookmarks Bar -->
        <div class="chrome-bookmarks-bar" id="simBookmarksBar"${!this.bookmarksBarVisible ? ' style="display:none"' : ''}>
          ${this.renderBookmarks()}
        </div>

        <!-- Webpage Viewport Area (Displaying Clean Meme Pictures) -->
        <div class="chrome-viewport ${this.isReloading ? 'reloading' : ''} ${this.inspectMode ? 'inspect-cursor' : ''} ${this.deviceMode ? 'device-mode-on' : ''} ${this.findHighlightActive ? 'find-highlights-on' : ''}" id="simViewport" style="transform: scale(${this.zoomLevel / 100}); transform-origin: top left;">
          ${this.deviceMode ? '<div class="chrome-device-frame"><div class="chrome-device-notch"></div>' : ''}
          ${this.renderViewportContent()}
          ${this.inspectMode ? this.renderInspectOverlay() : ''}
          ${this.findHighlightActive ? this.renderFindHighlights() : ''}
          ${this.deviceMode ? '</div>' : ''}
        </div>

        <!-- Chrome Find in Page Overlay -->
        <div class="chrome-find-bar ${this.findOverlayOpen ? 'active' : ''}" id="simFindBar">
          <input type="text" class="chrome-find-input" id="simFindInput" value="shortcuts" placeholder="Find in page..." />
          <span class="chrome-find-status">${this.findHighlightActive ? '2/4' : '1/3'}</span>
          <button class="chrome-find-btn" id="simFindClose">✕</button>
        </div>

        <!-- Downloads shelf -->
        <div class="chrome-downloads-shelf ${this.downloadsShelfOpen ? 'open' : ''}" id="simDownloadsShelf">
          <div class="chrome-dl-item">
            <span class="chrome-dl-icon">📦</span>
            <div class="chrome-dl-meta">
              <strong>meme-pack.zip</strong>
              <span>2.4 MB • Complete</span>
            </div>
            <button class="chrome-find-btn" id="simCloseDownloads">✕</button>
          </div>
        </div>

        <!-- Chrome History Side Drawer -->
        <div class="chrome-history-drawer ${this.historyPanelOpen ? 'open' : ''}" id="simHistoryDrawer">
          <div class="chrome-drawer-header">
            <h3>Chrome History</h3>
            <button class="chrome-find-btn" id="simCloseHistory">✕</button>
          </div>
          <ul class="chrome-history-list">
            <li><span class="hist-time">10:42 AM</span> <strong>Doge - Much Chrome</strong> <br><em>reddit.com/r/doge</em></li>
            <li><span class="hist-time">10:30 AM</span> <strong>This Is Fine - 99 Tabs</strong> <br><em>reddit.com/r/memes</em></li>
            <li><span class="hist-time">09:55 AM</span> <strong>Stonks - Diamond Hands</strong> <br><em>reddit.com/r/wallstreetbets</em></li>
            <li><span class="hist-time">09:15 AM</span> <strong>PopCat Leaderboard</strong> <br><em>popcat.click</em></li>
            <li><span class="hist-time">08:00 AM</span> <strong>GigaChad Shortcut Club</strong> <br><em>reddit.com/r/gigachad</em></li>
          </ul>
        </div>

        ${this.devtoolsOpen ? this.renderDevToolsDock() : ''}
        ${this.clearDataDialogOpen ? this.renderClearDataDialog() : ''}
        ${this.sourceOverlayOpen ? this.renderSourceOverlay() : ''}
        ${this.printOverlayOpen ? this.renderPrintOverlay() : ''}
        ${this.saveToastVisible ? this.renderSaveToast() : ''}
      </div>
    `;

    this.attachInternalListeners();
    if (this.inspectMode) {
      this.playInspectHighlightSequence();
    }
  }

  renderInspectOverlay() {
    return `
      <div class="chrome-inspect-layer" id="simInspectLayer">
        <div class="chrome-inspect-box" id="simInspectBox"></div>
        <div class="chrome-inspect-tooltip" id="simInspectTooltip">${this.inspectTargetLabel}</div>
      </div>
    `;
  }

  renderFindHighlights() {
    return `
      <div class="chrome-find-highlights" aria-hidden="true">
        <mark class="chrome-find-mark mark-1">shortcuts</mark>
        <mark class="chrome-find-mark mark-2 current">shortcuts</mark>
        <mark class="chrome-find-mark mark-3">shortcuts</mark>
      </div>
    `;
  }

  renderDevToolsDock() {
    const tabs = [
      { id: 'elements', label: 'Elements' },
      { id: 'console', label: 'Console' },
      { id: 'performance', label: 'Performance' }
    ];
    const tabButtons = tabs.map(t => `
      <button class="devtools-tab ${this.devtoolsTab === t.id ? 'active' : ''}" data-dt-tab="${t.id}">${t.label}</button>
    `).join('');

    let body = '';
    if (this.devtoolsTab === 'elements') {
      body = `
        <div class="devtools-elements-pane">
          <div class="devtools-dom-tree">
            <div class="dom-line">&lt;html&gt;</div>
            <div class="dom-line indent1">&lt;body&gt;</div>
            <div class="dom-line indent2">&lt;div class="chrome-webpage-surface"&gt;</div>
            <div class="dom-line indent3 selected">&lt;div class="meme-picture-frame"&gt;</div>
            <div class="dom-line indent4">&lt;div class="meme-top-text"&gt;...&lt;/div&gt;</div>
            <div class="dom-line indent3">&lt;/div&gt;</div>
            <div class="dom-line indent2">&lt;/div&gt;</div>
            <div class="dom-line indent1">&lt;/body&gt;</div>
            <div class="dom-line">&lt;/html&gt;</div>
          </div>
          <div class="devtools-styles-pane">
            <div class="devtools-styles-title">Styles</div>
            <div class="devtools-style-rule">
              <code>element.style { }</code>
            </div>
            <div class="devtools-style-rule">
              <code>.meme-picture-frame {</code>
              <code class="prop">  display: flex;</code>
              <code class="prop">  flex-direction: column;</code>
              <code>}</code>
            </div>
          </div>
        </div>
      `;
    } else if (this.devtoolsTab === 'console') {
      body = `
        <div class="devtools-console-pane">
          <div class="console-line log"><span class="console-prompt">&gt;</span> console.log('House of Chrome online')</div>
          <div class="console-line out">House of Chrome online</div>
          <div class="console-line warn">⚠ [ShortcutTrainer] 30 quests forged</div>
          <div class="console-input-row"><span>&gt;</span><span class="console-caret">|</span></div>
        </div>
      `;
    } else {
      body = `
        <div class="devtools-perf-pane">
          <div class="perf-toolbar">Recording… FPS 60 · JS Heap 42 MB</div>
          <div class="perf-chart">
            <div class="perf-bar" style="height:40%"></div>
            <div class="perf-bar" style="height:70%"></div>
            <div class="perf-bar" style="height:55%"></div>
            <div class="perf-bar spike" style="height:95%"></div>
            <div class="perf-bar" style="height:48%"></div>
            <div class="perf-bar" style="height:62%"></div>
            <div class="perf-bar" style="height:35%"></div>
            <div class="perf-bar" style="height:58%"></div>
          </div>
          <div class="perf-legend">Main thread · Scripting · Rendering · Painting</div>
        </div>
      `;
    }

    return `
      <div class="chrome-devtools-dock open" id="simDevToolsDock">
        <div class="devtools-header">
          <div class="devtools-tabs">${tabButtons}</div>
          <button class="chrome-find-btn" id="simCloseDevTools" title="Close DevTools">✕</button>
        </div>
        <div class="devtools-body">${body}</div>
      </div>
    `;
  }

  renderClearDataDialog() {
    return `
      <div class="chrome-dialog-backdrop" id="simClearDataDialog">
        <div class="chrome-dialog-card">
          <h3>Clear browsing data</h3>
          <label class="chrome-dialog-check"><input type="checkbox" checked disabled> Browsing history</label>
          <label class="chrome-dialog-check"><input type="checkbox" checked disabled> Cookies and other site data</label>
          <label class="chrome-dialog-check"><input type="checkbox" checked disabled> Cached images and files</label>
          <div class="chrome-dialog-actions">
            <button class="chrome-dialog-btn" id="simClearDataCancel">Cancel</button>
            <button class="chrome-dialog-btn primary" id="simClearDataConfirm">Clear data</button>
          </div>
        </div>
      </div>
    `;
  }

  renderSourceOverlay() {
    const active = this.getActiveTab();
    const url = active?.url || 'about:blank';
    return `
      <div class="chrome-source-overlay" id="simSourceOverlay">
        <div class="chrome-source-header">
          <strong>view-source:${url}</strong>
          <button class="chrome-find-btn" id="simCloseSource">✕</button>
        </div>
        <pre class="chrome-source-code">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;title&gt;${active?.title || 'Page'}&lt;/title&gt;
  &lt;/head&gt;
  &lt;body class="meme-realm"&gt;
    &lt;div class="meme-picture-frame"&gt;…&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
      </div>
    `;
  }

  renderPrintOverlay() {
    return `
      <div class="chrome-print-overlay" id="simPrintOverlay">
        <div class="chrome-print-sheet">
          <div class="print-preview-label">Print preview</div>
          <div class="print-preview-page">Iron Browser • Shortcut Scroll</div>
        </div>
        <button class="chrome-dialog-btn primary" id="simClosePrint">Done</button>
      </div>
    `;
  }

  renderSaveToast() {
    return `
      <div class="chrome-save-toast" id="simSaveToast">
        <span>💾</span> Page saved as <strong>shortcut-scroll.html</strong>
      </div>
    `;
  }

  renderTabs() {
    return this.tabs.map(tab => {
      let animClass = '';
      if (this.animTabId === tab.id && this.animTabClass) {
        animClass = this.animTabClass;
      }
      return `
        <div class="chrome-tab ${tab.active ? 'active' : ''} ${animClass}" data-id="${tab.id}" title="${tab.title}">
          <span class="chrome-tab-favicon">${tab.icon}</span>
          <span class="chrome-tab-title">${tab.title}</span>
          <button class="chrome-tab-close" data-id="${tab.id}" title="Close Tab (Ctrl+W)">
            <svg viewBox="0 0 16 16" width="9" height="9" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"/>
            </svg>
          </button>
        </div>
      `;
    }).join('');
  }

  renderBookmarks() {
    return this.bookmarks.map(key => {
      const meme = MEME_PICTURES[key];
      if (!meme) return '';
      const activeTab = this.getActiveTab();
      const isActive = activeTab && activeTab.memeKey === key;
      return `
        <button class="chrome-bookmark-chip ${isActive ? 'active-bookmark' : ''}" data-key="${key}" title="${meme.title}">
          <span class="bm-icon">${meme.icon}</span>
          <span class="bm-text">${meme.title.split(' - ')[0]}</span>
        </button>
      `;
    }).join('');
  }

  renderViewportContent() {
    const activeTab = this.getActiveTab();
    if (!activeTab) {
      return `
        <div class="chrome-empty-tab">
          <div style="font-size:3.5rem; margin-bottom:1rem;">🌐</div>
          <h2 style="font-size:1.8rem; margin-bottom:0.5rem;">No Tabs Open</h2>
          <p style="font-size:1.05rem;">Press <strong>Ctrl + T</strong> or click any bookmark above to summon a meme page.</p>
        </div>
      `;
    }

    const meme = MEME_PICTURES[activeTab.memeKey] || MEME_PICTURES.doge;
    const enterClass = this.isAnimEntering ? 'meme-shockwave-reveal' : '';
    return `
      <div class="chrome-webpage-surface ${enterClass}">
        <div class="webpage-meta-header">
          <span class="webpage-source">r/${meme.id} • Posted by u/ShortcutHero 2h ago</span>
          <span class="webpage-upvotes">▲ 42.9k upvotes • 💬 1,337 comments • 🏆 12 Awards</span>
        </div>
        ${meme.renderPicture()}
      </div>
    `;
  }

  // --- Attach Interactive Click Listeners for All Browser UI Elements ---
  attachInternalListeners() {
    // 1. Tab switching
    this.container.querySelectorAll('.chrome-tab').forEach(tabEl => {
      tabEl.addEventListener('click', (e) => {
        if (e.target.closest('.chrome-tab-close')) return;
        const id = parseInt(tabEl.dataset.id, 10);
        this.selectTab(id);
        window.soundEngine?.playClick();
      });
    });

    // 2. Tab close buttons
    this.container.querySelectorAll('.chrome-tab-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id, 10);
        this.closeTabById(id);
        window.soundEngine?.playSwordClash();
      });
    });

    // 3. New tab (+) button
    const newTabBtn = this.container.querySelector('#simNewTabBtn');
    if (newTabBtn) {
      newTabBtn.addEventListener('click', () => {
        this.openNewTab();
        window.soundEngine?.playClick();
      });
    }

    // 4. Back Navigation
    const backBtn = this.container.querySelector('#navBack');
    if (backBtn && !backBtn.classList.contains('disabled')) {
      backBtn.addEventListener('click', () => {
        this.navigateHistory(-1);
        window.soundEngine?.playClick();
      });
    }

    // 5. Forward Navigation
    const fwdBtn = this.container.querySelector('#navForward');
    if (fwdBtn && !fwdBtn.classList.contains('disabled')) {
      fwdBtn.addEventListener('click', () => {
        this.navigateHistory(1);
        window.soundEngine?.playClick();
      });
    }

    // 6. Reload Button
    const refreshBtn = this.container.querySelector('#navRefresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.reloadActiveTab();
        window.soundEngine?.playClick();
      });
    }

    // 7. Omnibox Submit / Enter
    const omniboxForm = this.container.querySelector('#simOmniboxForm');
    const omniboxInput = this.container.querySelector('#simOmniboxInput');
    if (omniboxForm && omniboxInput) {
      omniboxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.navigateOmnibox(omniboxInput.value.trim());
      });
      omniboxInput.addEventListener('focus', () => {
        this.omniboxFocused = true;
        omniboxInput.select();
      });
      omniboxInput.addEventListener('blur', () => {
        this.omniboxFocused = false;
      });
    }

    // 8. Bookmark Star Toggle Button
    const bmBtn = this.container.querySelector('#simBookmarkBtn');
    if (bmBtn) {
      bmBtn.addEventListener('click', () => {
        this.toggleBookmark();
        window.soundEngine?.playMagicChime();
      });
    }

    // 9. Bookmarks Bar Item Clicks
    this.container.querySelectorAll('.chrome-bookmark-chip').forEach(bmEl => {
      bmEl.addEventListener('click', () => {
        const key = bmEl.dataset.key;
        this.navigateToMeme(key);
        window.soundEngine?.playClick();
      });
    });

    // 10. Window Control Buttons
    const winClose = this.container.querySelector('#simWinClose');
    if (winClose) {
      winClose.addEventListener('click', () => {
        this.closeActiveTab();
        window.soundEngine?.playSwordClash();
      });
    }
    const winMax = this.container.querySelector('#simWinMax');
    if (winMax) {
      winMax.addEventListener('click', () => {
        this.zoomLevel = this.zoomLevel === 100 ? 115 : 100;
        this.render();
        window.soundEngine?.playClick();
      });
    }

    // 11. History & Find Overlays
    const histBtn = this.container.querySelector('#simHistoryBtn');
    if (histBtn) {
      histBtn.addEventListener('click', () => this.triggerHistory());
    }
    const findBtn = this.container.querySelector('#simFindBtn');
    if (findBtn) {
      findBtn.addEventListener('click', () => this.triggerFind());
    }
    const findClose = this.container.querySelector('#simFindClose');
    if (findClose) {
      findClose.addEventListener('click', () => {
        this.findOverlayOpen = false;
        this.findHighlightActive = false;
        this.render();
      });
    }
    const histClose = this.container.querySelector('#simCloseHistory');
    if (histClose) {
      histClose.addEventListener('click', () => {
        this.historyPanelOpen = false;
        this.render();
      });
    }

    const dlClose = this.container.querySelector('#simCloseDownloads');
    if (dlClose) {
      dlClose.addEventListener('click', () => {
        this.downloadsShelfOpen = false;
        this.render();
      });
    }

    const dtClose = this.container.querySelector('#simCloseDevTools');
    if (dtClose) {
      dtClose.addEventListener('click', () => {
        this.devtoolsOpen = false;
        this.inspectMode = false;
        this.render();
      });
    }

    this.container.querySelectorAll('[data-dt-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.devtoolsTab = btn.dataset.dtTab;
        this.render();
      });
    });

    const clearCancel = this.container.querySelector('#simClearDataCancel');
    const clearConfirm = this.container.querySelector('#simClearDataConfirm');
    const closeClear = () => {
      this.clearDataDialogOpen = false;
      this.render();
    };
    if (clearCancel) clearCancel.addEventListener('click', closeClear);
    if (clearConfirm) clearConfirm.addEventListener('click', closeClear);

    const closeSource = this.container.querySelector('#simCloseSource');
    if (closeSource) {
      closeSource.addEventListener('click', () => {
        this.sourceOverlayOpen = false;
        this.render();
      });
    }

    const closePrint = this.container.querySelector('#simClosePrint');
    if (closePrint) {
      closePrint.addEventListener('click', () => {
        this.printOverlayOpen = false;
        this.render();
      });
    }
  }

  // --- Browser Navigation Methods ---
  navigateToMeme(key) {
    const meme = MEME_PICTURES[key] || MEME_PICTURES.doge;
    const activeTab = this.getActiveTab();
    if (!activeTab) {
      this.openNewTab(key);
      return;
    }

    activeTab.memeKey = key;
    activeTab.title = meme.title;
    activeTab.url = meme.url;
    activeTab.icon = meme.icon;

    // Push to history
    if (activeTab.history[activeTab.historyIndex] !== meme.url) {
      activeTab.history = activeTab.history.slice(0, activeTab.historyIndex + 1);
      activeTab.history.push(meme.url);
      activeTab.historyIndex = activeTab.history.length - 1;
    }

    this.render();
  }

  navigateOmnibox(query) {
    const q = query.toLowerCase();
    let targetKey = 'doge';
    if (q.includes('fine') || q.includes('fire')) targetKey = 'thisisfine';
    else if (q.includes('stonk') || q.includes('moon') || q.includes('wsb')) targetKey = 'stonks';
    else if (q.includes('pop') || q.includes('cat')) targetKey = 'popcat';
    else if (q.includes('brain') || q.includes('galaxy')) targetKey = 'galaxybrain';
    else if (q.includes('drake') || q.includes('hotline')) targetKey = 'drake';
    else if (q.includes('chad') || q.includes('giga')) targetKey = 'gigachad';
    else if (MEME_PICTURES[q]) targetKey = q;

    this.navigateToMeme(targetKey);
  }

  navigateHistory(delta) {
    const activeTab = this.getActiveTab();
    if (!activeTab) return;

    const newIndex = activeTab.historyIndex + delta;
    if (newIndex >= 0 && newIndex < activeTab.history.length) {
      activeTab.historyIndex = newIndex;
      const targetUrl = activeTab.history[newIndex];
      const foundKey = Object.keys(MEME_PICTURES).find(k => MEME_PICTURES[k].url === targetUrl) || 'doge';
      const meme = MEME_PICTURES[foundKey];
      activeTab.memeKey = foundKey;
      activeTab.title = meme.title;
      activeTab.url = meme.url;
      activeTab.icon = meme.icon;
      this.render();
    }
  }

  reloadActiveTab() {
    this.isReloading = true;
    this.render();
    setTimeout(() => {
      this.isReloading = false;
      this.render();
    }, 300);
  }

  // --- Shortcut Actions Integration ---
  // --- Shortcut Actions Integration with Live Animations ---
  executeSimAction(actionType) {
    let feedback = '';

    switch (actionType) {
      case 'close_active_tab':
        feedback = this.closeActiveTabWithAnim();
        break;
      case 'open_new_tab':
        feedback = this.openNewTabWithAnim();
        break;
      case 'restore_closed_tab':
        feedback = this.restoreClosedTabWithAnim();
        break;
      case 'next_tab':
        feedback = this.switchNextTabWithAnim();
        break;
      case 'focus_omnibox':
        feedback = this.focusOmniboxWithAnim();
        break;
      case 'bookmark_page':
        feedback = this.toggleBookmarkWithAnim();
        break;
      case 'toggle_incognito':
        feedback = this.toggleIncognitoWithAnim();
        break;
      case 'find_on_page':
        feedback = this.triggerFind();
        break;
      case 'open_history':
        feedback = this.triggerHistory();
        break;
      case 'zoom_in':
        feedback = this.zoomInWithAnim();
        break;
      case 'prev_tab':
        feedback = this.switchPrevTabWithAnim();
        break;
      case 'go_back':
        feedback = this.goBackWithAnim();
        break;
      case 'go_forward':
        feedback = this.goForwardWithAnim();
        break;
      case 'reload_page':
        feedback = this.reloadWithAnim();
        break;
      case 'hard_reload':
        feedback = this.hardReloadWithAnim();
        break;
      case 'print_page':
        feedback = this.printPageAnim();
        break;
      case 'save_page':
        feedback = this.savePageAnim();
        break;
      case 'view_source':
        feedback = this.viewSourceAnim();
        break;
      case 'open_downloads':
        feedback = this.openDownloadsAnim();
        break;
      case 'toggle_bookmarks_bar':
        feedback = this.toggleBookmarksBarAnim();
        break;
      case 'clear_data':
        feedback = this.clearDataAnim();
        break;
      case 'zoom_out':
        feedback = this.zoomOutWithAnim();
        break;
      case 'reset_zoom':
        feedback = this.resetZoomWithAnim();
        break;
      case 'toggle_fullscreen':
        feedback = this.toggleFullscreenAnim();
        break;
      case 'jump_to_tab_1':
        feedback = this.jumpToTabAnim();
        break;
      case 'open_devtools':
        feedback = this.openDevToolsAnim();
        break;
      case 'open_console':
        feedback = this.openConsoleAnim();
        break;
      case 'inspect_element':
        feedback = this.inspectElementAnim();
        break;
      case 'toggle_device_mode':
        feedback = this.toggleDeviceModeAnim();
        break;
      case 'open_performance':
        feedback = this.openPerformanceAnim();
        break;
      default:
        break;
    }

    return feedback;
  }

  closeActiveTabWithAnim() {
    const activeIndex = this.tabs.findIndex(t => t.active);
    if (activeIndex === -1 || this.tabs.length === 0) {
      this.showHeroBadge('NO TABS OPEN!', 'Press Ctrl+T to summon a new tab', '⚠️');
      return 'No tab to close!';
    }

    const closed = this.tabs[activeIndex];
    const closedTitle = closed.title.split(' - ')[0];

    // 1. Trigger Full-Screen Cinematic Laser Slash & Tab Slicing
    this.triggerLaserSlash();

    const activeTabEl = this.container.querySelector(`.chrome-tab[data-id="${closed.id}"]`);
    if (activeTabEl) {
      activeTabEl.classList.add('tab-closing');
    }

    // 2. Perform tab removal & state update
    this.tabs.splice(activeIndex, 1);
    this.closedTabsStack.push(closed);

    if (this.tabs.length > 0) {
      const nextActiveIndex = Math.min(activeIndex, this.tabs.length - 1);
      this.tabs.forEach((t, i) => t.active = (i === nextActiveIndex));
    }

    // 3. Render after brief tab collapse animation
    this.isAnimEntering = true;
    setTimeout(() => {
      this.render();
      const newActive = this.getActiveTab();
      const nextTitle = newActive ? newActive.title.split(' - ')[0] : 'None';
      this.showHeroBadge('TAB TERMINATED!', `Slayed ${closedTitle} • Now viewing ${nextTitle}`, '⚔️');
    }, 200);

    return `Closed tab: "${closedTitle}"`;
  }

  closeActiveTab() {
    return this.closeActiveTabWithAnim();
  }

  closeTabById(id) {
    const idx = this.tabs.findIndex(t => t.id === id);
    if (idx !== -1) {
      const closed = this.tabs[idx];
      this.triggerLaserSlash();

      const closedTabEl = this.container.querySelector(`.chrome-tab[data-id="${closed.id}"]`);
      if (closedTabEl) {
        closedTabEl.classList.add('tab-closing');
      }

      this.tabs.splice(idx, 1);
      this.closedTabsStack.push(closed);
      if (closed.active && this.tabs.length > 0) {
        this.tabs[Math.max(0, idx - 1)].active = true;
      }

      this.isAnimEntering = true;
      setTimeout(() => {
        this.render();
        this.showHeroBadge('TAB CLOSED!', `Closed "${closed.title.split(' - ')[0]}"`, '✕');
      }, 200);
    }
  }

  openNewTabWithAnim(initialKey) {
    const keys = Object.keys(MEME_PICTURES);
    const chosenKey = initialKey || keys[this.tabs.length % keys.length];
    const meme = MEME_PICTURES[chosenKey];

    // Trigger Warp Sweep across viewport
    this.triggerWarpSweep();

    this.tabs.forEach(t => t.active = false);
    const newTab = {
      id: this.nextTabId++,
      memeKey: chosenKey,
      title: meme.title,
      url: meme.url,
      icon: meme.icon,
      active: true,
      history: [meme.url],
      historyIndex: 0
    };
    this.tabs.push(newTab);

    this.animTabId = newTab.id;
    this.animTabClass = 'tab-entering tab-spotlight-beacon';
    this.isAnimEntering = true;

    this.render();
    this.showHeroBadge('NEW TAB SUMMONED!', `${meme.title.split(' - ')[0]} Spawned!`, '🚀');

    setTimeout(() => {
      this.animTabId = null;
      this.animTabClass = '';
    }, 500);

    return `Opened tab: "${meme.title.split(' - ')[0]}"`;
  }

  openNewTab(initialKey) {
    return this.openNewTabWithAnim(initialKey);
  }

  restoreClosedTabWithAnim() {
    if (this.closedTabsStack.length === 0) {
      this.showHeroBadge('NO CLOSED TABS!', 'History chronicle has no recently closed tabs', '⚠️');
      return 'No closed tabs in history!';
    }

    this.triggerWarpSweep();

    this.tabs.forEach(t => t.active = false);
    const restored = this.closedTabsStack.pop();
    restored.active = true;
    this.tabs.push(restored);

    this.animTabId = restored.id;
    this.animTabClass = 'tab-entering tab-spotlight-beacon';
    this.isAnimEntering = true;

    this.render();
    this.showHeroBadge('TAB RESURRECTED!', `${restored.title.split(' - ')[0]} Restored to Life!`, '✨');

    setTimeout(() => {
      this.animTabId = null;
      this.animTabClass = '';
    }, 500);

    return `Reopened tab: "${restored.title.split(' - ')[0]}"`;
  }

  restoreClosedTab() {
    return this.restoreClosedTabWithAnim();
  }

  selectTab(id) {
    this.tabs.forEach(t => t.active = (t.id === id));
    this.animTabId = id;
    this.animTabClass = 'tab-spotlight-beacon';
    this.isAnimEntering = true;
    this.triggerWarpSweep();
    this.render();
    setTimeout(() => {
      this.animTabId = null;
      this.animTabClass = '';
    }, 450);
  }

  switchNextTabWithAnim() {
    if (this.tabs.length <= 1) {
      this.showHeroBadge('ONLY ONE TAB OPEN!', 'Press Ctrl+T to summon more tabs to switch between', 'ℹ️');
      return 'Only one tab open.';
    }

    this.triggerWarpSweep();

    const currentIndex = this.tabs.findIndex(t => t.active);
    const nextIndex = (currentIndex + 1) % this.tabs.length;
    this.tabs.forEach((t, i) => t.active = (i === nextIndex));

    const nextTab = this.tabs[nextIndex];
    this.animTabId = nextTab.id;
    this.animTabClass = 'tab-switched-pulse tab-spotlight-beacon';
    this.isAnimEntering = true;

    this.render();
    this.showHeroBadge('SWITCHED TAB!', `${nextTab.title.split(' - ')[0]} Active!`, '🔄');

    setTimeout(() => {
      this.animTabId = null;
      this.animTabClass = '';
    }, 450);

    return `Switched to: "${nextTab.title.split(' - ')[0]}"`;
  }

  switchNextTab() {
    return this.switchNextTabWithAnim();
  }

  focusOmniboxWithAnim() {
    this.focusOmnibox();
    const pill = this.container.querySelector('#simOmniboxForm');
    if (pill) {
      pill.classList.remove('omnibox-highlight-pulse');
      void pill.offsetWidth;
      pill.classList.add('omnibox-highlight-pulse');
    }
    this.showHeroBadge('OMNIBOX ILLUMINATED!', 'Address Bar Focused & Ready for URL', '🔍');
    return 'Omnibox Address Bar focused!';
  }

  focusOmnibox() {
    this.omniboxFocused = true;
    setTimeout(() => {
      const input = document.getElementById('simOmniboxInput');
      if (input) {
        input.focus();
        input.select();
      }
    }, 40);
    return 'Omnibox Address Bar focused!';
  }

  toggleBookmarkWithAnim() {
    const res = this.toggleBookmark();
    const starBtn = this.container.querySelector('#simBookmarkBtn');
    if (starBtn) {
      starBtn.classList.remove('star-burst-anim');
      void starBtn.offsetWidth;
      starBtn.classList.add('star-burst-anim');
    }
    const activeTab = this.getActiveTab();
    const name = activeTab ? activeTab.title.split(' - ')[0] : 'Page';
    this.showHeroBadge('PAGE BOOKMARKED!', `${name} Affixed to Chrome Favorites!`, '⭐');
    return res;
  }

  toggleBookmark() {
    const activeTab = this.getActiveTab();
    if (!activeTab) return 'No active tab to bookmark!';

    const key = activeTab.memeKey;
    const idx = this.bookmarks.indexOf(key);
    if (idx === -1) {
      this.bookmarks.push(key);
      this.render();
      return '★ Added to Bookmarks bar!';
    } else {
      this.bookmarks.splice(idx, 1);
      this.render();
      return '☆ Removed from Bookmarks bar.';
    }
  }

  toggleIncognitoWithAnim() {
    const res = this.toggleIncognito();
    this.showActionBanner(res, '🥷');
    return res;
  }

  toggleIncognito() {
    this.isIncognito = !this.isIncognito;
    this.isAnimEntering = true;
    this.render();
    return this.isIncognito ? '🥷 Switched to Incognito Mode!' : '☀️ Returned to Standard Window.';
  }

  triggerFind() {
    this.findOverlayOpen = !this.findOverlayOpen;
    this.findHighlightActive = this.findOverlayOpen;
    this.render();
    if (this.findOverlayOpen) {
      this.showHeroBadge('FIND ON PAGE!', 'Matches highlighted in the scroll', '🔍');
      setTimeout(() => {
        const input = this.container.querySelector('#simFindInput');
        if (input) {
          input.focus();
          input.select();
        }
      }, 40);
    }
    return this.findOverlayOpen ? '🔍 Find bar opened!' : '🔍 Find dismissed.';
  }

  triggerHistory() {
    this.historyPanelOpen = !this.historyPanelOpen;
    this.render();
    if (this.historyPanelOpen) {
      this.showHeroBadge('HISTORY CHRONICLE!', 'Visited realms unrolled', '📜');
    }
    return this.historyPanelOpen ? '📜 Chrome History opened!' : '📜 History closed.';
  }

  zoomInWithAnim() {
    const res = this.zoomIn();
    this.showHeroBadge(`VIEWPORT MAGNIFIED!`, `${this.zoomLevel}% zoom`, '🔍');
    return res;
  }

  zoomIn() {
    this.zoomLevel = this.zoomLevel >= 130 ? 100 : this.zoomLevel + 15;
    this.render();
    return `Zoom level: ${this.zoomLevel}%`;
  }

  switchPrevTabWithAnim() {
    if (this.tabs.length <= 1) {
      this.showHeroBadge('ONLY ONE TAB OPEN!', 'Press Ctrl+T to summon more tabs to switch between', 'ℹ️');
      return 'Only one tab open.';
    }

    this.triggerWarpSweep();

    const currentIndex = this.tabs.findIndex(t => t.active);
    const length = this.tabs.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    this.tabs.forEach((t, i) => t.active = (i === prevIndex));

    const prevTab = this.tabs[prevIndex];
    this.animTabId = prevTab.id;
    this.animTabClass = 'tab-switched-pulse tab-spotlight-beacon';
    this.isAnimEntering = true;

    this.render();
    this.showHeroBadge('PREVIOUS TAB!', `${prevTab.title.split(' - ')[0]} Active!`, '🔄');

    setTimeout(() => {
      this.animTabId = null;
      this.animTabClass = '';
    }, 450);

    return `Switched to: "${prevTab.title.split(' - ')[0]}"`;
  }

  goBackWithAnim() {
    const active = this.getActiveTab();
    const canGo = active && active.historyIndex > 0;
    this.navigateHistory(-1);
    this.triggerWarpSweep();
    this.showHeroBadge(
      canGo ? 'NAVIGATED BACK!' : 'END OF HISTORY!',
      canGo ? 'Returned to previous page' : 'No earlier page in this tab',
      '⬅️'
    );
    return canGo ? 'Navigated back!' : 'Already at oldest history entry.';
  }

  goForwardWithAnim() {
    const active = this.getActiveTab();
    const canGo = active && active.historyIndex < active.history.length - 1;
    this.navigateHistory(1);
    this.triggerWarpSweep();
    this.showHeroBadge(
      canGo ? 'NAVIGATED FORWARD!' : 'END OF HISTORY!',
      canGo ? 'Went to next page' : 'No forward page in this tab',
      '➡️'
    );
    return canGo ? 'Navigated forward!' : 'Already at newest history entry.';
  }

  reloadWithAnim() {
    this.reloadActiveTab();
    this.showHeroBadge('PAGE RELOADED!', 'Refreshed current page', '🔄');
    return 'Page reloaded!';
  }

  hardReloadWithAnim() {
    this.reloadActiveTab();
    this.showHeroBadge('HARD RELOAD!', 'Cache cleared and reloaded', '💥');
    this.triggerLaserSlash();
    return 'Hard reload complete!';
  }

  printPageAnim() {
    this.printOverlayOpen = true;
    this.sourceOverlayOpen = false;
    this.render();
    this.showHeroBadge('PRINT PREVIEW!', 'Preparing parchment copy', '🖨️');
    setTimeout(() => {
      this.printOverlayOpen = false;
      this.render();
    }, 2200);
    return 'Print dialog opened!';
  }

  savePageAnim() {
    this.saveToastVisible = true;
    this.render();
    this.showHeroBadge('PAGE ENGRAVED!', 'Saved for offline viewing', '💾');
    setTimeout(() => {
      this.saveToastVisible = false;
      this.render();
    }, 2000);
    return 'Page saved to scroll archive!';
  }

  viewSourceAnim() {
    this.sourceOverlayOpen = true;
    this.devtoolsOpen = false;
    this.render();
    this.showHeroBadge('VIEW SOURCE!', 'Raw HTML revealed', '📝');
    return 'Source code revealed!';
  }

  openDownloadsAnim() {
    this.downloadsShelfOpen = true;
    this.render();
    this.showHeroBadge('DOWNLOADS SHELF!', 'Plundered loot visible', '📦');
    return 'Downloads page opened!';
  }

  toggleBookmarksBarAnim() {
    this.bookmarksBarVisible = !this.bookmarksBarVisible;
    this.render();
    this.showHeroBadge(this.bookmarksBarVisible ? 'BOOKMARKS BAR SHOWN!' : 'BOOKMARKS BAR HIDDEN!', '', this.bookmarksBarVisible ? '🌟' : '🙈');
    return this.bookmarksBarVisible ? 'Bookmarks bar shown!' : 'Bookmarks bar hidden!';
  }

  clearDataAnim() {
    this.clearDataDialogOpen = true;
    this.triggerLaserSlash();
    this.render();
    this.showHeroBadge('CLEAR DATA DIALOG!', 'Purge the chronicles', '🧹');
    setTimeout(() => {
      if (this.clearDataDialogOpen) {
        this.clearDataDialogOpen = false;
        this.render();
      }
    }, 2400);
    return 'Browsing data cleared!';
  }

  zoomOutWithAnim() {
    this.zoomOut();
    this.showHeroBadge('VIEWPORT SHRUNK!', `${this.zoomLevel}% zoom`, '🔍');
    return `Zoom level: ${this.zoomLevel}%`;
  }

  zoomOut() {
    this.zoomLevel = Math.max(70, this.zoomLevel - 15);
    this.render();
  }

  resetZoomWithAnim() {
    this.resetZoom();
    this.showHeroBadge('ZOOM RESET!', 'Viewport at 100%', '🎯');
    return `Zoom level: ${this.zoomLevel}%`;
  }

  resetZoom() {
    this.zoomLevel = 100;
    this.render();
  }

  toggleFullscreenAnim() {
    this.simFullscreen = !this.simFullscreen;
    this.render();
    const win = this.container.querySelector('#chromeBrowserWindow');
    if (win) {
      win.classList.remove('sim-fullscreen-pulse');
      void win.offsetWidth;
      win.classList.add('sim-fullscreen-pulse');
    }
    this.showHeroBadge(
      this.simFullscreen ? 'SIM FULLSCREEN!' : 'WINDOWED AGAIN!',
      this.simFullscreen ? 'Iron Browser fills the arena' : 'Chrome chrome restored',
      '🖥️'
    );
    return 'Fullscreen toggled!';
  }

  jumpToTabAnim() {
    if (this.tabs.length > 0) {
      this.selectTab(this.tabs[0].id);
      this.showHeroBadge('JUMPED TO TAB 1!', 'First tab activated', '1️⃣');
      return 'Jumped to first tab!';
    }
    return 'No tabs open.';
  }

  openDevToolsPanel(tab = 'elements') {
    this.devtoolsOpen = true;
    this.devtoolsTab = tab;
    this.sourceOverlayOpen = false;
    this.render();
  }

  openDevToolsAnim() {
    this.inspectMode = false;
    this.openDevToolsPanel('elements');
    this.triggerWarpSweep();
    this.showHeroBadge('DEVTOOLS DOCKED!', 'Elements panel forged', '🔧');
    return 'DevTools opened!';
  }

  openConsoleAnim() {
    this.inspectMode = false;
    this.openDevToolsPanel('console');
    this.showHeroBadge('CONSOLE SUMMONED!', 'Ready for JS commands', '💻');
    return 'JavaScript console opened!';
  }

  inspectElementAnim() {
    // Chrome-like inspect: crosshair → highlight sweep → Elements dock
    this.inspectMode = true;
    this.inspectTargetLabel = 'div.meme-picture-frame';
    this.devtoolsOpen = false;
    this.render();
    this.showHeroBadge('INSPECT MODE!', 'Crosshair locked on the DOM', '🔍');

    // After highlight choreography, open Elements with selection
    clearTimeout(this._inspectOpenTimer);
    this._inspectOpenTimer = setTimeout(() => {
      this.inspectMode = false;
      this.openDevToolsPanel('elements');
      this.showHeroBadge('ELEMENT SELECTED!', this.inspectTargetLabel, '🎯');
    }, 1400);

    return 'Element inspector activated!';
  }

  playInspectHighlightSequence() {
    const box = this.container.querySelector('#simInspectBox');
    const tip = this.container.querySelector('#simInspectTooltip');
    const viewport = this.container.querySelector('#simViewport');
    if (!box || !viewport) return;

    const targets = [
      { label: 'span.webpage-source', top: 8, left: 12, width: 46, height: 6 },
      { label: 'div.meme-top-text', top: 18, left: 18, width: 64, height: 10 },
      { label: 'div.meme-picture-frame', top: 22, left: 14, width: 72, height: 58 }
    ];

    let step = 0;
    const applyStep = () => {
      const t = targets[Math.min(step, targets.length - 1)];
      this.inspectTargetLabel = t.label;
      box.style.top = `${t.top}%`;
      box.style.left = `${t.left}%`;
      box.style.width = `${t.width}%`;
      box.style.height = `${t.height}%`;
      if (tip) tip.textContent = t.label;
      box.classList.remove('inspect-flash');
      void box.offsetWidth;
      box.classList.add('inspect-flash');
      step += 1;
    };

    applyStep();
    clearInterval(this._inspectSweep);
    this._inspectSweep = setInterval(() => {
      if (step >= targets.length) {
        clearInterval(this._inspectSweep);
        return;
      }
      applyStep();
    }, 420);
  }

  toggleDeviceModeAnim() {
    this.deviceMode = !this.deviceMode;
    this.render();
    this.showHeroBadge(
      this.deviceMode ? 'DEVICE TOOLBAR!' : 'DESKTOP VIEW!',
      this.deviceMode ? 'Mobile viewport shape-shifted' : 'Full desktop canvas restored',
      '📱'
    );
    return 'Device toolbar toggled!';
  }

  openPerformanceAnim() {
    this.inspectMode = false;
    this.openDevToolsPanel('performance');
    this.showHeroBadge('PERFORMANCE PANEL!', 'Profiling memory and CPU', '📈');
    return 'Performance panel opened!';
  }
}
