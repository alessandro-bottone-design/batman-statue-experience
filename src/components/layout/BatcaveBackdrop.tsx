import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { useDesktop } from "../../hooks/useDesktop";

const BATCOMPUTER = "/assets/textures/BatCaverna_Batcomputer360";

export default function BatcaveBackdrop() {
  const isDesktop = useDesktop();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isDesktop || !canvas) return;
    const video = videoRef.current;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return; // The CSS perspective image remains visible without WebGL.
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(88, 1, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(-1, 1, 1);
    mesh.rotation.set(0, -Math.PI / 2, 0);
    scene.add(mesh);

    let disposed = false;
    let contextLost = false;
    let staticTexture: THREE.Texture | null = null;
    let videoTexture: THREE.VideoTexture | null = null;
    let cancelVideoFrame: (() => void) | undefined;

    function render() {
      if (disposed || contextLost || !material.map) return;
      renderer.render(scene, camera);
      canvas!.dataset.ready = "true";
    }

    function setTexture(texture: THREE.Texture | null) {
      material.map = texture;
      material.needsUpdate = true;
      if (texture) render();
      else delete canvas!.dataset.ready;
    }

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      render();
    }

    function stopVideoLoop() {
      cancelVideoFrame?.();
      cancelVideoFrame = undefined;
    }

    function scheduleVideoFrame() {
      if (disposed || !video || video.paused || cancelVideoFrame) return;
      const tick = () => {
        cancelVideoFrame = undefined;
        render();
        scheduleVideoFrame();
      };
      if (typeof video.requestVideoFrameCallback === "function") {
        const id = video.requestVideoFrameCallback(tick);
        cancelVideoFrame = () => video.cancelVideoFrameCallback(id);
      } else {
        const id = requestAnimationFrame(tick);
        cancelVideoFrame = () => cancelAnimationFrame(id);
      }
    }

    function playVideo() {
      if (disposed || !video || video.error) return;
      if (!videoTexture) {
        videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(videoTexture);
      }
      scheduleVideoFrame();
    }

    function fallBackFromVideo() {
      stopVideoLoop();
      videoTexture?.dispose();
      videoTexture = null;
      setTexture(staticTexture);
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      delete canvas!.dataset.ready;
    }

    function onContextRestored() {
      contextLost = false;
      resize();
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    new THREE.TextureLoader().load(
      BATCOMPUTER + ".jpg",
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        staticTexture = texture;
        if (!videoTexture) setTexture(texture);
      },
      undefined,
      () => {
        /* The CSS perspective image is already visible. */
      },
    );

    if (video) {
      video.addEventListener("playing", playVideo);
      video.addEventListener("pause", stopVideoLoop);
      video.addEventListener("error", fallBackFromVideo);
      if (
        !video.paused &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      )
        playVideo();
      else
        void video.play().catch(() => {
          /* Keep the static image. */
        });
    }

    return () => {
      disposed = true;
      delete canvas.dataset.ready;
      stopVideoLoop();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      video?.removeEventListener("playing", playVideo);
      video?.removeEventListener("pause", stopVideoLoop);
      video?.removeEventListener("error", fallBackFromVideo);
      video?.pause();
      videoTexture?.dispose();
      staticTexture?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDesktop, reduced]);

  return (
    <div className="batcave-backdrop" aria-hidden="true" inert>
      {isDesktop && (
        <canvas ref={canvasRef} className="batcave-backdrop-canvas" />
      )}
      {isDesktop && !reduced && (
        <video
          ref={videoRef}
          src={BATCOMPUTER + ".mp4"}
          autoPlay
          muted
          loop
          playsInline
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
}
