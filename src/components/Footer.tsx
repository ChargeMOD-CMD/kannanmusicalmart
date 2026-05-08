import { Music2, Phone, Mail, MapPin } from "lucide-react";
import { Waveform } from "./Waveform";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-stage opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-aurora">
                <Music2 className="h-4 w-4 text-white" />
              </span>
              <span className="font-display text-lg font-semibold">Kannan Musical Mart</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Feel the rhythm. Experience the sound. A premium destination for musicians,
              creators and performers in Chennai.
            </p>
            <div className="mt-6"><Waveform bars={40} /></div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Visit</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Chennai, Tamil Nadu</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98401 48769</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@kannanmusicalmart.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Hours</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Mon – Fri · 10AM – 9PM</li>
              <li>Sat – Sun · 10AM – 10PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kannan Musical Mart. All rights reserved.</p>
          <p>Crafted with rhythm in Chennai.</p>
        </div>
      </div>
    </footer>
  );
}
