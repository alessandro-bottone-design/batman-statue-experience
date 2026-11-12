import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import NotFoundScreen from "./features/not-found/NotFoundScreen";
import { BatcavernAudio } from "./lib/audioManager";
import "./index.css";
const root = document.getElementById("root")!;
root.addEventListener(
  "click",
  (event) => {
    const target =
      event.target instanceof Element
        ? event.target.closest('button, a.ds-button, input[type="radio"]')
        : null;
    if (
      target &&
      !target.closest(
        ':disabled, [aria-disabled="true"], [data-ui-sound="custom"], [inert]',
      )
    ) {
      BatcavernAudio.uiClick();
    }
  },
  { capture: true },
);
const notFound =
  root.hasAttribute("data-not-found") ||
  !["/", "/index.html"].includes(location.pathname);
if (notFound) document.title = "404 | Batman Statue Experience";
createRoot(root).render(
  <StrictMode>
    {notFound ? <NotFoundScreen /> : <App />}
    <Analytics />
  </StrictMode>,
);
