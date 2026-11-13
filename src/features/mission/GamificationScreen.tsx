import { Canvas } from "@react-three/fiber";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";
import {
  BackSide,
  MathUtils,
  NoToneMapping,
  Vector3,
  VideoTexture,
} from "three";
import {
  CLUE_WIDTH,
  MouseLookControls,
  type ClueFocus,
} from "./MouseLookControls";
import ClueInspection from "./ClueInspection";
import { PanoramaVideoFrames, usePanoramaMedia } from "./PanoramaMedia";
import JokerHintSystem from "./JokerHintSystem";
import { useJokerHint } from "./useJokerHint";
import { LoadingScreen } from "../../components/ui/DesignSystem";
import { BatcavernAudio } from "../../lib/audioManager";

export type PanoramaScene = "batcomputer" | "armeria" | "batmobile";
interface Props {
  scene: PanoramaScene;
  onProgress: (count: number) => void;
  baseCompleted: number;
  isPaused: boolean;
  onNext: () => void;
  isMuted?: boolean;
  onReady: (ready: boolean) => void;
  onExit: () => void;
  onCollecting: (collecting: boolean) => void;
  progressTrack: RefObject<HTMLSpanElement | null>;
}

const BATCOMPUTER_RIDDLES = [
  {
    id: 1,
    riddle:
      "Non è un uomo, non è un mostro, non è un re... eppure tutta Gotham trattiene il fiato quando compare nel cielo notturno.",
    options: ["JOKER", "BAT SEGNALE", "PINGUINO", "ARKHAM"],
    correctAnswer: "BAT SEGNALE",
  },
  {
    id: 2,
    riddle:
      "Porto un sorriso eterno, ma non ho mai conosciuto la gioia. Più rido... più Gotham brucia.",
    options: ["ROBIN", "JOKER", "DUE FACCE", "ENIGMISTA"],
    correctAnswer: "JOKER",
  },
];
const ARMERIA_RIDDLE = {
  id: 3,
  riddle:
    "Non ho poteri sovrumani, eppure i criminali tremano al mio nome. Le tenebre sono il mio dominio.",
  options: ["SUPERMAN", "BATMAN", "BANE", "FLASH"],
  correctAnswer: "BATMAN",
};
const BATMOBILE_RIDDLES = [
  {
    id: 4,
    riddle:
      "Divoro l’asfalto di Gotham a velocità impossibili. Lascio solo fumo e terrore. Cosa sono?",
    options: ["BATWING", "BATMOBILE", "JOKER VAN", "TRENO DI GOTHAM"],
    correctAnswer: "BATMOBILE",
  },
  {
    id: 5,
    riddle:
      "Ruggio nell’oscurità di Gotham, il cuore pulsante della Bat Mobile, cosa sono?",
    options: ["PISTONE", "REATTORE", "TURBINA"],
    correctAnswer: "REATTORE",
  },
];

const SCENES = {
  batcomputer: {
    asset: "BatCaverna_Batcomputer360",
    clues: BATCOMPUTER_RIDDLES,
    positions: [
      [-119, -17],
      [126, -24],
    ],
  },
  armeria: {
    asset: "BatCaverna_Armeria360",
    clues: [ARMERIA_RIDDLE],
    positions: [[109, -14]],
  },
  batmobile: {
    asset: "BatCaverna_BatMobile360",
    clues: BATMOBILE_RIDDLES,
    positions: [
      [-113, -15],
      [168, -17],
    ],
  },
};

const CAMERA = { position: [0, 0, 0.1] as [number, number, number], fov: 88 };
const RENDERER = { antialias: false, toneMapping: NoToneMapping };

