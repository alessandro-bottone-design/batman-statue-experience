import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Button, LoadingScreen } from "../../components/ui/DesignSystem";

import {
  frameSource,
  mountScrollSequence,
  SHOWREEL_POSTER,
} from "./scrollSequence";

const QUALITIES = [
  [
    "357:3646",
    "right",
    "PRESENZA LEGGENDARIA",
    "Non arredamento, una presenza.",
    [0.03, 0.07, 0.24, 0.29],
  ],
  [
    "357:3645",
    "left",
    "MATERIALI D’ELITE",
    "Finitura da pezzo da museo, non da scaffale.",
    [0.34, 0.38, 0.54, 0.59],
  ],
  [
    "357:3644",
    "right",
    "SCULTURA DI PRECISIONE",
    "Ogni ombra di Gotham scolpita con precisione.",
    [0.65, 0.69, 0.84, 0.89],
  ],
] as const;

const FINAL_FADE = [0.93, 0.97] as const;

function ScrollOverlay({
  progress,
  stops,
  className,
  node,
  staticView = false,
  children,
}: {
  progress: MotionValue<number>;
  stops: readonly [number, number] | readonly [number, number, number, number];
  className: string;
  node: string;
  staticView?: boolean;
  children: ReactNode;
}) {
  const opacity = useTransform(
    progress,
    [...stops],
    stops.length === 4 ? [0, 1, 1, 0] : [0, 1],
  );
  const visibility = useTransform(opacity, (value) =>
    value > 0 ? "visible" : "hidden",
  );
  return (
    <motion.div
      className={`ds-showreel-overlay ${className}`}
      data-figma-node={node}
      style={staticView ? undefined : { opacity, visibility }}
    >
      {children}
    </motion.div>
  );
}

export default function ShowreelScreen({
  onPreorder,
}: {
  onPreorder?: () => void;
}) {
  const reduced = !!useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useMotionValue(0);
  const hintOpacity = useTransform(progress, [0, 0.02], [1, 0]);
  const hintVisibility = useTransform(hintOpacity, (value) =>
    value > 0 ? "visible" : "hidden",
  );
  const [finalReady, setFinalReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (reduced || !canvas.current || !container.current || !stage.current)
      return;

    setLoaded(false);
    setFailed(false);
    return mountScrollSequence({
      canvas: canvas.current,
      track: container.current,
      stage: stage.current,
      onProgress: (value) => {
        progress.set(value);
        setFinalReady(value >= FINAL_FADE[1]);
      },
      onReady: () => {
        setLoaded(true);
        setFailed(false);
      },
      onUnavailable: () => setFailed(true),
    });
  }, [progress, reduced, retry]);

  return (
    <div
      ref={container}
      className={reduced ? "ds-statue-static" : "statue-scroll"}
    >
      <section
        ref={stage}
        className="statue-stage"
        aria-label="Presentazione della statua Batman"
      >
        <div className="ds-showreel-media">
          {reduced ? (
            <img
              className="ds-statue-poster"
              src={
                frameSource(SHOWREEL_POSTER) + (retry ? "?retry=" + retry : "")
              }
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
        </div>
        {!reduced && loaded && (
          <motion.p
            className="ds-showreel-hint"
            style={{ opacity: hintOpacity, visibility: hintVisibility }}
          >
            Scorri per esplorare ↓
          </motion.p>
        )}
        {!reduced &&
          QUALITIES.map(([node, align, title, description, stops]) => (
            <ScrollOverlay
              key={node}
              progress={progress}
              stops={stops}
              className={`ds-showreel-step ds-showreel-${align}`}
              node={node}
            >
              <div
                className="ds-panel ds-primary ds-showreel-card"
                data-figma-node="357:3499"
              >
                <h1 className="ds-heading-l">{title}</h1>
                <p className="ds-body">{description}</p>
              </div>
            </ScrollOverlay>
          ))}
        <ScrollOverlay
          progress={progress}
          stops={FINAL_FADE}
          className="ds-showreel-final"
          node="357:3647"
          staticView={reduced}
        >
          <h1 className="ds-display ds-glow-text">L’EREDITÀ È TUA</h1>
          <Button
            onClick={onPreorder}
            disabled={!reduced && (!loaded || !finalReady)}
          >
            PREORDINA IL CAVALIERE
          </Button>
          {reduced && (
            <ul className="sr-only">
              {QUALITIES.map(([id, , title, description]) => (
                <li key={id}>
                  {title}. {description}
                </li>
              ))}
            </ul>
          )}
        </ScrollOverlay>
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
