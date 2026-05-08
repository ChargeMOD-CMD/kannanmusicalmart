import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";

export function ChatOrb() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Music Guide"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-aurora blur-xl opacity-70 animate-pulse-ring" />
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-aurora glow-violet">
          {open ? <X className="h-5 w-5 text-white" /> : <Sparkles className="h-5 w-5 text-white" />}
        </span>
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[20rem] glass rounded-2xl p-4 animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-aurora">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-sm font-semibold">KANNAN AI Music Guide</p>
              <p className="text-xs text-muted-foreground">Online · Ask me anything musical</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-background/40 p-3 text-sm">
            Hey there 🎵 Looking for the perfect instrument? I can recommend
            guitars, keyboards, audio gear and full studio setups.
          </div>
          <div className="mt-3 flex gap-2">
            <input
              placeholder="Ask about an instrument…"
              className="flex-1 rounded-lg bg-background/40 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="inline-flex items-center justify-center rounded-lg bg-aurora px-3 text-white">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">Demo assistant · Connect Lovable Cloud + AI to enable live chat.</p>
        </div>
      )}
    </>
  );
}
