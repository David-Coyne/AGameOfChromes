# ⚔️ A Game of Chromes

*“When you play the Game of Chromes, you win or you browse with the mouse.”*

A dark, dramatic medieval-fantasy gamified trainer designed to forge muscle memory for essential **Google Chrome keyboard shortcuts** through high-stakes realm quests, interactive DOM browser simulations, and procedural audio fanfares.

---

## 🛡️ Key Features

1. **Medieval Fantasy Aesthetic & Lore**:
   - High-fantasy dark slate UI (`#0a0c10`), royal crimson accents, antique gold trims, and glowing parchment banners.
   - Parody fantasy lore ("Realm of Tabs", "The Iron Browser", "House of the Redirection", "Scroll of History").
   - Animated ambient ember canvas particle system.

2. **Interactive Mock "Iron Browser"**:
   - Fully interactive and simulated Google Chrome client in HTML/CSS/JS.
   - Dynamic tab strip (opening, closing, switching, and resurrecting tabs).
   - Omnibox focus highlighting with animated gold search rings.
   - Star bookmarking animations and floating notifications.
   - Incognito Shadow Realm dark mode switch.
   - Interactive Find-in-page rune highlighter and History chronicle drawer.

3. **Intelligent Shortcut Interception Engine**:
   - Real-time global `keydown` event handling with selective `event.preventDefault()` to ensure browser actions (like closing your real browser tab) are safely trapped and routed to the game simulation.
   - Dynamic OS detection (macOS `⌘ Cmd` vs Windows/Linux `Ctrl`) with one-click manual switcher.
   - Live visual keycap press feedback and combo streaks.

4. **Feudal Progression & Gamification**:
   - **XP & Leveling System**: Earn $+50\text{ XP}$ per strike, plus combo multipliers for rapid success.
   - **8 Feudal Ranks**: Progress from *Peasant of the Cursor* up to *High King of the Iron Browser*.
   - **Fire Streak Tracker**: Persistent daily streak tracking stored in `localStorage`.
   - **2 Game Modes**:
     - *Campaign Mode*: Storyline quests through the Realm of Tabs.
     - *Trial by Combat*: 60-second rapid-fire survival speedrun.
   - **The Grand Grimoire**: Complete interactive registry allowing freeform training on any specific shortcut.

5. **Procedural Web Audio Synthesizer**:
   - Zero external MP3/WAV dependencies! Uses the HTML5 Web Audio API to synthesize metallic sword clashes, shield blocks, trumpet rank fanfares, and magical chimes in real-time.

---

## 📜 Included Shortcut Registry

| Action | macOS Shortcut | Windows / Linux Shortcut | Lore Challenge |
| :--- | :--- | :--- | :--- |
| **Close Tab** | `⌘ + W` | `Ctrl + W` | *Banish the Rogue Tab* |
| **Open New Tab** | `⌘ + T` | `Ctrl + T` | *Summon a Fresh Realm* |
| **Reopen Closed Tab** | `⌘ + ⇧ + T` | `Ctrl + Shift + T` | *Resurrect the Fallen Scroll* |
| **Switch to Next Tab** | `⌘ + ⌥ + →` or `Ctrl + Tab` | `Ctrl + Tab` or `Ctrl + PgDown` | *March to the Next Citadel* |
| **Focus Address Bar** | `⌘ + L` | `Ctrl + L` | *Illuminate the Omnibox Spire* |
| **Bookmark Page** | `⌘ + D` | `Ctrl + D` | *Enchant with Star Sigil* |
| **Shadow Realm (Incognito)**| `⌘ + ⇧ + N` | `Ctrl + Shift + N` | *Cloak into the Shadow Realm* |
| **Scry Page (Find)** | `⌘ + F` | `Ctrl + F` | *Scry the Runes (Find)* |
| **Chronicle (History)** | `⌘ + Y` / `⌘ + H` | `Ctrl + H` | *Unroll the Chronicle of Past*|
| **Magnify Map (Zoom In)** | `⌘ + +` | `Ctrl + +` | *Magnify the Arcane Map* |

---

## 🚀 How to Run Locally

### Option 1: Direct in Browser (Simplest)
Since ES Modules are used, run a lightweight local static server in the project folder:

```bash
# Using Python 3
python -m http.server 8080

# Or using Node.js npx serve
npx serve .

# Or using VS Code Live Server extension
```

Then open `http://localhost:8080` in your Google Chrome desktop browser.

---

## ⚔️ Architecture & File Structure

```
mysterious-brahmagupta/
├── index.html       # Semantic single-page application structure & UI frames
├── styles.css       # High-fantasy design system, animations, gold trims, responsive layout
├── audio.js         # Procedural Web Audio API sound synthesis engine
├── shortcuts.js     # Shortcut registry, OS key mapping & matching algorithms
├── browser-sim.js   # Interactive Mock Iron Browser DOM state controller
├── app.js           # Main game loop, XP/rank state machine, localStorage manager
└── README.md        # Documentation and guide
```
