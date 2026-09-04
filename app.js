/**
 * A Game of Chromes - Main Application Logic & Game Loop
 * Integrates procedural audio, Iron Browser simulation, shortcut interception,
 * Keyboard Lock API (Fullscreen Armor), welcome modal, daily streak tracking,
 * fantasy rank progression, per-shortcut mastery, achievements, and performance stats.
 */

import { detectOS, RANKS, getRankForXP, SHORTCUTS, REALMS, getShortcutsForRealm, matchesShortcut } from './shortcuts.js';
import { BrowserSimulator } from './browser-sim.js';

// ==========================================
// ACHIEVEMENT DEFINITIONS
// ==========================================
const ACHIEVEMENTS = [
  { id: 'first_blood', name: 'First Blood', icon: '🩸', desc: 'Complete your first quest', condition: (s) => s.totalCorrect >= 1 },
  { id: 'iron_fingers', name: 'Iron Fingers', icon: '🤌', desc: '5-streak without a miss', condition: (s) => s.bestStreak >= 5 },
  { id: 'untouchable', name: 'Untouchable', icon: '💎', desc: '15-streak without a miss', condition: (s) => s.bestStreak >= 15 },
  { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', desc: '5 strikes in under 8 seconds', condition: (s) => s.speedDemonTriggered },
  { id: 'tab_sorcerer', name: 'Tab Sorcerer', icon: '🧙', desc: 'Master all Iron Tabs shortcuts', condition: (s) => s.realmMastery.iron_tabs },
  { id: 'navigator_rogue', name: 'Navigator Rogue', icon: '🗺️', desc: "Master all Navigator's Guild shortcuts", condition: (s) => s.realmMastery.navigator_guild },
  { id: 'arcane_librarian', name: 'Arcane Librarian', icon: '📚', desc: 'Master all Arcane Library shortcuts', condition: (s) => s.realmMastery.arcane_library },
  { id: 'shadow_walker', name: 'Shadow Walker', icon: '🌑', desc: 'Master all Shadow Realm shortcuts', condition: (s) => s.realmMastery.shadow_realm },
  { id: 'lens_crafter', name: 'Lens Crafter', icon: '🔮', desc: "Master all Sorcerer's Lens shortcuts", condition: (s) => s.realmMastery.sorcerers_lens },
  { id: 'devtools_master', name: 'DevTools Forgemaster', icon: '⚒️', desc: 'Master all DevTools Forge shortcuts', condition: (s) => s.realmMastery.devtools_forge },
  { id: 'completionist', name: 'Completionist', icon: '👑', desc: 'Master all 30 shortcuts', condition: (s) => s.totalMastered >= 30 },
  { id: 'combat_veteran', name: 'Combat Veteran', icon: '⚔️', desc: 'Score 500+ in 60s Combat', condition: (s) => s.combatBest >= 500 },
  { id: 'marathon', name: 'Marathon Runner', icon: '🔥', desc: '7-day daily streak', condition: (s) => s.dailyStreak >= 7 },
  { id: 'perfectionist', name: 'Perfectionist', icon: '🎯', desc: '100% accuracy in a Campaign run (10+ quests)', condition: (s) => s.perfectRun },
  { id: 'gigachad', name: 'GigaChad Emperor', icon: '🏆', desc: 'Reach Supreme GigaChad Emperor rank', condition: (s) => s.currentRankNum >= 12 }
];

// Mastery level thresholds
const MASTERY_LEVELS = [
  { name: 'Untrained', minSuccesses: 0 },
  { name: 'Apprentice', minSuccesses: 3 },
  { name: 'Journeyman', minSuccesses: 8 },
  { name: 'Master', minSuccesses: 15 },
  { name: 'Legendary', minSuccesses: 25 }
];

function getMasteryLevel(successes) {
  for (let i = MASTERY_LEVELS.length - 1; i >= 0; i--) {
    if (successes >= MASTERY_LEVELS[i].minSuccesses) return i;
  }
  return 0;
}

class GameOfChromesApp {
  constructor() {
    this.currentOS = detectOS();
    this.xp = parseInt(localStorage.getItem('goc_xp') || '0', 10);
    this.currentRank = getRankForXP(this.xp);
    this.currentQuestIndex = 0;
    this.combo = 0;
    this.streak = this.initStreak();
    this.gameMode = 'campaign'; // 'campaign' | 'combat'
    this.combatTimer = null;
    this.combatTimeLeft = 60;
    this.combatScore = 0;
    this.isFullscreenArmor = false;
    this.isTransitioning = false; // Guard against rapid-mash exploit

    // Performance Stats
    this.sessionCorrect = 0;
    this.sessionIncorrect = 0;
    this.sessionCampaignCorrect = 0; // For perfect run tracking
    this.sessionCampaignTotal = 0;
    this.questStartTime = Date.now();
    this.reactionTimes = [];
    this.speedDemonTimestamps = []; // Track last 5 timestamps for speed demon
    this.bestStreak = parseInt(localStorage.getItem('goc_best_streak') || '0', 10);
    this.combatHighScores = JSON.parse(localStorage.getItem('goc_combat_scores') || '[]');

    // Per-shortcut mastery data
    this.masteryData = JSON.parse(localStorage.getItem('goc_mastery') || '{}');
    // Initialize missing shortcuts
    SHORTCUTS.forEach(s => {
      if (!this.masteryData[s.id]) {
        this.masteryData[s.id] = { successes: 0, attempts: 0, totalReactionMs: 0 };
      }
    });

    // Unlocked achievements
    this.unlockedAchievements = new Set(JSON.parse(localStorage.getItem('goc_achievements') || '[]'));

    // DOM Elements
    this.dom = {
      osToggleBtn: document.getElementById('osToggleBtn'),
      audioToggleBtn: document.getElementById('audioToggleBtn'),
      armorToggleBtn: document.getElementById('armorToggleBtn'),
      popupWindowBtn: document.getElementById('popupWindowBtn'),
      xpFraction: document.getElementById('xpFraction'),
      xpFill: document.getElementById('xpFill'),
      currentRankName: document.getElementById('currentRankName'),
      streakValue: document.getElementById('streakValue'),
      streakBox: document.getElementById('streakBox'),
      questTitle: document.getElementById('questTitle'),
      questLore: document.getElementById('questLore'),
      questBadge: document.getElementById('questBadge'),
      questCounter: document.getElementById('questCounter'),
      keycapsDisplay: document.getElementById('keycapsDisplay'),
      questFeedback: document.getElementById('questFeedback'),
      grimoireList: document.getElementById('grimoireList'),
      simContainer: document.getElementById('browserSimContainer'),
      modeBtnCampaign: document.getElementById('modeBtnCampaign'),
      modeBtnCombat: document.getElementById('modeBtnCombat'),
      modalBackdrop: document.getElementById('modalBackdrop'),
      modalTitle: document.getElementById('modalTitle'),
      modalDesc: document.getElementById('modalDesc'),
      modalCrest: document.getElementById('modalCrest'),
      modalCloseBtn: document.getElementById('modalCloseBtn'),
      welcomeModal: document.getElementById('welcomeModal'),
      welcomeFullscreenBtn: document.getElementById('welcomeFullscreenBtn'),
      welcomeWindowedBtn: document.getElementById('welcomeWindowedBtn'), // BUG FIX: was missing
      skipQuestBtn: document.getElementById('skipQuestBtn'),
      strikeBtn: document.getElementById('strikeBtn'),
      combatHud: document.getElementById('combatHud'),
      combatTimerDisplay: document.getElementById('combatTimerDisplay'), // BUG FIX: was missing
      targetKeysLabel: document.getElementById('targetKeysLabel'),
      questCommandDeck: document.getElementById('questCommandDeck'),
      openGrimoireBtn: document.getElementById('openGrimoireBtn'),
      grimoireModal: document.getElementById('grimoireModal'),
      closeGrimoireBtn: document.getElementById('closeGrimoireBtn'),
      // New UI elements
      comboIndicator: document.getElementById('comboIndicator'),
      comboValue: document.getElementById('comboValue'),
      statsBtn: document.getElementById('statsBtn'),
      statsModal: document.getElementById('statsModal'),
      closeStatsBtn: document.getElementById('closeStatsBtn'),
      closeStatsBtn2: document.getElementById('closeStatsBtn2'),
      achievementToastContainer: document.getElementById('achievementToastContainer'),
      // Stats display elements
      statTotalXP: document.getElementById('statTotalXP'),
      statAccuracy: document.getElementById('statAccuracy'),
      statAvgReaction: document.getElementById('statAvgReaction'),
      statBestStreak: document.getElementById('statBestStreak'),
      statMastered: document.getElementById('statMastered'),
      statCombatBest: document.getElementById('statCombatBest'),
      realmProgressList: document.getElementById('realmProgressList'),
      trophyGrid: document.getElementById('trophyGrid'),
      highscoresList: document.getElementById('highscoresList')
    };

    // Prevent accidental tab closure
    this.installBrowserArmor();

    // Initialize Simulator
    this.simulator = new BrowserSimulator(this.dom.simContainer);

    // Initialize Canvas Embers
    this.initEmberCanvas();

    // Bind UI & Keyboard Events
    this.bindEvents();

    // Render Initial State
    this.updateOSUI();
    this.renderQuest();
    this.renderGrimoire();
    this.updateStatsUI();
    this.updateComboUI();
  }

  // --- Browser Armor & Tab Close Prevention ---
  installBrowserArmor() {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = 'A Game of Chromes battle is currently in progress!';
      return e.returnValue;
    });
  }

  async toggleFullscreenArmor() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        this.isFullscreenArmor = true;
        if (navigator.keyboard && navigator.keyboard.lock) {
          await navigator.keyboard.lock(['KeyW', 'KeyT', 'KeyN', 'KeyH', 'KeyL', 'KeyD', 'Tab', 'KeyR', 'KeyS', 'KeyP', 'KeyJ', 'KeyU', 'KeyB', 'KeyF', 'KeyE', 'KeyM', 'KeyC']);
          console.log("Keyboard Lock engaged for browser shortcuts.");
        }
        if (this.dom.armorToggleBtn) {
          this.dom.armorToggleBtn.innerHTML = '🛡️ Fullscreen Active';
          this.dom.armorToggleBtn.classList.add('armor-active');
        }
        this.dom.questFeedback.textContent = '🛡️ Fullscreen Mode Active! Browser shortcuts are locked to the game.';
        this.dom.questFeedback.className = 'quest-feedback success';
      } else {
        await document.exitFullscreen();
        if (navigator.keyboard && navigator.keyboard.unlock) {
          navigator.keyboard.unlock();
        }
        this.isFullscreenArmor = false;
        if (this.dom.armorToggleBtn) {
          this.dom.armorToggleBtn.innerHTML = '🛡️ Fullscreen Mode';
          this.dom.armorToggleBtn.classList.remove('armor-active');
        }
      }
    } catch (err) {
      console.warn("Fullscreen/KeyboardLock error:", err);
      this.dom.questFeedback.textContent = '🛡️ Tip: Use Fullscreen mode to practice all shortcuts including Ctrl+W safely!';
    }
  }

  // --- Streak Tracker ---
  initStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = localStorage.getItem('goc_last_date');
    let streak = parseInt(localStorage.getItem('goc_streak') || '1', 10);

    if (!lastDate) {
      localStorage.setItem('goc_last_date', today);
      localStorage.setItem('goc_streak', '1');
      return 1;
    }

    if (lastDate === today) {
      return streak;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (lastDate === yesterday) {
      streak += 1;
      localStorage.setItem('goc_streak', streak.toString());
      localStorage.setItem('goc_last_date', today);
    } else {
      streak = 1;
      localStorage.setItem('goc_streak', '1');
      localStorage.setItem('goc_last_date', today);
    }
    return streak;
  }

  // --- UI Binding ---
  bindEvents() {
    // OS Toggle Button
    this.dom.osToggleBtn?.addEventListener('click', () => {
      this.currentOS = this.currentOS === 'mac' ? 'windows' : 'mac';
      this.updateOSUI();
      this.renderQuest();
      this.renderGrimoire();
      window.soundEngine.playClick();
    });

    // Audio Toggle
    this.dom.audioToggleBtn?.addEventListener('click', () => {
      const isMuted = window.soundEngine.toggleMute();
      this.dom.audioToggleBtn.innerHTML = isMuted ? '🔇 Audio Muted' : '🔊 Audio';
      window.soundEngine.playClick();
    });

    // Fullscreen Armor Toggle Button
    this.dom.armorToggleBtn?.addEventListener('click', () => {
      this.toggleFullscreenArmor();
      window.soundEngine.playClick();
    });

    // Welcome Modal Buttons
    this.dom.welcomeFullscreenBtn?.addEventListener('click', () => {
      this.dom.welcomeModal?.classList.remove('show');
      this.toggleFullscreenArmor();
      window.soundEngine.playClick();
    });

    // BUG FIX: welcomeWindowedBtn was missing from this.dom
    this.dom.welcomeWindowedBtn?.addEventListener('click', () => {
      this.dom.welcomeModal?.classList.remove('show');
      window.soundEngine.playClick();
    });

    // Dedicated Popup App Window Launcher
    this.dom.popupWindowBtn?.addEventListener('click', () => {
      window.open(window.location.href, '_blank', 'popup=yes,width=1340,height=880');
      window.soundEngine.playClick();
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.isFullscreenArmor = false;
        if (this.dom.armorToggleBtn) {
          this.dom.armorToggleBtn.innerHTML = '🛡️ Fullscreen Mode';
          this.dom.armorToggleBtn.classList.remove('armor-active');
        }
      } else {
        this.isFullscreenArmor = true;
        if (this.dom.armorToggleBtn) {
          this.dom.armorToggleBtn.innerHTML = '🛡️ Fullscreen Active';
          this.dom.armorToggleBtn.classList.add('armor-active');
        }
      }
    });

    // Skip Quest Button
    this.dom.skipQuestBtn?.addEventListener('click', () => {
      this.nextQuest();
      window.soundEngine.playClick();
    });

    // Strike Shortcut Button
    this.dom.strikeBtn?.addEventListener('click', () => {
      this.handleSuccessStrike(this.getCurrentQuest());
    });

    // Mode Buttons
    this.dom.modeBtnCampaign?.addEventListener('click', () => {
      this.setMode('campaign');
      window.soundEngine.playClick();
    });

    this.dom.modeBtnCombat?.addEventListener('click', () => {
      this.setMode('combat');
      window.soundEngine.playClick();
    });

    // Modal Close Button
    this.dom.modalCloseBtn?.addEventListener('click', () => {
      this.dom.modalBackdrop.classList.remove('show');
      window.soundEngine.playClick();
    });

    // Open/Close Grimoire Modal
    this.dom.openGrimoireBtn?.addEventListener('click', () => {
      this.dom.grimoireModal?.classList.add('show');
      window.soundEngine?.playClick();
    });
    this.dom.closeGrimoireBtn?.addEventListener('click', () => {
      this.dom.grimoireModal?.classList.remove('show');
      window.soundEngine?.playClick();
    });

    // Stats Dashboard Modal
    this.dom.statsBtn?.addEventListener('click', () => {
      this.renderStatsModal();
      this.dom.statsModal?.classList.add('show');
      window.soundEngine?.playClick();
    });
    this.dom.closeStatsBtn?.addEventListener('click', () => {
      this.dom.statsModal?.classList.remove('show');
      window.soundEngine?.playClick();
    });
    this.dom.closeStatsBtn2?.addEventListener('click', () => {
      this.dom.statsModal?.classList.remove('show');
      window.soundEngine?.playClick();
    });

    // BUG FIX: Only ONE keydown listener (was duplicate on both window and document)
    window.addEventListener('keydown', (e) => this.handleKeyDown(e), { capture: true, passive: false });
    window.addEventListener('keyup', (e) => this.handleKeyUp(e), { capture: true });
  }

  updateOSUI() {
    if (this.dom.osToggleBtn) {
      this.dom.osToggleBtn.innerHTML = this.currentOS === 'mac' 
        ? '🍎 macOS (⌘)' 
        : '🪟 Windows (Ctrl)';
    }
  }

  getCurrentQuest() {
    return SHORTCUTS[this.currentQuestIndex] || SHORTCUTS[0];
  }

  // --- Render Quest ---
  renderQuest() {
    const quest = this.getCurrentQuest();
    if (!quest) return;

    this.questStartTime = Date.now(); // Track reaction time

    this.dom.questTitle.textContent = quest.title;
    this.dom.questLore.textContent = `"${quest.lore}"`;
    this.dom.questBadge.textContent = `${quest.category} • ${quest.difficulty}`;
    this.dom.questCounter.textContent = `Quest ${this.currentQuestIndex + 1} of ${SHORTCUTS.length}`;
    if (this.dom.targetKeysLabel) {
      this.dom.targetKeysLabel.textContent = `Action: ${quest.actionName}`;
    }
    this.dom.questFeedback.textContent = quest.hint;
    this.dom.questFeedback.className = 'quest-feedback';

    // Render interactive keycaps
    const req = quest.keys[this.currentOS] || quest.keys.windows;
    const keysHtml = req.display.map(k => `
      <button class="keycap interactive-keycap" data-key="${k.toLowerCase()}" title="Click to trigger ${k}">
        ${k}
      </button>
    `).join('<span class="key-plus">+</span>');
    this.dom.keycapsDisplay.innerHTML = keysHtml;

    // Attach click listeners to keycaps
    this.dom.keycapsDisplay.querySelectorAll('.interactive-keycap').forEach(cap => {
      cap.addEventListener('click', () => {
        cap.classList.add('active-press');
        setTimeout(() => cap.classList.remove('active-press'), 200);
        this.handleSuccessStrike(quest);
      });
    });

    // Highlight active item in Grimoire
    document.querySelectorAll('.grimoire-item').forEach(item => {
      item.classList.toggle('active-quest', item.dataset.id === quest.id);
    });
  }

  // --- Render Grimoire List (Organized by Realm) ---
  renderGrimoire() {
    if (!this.dom.grimoireList) return;

    let html = '';
    REALMS.forEach(realm => {
      const realmShortcuts = getShortcutsForRealm(realm.id);
      html += `
        <div class="grimoire-realm-header">
          <span class="grimoire-realm-icon">${realm.icon}</span>
          <span class="grimoire-realm-name">${realm.name}</span>
          <span class="grimoire-realm-count">${realmShortcuts.length} shortcuts</span>
        </div>
      `;

      realmShortcuts.forEach(quest => {
        const globalIdx = SHORTCUTS.indexOf(quest);
        const req = quest.keys[this.currentOS] || quest.keys.windows;
        const keyStr = req.display.join(' + ');
        const mastery = this.masteryData[quest.id] || { successes: 0 };
        const masteryLvl = getMasteryLevel(mastery.successes);
        const masteryPips = Array.from({ length: 5 }, (_, i) =>
          `<div class="mastery-pip ${i < masteryLvl ? 'filled' : ''}"></div>`
        ).join('');

        html += `
          <div class="grimoire-item ${globalIdx === this.currentQuestIndex ? 'active-quest' : ''}" data-id="${quest.id}" data-idx="${globalIdx}">
            <span><strong>${quest.actionName}</strong> <small style="color:#64748b">(${quest.difficulty})</small></span>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <div class="grimoire-mastery">${masteryPips}</div>
              <span class="grimoire-keys">${keyStr}</span>
            </div>
          </div>
        `;
      });
    });

    this.dom.grimoireList.innerHTML = html;

    // Clicking a grimoire item selects that quest
    this.dom.grimoireList.querySelectorAll('.grimoire-item').forEach(item => {
      item.addEventListener('click', () => {
        this.currentQuestIndex = parseInt(item.dataset.idx, 10);
        this.renderQuest();
        this.dom.grimoireModal?.classList.remove('show');
        window.soundEngine.playClick();
      });
    });
  }

  // --- Keyboard Event Interceptor ---
  handleKeyDown(event) {
    const key = event.key || '';

    // Check if Welcome Modal is active
    if (this.dom.welcomeModal && this.dom.welcomeModal.classList.contains('show')) {
      if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        this.dom.welcomeModal.classList.remove('show');
        this.toggleFullscreenArmor();
        window.soundEngine.playClick();
        return;
      }
      if (key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.dom.welcomeModal.classList.remove('show');
        window.soundEngine.playClick();
        return;
      }
      return;
    }

    // Check if Prize / Rank Promotion Modal is active
    if (this.dom.modalBackdrop && this.dom.modalBackdrop.classList.contains('show')) {
      if (key === 'Enter' || key === ' ' || key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.dom.modalBackdrop.classList.remove('show');
        window.soundEngine.playClick();
        return;
      }
      return;
    }

    // Check if Stats Modal is active
    if (this.dom.statsModal && this.dom.statsModal.classList.contains('show')) {
      if (key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.dom.statsModal.classList.remove('show');
        window.soundEngine.playClick();
        return;
      }
      return;
    }

    // Check if Grimoire Modal is active
    if (this.dom.grimoireModal && this.dom.grimoireModal.classList.contains('show')) {
      if (key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.dom.grimoireModal.classList.remove('show');
        window.soundEngine.playClick();
        return;
      }
    }

    const isModifierPressed = event.ctrlKey || event.metaKey || event.altKey;
    const activeQuest = this.getCurrentQuest();
    const isTargetMatch = matchesShortcut(event, activeQuest, this.currentOS);

    const restrictedKeys = ['w', 't', 'l', 'd', 'h', 'j', 'f', 'r', 'n', 's', 'p', 'u', 'b', 'e', 'm', 'c', 'tab', 'arrowright', 'arrowleft', '+', '-', '=', '0', '1', 'delete'];
    const keyLower = key.toLowerCase();

    // Prevent default browser accelerator actions
    if (isModifierPressed && (restrictedKeys.includes(keyLower) || event.code === 'Tab')) {
      try {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      } catch (err) {
        // Safe fallback
      }
    }

    // Also prevent F-key defaults
    if (['F5', 'F11', 'F12'].includes(key)) {
      try {
        event.preventDefault();
        event.stopPropagation();
      } catch (err) {}
    }

    // Highlight keycaps visually in real-time
    this.highlightActiveKeycaps(event, true);

    if (isTargetMatch) {
      try {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      } catch (e) {}
      // BUG FIX: Guard against rapid-mash exploit during transition
      if (!this.isTransitioning) {
        this.handleSuccessStrike(activeQuest);
      }
    } else if (
      (isModifierPressed || ['F5', 'F11', 'F12'].includes(key)) &&
      key !== 'Control' && key !== 'Meta' && key !== 'Shift' && key !== 'Alt'
    ) {
      this.handleFailedStrike(activeQuest);
    }
  }

  handleKeyUp(event) {
    this.highlightActiveKeycaps(event, false);
  }

  highlightActiveKeycaps(event, isDown) {
    const keycaps = this.dom.keycapsDisplay?.querySelectorAll('.keycap');
    if (!keycaps) return;

    keycaps.forEach(cap => {
      const text = cap.textContent.trim().toLowerCase();
      let match = false;

      if ((text === 'cmd' || text === '⌘') && (event.metaKey || event.ctrlKey)) match = true;
      if (text === 'ctrl' && (event.ctrlKey || event.metaKey)) match = true;
      if ((text === 'shift' || text === '⇧') && event.shiftKey) match = true;
      if ((text === 'alt' || text === '⌥') && event.altKey) match = true;
      if (text === (event.key || '').toLowerCase()) match = true;
      if (text === '→' && event.key === 'ArrowRight') match = true;
      if (text === '←' && event.key === 'ArrowLeft') match = true;
      if (text === 'tab' && event.key === 'Tab') match = true;
      if (text === '+' && (event.key === '+' || event.key === '=')) match = true;
      if (text === '−' && (event.key === '-' || event.key === '_')) match = true;
      if (text === 'delete' && (event.key === 'Delete' || event.key === 'Backspace')) match = true;
      if (text === 'f5' && event.key === 'F5') match = true;
      if (text === 'f11' && event.key === 'F11') match = true;
      if (text === 'f12' && event.key === 'F12') match = true;

      if (match) {
        cap.classList.toggle('active-press', isDown);
      } else if (!isDown) {
        cap.classList.remove('active-press');
      }
    });
  }

  // --- Success Handler ---
  handleSuccessStrike(quest) {
    // BUG FIX: Prevent rapid-mash during quest transition
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Track reaction time
    const reactionMs = Date.now() - this.questStartTime;
    this.reactionTimes.push(reactionMs);
    if (this.reactionTimes.length > 100) this.reactionTimes.shift();

    // Track speed demon (5 strikes in 8 seconds)
    const now = Date.now();
    this.speedDemonTimestamps.push(now);
    if (this.speedDemonTimestamps.length > 5) this.speedDemonTimestamps.shift();

    // 1. Audio Fanfare (combo escalation)
    if (this.combo >= 3) {
      window.soundEngine.playComboStrike?.(this.combo) || window.soundEngine.playSwordClash();
    } else {
      window.soundEngine.playSwordClash();
    }

    // 2. Combo & Score
    this.combo += 1;
    this.sessionCorrect += 1;
    if (this.gameMode === 'campaign') {
      this.sessionCampaignCorrect += 1;
      this.sessionCampaignTotal += 1;
    }

    // Track best streak
    if (this.combo > this.bestStreak) {
      this.bestStreak = this.combo;
      localStorage.setItem('goc_best_streak', this.bestStreak.toString());
    }

    // Critical Hit! (~15% chance for 2x bonus XP)
    const isCriticalHit = Math.random() < 0.15;
    const baseXP = 50 + (this.combo > 1 ? (this.combo - 1) * 10 : 0);
    const gainedXP = isCriticalHit ? baseXP * 2 : baseXP;

    this.addXP(gainedXP);

    if (this.gameMode === 'combat') {
      this.combatScore += gainedXP;
    }

    // 3. Update mastery data
    const masteryEntry = this.masteryData[quest.id] || { successes: 0, attempts: 0, totalReactionMs: 0 };
    masteryEntry.successes += 1;
    masteryEntry.attempts += 1;
    masteryEntry.totalReactionMs += reactionMs;
    this.masteryData[quest.id] = masteryEntry;
    this.saveMastery();

    // 4. Trigger Mock Iron Browser Simulation Action
    const feedbackLore = this.simulator.executeSimAction(quest.simAction);

    // 5. Visual Feedback
    const critText = isCriticalHit ? ' ⚡ CRITICAL HIT!' : '';
    this.dom.questFeedback.textContent = `⚔️ STRIKE! ${feedbackLore || quest.actionName + ' executed!'}${critText}`;
    this.dom.questFeedback.className = 'quest-feedback success';
    this.spawnSwordClash();

    if (isCriticalHit) {
      window.soundEngine.playCriticalHit?.();
      this.spawnFloatingToast(`⚡ CRITICAL! +${gainedXP} XP`, true);
    } else {
      this.spawnFloatingToast(`+${gainedXP} XP ${this.combo > 1 ? `(${this.combo}x Combo!)` : ''}`);
    }

    // 6. Update combo UI
    this.updateComboUI();

    // Pulse action deck with success gold
    if (this.dom.questCommandDeck) {
      this.dom.questCommandDeck.classList.add('deck-strike-glow');
      setTimeout(() => {
        this.dom.questCommandDeck?.classList.remove('deck-strike-glow');
      }, 700);
    }

    // 7. Check achievements
    this.checkAchievements();

    // 8. Advance Quest after animation showcase
    setTimeout(() => {
      this.nextQuest();
      this.isTransitioning = false; // Allow next input
    }, 850);
  }

  // --- Failure / Hint Handler ---
  handleFailedStrike(quest) {
    window.soundEngine.playShieldThud();
    this.combo = 0;
    this.sessionIncorrect += 1;
    if (this.gameMode === 'campaign') {
      this.sessionCampaignTotal += 1;
    }
    this.updateComboUI();

    // Shake Command Deck
    const deck = this.dom.questCommandDeck;
    if (deck) {
      deck.classList.remove('shake-screen');
      void deck.offsetWidth; // trigger reflow
      deck.classList.add('shake-screen');
    }

    this.dom.questFeedback.textContent = `🛡️ BLOCKED! Incorrect key combination. Hint: ${quest.hint}`;
    this.dom.questFeedback.className = 'quest-feedback error';
  }

  nextQuest() {
    if (this.gameMode === 'combat') {
      this.currentQuestIndex = Math.floor(Math.random() * SHORTCUTS.length);
    } else {
      this.currentQuestIndex = (this.currentQuestIndex + 1) % SHORTCUTS.length;
    }
    this.renderQuest();
  }

  // --- Combo UI ---
  updateComboUI() {
    if (this.dom.comboIndicator) {
      const level = Math.min(5, this.combo);
      this.dom.comboIndicator.setAttribute('data-combo', level.toString());
    }
    if (this.dom.comboValue) {
      this.dom.comboValue.textContent = `${this.combo}x`;
    }
  }

  // --- XP & Rank Progression ---
  addXP(amount) {
    const oldRank = this.currentRank;
    this.xp += amount;
    localStorage.setItem('goc_xp', this.xp.toString());

    this.currentRank = getRankForXP(this.xp);
    this.updateStatsUI();

    // Check for Rank Promotion!
    if (this.currentRank.rank > oldRank.rank) {
      this.showRankUpPromotion(this.currentRank);
    }
  }

  updateStatsUI() {
    this.dom.currentRankName.textContent = `${this.currentRank.icon} ${this.currentRank.title}`;
    this.dom.streakValue.textContent = `${this.streak} Day${this.streak > 1 ? 's' : ''}`;

    // XP Bar
    const currentTierMin = this.currentRank.minXP;
    const currentTierMax = this.currentRank.maxXP === Infinity ? this.currentRank.minXP + 1500 : this.currentRank.maxXP;
    const tierProgress = this.xp - currentTierMin;
    const tierTotal = currentTierMax - currentTierMin;
    const pct = Math.min(100, Math.max(0, (tierProgress / tierTotal) * 100));

    this.dom.xpFill.style.width = `${pct}%`;
    this.dom.xpFraction.textContent = `${this.xp} / ${this.currentRank.maxXP === Infinity ? 'MAX' : currentTierMax} XP`;
  }

  showRankUpPromotion(newRank) {
    window.soundEngine.playRankUpFanfare();
    this.dom.modalCrest.textContent = newRank.icon;
    this.dom.modalTitle.textContent = `PROMOTED: ${newRank.title}!`;
    this.dom.modalDesc.textContent = `By Royal Decree, your mastery of the Iron Browser has granted thee the rank of ${newRank.title} (${newRank.badge})! Keep defending the realm!`;
    this.dom.modalBackdrop.classList.add('show');
  }

  // --- Achievement System ---
  checkAchievements() {
    const totalMastered = Object.values(this.masteryData).filter(m => getMasteryLevel(m.successes) >= 3).length;

    // Check speed demon (5 strikes in 8 seconds)
    let speedDemonTriggered = false;
    if (this.speedDemonTimestamps.length >= 5) {
      const diff = this.speedDemonTimestamps[4] - this.speedDemonTimestamps[0];
      if (diff <= 8000) speedDemonTriggered = true;
    }

    // Check perfect campaign run
    const perfectRun = this.sessionCampaignTotal >= 10 && this.sessionCampaignCorrect === this.sessionCampaignTotal;

    // Build realm mastery status
    const realmMastery = {};
    REALMS.forEach(realm => {
      const realmShortcuts = getShortcutsForRealm(realm.id);
      const allMastered = realmShortcuts.every(s => {
        const m = this.masteryData[s.id];
        return m && getMasteryLevel(m.successes) >= 3;
      });
      realmMastery[realm.id] = allMastered;
    });

    const state = {
      totalCorrect: this.sessionCorrect + parseInt(localStorage.getItem('goc_total_correct') || '0', 10),
      bestStreak: this.bestStreak,
      speedDemonTriggered,
      realmMastery,
      totalMastered,
      combatBest: this.combatHighScores.length > 0 ? Math.max(...this.combatHighScores.map(s => s.score)) : 0,
      dailyStreak: this.streak,
      perfectRun,
      currentRankNum: this.currentRank.rank
    };

    // Save total correct
    localStorage.setItem('goc_total_correct', state.totalCorrect.toString());

    ACHIEVEMENTS.forEach(ach => {
      if (!this.unlockedAchievements.has(ach.id) && ach.condition(state)) {
        this.unlockAchievement(ach);
      }
    });
  }

  unlockAchievement(achievement) {
    this.unlockedAchievements.add(achievement.id);
    localStorage.setItem('goc_achievements', JSON.stringify([...this.unlockedAchievements]));

    // Play achievement chime
    window.soundEngine.playAchievementChime?.() || window.soundEngine.playMagicChime();

    // Show toast notification
    this.showAchievementToast(achievement);
  }

  showAchievementToast(achievement) {
    const container = this.dom.achievementToastContainer;
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <span class="achievement-toast-icon">${achievement.icon}</span>
      <div class="achievement-toast-content">
        <span class="achievement-toast-label">Achievement Unlocked</span>
        <span class="achievement-toast-title">${achievement.name}</span>
        <span class="achievement-toast-desc">${achievement.desc}</span>
      </div>
    `;
    container.appendChild(toast);

    // Remove after animation completes
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 4200);
  }

  // --- Mastery Persistence ---
  saveMastery() {
    localStorage.setItem('goc_mastery', JSON.stringify(this.masteryData));
  }

  // --- Stats Dashboard Rendering ---
  renderStatsModal() {
    // Total stats
    const totalCorrect = this.sessionCorrect + parseInt(localStorage.getItem('goc_total_correct') || '0', 10);
    const totalAttempts = totalCorrect + this.sessionIncorrect;
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const avgReaction = this.reactionTimes.length > 0
      ? Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length)
      : null;
    const totalMastered = Object.values(this.masteryData).filter(m => getMasteryLevel(m.successes) >= 3).length;
    const combatBest = this.combatHighScores.length > 0 ? Math.max(...this.combatHighScores.map(s => s.score)) : 0;

    // Update metric values
    if (this.dom.statTotalXP) this.dom.statTotalXP.textContent = this.xp.toLocaleString();
    if (this.dom.statAccuracy) this.dom.statAccuracy.textContent = `${accuracy}%`;
    if (this.dom.statAvgReaction) this.dom.statAvgReaction.textContent = avgReaction ? `${avgReaction}ms` : '—';
    if (this.dom.statBestStreak) this.dom.statBestStreak.textContent = this.bestStreak.toString();
    if (this.dom.statMastered) this.dom.statMastered.textContent = `${totalMastered}/30`;
    if (this.dom.statCombatBest) this.dom.statCombatBest.textContent = combatBest.toString();

    // Realm progress
    if (this.dom.realmProgressList) {
      this.dom.realmProgressList.innerHTML = REALMS.map(realm => {
        const realmShortcuts = getShortcutsForRealm(realm.id);
        const masteredCount = realmShortcuts.filter(s => {
          const m = this.masteryData[s.id];
          return m && getMasteryLevel(m.successes) >= 3;
        }).length;
        const pct = Math.round((masteredCount / realmShortcuts.length) * 100);

        return `
          <div class="realm-progress-item">
            <span class="realm-progress-icon">${realm.icon}</span>
            <div class="realm-progress-info">
              <span class="realm-progress-name">${realm.name}</span>
              <div class="realm-progress-bar-track">
                <div class="realm-progress-bar-fill" style="width: ${pct}%"></div>
              </div>
            </div>
            <span class="realm-progress-pct">${pct}%</span>
          </div>
        `;
      }).join('');
    }

    // Trophies
    if (this.dom.trophyGrid) {
      this.dom.trophyGrid.innerHTML = ACHIEVEMENTS.map(ach => {
        const unlocked = this.unlockedAchievements.has(ach.id);
        return `
          <div class="trophy-item ${unlocked ? 'unlocked' : 'locked'}" title="${ach.desc}">
            <span class="trophy-item-icon">${ach.icon}</span>
            <span class="trophy-item-name">${ach.name}</span>
          </div>
        `;
      }).join('');
    }

    // High scores
    if (this.dom.highscoresList) {
      if (this.combatHighScores.length === 0) {
        this.dom.highscoresList.innerHTML = '<div class="highscore-item" style="color: #64748b; justify-content: center;">No scores yet — enter Trial by Combat!</div>';
      } else {
        this.dom.highscoresList.innerHTML = this.combatHighScores
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
          .map((s, i) => `
            <div class="highscore-item">
              <span class="highscore-rank">#${i + 1}</span>
              <span class="highscore-score">${s.score} XP</span>
              <span class="highscore-date">${s.date}</span>
            </div>
          `).join('');
      }
    }
  }

  // --- Visual Effects & Floating Toasts ---
  spawnFloatingToast(text, isCritical = false) {
    const toast = document.createElement('div');
    toast.className = `xp-toast ${isCritical ? 'critical-hit' : ''}`;
    toast.textContent = text;
    toast.style.left = '50%';
    toast.style.top = '45%';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, isCritical ? 1500 : 1200);
  }

  spawnSwordClash() {
    const clash = document.createElement('div');
    clash.className = 'sword-clash-effect';
    clash.textContent = '⚔️';
    document.body.appendChild(clash);

    setTimeout(() => {
      clash.remove();
    }, 500);
  }

  // --- Game Modes (Campaign vs Trial by Combat) ---
  setMode(mode) {
    this.gameMode = mode;
    this.combo = 0;
    this.updateComboUI();

    if (mode === 'combat') {
      this.dom.modeBtnCombat.classList.add('btn-primary');
      this.dom.modeBtnCampaign.classList.remove('btn-primary');
      this.startCombatTrial();
    } else {
      this.dom.modeBtnCampaign.classList.add('btn-primary');
      this.dom.modeBtnCombat.classList.remove('btn-primary');
      this.stopCombatTrial();
      this.currentQuestIndex = 0;
      this.renderQuest();
    }
  }

  startCombatTrial() {
    this.combatTimeLeft = 60;
    this.combatScore = 0;
    this.sessionCampaignCorrect = 0;
    this.sessionCampaignTotal = 0;

    // BUG FIX: combatHud and combatTimerDisplay now properly cached in this.dom
    if (this.dom.combatHud) this.dom.combatHud.style.display = 'flex';
    if (this.dom.combatTimerDisplay) this.dom.combatTimerDisplay.textContent = `${this.combatTimeLeft}s`;

    clearInterval(this.combatTimer);
    this.combatTimer = setInterval(() => {
      this.combatTimeLeft -= 1;
      if (this.dom.combatTimerDisplay) {
        this.dom.combatTimerDisplay.textContent = `${this.combatTimeLeft}s`;
      }

      if (this.combatTimeLeft <= 0) {
        clearInterval(this.combatTimer);
        this.endCombatTrial();
      }
    }, 1000);

    this.nextQuest();
  }

  stopCombatTrial() {
    clearInterval(this.combatTimer);
    if (this.dom.combatHud) this.dom.combatHud.style.display = 'none';
  }

  endCombatTrial() {
    // Save high score
    this.combatHighScores.push({
      score: this.combatScore,
      date: new Date().toLocaleDateString()
    });
    // Keep top 10
    this.combatHighScores.sort((a, b) => b.score - a.score);
    this.combatHighScores = this.combatHighScores.slice(0, 10);
    localStorage.setItem('goc_combat_scores', JSON.stringify(this.combatHighScores));

    // Check achievements after combat
    this.checkAchievements();

    window.soundEngine.playRankUpFanfare();
    this.dom.modalCrest.textContent = '🏆';
    this.dom.modalTitle.textContent = `TRIAL BY COMBAT ENDED!`;
    this.dom.modalDesc.textContent = `Thou hast scored ${this.combatScore} XP in 60 seconds of glorious keyboard combat! ${this.combo > 3 ? `Final combo: ${this.combo}x!` : ''} Glory to House of Chrome!`;
    this.dom.modalBackdrop.classList.add('show');
    this.setMode('campaign');
  }

  // --- Ambient Ember Canvas ---
  initEmberCanvas() {
    const canvas = document.getElementById('emberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.2 + 0.3),
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? '#ff7b00' : '#ffd700'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.002;

        if (p.y < 0 || p.alpha <= 0) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.alpha = Math.random() * 0.7 + 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new GameOfChromesApp();
});
