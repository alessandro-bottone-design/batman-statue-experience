import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/DesignSystem";
import { BatcavernAudio } from "../../lib/audioManager";

const STORY_MESSAGE =
  "Batman... Ho lasciato un regalino\n" +
  "nella tua preziosa BatCaverna...\n" +
  "Risolvi il gioco o la tua BatCaverna\n" +
  "diventerà polvere\n" +
  "Non è il solito giocattolo,\n" +
  "ma qualcosa che farà il botto...\n" +
  "Il tempo scorre.\n" +
  "TIC, TAC, TIC, TAC...\n" +
  "Trova i miei 5 indizi,\n" +
  "dimostrami che il grande pipistrello\n" +
  "sa ancora giocare.";

export default function StorytellingScreen({
  onBegin,
  isPaused,
}: {
  onBegin: () => void;
  isPaused: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const stopLaughRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (flipped && !isPaused) {
      acceptRef.current?.focus();
    }
  }, [flipped, isPaused]);

  useEffect(
    () => () => {
      stopLaughRef.current?.();
      stopLaughRef.current = null;
    },
    [],
  );

  function handleFlip() {
    if (isPaused || flipped) return;
    setFlipped(true);
    stopLaughRef.current?.();
    stopLaughRef.current = BatcavernAudio.spatialLaugh();
  }

  function handleAccept() {
    if (isPaused) return;
    stopLaughRef.current?.();
    stopLaughRef.current = null;
    onBegin();
  }

  return (
    <section
      className="ds-storytelling ds-centered"
      data-figma-node="353:3343"
      aria-label="Introduzione alla missione"
    >
      <div
        className="ds-story-card"
        data-face={flipped ? "back" : "front"}
        data-figma-node={flipped ? "353:3246" : "353:3247"}
      >
        <div className="ds-story-card-inner">
          <button
            type="button"
            className="ds-story-card-front"
            aria-label="Interagisci con il reperto per decifrare il messaggio"
            disabled={isPaused || flipped}
            aria-hidden={flipped}
            inert={flipped || undefined}
            onClick={handleFlip}
          >
            <span>
              <img src="/assets/ds/card-front.png" alt="" draggable={false} />
            </span>
          </button>
          <div
            className="ds-story-card-back"
            aria-hidden={!flipped}
            inert={!flipped || undefined}
          >
            <div className="ds-story-card-back-art" aria-hidden="true">
              <span className="ds-card-art-top">
                <img src="/assets/ds/card-back.png" alt="" draggable={false} />
              </span>
              <span className="ds-card-art-middle">
                <img src="/assets/ds/card-back.png" alt="" draggable={false} />
              </span>
              <span className="ds-card-art-bottom">
                <img src="/assets/ds/card-back.png" alt="" draggable={false} />
              </span>
            </div>
            <div className="ds-story-card-content" data-figma-node="353:3223">
              {flipped && <h1 className="sr-only">Messaggio del Joker</h1>}
              <div className="ds-story-card-body" data-figma-node="353:3206">
                <p>{STORY_MESSAGE}</p>
              </div>
              <Button
                ref={acceptRef}
                tone="secondary"
                disabled={isPaused}
                onClick={handleAccept}
              >
                ACCETTA LA SFIDA
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!flipped && (
        <div className="ds-story-subtitle" data-figma-node="353:3336">
          <h1 className="ds-heading ds-white">
            INTERAGISCI CON IL REPERTO
            <br />
            PER DECIFRARE IL MESSAGGIO
          </h1>
        </div>
      )}
    </section>
  );
}
