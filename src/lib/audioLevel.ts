// Tiny pub/sub for audio reactivity. AmbientPlayer publishes 0..1 level
// from an AnalyserNode; visual components (Waveform) subscribe.
type Listener = (level: number) => void;

let level = 0;
let active = false;
const listeners = new Set<Listener>();

export const audioLevel = {
  set(next: number, isActive: boolean) {
    level = next;
    active = isActive;
    listeners.forEach((l) => l(next));
  },
  get() {
    return level;
  },
  isActive() {
    return active;
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};