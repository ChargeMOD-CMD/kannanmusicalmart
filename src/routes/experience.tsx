import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { Play, Pause } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Sound Experience — Kannan Musical Mart" },
      { name: "description", content: "Interactive sound visualization, virtual instruments and rhythm-reactive demos." },
      { property: "og:title", content: "Sound Experience — Kannan Musical Mart" },
      { property: "og:description", content: "Step into a sound-reactive musical universe." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0; let t = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const speed = playing ? 0.06 : 0.015;
      t += speed;
      const layers = [
        { color: "rgba(139,92,246,0.55)", amp: 40, freq: 0.012, off: 0 },
        { color: "rgba(6,182,212,0.5)", amp: 30, freq: 0.018, off: 1 },
        { color: "rgba(245,158,11,0.35)", amp: 18, freq: 0.025, off: 2 },
      ];
      layers.forEach((l, idx) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = h/2 + Math.sin(x * l.freq + t + l.off) * l.amp * (playing ? 1.6 : 1)
                    + Math.sin(x * l.freq * 2 + t * 1.4) * l.amp * 0.4;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = l.color;
        ctx.lineWidth = 2 + idx;
        ctx.shadowBlur = 16; ctx.shadowColor = l.color;
        ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [playing]);

  return (
    <Layout>
      <section className="relative">
        <div className="absolute inset-0 bg-stage" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm uppercase tracking-[0.25em] text-highlight">Sound Experience</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            A universe of <span className="text-aurora">rhythm</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Watch sound move. Press play to feel the layered waveforms react in real time.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-3xl p-6 sm:p-10">
            <canvas ref={canvasRef} className="w-full h-[360px] rounded-2xl bg-background/40" />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-xl">Live Waveform Engine</p>
                <p className="text-sm text-muted-foreground">Three-layer harmonic visualization</p>
              </div>
              <button
                onClick={() => setPlaying(p => !p)}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-white glow-violet hover:scale-[1.03] transition-transform"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {playing ? "Pause" : "Play"} the rhythm
              </button>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { title: "Virtual Showroom", text: "Explore instruments through cinematic visuals before you visit." },
              { title: "Sound Demos", text: "Hear curated demos of guitars, keys and audio chains." },
              { title: "Setup Consultation", text: "Get expert guidance on your live or studio setup." },
            ].map(c => (
              <div key={c.title} className="glass rounded-2xl p-6">
                <h3 className="font-display text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
