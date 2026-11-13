import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/DesignSystem";

interface Props {
  src: string;
  onEnded: () => void;
  isPaused?: boolean;
  reducedMotion?: boolean;
  label?: string;
  nextAsset?: string;
}

export default function SkipTransitionScreen({
  src,
  onEnded,
  isPaused,
  reducedMotion,
  label = "SALTA LA TRANSIZIONE",
}: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const callback = useRef(onEnded);
  callback.current = onEnded;
  const [failed, setFailed] = useState(false);

  const finish = useCallback(() => {
    if (!done.current && !isPaused) {
      done.current = true;
      callback.current();
    }
  }, [isPaused]);

  useEffect(() => {
    if (reducedMotion && !isPaused) finish();
  }, [reducedMotion, isPaused, finish]);

  useEffect(() => {
    const el = video.current;
    if (!el || reducedMotion) return;
    if (isPaused) el.pause();
    else void el.play().catch(() => setFailed(true));
  }, [isPaused, reducedMotion, src]);

  return (
    <section
      className="transition-player"
      data-figma-node="359:3955"
      aria-label="Transizione alla prossima area"
    >
      {!reducedMotion && !failed && (
        <video
          ref={video}
          src={src}
          muted
          playsInline
          onEnded={finish}
          onError={() => setFailed(true)}
        />
      )}
      <div className="ds-skip-transition" data-figma-node="359:3936">
        <div className="ds-skip-transition-action" data-figma-node="359:3926">
          <Button tone="secondary" disabled={isPaused} onClick={finish}>
            {label}
          </Button>
        </div>
      </div>
    </section>
  );
}
