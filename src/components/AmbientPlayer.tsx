import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient violin-style pad synthesized with the Web Audio API.
 * - Auto-starts on first user interaction (browser autoplay policy).
 * - Floating control lets the user mute / unmute (stop) at any time.
 */
export function AmbientPlayer() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode; lfoGain: GainNode }[]>([]);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current) {
      // resume if suspended
      ctxRef.current?.resume();
      if (masterRef.current) masterRef.current.gain.linearRampToValueAtTime(0.18, ctxRef.current!.currentTime + 1.2);
      setPlaying(true);
      return;
    }
    startedRef.current = true;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    const ctx: AudioContext = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    masterRef.current = master;

    // Gentle reverb-ish feel via lowpass + soft compression
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    lp.Q.value = 0.6;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -22;
    comp.knee.value = 24;
    comp.ratio.value = 4;

    master.connect(lp).connect(comp).connect(ctx.destination);

    // Violin-like sustained chord (D minor 9: D3 F3 A3 C4 E4)
    const freqs = [146.83, 174.61, 220.0, 261.63, 329.63];
    nodesRef.current = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
      // light detune for warmth
      osc.detune.value = (i - 2) * 6;
      osc.frequency.value = f;

      const gain = ctx.createGain();
      gain.gain.value = 0.07 - i * 0.008;

      // slow vibrato LFO
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 4.5 + i * 0.2;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 2.2;
      lfo.connect(lfoGain).connect(osc.frequency);

      osc.connect(gain).connect(master);
      osc.start();
      lfo.start();
      return { osc, gain, lfo, lfoGain };
    });

    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);
    setPlaying(true);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    setTimeout(() => ctx.suspend(), 700);
    setPlaying(false);
  };

  // Try to auto-start on first user interaction (autoplay policy compliant).
  useEffect(() => {
    const handler = () => {
      if (!startedRef.current) start();
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
    };
    window.addEventListener("pointerdown", handler, { once: false });
    window.addEventListener("keydown", handler, { once: false });
    window.addEventListener("touchstart", handler, { once: false });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => () => { ctxRef.current?.close().catch(() => {}); }, []);

  const toggle = () => (playing ? stop() : start());

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      aria-label={playing ? "Mute ambient music" : "Play ambient music"}
      title={playing ? "Mute ambient music" : "Play ambient music"}
      className="fixed bottom-6 left-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full glass border border-border/60 hover:border-primary/60 transition-colors glow-violet"
    >
      {playing ? (
        <Volume2 className="h-5 w-5 text-foreground" />
      ) : (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      )}
      {playing && (
        <span className="absolute inset-0 rounded-full animate-ping border border-primary/40" />
      )}
    </button>
  );
}
