/**
 * A Game of Chromes - Shortcuts & Quest Registry
 * Infused with popular internet meme challenges, key combinations, and OS mapping logic.
 */

// OS Detection
export function detectOS() {
  const nav = window.navigator;
  const userAgent = (nav.userAgent || '').toLowerCase();
  const platform = (nav.platform || '').toLowerCase();
  // Prefer userAgentData when available (platform is deprecated / unreliable)
  const uaDataPlatform = nav.userAgentData?.platform?.toLowerCase?.() || '';
  if (
    uaDataPlatform.includes('mac') ||
    platform.includes('mac') ||
    userAgent.includes('macintosh') ||
    userAgent.includes('mac os')
  ) {
    return 'mac';
  }
  return 'windows'; // Default to Windows/Linux (Ctrl keymap)
}

export const REALMS = [
  { id: 'iron_tabs', name: 'The Iron Tabs', icon: '📑', description: 'Master the ancient art of tab warfare' },
  { id: 'navigator_guild', name: "The Navigator's Guild", icon: '🧭', description: 'Chart your course through the browser realm' },
  { id: 'arcane_library', name: 'The Arcane Library', icon: '📖', description: 'Unlock the secrets of page mastery' },
  { id: 'shadow_realm', name: 'The Shadow Realm', icon: '🌑', description: 'Descend into the advanced browser arts' },
  { id: 'sorcerers_lens', name: "The Sorcerer's Lens", icon: '🔮', description: 'Bend the viewport to your will' },
  { id: 'devtools_forge', name: 'The Forge of DevTools', icon: '⚒️', description: 'Harness the power of Chrome DevTools' }
];

// Fantasy & Meme Ranks Progression
export const RANKS = [
  { rank: 1, title: 'Noob of the Cursor', minXP: 0, maxXP: 100, icon: '📜', badge: 'Mouse Clicker' },
  { rank: 2, title: 'Squire of the Shortcut', minXP: 100, maxXP: 250, icon: '🐕', badge: 'Doge Apprentice' },
  { rank: 3, title: 'Knight of the Keymap', minXP: 250, maxXP: 500, icon: '🐱', badge: 'PopCat Striker' },
  { rank: 4, title: 'Lord of the Stonks', minXP: 500, maxXP: 850, icon: '📈', badge: 'Diamond Hands' },
  { rank: 5, title: 'High Warden of Tabs', minXP: 850, maxXP: 1300, icon: '☕', badge: 'This Is Fine Guy' },
  { rank: 6, title: 'Keeper of the Realms', minXP: 1300, maxXP: 1850, icon: '🗝️', badge: 'Realm Keeper' },
  { rank: 7, title: 'Hand of the Browser', minXP: 1850, maxXP: 2500, icon: '👑', badge: 'Keyboard Chad' },
  { rank: 8, title: 'Archmage of the Omnibox', minXP: 2500, maxXP: 3300, icon: '🧠', badge: 'Galaxy Brain' },
  { rank: 9, title: 'DevTools Forgemaster', minXP: 3300, maxXP: 4200, icon: '⚒️', badge: 'Code Whisperer' },
  { rank: 10, title: 'Shadow Realm Navigator', minXP: 4200, maxXP: 5200, icon: '🌑', badge: 'Incognito Master' },
  { rank: 11, title: 'Grand Master of Chrome', minXP: 5200, maxXP: 6500, icon: '🐉', badge: 'Dragon Rider' },
  { rank: 12, title: 'Supreme GigaChad Emperor', minXP: 6500, maxXP: Infinity, icon: '🗿', badge: 'GigaChad Emperor' }
];

