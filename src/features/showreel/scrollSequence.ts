export const SHOWREEL_POSTER = 800;

const CONCURRENCY = 6;
const CACHE_LIMIT = 48;
const PREFETCH_RADIUS = 21;

// Cut from the gauntlet to the pullback before the camera loses the subject.
const CHAPTERS = [
  { start: 0, first: 1, last: 274 },
  { start: 0.31, first: 275, last: 541 },
  { start: 0.62, first: 542, last: 650 },
  { start: 0.91, first: 735, last: SHOWREEL_POSTER },
] as const;

export const frameSource = (index: number) =>
  `/assets/showreel/${String(index).padStart(4, "0")}.webp`;

export function mountScrollSequence({
  canvas,
  track,
  stage,
  onProgress,
  onReady,
  onUnavailable,
}: {
  canvas: HTMLCanvasElement;
  track: HTMLDivElement;
  stage: HTMLElement;
  onProgress: (progress: number) => void;
  onReady: () => void;
  onUnavailable: () => void;
}) {
  const context = canvas.getContext("2d");
  if (!context) {
    onUnavailable();
    return;
  }
  const ctx: CanvasRenderingContext2D = context;
  let alive = true,
    active = 0,
    target = 1,
    targetChapter = 0,
    paintedFrame = 0,
    raf = 0;
  const images = new Map<number, HTMLImageElement>();
  const pending = new Set<number>();
  const errors = new Set<number>();
  let queue: number[] = [];
  function draw(force = false) {
    if (!alive) return false;
    const { first, last } = CHAPTERS[targetChapter];
    let closest = 0;
    for (const index of images.keys()) {
      if (index < first || index > last) continue;
      if (!closest || Math.abs(index - target) < Math.abs(closest - target))
        closest = index;
    }
    const frame = closest || paintedFrame;
    const image = images.get(frame);
    if (!image) return false;
    if (!canvas.width || !canvas.height) return true;
    if (!force && frame === paintedFrame) return true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.max(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight,
    );
    const width = image.naturalWidth * scale,
      height = image.naturalHeight * scale;
    ctx.drawImage(
      image,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height,
    );
    if (!paintedFrame) onReady();
    paintedFrame = frame;
    return true;
  }
  function pump() {
    while (alive && active < CONCURRENCY && queue.length) {
      const index = queue.shift()!;
      if (images.has(index) || pending.has(index) || errors.has(index))
        continue;
      pending.add(index);
      active++;
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        pending.delete(index);
        active--;
        if (!alive) return;
        images.set(index, image);
        if (images.size > CACHE_LIMIT) {
          const evict = [...images.keys()]
            .filter((i) => i !== paintedFrame)
            .sort((a, b) => Math.abs(b - target) - Math.abs(a - target))[0];
          images.delete(evict);
        }
        draw();
        pump();
      };
      image.onerror = () => {
        pending.delete(index);
        active--;
        if (!alive) return;
        errors.add(index);
        pump();
      };
      image.src = frameSource(index);
    }
    if (active === 0 && !paintedFrame && !draw()) onUnavailable();
  }
  function request() {
    queue = [];
    const { first, last } = CHAPTERS[targetChapter];
    for (let distance = 0; distance <= PREFETCH_RADIUS; distance++)
      for (const index of distance === 0
        ? [target]
        : [target + distance, target - distance])
        if (
          index >= first &&
          index <= last &&
          !images.has(index) &&
          !pending.has(index) &&
          !errors.has(index)
        )
          queue.push(index);
    pump();
    draw();
  }
  function scroll() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const distance = track.offsetHeight - stage.clientHeight;
      const p = Math.max(
        0,
        Math.min(1, -track.getBoundingClientRect().top / Math.max(1, distance)),
      );
      onProgress(p);
      const nextChapter = CHAPTERS.findIndex(({ start }) => p < start);
      targetChapter = (nextChapter === -1 ? CHAPTERS.length : nextChapter) - 1;
      const { start, first, last } = CHAPTERS[targetChapter];
      const end = CHAPTERS[targetChapter + 1]?.start ?? 1;
      target =
        first + Math.round(((p - start) / (end - start)) * (last - first));
      request();
    });
  }
  function resize() {
    const density = Math.min(devicePixelRatio, 1.5);
    const width = Math.round(canvas.clientWidth * density);
    const height = Math.round(canvas.clientHeight * density);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      draw(true);
    }
    scroll();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("resize", resize);
  return () => {
    alive = false;
    observer.disconnect();
    cancelAnimationFrame(raf);
    queue = [];
    images.clear();
    window.removeEventListener("scroll", scroll);
    window.removeEventListener("resize", resize);
  };
}
