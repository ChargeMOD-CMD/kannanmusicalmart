import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Waveform } from "@/components/Waveform";
import keysImg from "@/assets/cat-keys.jpg";
import drumsImg from "@/assets/cat-drums.jpg";
import audioImg from "@/assets/cat-audio.jpg";
import stringsImg from "@/assets/cat-strings.jpg";

export const Route = createFileRoute("/instruments")({
  head: () => ({
    meta: [
      { title: "Instruments — Kannan Musical Mart" },
      { name: "description", content: "Browse guitars, keyboards, drums, audio gear and accessories curated for serious musicians." },
      { property: "og:title", content: "Instruments — Kannan Musical Mart" },
      { property: "og:description", content: "Strings, keys, percussion and audio equipment, curated in Chennai." },
    ],
  }),
  component: InstrumentsPage,
});

const cats = [
  { title: "String Instruments", img: stringsImg, items: ["Acoustic Guitar","Electric Guitar","Bass Guitar","Violin","Ukulele"] },
  { title: "Keyboard Instruments", img: keysImg, items: ["Keyboard","Piano","MIDI Controllers"] },
  { title: "Percussion", img: drumsImg, items: ["Drum Kits","Tabla","Electronic Drums","Cajon"] },
  { title: "Audio Equipment", img: audioImg, items: ["Microphones","Speakers","Mixers","Amplifiers","Studio Monitors"] },
  { title: "Accessories", img: stringsImg, items: ["Strings","Picks","Cases","Music Stands","Cables"] },
];

function InstrumentsPage() {
  return (
    <Layout>
      <section className="relative">
        <div className="absolute inset-0 bg-stage" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Catalog</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
            Every <span className="text-aurora">instrument</span>, every voice.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From beginner kits to pro studio rigs — explore our complete range.
          </p>
          <div className="mt-8"><Waveform bars={64}/></div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-10">
          {cats.map((c, i) => (
            <article key={c.title} className="glass rounded-3xl overflow-hidden grid md:grid-cols-2 animate-fade-up" style={{animationDelay:`${i*0.05}s`}}>
              <div className={`relative aspect-[4/3] md:aspect-auto ${i%2 ? "md:order-2" : ""}`}>
                <img src={c.img} alt={c.title} loading="lazy" width={800} height={600}
                  className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-display text-3xl font-bold">{c.title}</h2>
                <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                  {c.items.map(it => (
                    <li key={it} data-cursor="hover" className="rounded-lg px-3 py-2 bg-background/40 border border-border hover:border-primary/50 hover:text-foreground transition-colors text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/919840148769" target="_blank" rel="noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-semibold text-white glow-violet hover:scale-[1.03] transition-transform">
                  Inquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
