import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Button, LoadingScreen } from "../../components/ui/DesignSystem";

const FRAMES = 800,
  CONCURRENCY = 6,
  CACHE_LIMIT = 48;

const QUALITIES = [
  [
    "357:3646",
    "right",
    "PRESENZA LEGGENDARIA",
    "Non arredamento, una presenza.",
  ],
  [
    "357:3645",
    "left",
    "MATERIALI D’ELITE",
    "Finitura da pezzo da museo, non da scaffale.",
  ],
  [
    "357:3644",
    "right",
    "SCULTURA DI PRECISIONE",
    "Ogni ombra di Gotham scolpita con precisione.",
  ],
] as const;

const source = (index: number) =>
  `/assets/showreel/${String(index).padStart(4, "0")}.webp`;

export default function ShowreelScreen({
  onPreorder,
}: {
  onPreorder?: () => void;
}) {
  const reduced = !!useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const cv = canvas.current;
    const section = container.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !section || !ctx) {
      setFailed(true);
      return;
    }
    let alive = true,
      active = 0,
      target = 1,
      raf = 0;
    const images = new Map<number, HTMLImageElement>();
    const pending = new Set<number>();
    const errors = new Set<number>();
    let queue: number[] = [];
    setLoaded(false);
    setFailed(false);
    function draw() {
      if (!alive) return;
      const closest = [...images.keys()].sort(
        (a, b) => Math.abs(a - target) - Math.abs(b - target),
      )[0];
      const image = images.get(closest);
      if (!image) return;
      ctx!.clearRect(0, 0, cv!.width, cv!.height);
      const scale = Math.min(
        cv!.width / image.naturalWidth,
        cv!.height / image.naturalHeight,
      );
      const width = image.naturalWidth * scale,
        height = image.naturalHeight * scale;
      ctx!.drawImage(
        image,
        (cv!.width - width) / 2,
        (cv!.height - height) / 2,
        width,
        height,
      );
      setLoaded(true);
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
              .filter((i) => i !== 1)
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
          if (!images.size && !queue.length && active === 0) setFailed(true);
          pump();
        };
        image.src = source(index);
      }
    }
    function request() {
      queue = [];
      for (let distance = 0; distance < 22; distance++)
        for (const index of distance === 0
          ? [target]
          : [target + distance, target - distance])
          if (
            index >= 1 &&
            index <= FRAMES &&
            !images.has(index) &&
            !pending.has(index) &&
            !errors.has(index)
          )
            queue.push(index);
      if (!images.has(1) && !errors.has(1)) queue.push(1);
      pump();
      draw();
    }
    function scroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const distance = section!.offsetHeight - innerHeight;
        const p = Math.max(
          0,
          Math.min(
            1,
            -section!.getBoundingClientRect().top / Math.max(1, distance),
          ),
        );
        target = Math.max(
          1,
          Math.min(FRAMES, Math.round(p * (FRAMES - 1)) + 1),
        );
        setProgress(p);
        request();
      });
    }
    function resize() {
      cv!.width = innerWidth * Math.min(devicePixelRatio, 1.5);
      cv!.height = innerHeight * Math.min(devicePixelRatio, 1.5);
      draw();
      scroll();
    }
    resize();
    request();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      queue = [];
      images.clear();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, retry]);

  const final = reduced || progress > 0.91;
  const qualityIndex = Math.min(2, Math.floor(progress / 0.31));
  const [qualityNode, qualityAlign, qualityTitle, qualityDescription] =
    QUALITIES[qualityIndex];

  return (
    <div
      ref={container}
      className={reduced ? "ds-statue-static" : "statue-scroll"}
    >
      <section
        className="statue-stage"
        data-step={final ? "4" : String(qualityIndex + 1)}
        aria-label="Presentazione della statua Batman"
      >
        {reduced ? (
          <img
            className="ds-statue-poster"
            src={source(800) + (retry ? "?retry=" + retry : "")}
            alt="Statua Batman"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : (
          <canvas
            ref={canvas}
            aria-label="Sequenza della statua Batman controllata dallo scorrimento"
            role="img"
          />
        )}
        <div
          className={
            "ds-showreel-overlay " +
            (final
              ? "ds-showreel-final"
              : "ds-showreel-step ds-showreel-" + qualityAlign)
          }
          data-figma-node={final ? "357:3647" : qualityNode}
        >
          {final ? (
            <>
              <div className="ds-showreel-final-title">
                <h1 className="ds-display ds-glow-text">L’EREDITÀ È TUA</h1>
              </div>
              <div className="ds-showreel-final-action">
                <Button onClick={onPreorder}>PREORDINA IL CAVALIERE</Button>
              </div>
            </>
          ) : (
            <div
              className="ds-panel ds-primary ds-showreel-card"
              data-figma-node="357:3499"
            >
              <div className="ds-showreel-card-block">
                <h1 className="ds-heading-l ds-glow-text">{qualityTitle}</h1>
              </div>
              <div className="ds-showreel-card-block">
                <p className="ds-body">{qualityDescription}</p>
              </div>
            </div>
          )}
          {reduced && (
            <ul className="sr-only">
              {QUALITIES.map(([id, , title, description]) => (
                <li key={id}>
                  {title}. {description}
                </li>
              ))}
            </ul>
          )}
        </div>
        {!loaded &&
          (failed ? (
            <div className="statue-loading" role="status">
              <p>
                Sequenza non disponibile. Puoi riprovare o proseguire con la
                demo.
              </p>
              <button
                onClick={() => {
                  setFailed(false);
                  setRetry((r) => r + 1);
                }}
              >
                Riprova
              </button>
            </div>
          ) : (
            <LoadingScreen
              className="statue-loading"
              srLabel="Preparazione del primo fotogramma…"
            />
          ))}
      </section>
    </div>
  );
}
