import { Link } from "@tanstack/react-router";
import { Music2, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const linkCls = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass rounded-full px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-aurora glow-violet">
              <Music2 className="h-4 w-4 text-white" />
              <span className="absolute inset-0 rounded-full border border-white/30 animate-pulse-ring" />
            </span>
            <span className="font-display font-semibold tracking-tight">
              Kannan <span className="text-aurora">Musical</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            <Link to="/" className={linkCls} activeProps={{ className: "text-foreground" }}>Home</Link>
            <Link to="/instruments" className={linkCls} activeProps={{ className: "text-foreground" }}>Instruments</Link>
            <Link to="/experience" className={linkCls} activeProps={{ className: "text-foreground" }}>Experience</Link>
            <Link to="/contact" className={linkCls} activeProps={{ className: "text-foreground" }}>Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919840148769"
              target="_blank" rel="noreferrer"
              className="hidden sm:inline-flex items-center rounded-full bg-aurora px-4 py-2 text-sm font-medium text-white glow-violet hover:scale-[1.03] transition-transform"
            >
              Visit Store
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
            <Link to="/" className={linkCls} activeProps={{ className: "text-foreground" }} onClick={() => setOpen(false)}>Home</Link>
            <Link to="/instruments" className={linkCls} activeProps={{ className: "text-foreground" }} onClick={() => setOpen(false)}>Instruments</Link>
            <Link to="/experience" className={linkCls} activeProps={{ className: "text-foreground" }} onClick={() => setOpen(false)}>Experience</Link>
            <Link to="/contact" className={linkCls} activeProps={{ className: "text-foreground" }} onClick={() => setOpen(false)}>Contact</Link>
            <a
              href="https://wa.me/919840148769"
              target="_blank" rel="noreferrer"
              className="sm:hidden inline-flex items-center justify-center rounded-full bg-aurora px-4 py-2 text-sm font-medium text-white glow-violet"
            >
              Visit Store
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
