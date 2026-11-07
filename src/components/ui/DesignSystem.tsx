import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type Ref,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import BatcaveBackdrop from "../layout/BatcaveBackdrop";
export type Tone = "primary" | "secondary";
export type IconName =
  | "chevron-left"
  | "chevron-right"
  | "audio-on"
  | "audio-off"
  | "play"
  | "pause";
const BATMAN_LOADING_PATH =
  "M992.275 309.428C952.418 298.412 917.875 286.811 879.897 287.006C823.837 287.267 788.063 330.219 788.711 390.9C732.003 347.687 667.129 349.577 621.18 400.546C585.341 440.305 563.306 487.233 542.826 542.048C522.023 485.212 500.7 435.547 461.75 396.505C414.245 348.925 349.242 352.836 296.488 395.723C293.766 348.925 275.231 305.517 232.975 294.046C184.757 281.01 140.169 298.347 92.3401 320.703C135.243 189.5 253.131 103.335 381.258 75.0477C364.472 111.678 357.149 149.155 382.36 176.073C409.45 204.882 451.705 212.443 493.053 212.573L505.302 122.367L522.152 159.258C525.846 167.405 552.353 167.47 559.093 163.82L575.295 120.672L593.766 214.463C630.707 217.266 680.35 212.703 707.894 181.092C733.494 151.697 722.865 112.59 703.487 75.6343C832.392 92.2546 933.947 184.416 992.34 309.428H992.275Z";

export function BatmanLoadingAnimation() {
  const reduced = !!useReducedMotion();
  return (
    <div className="ds-loading-animation" data-figma-node="360:1339">
      <motion.svg
        className="ds-loading-bat"
        viewBox="92.34 75.048 900 467"
        overflow="visible"
        fill="none"
        aria-hidden="true"
        data-figma-node="338:5675"
        initial={reduced ? false : { opacity: 1 }}
        animate={
          reduced
            ? { opacity: 1 }
            : {
                opacity: [1, 1, 0.7, 1, 1, 0.72, 1, 1, 0.55, 1, 0.65, 1, 1],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                opacity: {
                  duration: 3.35,
                  times: [
                    0, 0.194, 0.2537, 0.3134, 0.4627, 0.5224, 0.5821, 0.7164,
                    0.7672, 0.8209, 0.8716, 0.9313, 1,
                  ],
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }
        }
      >
        <motion.path
          d={BATMAN_LOADING_PATH}
          stroke="#FFD700"
          strokeWidth={10}
          pathLength={1}
          initial={
            reduced ? false : { strokeDasharray: "0 1", strokeDashoffset: 0 }
          }
          animate={
            reduced
              ? { strokeDasharray: "1 1", strokeDashoffset: 0 }
              : { strokeDasharray: ["0 1", "1 1", "1 1"] }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 3.35,
                  ease: "linear",
                  times: [0, 0.716, 1],
                  repeat: Infinity,
                }
          }
        />
      </motion.svg>
    </div>
  );
}

export function LoadingScreen({
  className = "",
  srLabel = "Inizializzazione della Batcaverna",
}: {
  className?: string;
  srLabel?: string;
}) {
  return (
    <div
      className={"ds-loading-screen loading-screen " + className}
      role="status"
      data-figma-node="359:3835"
    >
      <div className="ds-loading-stack" data-figma-node="359:3826">
        <BatmanLoadingAnimation />
        <div className="ds-loading-text" data-figma-node="359:3822">
          <span className="sr-only">{srLabel}</span>
          <p className="ds-display" aria-hidden="true">
            LOADING...
          </p>
        </div>
      </div>
    </div>
  );
}
export function Button({
  tone = "primary",
  size = "big",
  emphasis = false,
  className = "",
  ref,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: Tone;
  size?: "big" | "medium" | "small";
  emphasis?: boolean;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      className={[
        "ds-button",
        "ds-" + tone,
        "ds-button-" + size,
        emphasis ? "ds-pressed" : "",
        className,
      ].join(" ")}
    />
  );
}
export function Icon({ name }: { name: IconName }) {
  return (
    <span
      className={"ds-icon ds-icon-" + name}
      aria-hidden="true"
      style={
        {
          "--icon-source": "url('/assets/ds/" + name + ".svg')",
        } as CSSProperties
      }
    />
  );
}
export function IconButton({
  icon,
  tone = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName;
  tone?: Tone;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      {...props}
      className={"ds-icon-button ds-" + tone + " " + className}
    >
      <Icon name={icon} />
    </button>
  );
}
export function Logos({ plain = false }: { plain?: boolean }) {
  return (
    <div
      className={"ds-logos" + (plain ? " ds-logos-plain" : " ds-glow-text")}
      aria-label="Sideshow × Batman"
      role="img"
      data-figma-node={plain ? "267:1712" : "264:1679"}
    >
      <img src="/assets/ds/sideshow.svg" alt="" />
      <img src="/assets/ds/brand-x.svg" alt="" />
      <img src="/assets/ds/batman.svg" alt="" />
    </div>
  );
}
export function Timer({
  seconds,
  small = false,
  tone = "secondary",
}: {
  seconds: number;
  small?: boolean;
  tone?: Tone;
}) {
  const value =
    String(Math.floor(seconds / 60)).padStart(2, "0") +
    "." +
    String(seconds % 60).padStart(2, "0");
  return (
    <div
      className={"ds-timer ds-" + tone + (small ? " ds-timer-small" : "")}
      aria-label="Tempo alla detonazione"
      data-figma-node={
        small
          ? tone === "secondary"
            ? "239:3077"
            : "239:3079"
          : tone === "secondary"
            ? "239:3078"
            : "239:3080"
      }
    >
      <span className={small ? "ds-caption" : "ds-body-space"}>
        TEMPO ALLA DETONAZIONE
      </span>
      <span className={small ? "ds-heading-l" : "ds-display"} role="timer">
        {value}
      </span>
    </div>
  );
}
export function MobileNotice() {
  return (
    <main className="ds-mobile-page">
      <BatcaveBackdrop />
      <header>
        <Logos />
      </header>
      <section
        className="ds-panel ds-mobile-card"
        data-figma-node="238:2970"
        aria-labelledby="mobile-title"
      >
        <h1 id="mobile-title" className="ds-heading">
          DISPOSITIVO
          <br />
          NON COMPATIBILE
        </h1>
        <p className="ds-body-small">
          L’esplorazione immersiva
          <br />
          della BatCaverna
          <br />
          richiede un monitor
          <br />
          desktop e un mouse.
        </p>
      </section>
    </main>
  );
}
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!ref.current || event.pointerType !== "mouse") return;
      ref.current.style.transform =
        "translate3d(" + event.clientX + "px," + event.clientY + "px,0)";
      ref.current.hidden = false;
    };
    const hide = () => {
      if (ref.current) ref.current.hidden = true;
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="ds-cursor"
      hidden
      aria-hidden="true"
      data-figma-node="49:499"
    >
      <img src="/assets/ds/cursor.svg" alt="" />
    </div>
  );
}
