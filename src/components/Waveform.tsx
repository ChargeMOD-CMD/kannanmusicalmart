type Props = { bars?: number; className?: string };
export function Waveform({ bars = 48, className = "" }: Props) {
  return (
    <div className={`flex items-end gap-[3px] h-16 ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-aurora animate-wave"
          style={{
            animationDelay: `${(i % 12) * 0.07}s`,
            animationDuration: `${0.9 + (i % 5) * 0.15}s`,
            height: `${30 + ((i * 13) % 70)}%`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
