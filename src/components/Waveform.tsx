import { useEffect, useRef } from "react";
import { audioLevel } from "@/lib/audioLevel";

type Props = { bars?: number; className?: string };
export function Waveform({ bars = 48, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = audioLevel.subscribe((lvl) => {
      const el = containerRef.current;
      if (!el) return;
      // amplify when audio active; lvl is 0..1
      const boost = 1 + lvl * 2.2;
      el.style.setProperty("--wf-boost", String(boost));
      el.style.setProperty("--wf-opacity", String(0.6 + lvl * 0.4));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-end gap-[3px] h-16 ${className}`}
      style={{ ["--wf-boost" as never]: 1, ["--wf-opacity" as never]: 0.85 }}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => {
        const baseH = 30 + ((i * 13) % 70);
        return (
          <span
            key={i}
            className="w-[3px] rounded-full bg-aurora animate-wave origin-bottom transition-transform duration-75"
            style={{
              animationDelay: `${(i % 12) * 0.07}s`,
              animationDuration: `${0.9 + (i % 5) * 0.15}s`,
              height: `${baseH}%`,
              opacity: "var(--wf-opacity)" as never,
              transform: "scaleY(var(--wf-boost))",
            }}
          />
        );
      })}
    </div>
  );
}
