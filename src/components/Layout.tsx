import { Header } from "./Header";
import { Footer } from "./Footer";
import { CursorOrb } from "./CursorOrb";
import { ChatOrb } from "./ChatOrb";
import { AmbientPlayer } from "./AmbientPlayer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <CursorOrb />
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
      <ChatOrb />
      <AmbientPlayer />
    </div>
  );
}