export default function GamificationScreen({
  scene,
  onProgress,
  baseCompleted,
  isPaused,
  onNext,
  isMuted = false,
  onReady,
  onExit,
  onCollecting,
  progressTrack,
}: Props) {
  const [retry, setRetry] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [active, setActive] = useState<{
    id: number;
    origin: DOMRect | null;
  } | null>(null);
  const [focusTarget, setFocusTarget] = useState<ClueFocus | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [graphics, setGraphics] = useState<
    "checking" | "available" | "unavailable"
  >("checking");
  const markers = useRef(new Map<number, HTMLButtonElement>());
  const section = useRef<HTMLElement>(null);
  const restoreFocus = useRef<number | null>(null);
  const reduced = !!useReducedMotion();
  const config = SCENES[scene];
  const { texture, failed } = usePanoramaMedia(
    config.asset,
    graphics === "available" && !contextLost,
    retry,
    reduced,
    isPaused,
  );
  const loading = !texture;
  const ready = !loading && graphics === "available" && !contextLost && !failed;
  const clue = config.clues.find(({ id }) => id === active?.id);
  const anchors = useMemo(
    () =>
      config.clues.flatMap(({ id }, index) => {
        if (completed.includes(id)) return [];
        const [yaw, pitch] = config.positions[index].map(MathUtils.degToRad);
        return [
          {
            id,
            position: new Vector3(
              200 * Math.sin(yaw) * Math.cos(pitch),
              200 * Math.sin(pitch),
              -200 * Math.cos(yaw) * Math.cos(pitch),
            ),
          },
        ];
      }),
    [config, completed],
  );

  useEffect(() => {
    const probe = document.createElement("canvas");
    try {
      const gl = probe.getContext("webgl2");
      setGraphics(gl ? "available" : "unavailable");
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setGraphics("unavailable");
    }
  }, [retry]);

  useEffect(() => {
    function failedCreation(event: Event) {
      if (
        event.target instanceof Element &&
        event.target.matches(".panorama-scene canvas")
      ) {
        setContextLost(true);
        onReady(false);
      }
    }
    document.addEventListener(
      "webglcontextcreationerror",
      failedCreation,
      true,
    );
    return () =>
      document.removeEventListener(
        "webglcontextcreationerror",
        failedCreation,
        true,
      );
  }, [onReady]);

  useEffect(() => {
    onReady(ready);
    return () => onReady(false);
  }, [ready, onReady]);

  useEffect(() => () => onCollecting(false), [onCollecting]);

  useLayoutEffect(() => {
    if (active || restoreFocus.current === null) return;
    const marker = markers.current.get(restoreFocus.current);
    restoreFocus.current = null;
    (marker ?? section.current)?.focus({ preventScroll: true });
  }, [active]);

  const hint = useJokerHint(
    isPaused || loading,
    true,
    completed,
    active?.id ?? null,
  );
  const { startHintTimer, resetHint } = hint;
  useEffect(() => {
    if (active) return;
    const next = config.clues.find((item) => !completed.includes(item.id));
    if (next) startHintTimer(next.id);
    else resetHint();
  }, [config, completed, active, startHintTimer, resetHint]);

  function open(id: number) {
    if (!ready || isPaused || active || completed.includes(id)) return;
    const marker = markers.current.get(id);
    setFocusTarget(null);
    setActive({
      id,
      origin:
        marker?.style.visibility === "visible"
          ? marker.getBoundingClientRect()
          : null,
    });
  }

  function recover() {
    if (graphics === "unavailable") setGraphics("checking");
    setActive(null);
    onCollecting(false);
    setContextLost(false);
    setRetry((value) => value + 1);
  }

  if (graphics === "checking")
    return <LoadingScreen srLabel="Verifica grafica…" />;
  if (graphics === "unavailable" || failed || contextLost) {
    const unsupported = graphics === "unavailable";
    return (
      <section className="result-screen">
        {unsupported && <p className="eyebrow">MODALITÀ ALTERNATIVA</p>}
        <h1>
          {unsupported
            ? "La Batcaverna non è disponibile."
            : "Ambiente non disponibile"}
        </h1>
        <p>
          {unsupported
            ? "Il browser non riesce ad avviare WebGL."
            : "Non è stato possibile caricare questa area."}{" "}
          Puoi riprovare oppure scoprire la statua.
        </p>
        <div className="action-row">
          <button onClick={recover}>Riprova</button>
          <button className="secondary" onClick={onExit}>
            Scopri la statua
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="panorama-scene"
      aria-label={`Esplorazione: ${scene}`}
      ref={section}
      tabIndex={-1}
    >
      <div inert={isPaused} aria-hidden={isPaused}>
        <Canvas
          camera={CAMERA}
          dpr={1}
          frameloop="demand"
          gl={RENDERER}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (event) => {
                event.preventDefault();
                onReady(false);
                onCollecting(false);
                setActive(null);
                setContextLost(true);
              },
              { once: true },
            );
          }}
        >
          <MouseLookControls
            enabled={ready && !active && !isPaused}
            anchors={anchors}
            markers={markers}
            focusTarget={focusTarget}
          />
          <PanoramaVideoFrames
            texture={
              !isPaused && texture instanceof VideoTexture ? texture : null
            }
          />
          {texture && (
            <mesh scale={[-1, 1, 1]} rotation={[0, -Math.PI / 2, 0]}>
              <sphereGeometry args={[500, 48, 32]} />
              <meshBasicMaterial map={texture} side={BackSide} />
            </mesh>
          )}
        </Canvas>
        <div className="ds-clue-markers">
          {anchors.map(({ id }) => (
            <button
              key={id}
              ref={(node) => {
                if (node) markers.current.set(id, node);
                else markers.current.delete(id);
              }}
              className={`clue-card ds-clue-marker${hint.hintCardId === id ? " ds-clue-hint" : ""}`}
              style={{ width: CLUE_WIDTH }}
              data-clue-id={active?.id === id ? undefined : id}
              data-face="front"
              data-inspecting={active?.id === id || undefined}
              disabled={!ready || Boolean(active) || isPaused}
              tabIndex={-1}
              aria-label={`Apri indizio ${id}`}
              onClick={() => open(id)}
            >
              <img src="/assets/ds/card-front.png" alt="" draggable={false} />
            </button>
          ))}
        </div>
        <div
          className="sr-only"
          aria-label="Raggiungi gli indizi con la tastiera"
        >
          {anchors.map(({ id }) => (
            <button
              key={id}
              disabled={!ready || Boolean(active) || isPaused}
              onFocus={(event) =>
                setFocusTarget({ id, trigger: event.currentTarget })
              }
              onClick={() => open(id)}
            >
              Raggiungi indizio {id}
            </button>
          ))}
        </div>
        {clue && active && (
          <ClueInspection
            key={clue.id}
            clue={clue}
            origin={active.origin}
            marker={markers.current.get(clue.id)}
            track={progressTrack}
            arrivalCount={baseCompleted + completed.length + 1}
            paused={isPaused}
            reduced={reduced}
            onClose={() => {
              restoreFocus.current = clue.id;
              setActive(null);
            }}
            onCorrect={() => onCollecting(true)}
            onLand={() => {
              const next = [...completed, clue.id];
              setCompleted(next);
              onProgress(baseCompleted + next.length);
              BatcavernAudio.clueCollected();
            }}
            onFinish={() => {
              onCollecting(false);
              setActive(null);
              if (completed.length === config.clues.length) onNext();
              else section.current?.focus({ preventScroll: true });
            }}
          />
        )}
      </div>
      <JokerHintSystem {...hint} isMuted={isMuted} isPaused={isPaused} />
      {loading && <LoadingScreen srLabel="Sincronizzazione area…" />}
    </section>
  );
}
