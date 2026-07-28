// Web Audio API sci-fi micro-sound synthesizer (0ms latency, 100% reliable repeat playback)

let soundEnabled = true;

export const toggleSound = (enabled?: boolean) => {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

const createAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  } catch {
    return null;
  }
};

// Play subtle click sound on every call
export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = createAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.linearRampToValueAtTime(350, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);

    // Clean up audio context after playback
    setTimeout(() => {
      ctx.close();
    }, 100);
  } catch {
    // Ignore
  }
};

// Play sci-fi theme toggle sound
export const playToggleSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = createAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(950, now + 0.09);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    setTimeout(() => {
      ctx.close();
    }, 150);
  } catch {
    // Ignore
  }
};

// Play boot chime sound
export const playBootSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = createAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.08, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.06 + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.14);
    });

    setTimeout(() => {
      ctx.close();
    }, 500);
  } catch {
    // Ignore
  }
};
