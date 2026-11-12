import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const textures = fileURLToPath(
  new URL("../public/assets/textures/", import.meta.url),
);
const panoramas = [
  "BatCaverna_Batcomputer360",
  "BatCaverna_Armeria360",
  "BatCaverna_BatMobile360",
];

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-nostdin", "-v", "error", "-y", ...args], {
    stdio: "inherit",
  });
}

for (const name of panoramas) {
  ffmpeg([
    "-ss",
    "1",
    "-i",
    join(textures, `${name}.mp4`),
    "-frames:v",
    "1",
    "-q:v",
    "3",
    join(textures, `${name}.jpg`),
  ]);
}

// Match the WebGL camera at 16:9 so the CSS fallback keeps its perspective.
const projection =
  "v360=input=equirect:output=flat:w=1280:h=720:h_fov=119.559615:v_fov=88:interp=lanczos";
ffmpeg([
  "-i",
  join(textures, "BatCaverna_Batcomputer360.jpg"),
  "-vf",
  projection,
  "-frames:v",
  "1",
  "-c:v",
  "mjpeg",
  "-q:v",
  "3",
  join(textures, "BatCaverna_BatcomputerPerspective.jpg"),
]);
console.log("Aggiornate le tre texture panoramiche e la vista prospettica.");
