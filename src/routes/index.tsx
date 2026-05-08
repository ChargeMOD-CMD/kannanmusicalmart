import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Headphones, Zap, Music } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Waveform } from "@/components/Waveform";
import heroImg from "@/assets/hero-guitar.jpg";
import keysImg from "@/assets/cat-keys.jpg";
import drumsImg from "@/assets/cat-drums.jpg";
import audioImg from "@/assets/cat-audio.jpg";
import stringsImg from "@/assets/cat-strings.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kannan Musical Mart — Feel The Rhythm. Experience The Sound." },
      { name: "description", content: "Premium musical instruments, audio equipment & accessories in Chennai. Cinematic immersive music experience." },
      { property: "og:title", content: "Kannan Musical Mart — Immersive Music Experience" },
      { property: "og:description", content: "Discover a futuristic musical universe in the heart of Chennai." },
    ],
  }),
  component: Index,
});

const categories = [
  { name: "Strings", desc: "Acoustic · Electric · Bass · Violin · Ukulele", img: stringsImg },
  { name: "Keys", desc: "Pianos · Keyboards · MIDI Controllers", img: keysImg },
  { name: "Percussion", desc: "Drum Kits · Tabla · Cajon · E-Drums", img: drumsImg },
  { name: "Audio", desc: "Mics · Mixers · Monitors · Amps", img: audioImg },
];

const brands = ["Yamaha", "Fender", "Gibson", "Roland", "Shure", "Casio", "Korg", "Pearl"];

const stories = [
  { name: "Aarav", role: "Guitarist · Chennai", quote: "The team helped me pick a Strat that completely changed my tone. The setup is impeccable." },
  { name: "Meera", role: "Producer", quote: "Got my entire studio chain here — monitors, mics, interface. Sound advice + premium gear." },
  { name: "Karthik", role: "Drummer", quote: "From acoustic kits to e-drums, they have it all. Real musicians who actually play." },
];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-stage" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> Chennai · Since the first chord
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Feel the <span className="text-aurora">rhythm.</span><br />
              Experience the <span className="text-aurora">sound.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              An immersive destination for premium instruments, studio equipment and
              live audio gear — curated for musicians who feel music in motion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/instruments"
                className="group inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-white glow-violet hover:scale-[1.03] transition-transform"
              >
                Explore Instruments
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/experience"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors"
              >
                Sound Experience
              </Link>
            </div>
            <div className="mt-10"><Waveform bars={56} /></div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-8 bg-aurora opacity-30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden glass animate-float">
              <img src={heroImg} alt="Floating electric guitar with neon sound waves" width={1600} height={1080} className="w-full h-auto" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Now Playing</p>
                  <p className="text-sm font-medium">Stratocaster · Vintage Tone</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_,i)=>(
                    <span key={i} className="w-1 bg-highlight animate-wave rounded-full" style={{height:`${10+i*4}px`,animationDelay:`${i*0.1}s`}}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Our Story</p>
            <h2 className="mt-3 font-display text-4xl font-bold">A passion for music. A devotion to sound.</h2>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Music, title: "Curated Selection", text: "Every instrument hand-picked for tone, feel and craftsmanship." },
              { icon: Headphones, title: "Premium Audio", text: "Studio-grade microphones, monitors and live sound systems." },
              { icon: Zap, title: "Expert Setup", text: "Professional setup, advice and after-sales support from real musicians." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors">
                <Icon className="h-6 w-6 text-highlight" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUMENT SHOWCASE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Showcase</p>
              <h2 className="mt-3 font-display text-4xl font-bold">Instruments in motion.</h2>
            </div>
            <Link to="/instruments" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              See all categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <Link
                key={c.name}
                to="/instruments"
                data-cursor="hover"
                className="group relative overflow-hidden rounded-2xl glass aspect-[3/4] animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img src={c.img} alt={c.name} loading="lazy" width={800} height={1024}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-aurora opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <span className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOUND EXPERIENCE */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-stage opacity-70" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-highlight">Sound Experience Zone</p>
          <h2 className="mt-3 font-display text-5xl font-bold">Hear the room before you buy the gear.</h2>
          <p className="mt-5 mx-auto max-w-2xl text-muted-foreground">
            Step into our sound-reactive showcase — interactive demos, virtual instrument
            walkthroughs and rhythm-based visual experiences.
          </p>
          <div className="mt-10 mx-auto max-w-3xl glass rounded-3xl p-10">
            <Waveform bars={80} className="h-24" />
            <Link
              to="/experience"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-white glow-cyan hover:scale-[1.03] transition-transform"
            >
              Enter the Experience
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-20 border-y border-border/50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Featured Brands</p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {brands.map(b => (
              <span key={b} className="font-display text-2xl text-muted-foreground hover:text-aurora transition-colors">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Artist Stories</p>
          <h2 className="mt-3 font-display text-4xl font-bold max-w-2xl">Real musicians. Real journeys.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {stories.map(s => (
              <figure key={s.name} className="glass rounded-2xl p-6 flex flex-col">
                <blockquote className="text-sm text-foreground/90 flex-1">"{s.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-aurora text-sm font-semibold text-white">
                    {s.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl glass p-12 text-center">
            <div className="absolute inset-0 bg-aurora opacity-10" />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold">Ready to find your sound?</h2>
              <p className="mt-3 text-muted-foreground">Talk to our team or visit the store in Chennai.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="https://wa.me/919840148769" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-white glow-violet hover:scale-[1.03] transition-transform">
                  Chat on WhatsApp
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:border-primary/50 transition-colors">
                  Visit Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
