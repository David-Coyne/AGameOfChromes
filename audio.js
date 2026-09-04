/**
 * A Game of Chromes - Procedural Web Audio Sound Engine
 * Synthesizes medieval sound effects (swords, shields, heralds, chimes)
 * with zero external asset dependencies.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  _jitter(baseFreq) {
    return baseFreq * (1 + (Math.random() * 0.16 - 0.08));
  }

  // Play a metallic sword slash / clash for successful shortcut
  playSwordClash() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Metallic ring (High pitch oscillator + FM mod)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(this._jitter(1400), t);
    osc.frequency.exponentialRampToValueAtTime(this._jitter(320), t + 0.15);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(6, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.25);

    // Noise burst for blade impact
    this._playNoise(0.08, 0.2, 1800);
  }

  // Play combo strike with escalating pitch
  playComboStrike(comboLevel) {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    let baseFreq = 1400 + (comboLevel * 80);
    if (baseFreq > 2400) baseFreq = 2400;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(this._jitter(baseFreq), t);
    osc.frequency.exponentialRampToValueAtTime(this._jitter(320), t + 0.15);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(6, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.25);

    // Noise burst for blade impact gets louder with higher combos
    const noiseVol = Math.min(0.5, 0.2 + (comboLevel * 0.03));
    this._playNoise(0.08, noiseVol, 1800);
  }

  // Play a wooden shield thud / heavy miss sound for incorrect key
  playShieldThud() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(this._jitter(160), t);
    osc.frequency.exponentialRampToValueAtTime(this._jitter(40), t + 0.2);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Play a royal fanfare chord for rank level-up
  playRankUpFanfare() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5
    const t = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);

      gain.gain.setValueAtTime(0.12, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.65);
    });
  }

  // Magical chime for streak or bonus
  playMagicChime() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [880, 1174.66, 1318.51, 1760];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);

      gain.gain.setValueAtTime(0.15, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 0.45);
    });
  }

  // Play celebratory achievement chime
  playAchievementChime() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [880, 1108, 1318, 1568, 2093];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);

      gain.gain.setValueAtTime(0.15, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.07 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.5);
    });

    // Shimmer noise burst
    this._playNoise(0.5, 0.08, 3000);
  }

  // Play heavy critical hit impact
  playCriticalHit() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Low sine sweep
    const lowOsc = this.ctx.createOscillator();
    const lowGain = this.ctx.createGain();
    lowOsc.type = 'sine';
    lowOsc.frequency.setValueAtTime(80, t);
    lowOsc.frequency.exponentialRampToValueAtTime(30, t + 0.4);
    
    lowGain.gain.setValueAtTime(0.6, t);
    lowGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    
    lowOsc.connect(lowGain);
    lowGain.connect(this.ctx.destination);
    
    lowOsc.start(t);
    lowOsc.stop(t + 0.4);

    // Triangle sweep
    const triOsc = this.ctx.createOscillator();
    const triGain = this.ctx.createGain();
    triOsc.type = 'triangle';
    triOsc.frequency.setValueAtTime(600, t);
    triOsc.frequency.exponentialRampToValueAtTime(200, t + 0.4);
    
    triGain.gain.setValueAtTime(0.3, t);
    triGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    
    triOsc.connect(triGain);
    triGain.connect(this.ctx.destination);
    
    triOsc.start(t);
    triOsc.stop(t + 0.4);

    // Noise burst
    this._playNoise(0.4, 0.4, 2500);
  }

  // Play streak warning sound
  playStreakWarning() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Subtle click for UI buttons
  playClick() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  _playNoise(duration, volume, filterFreq) {
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }
}

window.soundEngine = new SoundEngine();