export function getRankForXP(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

// Main Shortcut Quest Registry (Meme Infused!)
export const SHORTCUTS = [
  // Realm I: iron_tabs
  {
    id: 'close_tab',
    title: 'Slay the Rogue Doge Tab',
    actionName: 'Close Tab',
    lore: 'Your RAM is burning at 99%! Close the active tab before Chrome ascends to the shadow realm!',
    category: 'Tab Mastery',
    difficulty: 'Squire',
    realm: 'iron_tabs',
    keys: {
      mac: { display: ['⌘', 'W'], meta: true, ctrl: false, shift: false, alt: false, key: 'w' },
      windows: { display: ['Ctrl', 'W'], meta: false, ctrl: true, shift: false, alt: false, key: 'w' }
    },
    simAction: 'close_active_tab',
    hint: 'Press Ctrl + W (or Cmd + W).'
  },
  {
    id: 'new_tab',
    title: 'Summon a Fresh Meme Tab',
    actionName: 'Open New Tab',
    lore: 'We need more Stonks and Doge knowledge! Spawn a brand new tab in the Iron Browser!',
    category: 'Tab Mastery',
    difficulty: 'Squire',
    realm: 'iron_tabs',
    keys: {
      mac: { display: ['⌘', 'T'], meta: true, ctrl: false, shift: false, alt: false, key: 't' },
      windows: { display: ['Ctrl', 'T'], meta: false, ctrl: true, shift: false, alt: false, key: 't' }
    },
    simAction: 'open_new_tab',
    hint: 'Summon the magic of T alongside your modifier (Ctrl/Cmd + T).'
  },
  {
    id: 'reopen_closed_tab',
    title: 'Resurrect the RickRoll Tab',
    actionName: 'Reopen Closed Tab',
    lore: 'Never gonna give you up! Revive the lost tab you accidentally banished!',
    category: 'Tab Mastery',
    difficulty: 'Knight',
    realm: 'iron_tabs',
    keys: {
      mac: { display: ['⌘', '⇧', 'T'], meta: true, ctrl: false, shift: true, alt: false, key: 't' },
      windows: { display: ['Ctrl', 'Shift', 'T'], meta: false, ctrl: true, shift: true, alt: false, key: 't' }
    },
    simAction: 'restore_closed_tab',
    hint: 'Combine Ctrl/Cmd + Shift + T to resurrect the lost scroll.'
  },
  {
    id: 'next_tab',
    title: 'Switch to PopCat Citadel',
    actionName: 'Switch to Next Tab',
    lore: 'The PopCat is popping at lightspeed! Advance your tactical focus to the next open tab immediately!',
    category: 'Tab Mastery',
    difficulty: 'Knight',
    realm: 'iron_tabs',
    keys: {
      mac: { display: ['⌘', '⌥', '→'], meta: true, ctrl: false, shift: false, alt: true, key: 'arrowright' },
      windows: { display: ['Ctrl', 'Tab'], meta: false, ctrl: true, shift: false, alt: false, key: 'tab' }
    },
    simAction: 'next_tab',
    hint: 'March across tabs using Ctrl + Tab or Alt + Right.'
  },
  {
    id: 'prev_tab',
    title: 'Fall Back to the Pepe Citadel',
    actionName: 'Switch to Previous Tab',
    lore: 'Tactical retreat! Fall back to the previous citadel before the enemy flanks you!',
    category: 'Tab Mastery',
    difficulty: 'Knight',
    realm: 'iron_tabs',
    keys: {
      mac: { display: ['⌘', '⌥', '←'], meta: true, ctrl: false, shift: false, alt: true, key: 'arrowleft' },
      windows: { display: ['Ctrl', 'Shift', 'Tab'], meta: false, ctrl: true, shift: true, alt: false, key: 'tab' }
    },
    simAction: 'prev_tab',
    hint: 'Retreat across tabs using Ctrl + Shift + Tab.'
  },

  // Realm II: navigator_guild
  {
    id: 'focus_address_bar',
    title: 'Illuminate the Omnibox Spire',
    actionName: 'Focus Address Bar',
    lore: 'Type a new meme URL into the high Omnibox! Cast light onto the address bar!',
    category: 'Navigation Spells',
    difficulty: 'Squire',
    realm: 'navigator_guild',
    keys: {
      mac: { display: ['⌘', 'L'], meta: true, ctrl: false, shift: false, alt: false, key: 'l' },
      windows: { display: ['Ctrl', 'L'], meta: false, ctrl: true, shift: false, alt: false, key: 'l' }
    },
    simAction: 'focus_omnibox',
    hint: 'Ignite the Light (L) of the Omnibox with Ctrl/Cmd + L.'
  },
  {
    id: 'go_back',
    title: 'Retreat to the Previous Page',
    actionName: 'Go Back',
    lore: 'Retreat to the previous page! A wise warrior knows when to fall back!',
    category: 'Navigation Spells',
    difficulty: 'Squire',
    realm: 'navigator_guild',
    keys: {
      mac: { display: ['⌘', '['], meta: true, ctrl: false, shift: false, alt: false, key: '[' },
      windows: { display: ['Alt', '←'], meta: false, ctrl: false, shift: false, alt: true, key: 'arrowleft' }
    },
    simAction: 'go_back',
    hint: 'Fall back with Alt + Left Arrow or Cmd + [.'
  },
  {
    id: 'go_forward',
    title: 'Charge into the Unknown',
    actionName: 'Go Forward',
    lore: 'Charge forward into uncharted meme territory!',
    category: 'Navigation Spells',
    difficulty: 'Squire',
    realm: 'navigator_guild',
    keys: {
      mac: { display: ['⌘', ']'], meta: true, ctrl: false, shift: false, alt: false, key: ']' },
      windows: { display: ['Alt', '→'], meta: false, ctrl: false, shift: false, alt: true, key: 'arrowright' }
    },
    simAction: 'go_forward',
    hint: 'Charge ahead with Alt + Right Arrow or Cmd + ].'
  },
  {
    id: 'reload_page',
    title: 'Cast the Sacred Reload Spell',
    actionName: 'Reload Page',
    lore: 'The page is corrupted! Cast the sacred reload spell!',
    category: 'Navigation Spells',
    difficulty: 'Squire',
    realm: 'navigator_guild',
    keys: {
      mac: { display: ['⌘', 'R'], meta: true, ctrl: false, shift: false, alt: false, key: 'r' },
      windows: { display: ['Ctrl', 'R'], meta: false, ctrl: true, shift: false, alt: false, key: 'r' }
    },
    simAction: 'reload_page',
    hint: 'Press Ctrl/Cmd + R or F5 to refresh the realm.'
  },
  {
    id: 'hard_reload',
    title: 'Purge the Cache Corruption',
    actionName: 'Hard Reload',
    lore: 'Even the cache has been poisoned! Purge everything and reload from the source!',
    category: 'Navigation Spells',
    difficulty: 'Knight',
    realm: 'navigator_guild',
    keys: {
      mac: { display: ['⌘', '⇧', 'R'], meta: true, ctrl: false, shift: true, alt: false, key: 'r' },
      windows: { display: ['Ctrl', 'Shift', 'R'], meta: false, ctrl: true, shift: true, alt: false, key: 'r' }
    },
    simAction: 'hard_reload',
    hint: 'Hard reload with Ctrl/Cmd + Shift + R.'
  },

  // Realm III: arcane_library
  {
    id: 'find_on_page',
    title: 'Scry the Runes (Find on Page)',
    actionName: 'Find in Page',
    lore: 'Search the webpage for hidden Stonks and Doge runes with the Scrying bar!',
    category: 'Navigation Spells',
    difficulty: 'Squire',
    realm: 'arcane_library',
    keys: {
      mac: { display: ['⌘', 'F'], meta: true, ctrl: false, shift: false, alt: false, key: 'f' },
      windows: { display: ['Ctrl', 'F'], meta: false, ctrl: true, shift: false, alt: false, key: 'f' }
    },
    simAction: 'find_on_page',
    hint: 'Find (F) on page with Ctrl/Cmd + F.'
  },
  {
    id: 'bookmark_page',
    title: 'Star as Gold Favourite',
    actionName: 'Bookmark Page',
    lore: 'You found the sacred Doge sanctuary! Bind this page into your Favourites Bookmarks bar!',
    category: 'Favourites Archival',
    difficulty: 'Knight',
    realm: 'arcane_library',
    keys: {
      mac: { display: ['⌘', 'D'], meta: true, ctrl: false, shift: false, alt: false, key: 'd' },
      windows: { display: ['Ctrl', 'D'], meta: false, ctrl: true, shift: false, alt: false, key: 'd' }
    },
    simAction: 'bookmark_page',
    hint: 'Affix the star of Destiny with Ctrl/Cmd + D.'
  },
  {
    id: 'print_page',
    title: 'Preserve on Physical Parchment',
    actionName: 'Print Page',
    lore: 'The ancient scrolls must be preserved on physical parchment!',
    category: 'Favourites Archival',
    difficulty: 'Squire',
    realm: 'arcane_library',
    keys: {
      mac: { display: ['⌘', 'P'], meta: true, ctrl: false, shift: false, alt: false, key: 'p' },
      windows: { display: ['Ctrl', 'P'], meta: false, ctrl: true, shift: false, alt: false, key: 'p' }
    },
    simAction: 'print_page',
    hint: 'Print the page using Ctrl/Cmd + P.'
  },
  {
    id: 'save_page',
    title: 'Engrave the Sacred Page',
    actionName: 'Save Page',
    lore: 'Engrave this sacred page into your local archives!',
    category: 'Favourites Archival',
    difficulty: 'Squire',
    realm: 'arcane_library',
    keys: {
      mac: { display: ['⌘', 'S'], meta: true, ctrl: false, shift: false, alt: false, key: 's' },
      windows: { display: ['Ctrl', 'S'], meta: false, ctrl: true, shift: false, alt: false, key: 's' }
    },
    simAction: 'save_page',
    hint: 'Save it locally using Ctrl/Cmd + S.'
  },
  {
    id: 'view_source',
    title: 'Peer Behind the Curtain',
    actionName: 'View Page Source',
    lore: 'Peer behind the curtain! View the raw HTML source code of this realm!',
    category: 'Favourites Archival',
    difficulty: 'Lord',
    realm: 'arcane_library',
    keys: {
      mac: { display: ['⌘', '⌥', 'U'], meta: true, ctrl: false, shift: false, alt: true, key: 'u' },
      windows: { display: ['Ctrl', 'U'], meta: false, ctrl: true, shift: false, alt: false, key: 'u' }
    },
    simAction: 'view_source',
    hint: 'View source with Ctrl + U or Cmd + Option + U.'
  },

  // Realm IV: shadow_realm
  {
    id: 'incognito_realm',
    title: 'Cloak into Incognito Shadow',
    actionName: 'Open Incognito Window',
    lore: 'FBI Agent meme is watching your history! Don the shadow cloak and open an Incognito Window!',
    category: 'Shadow Arts',
    difficulty: 'Lord',
    realm: 'shadow_realm',
    keys: {
      mac: { display: ['⌘', '⇧', 'N'], meta: true, ctrl: false, shift: true, alt: false, key: 'n' },
      windows: { display: ['Ctrl', 'Shift', 'N'], meta: false, ctrl: true, shift: true, alt: false, key: 'n' }
    },
    simAction: 'toggle_incognito',
    hint: 'Invoke Nightshade with Ctrl/Cmd + Shift + N.'
  },
  {
    id: 'history_scroll',
    title: 'Unroll Browser History',
    actionName: 'Open History',
    lore: 'Check your past meme history! Open the Great Chronicle of History!',
    category: 'Favourites Archival',
    difficulty: 'Knight',
    realm: 'shadow_realm',
    keys: {
      mac: { display: ['⌘', 'Y'], meta: true, ctrl: false, shift: false, alt: false, key: 'y' },
      windows: { display: ['Ctrl', 'H'], meta: false, ctrl: true, shift: false, alt: false, key: 'h' }
    },
    simAction: 'open_history',
    hint: 'Recall History with Ctrl + H (or Cmd + Y on Mac).'
  },
  {
    id: 'open_downloads',
    title: 'Access the Treasure Vault',
    actionName: 'Open Downloads',
    lore: 'Access the treasure vault! Inspect your plundered loot from across the realms!',
    category: 'Shadow Arts',
    difficulty: 'Knight',
    realm: 'shadow_realm',
    keys: {
      mac: { display: ['⌘', '⇧', 'J'], meta: true, ctrl: false, shift: true, alt: false, key: 'j' },
      windows: { display: ['Ctrl', 'J'], meta: false, ctrl: true, shift: false, alt: false, key: 'j' }
    },
    simAction: 'open_downloads',
    hint: 'Open Downloads with Ctrl+J (Fullscreen Mode helps — Chrome steals Ctrl+J otherwise). Mac: Cmd+Shift+J.'
  },
  {
    id: 'toggle_bookmarks_bar',
    title: 'Toggle the Sacred Toolbar',
    actionName: 'Toggle Bookmarks Bar',
    lore: 'Show or hide the sacred toolbar of bookmarked realms!',
    category: 'Shadow Arts',
    difficulty: 'Lord',
    realm: 'shadow_realm',
    keys: {
      mac: { display: ['⌘', '⇧', 'B'], meta: true, ctrl: false, shift: true, alt: false, key: 'b' },
      windows: { display: ['Ctrl', 'Shift', 'B'], meta: false, ctrl: true, shift: true, alt: false, key: 'b' }
    },
    simAction: 'toggle_bookmarks_bar',
    hint: 'Toggle the bookmarks bar with Ctrl/Cmd + Shift + B.'
  },
  {
    id: 'clear_browsing_data',
    title: 'Purge All Evidence',
    actionName: 'Clear Browsing Data',
    lore: 'Purge all evidence! The FBI agent watching your history must find nothing!',
    category: 'Shadow Arts',
    difficulty: 'Archmage',
    realm: 'shadow_realm',
    keys: {
      mac: { display: ['⌘', '⇧', 'Delete'], meta: true, ctrl: false, shift: true, alt: false, key: 'delete' },
      windows: { display: ['Ctrl', 'Shift', 'Delete'], meta: false, ctrl: true, shift: true, alt: false, key: 'delete' }
    },
    simAction: 'clear_data',
    hint: 'Clear browsing data using Ctrl/Cmd + Shift + Delete.'
  },

  // Realm V: sorcerers_lens
  {
    id: 'zoom_in',
    title: 'Magnify the Meme Viewport',
    actionName: 'Zoom In',
    lore: 'Enhance! Magnify the meme viewport to inspect micro-pixels!',
    category: 'Viewport Spells',
    difficulty: 'Squire',
    realm: 'sorcerers_lens',
    keys: {
      mac: { display: ['⌘', '+'], meta: true, ctrl: false, shift: false, alt: false, key: ['+', '='] },
      windows: { display: ['Ctrl', '+'], meta: false, ctrl: true, shift: false, alt: false, key: ['+', '='] }
    },
    simAction: 'zoom_in',
    hint: 'Command magnification with Ctrl/Cmd and Plus/Equal sign.'
  },
  {
    id: 'zoom_out',
    title: 'Shrink the Viewport',
    actionName: 'Zoom Out',
    lore: 'Shrink the viewport! See the bigger picture of the realm!',
    category: 'Viewport Spells',
    difficulty: 'Squire',
    realm: 'sorcerers_lens',
    keys: {
      mac: { display: ['⌘', '−'], meta: true, ctrl: false, shift: false, alt: false, key: ['-', '_'] },
      windows: { display: ['Ctrl', '−'], meta: false, ctrl: true, shift: false, alt: false, key: ['-', '_'] }
    },
    simAction: 'zoom_out',
    hint: 'Command minification with Ctrl/Cmd and Minus sign.'
  },
  {
    id: 'reset_zoom',
    title: 'Restore Equilibrium',
    actionName: 'Reset Zoom',
    lore: 'Return the viewport to its natural scale! Equilibrium restored!',
    category: 'Viewport Spells',
    difficulty: 'Knight',
    realm: 'sorcerers_lens',
    keys: {
      mac: { display: ['⌘', '0'], meta: true, ctrl: false, shift: false, alt: false, key: '0' },
      windows: { display: ['Ctrl', '0'], meta: false, ctrl: true, shift: false, alt: false, key: '0' }
    },
    simAction: 'reset_zoom',
    hint: 'Reset zoom using Ctrl/Cmd + 0.'
  },
  {
    id: 'fullscreen_toggle',
    title: 'Maximum Immersion',
    actionName: 'Toggle Fullscreen',
    lore: 'Expand your realm to fill the entire screen! Maximum immersion!',
    category: 'Viewport Spells',
    difficulty: 'Lord',
    realm: 'sorcerers_lens',
    keys: {
      mac: { display: ['F11'], meta: false, ctrl: false, shift: false, alt: false, key: 'f11' },
      windows: { display: ['F11'], meta: false, ctrl: false, shift: false, alt: false, key: 'f11' }
    },
    simAction: 'toggle_fullscreen',
    hint: 'Press F11 after entering Fullscreen Mode (Chrome steals F11 otherwise).'
  },
  {
    id: 'jump_to_tab',
    title: 'Teleport to the First Citadel',
    actionName: 'Jump to Tab 1',
    lore: 'Teleport directly to the first tab! Instant spatial relocation!',
    category: 'Viewport Spells',
    difficulty: 'Knight',
    realm: 'sorcerers_lens',
    keys: {
      mac: { display: ['⌘', '1'], meta: true, ctrl: false, shift: false, alt: false, key: '1' },
      windows: { display: ['Ctrl', '1'], meta: false, ctrl: true, shift: false, alt: false, key: '1' }
    },
    simAction: 'jump_to_tab_1',
    hint: 'Jump to the first tab using Ctrl/Cmd + 1.'
  },

  // Realm VI: devtools_forge
  {
    id: 'open_devtools',
    title: 'Summon the Developer Tools Forge',
    actionName: 'Open DevTools',
    lore: 'Summon the Developer Tools forge! Inspect the very fabric of the web!',
    category: 'DevTools Spells',
    difficulty: 'Archmage',
    realm: 'devtools_forge',
    keys: {
      mac: { display: ['F12'], meta: false, ctrl: false, shift: false, alt: false, key: 'f12' },
      windows: { display: ['F12'], meta: false, ctrl: false, shift: false, alt: false, key: 'f12' }
    },
    simAction: 'open_devtools',
    hint: 'Press F12 after Fullscreen Mode (or Ctrl+Shift+I anytime).'
  },
  {
    id: 'open_console',
    title: 'Speak to the Browser Engine',
    actionName: 'Open Console',
    lore: 'Open the JavaScript console! Speak directly to the browser engine!',
    category: 'DevTools Spells',
    difficulty: 'Archmage',
    realm: 'devtools_forge',
    keys: {
      mac: { display: ['⌘', '⌥', 'J'], meta: true, ctrl: false, shift: false, alt: true, key: 'j' },
      windows: { display: ['Ctrl', 'Shift', 'J'], meta: false, ctrl: true, shift: true, alt: false, key: 'j' }
    },
    simAction: 'open_console',
    hint: 'Open the console using Ctrl+Shift+J or Cmd+Option+J.'
  },
  {
    id: 'inspect_element',
    title: 'Reveal the Hidden Structure',
    actionName: 'Inspect Element',
    lore: 'Point and reveal! Inspect any element on the page like a true web sorcerer!',
    category: 'DevTools Spells',
    difficulty: 'Archmage',
    realm: 'devtools_forge',
    keys: {
      mac: { display: ['⌘', '⌥', 'C'], meta: true, ctrl: false, shift: false, alt: true, key: 'c' },
      windows: { display: ['Ctrl', 'Shift', 'C'], meta: false, ctrl: true, shift: true, alt: false, key: 'c' }
    },
    simAction: 'inspect_element',
    hint: 'Inspect an element using Ctrl+Shift+C or Cmd+Option+C.'
  },
  {
    id: 'toggle_device_toolbar',
    title: 'Shape-shift Your Viewport',
    actionName: 'Toggle Device Toolbar',
    lore: 'Switch between desktop and mobile views! Shape-shift your viewport!',
    category: 'DevTools Spells',
    difficulty: 'Grand Master',
    realm: 'devtools_forge',
    keys: {
      mac: { display: ['⌘', '⇧', 'M'], meta: true, ctrl: false, shift: true, alt: false, key: 'm' },
      windows: { display: ['Ctrl', 'Shift', 'M'], meta: false, ctrl: true, shift: true, alt: false, key: 'm' }
    },
    simAction: 'toggle_device_mode',
    hint: 'Toggle device toolbar using Ctrl/Cmd + Shift + M.'
  },
  {
    id: 'performance_panel',
    title: 'Hunt the Memory Leaks',
    actionName: 'Open Performance Panel',
    lore: 'Analyze page performance! Find the memory leaks before they consume all your RAM!',
    category: 'DevTools Spells',
    difficulty: 'Grand Master',
    realm: 'devtools_forge',
    keys: {
      mac: { display: ['⌘', '⇧', 'E'], meta: true, ctrl: false, shift: true, alt: false, key: 'e' },
      windows: { display: ['Ctrl', 'Shift', 'E'], meta: false, ctrl: true, shift: true, alt: false, key: 'e' }
    },
    simAction: 'open_performance',
    hint: 'Open the performance panel using Ctrl/Cmd + Shift + E.'
  }
];

export function getShortcutsForRealm(realmId) {
  return SHORTCUTS.filter(s => s.realm === realmId);
}

/**
 * Checks if a keyboard event matches the target quest for the selected OS.
 */
export function matchesShortcut(event, quest, currentOS) {
  const req = quest.keys[currentOS] || quest.keys.windows;
  const isMac = currentOS === 'mac';

  const pressedKey = (event.key || '').toLowerCase();
  const pressedCode = (event.code || '').toLowerCase();

  const checkKey = (keys) => {
    const targetKeys = Array.isArray(keys) ? keys : [keys];
    return targetKeys.some(k => {
      const target = k.toLowerCase();
      if (target === pressedKey || `key${target}` === pressedCode) return true;
      // Digit keys report code "Digit0" etc.
      if (`digit${target}` === pressedCode) return true;
      // Clear Browsing Data: Mac "Delete" key often emits Backspace
      if (target === 'delete' && (pressedKey === 'backspace' || pressedCode === 'backspace' || pressedCode === 'delete')) {
        return true;
      }
      // Arrow keys: accept both key name and code
      if (target.startsWith('arrow') && (pressedKey === target || pressedCode === target)) {
        return true;
      }
      return false;
    });
  };

  // Cross-compatibility tolerance (Ctrl on Mac or Meta on Windows both count as primary modifier)
  const primaryModPressed = event.ctrlKey || event.metaKey;
  const shiftPressed = event.shiftKey;
  const altPressed = event.altKey;

  // Next/Prev tab special overrides
  if (quest.id === 'next_tab' && (pressedKey === 'tab' || pressedCode === 'tab') && primaryModPressed && !shiftPressed && !altPressed) return true;
  if (quest.id === 'prev_tab' && (pressedKey === 'tab' || pressedCode === 'tab') && primaryModPressed && shiftPressed && !altPressed) return true;

    // Alternatives
  if (quest.id === 'reload_page' && (pressedKey === 'f5' || pressedCode === 'f5') && !primaryModPressed && !shiftPressed && !altPressed) return true;
  if (quest.id === 'open_devtools' && checkKey('i') && primaryModPressed && shiftPressed && !altPressed) return true;
  // Mac DevTools: Cmd + Option + I
  if (isMac && quest.id === 'open_devtools' && checkKey('i') && primaryModPressed && altPressed && !shiftPressed) return true;
  // Mac History also accepts Cmd + H in Chrome (in addition to Cmd + Y)
  if (isMac && quest.id === 'history_scroll' && checkKey('h') && primaryModPressed && !shiftPressed && !altPressed) return true;
  // Downloads: Ctrl+J (Win/Linux) or Cmd+Shift+J (Mac) — explicit so it cannot confuse with Console
  if (quest.id === 'open_downloads') {
    if (checkKey('j') && primaryModPressed && !altPressed) {
      if (isMac) {
        if (shiftPressed) return true; // Cmd+Shift+J
      } else if (!shiftPressed) {
        return true; // Ctrl+J (not Ctrl+Shift+J — that's Console)
      }
    }
  }

  // Determine required modifiers
  const reqPrimary = isMac ? !!req.meta : !!req.ctrl;
  const reqShift = !!req.shift;
  const reqAlt = !!req.alt;

  // Check modifiers
  if (reqPrimary !== primaryModPressed) return false;
  if (reqAlt !== altPressed) return false;

  // Shift matching, with exception for plus/equal (Shift may be held to type '+')
  if (reqShift !== shiftPressed) {
    const isPlusReq = Array.isArray(req.key) ? req.key.includes('+') : req.key === '+';
    if (!(isPlusReq && (pressedKey === '+' || pressedKey === '='))) {
      return false;
    }
  }

  // Finally check if the key matches
  return checkKey(req.key);
}
