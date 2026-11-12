import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Euler, MathUtils, Vector3 } from "three";

export type ClueAnchor = { id: number; position: Vector3 };
export type ClueFocus = { id: number; trigger: HTMLButtonElement };
export const CLUE_WIDTH = 80;
const CLUE_HEIGHT = 116;
const DEAD_ZONE = 0.25;
const EDGE = 12;
const PITCH_LIMIT = 1.3;
const MIN_SPEED = 0.003;

function pointerSpeed(value: number) {
  const distance = Math.max(0, Math.abs(value) - DEAD_ZONE) / (1 - DEAD_ZONE);
  return Math.sign(value) * distance ** 2;
}

export function MouseLookControls({
  enabled,
  anchors,
  markers,
  focusTarget,
}: {
  enabled: boolean;
  anchors: ClueAnchor[];
  markers: RefObject<Map<number, HTMLButtonElement>>;
  focusTarget: ClueFocus | null;
}) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const rotation = useRef(new Euler(0, 0, 0, "YXZ"));
  const projected = useRef(new Vector3());
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const keys = useRef(new Set<string>());
  const velocity = useRef({ yaw: 0, pitch: 0 });
  const dirty = useRef(true);
  const pendingFocus = useRef<ClueFocus | null>(null);
  const markerFocus = useRef(false);

  useEffect(() => {
    dirty.current = true;
    invalidate();
  }, [anchors, size, invalidate]);

  useEffect(() => {
    if (
      !enabled ||
      !focusTarget ||
      document.activeElement !== focusTarget.trigger
    )
      return;
    const anchor = anchors.find(({ id }) => id === focusTarget.id);
    if (!anchor) return;
    camera.lookAt(anchor.position);
    rotation.current.setFromQuaternion(camera.quaternion, "YXZ");
    pointer.current = null;
    velocity.current = { yaw: 0, pitch: 0 };
    keys.current.clear();
    pendingFocus.current = focusTarget;
    dirty.current = true;
    invalidate();
  }, [anchors, camera, enabled, focusTarget, invalidate]);

  useEffect(() => {
    if (!enabled) return;
    const pressed = keys.current;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (event.clientX <= EDGE || event.clientX >= innerWidth - EDGE) {
        const focused = document.activeElement;
        if (
          focused instanceof HTMLElement &&
          focused.matches(".ds-clue-marker")
        )
          focused.blur();
      }
      pointer.current = { x: event.clientX, y: event.clientY };
      invalidate();
    };
    const leave = () => {
      pointer.current = null;
      pressed.clear();
      invalidate();
    };
    const key = (event: KeyboardEvent) => {
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          event.key,
        ) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof Element &&
          event.target.closest(
            "input,textarea,select,button,[contenteditable]",
          ))
      )
        return;
      event.preventDefault();
      pointer.current = null;
      pressed.add(event.key);
      invalidate();
    };
    const up = (event: KeyboardEvent) => {
      if (pressed.delete(event.key)) invalidate();
    };
    const focus = (event: FocusEvent) => {
      markerFocus.current =
        event.target instanceof Element &&
        event.target.matches(".ds-clue-marker");
      invalidate();
    };
    const blur = () => {
      markerFocus.current = false;
      invalidate();
    };
    markerFocus.current =
      document.activeElement?.matches(".ds-clue-marker") ?? false;
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("keydown", key);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", leave);
    window.addEventListener("focusin", focus);
    window.addEventListener("focusout", blur);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("keydown", key);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", leave);
      window.removeEventListener("focusin", focus);
      window.removeEventListener("focusout", blur);
      document.removeEventListener("pointerleave", leave);
      pointer.current = null;
      pressed.clear();
      velocity.current = { yaw: 0, pitch: 0 };
      pendingFocus.current = null;
    };
  }, [enabled, invalidate]);

  useFrame((_, delta) => {
    const point = pointer.current;
    const vector = projected.current;
    let hold = markerFocus.current;
    if (
      enabled &&
      !hold &&
      point &&
      point.x > EDGE &&
      point.x < size.width - EDGE
    ) {
      camera.updateMatrixWorld();
      hold = anchors.some(({ position }) => {
        vector.copy(position).project(camera);
        return (
          vector.z >= -1 &&
          vector.z <= 1 &&
          Math.abs(((vector.x + 1) * size.width) / 2 - point.x) <=
            CLUE_WIDTH / 2 + 14 &&
          Math.abs(((1 - vector.y) * size.height) / 2 - point.y) <=
            CLUE_HEIGHT / 2 + 14
        );
      });
    }

    if (enabled && !hold) {
      const pressed = keys.current;
      const dt = Math.min(delta, 0.05);
      const yaw =
        Number(pressed.has("ArrowLeft")) -
        Number(pressed.has("ArrowRight")) -
        (point
          ? pointerSpeed(MathUtils.clamp((2 * point.x) / size.width - 1, -1, 1))
          : 0);
      const pitch =
        Number(pressed.has("ArrowUp")) -
        Number(pressed.has("ArrowDown")) +
        (point
          ? pointerSpeed(
              MathUtils.clamp(1 - (2 * point.y) / innerHeight, -1, 1),
            )
          : 0);
      const speed = velocity.current;
      const euler = rotation.current;
      speed.yaw = MathUtils.damp(speed.yaw, yaw * 1.35, 13, dt);
      speed.pitch = MathUtils.damp(speed.pitch, pitch * 0.95, 13, dt);
      const nextPitch = MathUtils.clamp(
        euler.x + speed.pitch * dt,
        -PITCH_LIMIT,
        PITCH_LIMIT,
      );
      if (
        Math.abs(speed.yaw) > MIN_SPEED ||
        (nextPitch !== euler.x && Math.abs(speed.pitch) > MIN_SPEED)
      ) {
        euler.y += speed.yaw * dt;
        euler.x = nextPitch;
        camera.quaternion.setFromEuler(euler);
        dirty.current = true;
        invalidate();
      } else if (
        Math.abs(yaw * 1.35) > MIN_SPEED ||
        (Math.abs(pitch * 0.95) > MIN_SPEED &&
          Math.sign(pitch) * euler.x < PITCH_LIMIT)
      ) {
        invalidate();
      } else {
        speed.yaw = 0;
        speed.pitch = 0;
      }
    } else {
      velocity.current.yaw = 0;
      velocity.current.pitch = 0;
    }

    if (!dirty.current) return;
    dirty.current = false;
    camera.updateMatrixWorld();
    for (const { id, position } of anchors) {
      const marker = markers.current.get(id);
      if (!marker) continue;
      vector.copy(position).project(camera);
      const x = ((vector.x + 1) * size.width) / 2;
      const y = ((1 - vector.y) * size.height) / 2;
      const visible =
        vector.z >= -1 &&
        vector.z <= 1 &&
        x >= -CLUE_WIDTH / 2 &&
        x <= size.width + CLUE_WIDTH / 2 &&
        y >= -CLUE_HEIGHT / 2 &&
        y <= size.height + CLUE_HEIGHT / 2;
      marker.style.visibility = visible ? "visible" : "hidden";
      if (visible)
        marker.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
    const focus = pendingFocus.current;
    if (focus && document.activeElement === focus.trigger) {
      markers.current.get(focus.id)?.focus({ preventScroll: true });
    }
    pendingFocus.current = null;
  });

  return null;
}
