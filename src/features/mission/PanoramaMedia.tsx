import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  LinearFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  VideoTexture,
} from "three";

export function usePanoramaMedia(
  asset: string,
  enabled: boolean,
  retry: number,
  reduced: boolean,
  paused: boolean,
) {
  const [texture, setTexture] = useState<Texture | null>(null);
  const [failed, setFailed] = useState(false);
  const syncPlayback = useRef<(() => void) | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (!enabled) return;
    setTexture(null);
    setFailed(false);
    let alive = true;
    let poster: Texture | null = null;
    let posterFailed = false;
    let videoTexture: VideoTexture | null = null;
    let videoFailed = reduced;
    let stallTimer: ReturnType<typeof setTimeout> | undefined;
    const video = reduced ? null : document.createElement("video");
    const url = `/assets/textures/${asset}`;

    function failIfNoMedia() {
      if (posterFailed && videoFailed) setFailed(true);
    }

    function showPoster() {
      setTexture(poster);
      failIfNoMedia();
    }

    function onPlaying() {
      if (!alive || !video || videoFailed) return;
      clearTimeout(startTimer);
      clearTimeout(stallTimer);
      if (!videoTexture) {
        videoTexture = new VideoTexture(video);
        videoTexture.colorSpace = SRGBColorSpace;
      }
      setTexture(videoTexture);
    }

    function onWaiting() {
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => {
        if (
          alive &&
          poster &&
          video &&
          !video.paused &&
          video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
        ) {
          setTexture(poster);
        }
      }, 750);
    }

    function onVideoError() {
      if (!alive || !video || videoFailed) return;
      videoFailed = true;
      clearTimeout(startTimer);
      clearTimeout(stallTimer);
      video.pause();
      video.removeAttribute("src");
      video.load();
      showPoster();
    }

    function updatePlayback() {
      if (!video || videoFailed) return;
      if (pausedRef.current || document.hidden) {
        video.pause();
      } else if (video.paused) {
        void video.play().catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError")
            return;
          onVideoError();
        });
      }
    }

    new TextureLoader().load(
      `${url}.jpg`,
      (loaded) => {
        if (!alive) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = SRGBColorSpace;
        loaded.minFilter = LinearFilter;
        loaded.magFilter = LinearFilter;
        loaded.generateMipmaps = false;
        poster = loaded;
        if (
          !videoTexture ||
          videoFailed ||
          (video && video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA)
        )
          showPoster();
      },
      undefined,
      () => {
        if (!alive) return;
        posterFailed = true;
        failIfNoMedia();
      },
    );

    const startTimer = video ? setTimeout(onVideoError, 8000) : undefined;
    if (video) {
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.addEventListener("playing", onPlaying);
      video.addEventListener("waiting", onWaiting);
      video.addEventListener("error", onVideoError);
      video.src = `${url}.mp4`;
      syncPlayback.current = updatePlayback;
      document.addEventListener("visibilitychange", updatePlayback);
      updatePlayback();
    }

    return () => {
      alive = false;
      clearTimeout(startTimer);
      clearTimeout(stallTimer);
      syncPlayback.current = null;
      document.removeEventListener("visibilitychange", updatePlayback);
      if (video) {
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("error", onVideoError);
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      videoTexture?.dispose();
      poster?.dispose();
    };
  }, [asset, enabled, retry, reduced]);

  useEffect(() => {
    syncPlayback.current?.();
  }, [paused]);

  return { texture, failed };
}

export function PanoramaVideoFrames({
  texture,
}: {
  texture: VideoTexture | null;
}) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!texture) return;
    const video: HTMLVideoElement = texture.image;
    let id = 0;
    if (typeof video.requestVideoFrameCallback === "function") {
      const frame = () => {
        invalidate();
        id = video.requestVideoFrameCallback(frame);
      };
      id = video.requestVideoFrameCallback(frame);
      return () => video.cancelVideoFrameCallback(id);
    }

    let time = video.currentTime;
    const frame = () => {
      if (time !== video.currentTime) {
        time = video.currentTime;
        invalidate();
      }
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [texture, invalidate]);

  return null;
}
