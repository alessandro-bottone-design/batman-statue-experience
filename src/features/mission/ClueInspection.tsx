import {
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import JokerCard from "./JokerCard";

export interface Clue {
  id: number;
  riddle: string;
  options: string[];
  correctAnswer: string;
}

type Stage =
  "opening" | "reading" | "closing" | "confirming" | "flying" | "collected";
const HOLD_ANSWER = 250;
const HOLD_PROGRESS = 240;
const EASE_OUT = "cubic-bezier(0.18, 0.78, 0.25, 1)";

function pose(x: number, y: number, scale: number, rotation = 0) {
  return `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
}

export default function ClueInspection({
  clue,
  origin,
  marker,
  track,
  arrivalCount,
  paused,
  reduced,
  onClose,
  onCorrect,
  onLand,
  onFinish,
}: {
  clue: Clue;
  origin: DOMRect | null;
  marker: HTMLButtonElement | undefined;
  track: RefObject<HTMLSpanElement | null>;
  arrivalCount: number;
  paused: boolean;
  reduced: boolean;
  onClose: () => void;
  onCorrect: () => void;
  onLand: () => void;
  onFinish: () => void;
}) {
  const [stage, setStage] = useState<Stage>("opening");
  const card = useRef<HTMLDivElement>(null);
  const closingPose = useRef<string | null>(null);
  const motion = useRef<Animation | null>(null);
  const hold = useRef<{ stage: Stage; remaining: number } | null>(null);

  const advance = useEffectEvent(() => {
    switch (stage) {
      case "opening":
        setStage("reading");
        break;
      case "closing":
        onClose();
        break;
      case "confirming":
        setStage("flying");
        break;
      case "flying":
        onLand();
        setStage("collected");
        break;
      case "collected":
        onFinish();
        break;
    }
  });

  useLayoutEffect(() => {
    if (!card.current || !["opening", "closing", "flying"].includes(stage))
      return;
    const target =
      stage === "opening"
        ? origin
        : stage === "closing"
          ? marker?.getBoundingClientRect()
          : track.current?.getBoundingClientRect();
    if (reduced || !target?.width) {
      advance();
      return;
    }

    const bounds = card.current.getBoundingClientRect();
    const center = stage === "flying" ? (arrivalCount - 0.5) / 5 : 0.5;
    const x =
      target.left + target.width * center - (bounds.left + bounds.width / 2);
    const y = target.top + target.height / 2 - (bounds.top + bounds.height / 2);
    const scale = target.width / (bounds.width * (260 / 300));
    const atRest = { transform: pose(0, 0, 1) };
    const atMarker = { transform: pose(x, y, scale, -5) };
    const flight = stage === "flying";
    const frames = flight
      ? [
          atRest,
          {
            transform: pose(x * 0.32 + 32, y * 0.48 - 34, 0.6, -9),
            offset: 0.48,
            easing: "ease-in",
          },
          { transform: pose(x, y, 0.045, -16), opacity: 0.16 },
        ]
      : stage === "opening"
        ? [atMarker, atRest]
        : [{ transform: closingPose.current ?? atRest.transform }, atMarker];
    const animation = card.current.animate(frames, {
      duration: flight ? 430 : stage === "opening" ? 350 : 300,
      easing: flight ? "ease-in-out" : EASE_OUT,
      fill: "both",
    });
    motion.current = animation;
    animation.onfinish = () => advance();
    return () => {
      motion.current = null;
      animation.onfinish = null;
      animation.cancel();
    };
  }, [stage, origin, marker, track, arrivalCount, reduced]);

  useLayoutEffect(() => {
    if (!motion.current) return;
    if (paused) motion.current.pause();
    else motion.current.play();
  }, [paused, stage, reduced]);

  useEffect(() => {
    if (stage !== "confirming" && stage !== "collected") return;
    if (hold.current?.stage !== stage) {
      hold.current = {
        stage,
        remaining:
          stage === "confirming" ? HOLD_ANSWER : reduced ? 0 : HOLD_PROGRESS,
      };
    }
    if (paused) return;
    const current = hold.current;
    const started = performance.now();
    const timer = setTimeout(() => advance(), current.remaining);
    return () => {
      clearTimeout(timer);
      current.remaining = Math.max(
        0,
        current.remaining - (performance.now() - started),
      );
    };
  }, [stage, paused, reduced]);

  useEffect(() => {
    if (paused) return;
    const canClose = stage === "opening" || stage === "reading";
    const close = () => {
      if (stage === "opening" && card.current) {
        closingPose.current = getComputedStyle(card.current).transform;
      }
      setStage("closing");
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.repeat) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (canClose) close();
    };
    const outside = (event: PointerEvent) => {
      if (
        canClose &&
        event.target instanceof Element &&
        !event.target.closest(".ds-inspection-card, nav")
      ) {
        close();
      }
    };
    window.addEventListener("keydown", escape, true);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", escape, true);
      document.removeEventListener("pointerdown", outside);
    };
  }, [stage, paused]);

  return (
    <div className="ds-inspection" data-stage={stage}>
      <div
        className="ds-inspection-card"
        ref={card}
        role="dialog"
        aria-label={`Enigma ${clue.id}`}
        aria-hidden={stage === "collected"}
      >
        <JokerCard
          {...clue}
          active={stage !== "opening" && stage !== "closing"}
          disabled={paused || stage === "flying" || stage === "collected"}
          hint={false}
          onCorrect={() => {
            onCorrect();
            setStage("confirming");
          }}
        />
      </div>
    </div>
  );
}
