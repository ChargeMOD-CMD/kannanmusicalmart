import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kannan Musical Mart" },
      { name: "description", content: "Visit our Chennai store, call, WhatsApp or email Kannan Musical Mart." },
      { property: "og:title", content: "Contact — Kannan Musical Mart" },
      { property: "og:description", content: "Reach out to our team in Chennai." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <section className="relative">
        <div className="absolute inset-0 bg-stage" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Contact</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            Let's make <span className="text-aurora">music</span> together.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Got a question about gear or a custom setup? We'd love to help.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}
            className="glass rounded-3xl p-8 space-y-4"
          >
            <h2 className="font-display text-2xl">Quick Inquiry</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Your name" className="rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input required type="tel" placeholder="Phone" className="rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <input type="email" placeholder="Email" className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <select className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>I'm interested in…</option>
              <option>Guitars</option><option>Keyboards / Piano</option>
              <option>Drums / Percussion</option><option>Audio Equipment</option>
              <option>Accessories</option><option>Studio Setup</option>
            </select>
            <textarea rows={4} placeholder="Tell us what you're looking for…" className="w-full rounded-lg bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button type="submit" className="w-full rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-white glow-violet hover:scale-[1.01] transition-transform">
              Send Inquiry
            </button>
          </form>

          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Call us", value: "+91 98401 48769", href: "tel:+919840148769" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: "https://wa.me/919840148769" },
              { icon: Mail, label: "Email", value: "info@kannanmusicalmart.com", href: "mailto:info@kannanmusicalmart.com" },
              { icon: MapPin, label: "Visit", value: "Chennai, Tamil Nadu, India", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                data-cursor="hover"
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 transition-colors">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-aurora">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </a>
            ))}
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-aurora">
                <Clock className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Hours</p>
                <p className="font-medium">Mon–Fri 10AM–9PM · Sat–Sun 10AM–10PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
