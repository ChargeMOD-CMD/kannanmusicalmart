import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music2 } from "lucide-react";
import { audioLevel } from "@/lib/audioLevel";

const LS_MUTED = "kmm.ambient.muted";
const LS_VOLUME = "kmm.ambient.volume";

type Voice = { stop: () => void };

const NOTE: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
};

function makeReverb(ctx: AudioContext, seconds = 2.4, decay = 2.2) {
  const rate = ctx.sampleRate;
  const length = rate * seconds;
  const impulse = ctx.createBuffer(2, length, rate);
  for (let c = 0; c < 2; c++) {
    const ch = impulse.getChannelData(c);
    for (let i = 0; i < length; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = impulse;
  return conv;
}

function violin(ctx: AudioContext, dest: AudioNode, freq: number, dur: number, vol = 0.05): Voice {
  const t0 = ctx.currentTime;
  const osc1 = ctx.createOscillator(); osc1.type = "sawtooth"; osc1.frequency.value = freq; osc1.detune.value = -6;
  const osc2 = ctx.createOscillator(); osc2.type = "sawtooth"; osc2.frequency.value = freq; osc2.detune.value = 6;
  const filt = ctx.createBiquadFilter(); filt.type = "lowpass"; filt.frequency.value = 1800; filt.Q.value = 0.7;
  const gain = ctx.createGain(); gain.gain.value = 0;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 5.2;
  const lfoG = ctx.createGain(); lfoG.gain.value = 2.5;
  lfo.connect(lfoG).connect(osc1.frequency); lfoG.connect(osc2.frequency);
  osc1.connect(filt); osc2.connect(filt); filt.connect(gain).connect(dest);
  gain.gain.linearRampToValueAtTime(vol, t0 + 1.2);
  gain.gain.linearRampToValueAtTime(0, t0 + dur);
  osc1.start(t0); osc2.start(t0); lfo.start(t0);
  osc1.stop(t0 + dur + 0.1); osc2.stop(t0 + dur + 0.1); lfo.stop(t0 + dur + 0.1);
  return { stop: () => { try { osc1.stop(); osc2.stop(); lfo.stop(); } catch {} } };
}

function flute(ctx: AudioContext, dest: AudioNode, freq: number, dur: number, vol = 0.06) {
  const t0 = ctx.currentTime;
  const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = freq;
  const sub = ctx.createOscillator(); sub.type = "triangle"; sub.frequency.value = freq * 2; sub.detune.value = 4;
  const g = ctx.createGain(); g.gain.value = 0;
  const subG = ctx.createGain(); subG.gain.value = 0.18;
  osc.connect(g); sub.connect(subG).connect(g); g.connect(dest);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.25);
  g.gain.linearRampToValueAtTime(vol * 0.7, t0 + dur * 0.6);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  osc.start(t0); sub.start(t0);
  osc.stop(t0 + dur + 0.05); sub.stop(t0 + dur + 0.05);
}

function piano(ctx: AudioContext, dest: AudioNode, freq: number, when = 0, vol = 0.09) {
  const t = ctx.currentTime + when;
  const osc = ctx.createOscillator(); osc.type = "triangle"; osc.frequency.value = freq;
  const harm = ctx.createOscillator(); harm.type = "sine"; harm.frequency.value = freq * 2;
  const harmG = ctx.createGain(); harmG.gain.value = 0.22;
  const g = ctx.createGain(); g.gain.value = 0;
  const filt = ctx.createBiquadFilter(); filt.type = "lowpass"; filt.frequency.value = 2400;
  osc.connect(filt); harm.connect(harmG).connect(filt); filt.connect(g).connect(dest);
  g.gain.linearRampToValueAtTime(vol, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
  osc.start(t); harm.start(t);
  osc.stop(t + 1.7); harm.stop(t + 1.7);
}

function bass(ctx: AudioContext, dest: AudioNode, freq: number, dur: number, vol = 0.07) {
  const t0 = ctx.currentTime;
  const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = freq;
  const g = ctx.createGain(); g.gain.value = 0;
  osc.connect(g).connect(dest);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.8);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  osc.start(t0); osc.stop(t0 + dur + 0.1);
}

export function AmbientPlayer() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const wetRef = useRef<GainNode | null>(null);
  const dryRef = useRef<GainNode | null>(null);
  const loopRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const playingRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 0.7;
    const v = window.localStorage.getItem(LS_VOLUME);
    const n = v ? parseFloat(v) : 0.7;
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.7;
  });
  const [userMuted, setUserMuted] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    const v = window.localStorage.getItem(LS_MUTED);
    return v === null ? null : v === "1";
  });

  const progression = [
    { root: NOTE.D3, chord: ["D4", "F4", "A4"], lead: ["A4", "F4", "D5", "F4"] },
    { root: NOTE.F3, chord: ["F4", "A4", "C5"], lead: ["C5", "A4", "F4", "A4"] },
    { root: NOTE.A3, chord: ["D4", "F4", "A4"], lead: ["D5", "C5", "A4", "F4"] },
    { root: NOTE.A3, chord: ["E4", "A4", "C5"], lead: ["E5", "C5", "A4", "E4"] },
  ];

  const scheduleBar = (barIdx: number) => {
    const ctx = ctxRef.current!; const wet = wetRef.current!; const dry = dryRef.current!;
    const bar = progression[barIdx % progression.length];
    const barLen = 6.4;
    bass(ctx, dry, bar.root / 2, barLen, 0.05);
    bar.chord.forEach((n, i) => violin(ctx, wet, NOTE[n], barLen, 0.035 - i * 0.005));
    bar.lead.forEach((n, i) => piano(ctx, wet, NOTE[n], i * (barLen / 4), 0.07));
    const fluteNote = bar.lead[1];
    setTimeout(() => {
      if (!playingRef.current) return;
      flute(ctx, wet, NOTE[fluteNote] * 2, 2.2, 0.04);
    }, (barLen / 2) * 1000);
  };

  const startLoop = () => {
    let bar = 0;
    const tick = () => {
      if (!ctxRef.current) return;
      scheduleBar(bar++);
    };
    tick();
    loopRef.current = window.setInterval(tick, 6400);
  };

  const stopLoop = () => {
    if (loopRef.current) { clearInterval(loopRef.current); loopRef.current = null; }
  };

  const startAnalyserLoop = () => {
    if (rafRef.current) return;
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      const lvl = Math.min(1, rms * 3.2);
      audioLevel.set(lvl, true);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopAnalyserLoop = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    audioLevel.set(0, false);
  };

  const start = () => {
    if (startedRef.current && ctxRef.current) {
      ctxRef.current.resume();
      masterRef.current?.gain.linearRampToValueAtTime(volume, ctxRef.current.currentTime + 1.2);
      if (!loopRef.current) startLoop();
      startAnalyserLoop();
      playingRef.current = true;
      setPlaying(true);
      return;
    }
    startedRef.current = true;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    const ctx: AudioContext = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain(); master.gain.value = 0; masterRef.current = master;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 22; comp.ratio.value = 3.5;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.82;
    analyserRef.current = analyser;
    master.connect(comp);
    comp.connect(analyser);
    comp.connect(ctx.destination);

    const dry = ctx.createGain(); dry.gain.value = 0.85; dryRef.current = dry;
    const wet = ctx.createGain(); wet.gain.value = 0.55; wetRef.current = wet;
    const reverb = makeReverb(ctx, 3, 2.2);
    dry.connect(master);
    wet.connect(reverb).connect(master);

    master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 2.5);
    playingRef.current = true;
    setPlaying(true);
    startLoop();
    startAnalyserLoop();
  };

  const stop = () => {
    const ctx = ctxRef.current; const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    stopLoop();
    stopAnalyserLoop();
    setTimeout(() => ctx.suspend().catch(() => {}), 600);
    playingRef.current = false;
    setPlaying(false);
  };

  // Auto-start on first user interaction unless user previously chose mute
  useEffect(() => {
    const handler = () => {
      if (!startedRef.current && userMuted !== true) start();
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("wheel", handler);
    };
    window.addEventListener("pointerdown", handler);
    window.addEventListener("keydown", handler);
    window.addEventListener("touchstart", handler);
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("wheel", handler, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("wheel", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMuted]);

  useEffect(() => () => {
    stopLoop();
    stopAnalyserLoop();
    ctxRef.current?.close().catch(() => {});
  }, []);

  // Persist + apply volume changes live
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_VOLUME, String(volume));
    }
    const ctx = ctxRef.current; const master = masterRef.current;
    if (ctx && master && playing) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.15);
    }
  }, [volume, playing]);

  const toggle = () => {
    if (playing) {
      stop();
      setUserMuted(true);
      window.localStorage.setItem(LS_MUTED, "1");
    } else {
      start();
      setUserMuted(false);
      window.localStorage.setItem(LS_MUTED, "0");
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <button
        onClick={toggle}
        data-cursor="hover"
        aria-label={playing ? "Mute ambient music" : "Play ambient music"}
        title={playing ? "Mute ambient music" : "Play ambient music"}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full glass border border-border/60 hover:border-primary/60 transition-colors glow-violet"
      >
        {playing ? (
          <Music2 className="h-5 w-5 text-foreground animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
        {playing && (
          <span className="absolute inset-0 rounded-full animate-ping border border-primary/40" />
        )}
        <span className="sr-only">{playing ? "Mute" : "Play"} ambient music</span>
        <span
          className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border border-background ${
            playing ? "bg-highlight" : "bg-muted-foreground/60"
          }`}
          aria-hidden
        />
      </button>

      <div className="glass border border-border/60 rounded-full px-3 h-12 flex items-center gap-3">
        <span
          className={`text-[11px] font-semibold tracking-wider uppercase ${
            playing ? "text-highlight" : "text-muted-foreground"
          }`}
          aria-live="polite"
        >
          {playing ? "Playing" : "Muted"}
        </span>
        <div className="flex items-center gap-2">
          <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Music volume"
            className="w-24 accent-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
