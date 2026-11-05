"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
  type SpringOptions,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type ParallaxContextValue = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  disabled: boolean;
};

const ParallaxContext = React.createContext<ParallaxContextValue | null>(null);

function useParallax() {
  const context = React.useContext(ParallaxContext);
  if (!context) {
    throw new Error("useParallax must be used inside of <Parallax />");
  }
  return context;
}

const defaultSpring: SpringOptions = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

type ParallaxProps = React.ComponentProps<"div"> & {
  /**
   * "container": reacts only when the mouse is over the component.
   * "window": reacts to the mouse anywhere within the window.
   */
  track?: "container" | "window";
  /** Spring configuration that softens the movement */
  spring?: SpringOptions;
  resetOnLeave?: boolean;
  /** Perspective in px for 3D effects (rotate) on layers */
  perspective?: number;
  /** If true, it also responds to touch/stylus events. */
  allowTouch?: boolean;
  /** Disable the effect manually */
  disabled?: boolean;
};

function Parallax({
  track = "container",
  spring = defaultSpring,
  resetOnLeave = true,
  perspective = 1000,
  allowTouch = false,
  disabled = false,
  className,
  style,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDisabled = disabled || !!prefersReducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const ref = React.useRef<HTMLDivElement>(null);

  const update = React.useCallback(
    (
      clientX: number,
      clientY: number,
      rect: { left: number; top: number; width: number; height: number }
    ) => {
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      rawX.set(Math.max(-1, Math.min(1, nx)));
      rawY.set(Math.max(-1, Math.min(1, ny)));
    },
    [rawX, rawY]
  );

  const reset = React.useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Window-level tracking
  React.useEffect(() => {
    if (track !== "window" || isDisabled) return;

    const handleMove = (e: PointerEvent) => {
      if (!allowTouch && e.pointerType !== "mouse") return;
      update(e.clientX, e.clientY, {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const handleLeave = () => resetOnLeave && reset();

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [track, isDisabled, allowTouch, resetOnLeave, update, reset]);

  // If deactivated, it returns to the center
  React.useEffect(() => {
    if (isDisabled) reset();
  }, [isDisabled, reset]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (track !== "container" || isDisabled || !ref.current) return;
    if (!allowTouch && e.pointerType !== "mouse") return;
    update(e.clientX, e.clientY, ref.current.getBoundingClientRect());
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    if (track === "container" && resetOnLeave) reset();
  };

  const contextValue = React.useMemo(
    () => ({ x, y, disabled: isDisabled }),
    [x, y, isDisabled]
  );

  return (
    <ParallaxContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-slot="parallax"
        data-disabled={isDisabled || undefined}
        className={cn("relative", className)}
        style={{ perspective, transformStyle: "preserve-3d", ...style }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

type ParallaxLayerProps = Omit<HTMLMotionProps<"div">, "style"> & {
  style?: HTMLMotionProps<"div">["style"];
  /**
   * Maximum displacement in px when the mouse is at the edge.
   * Higher values = the layer appears closer.
   */
  depth?: number;
  /** Independent displacement per axis (overwrites `depth`) */
  depthX?: number;
  depthY?: number;
  /** Reverse the direction (the layer moves in the opposite direction to the mouse) */
  inverted?: boolean;
  /** Maximum 3D tilt in degrees ("tilt" effect) */
  rotate?: number;
  /** Additional scale as the distance from the center increases (e.g., 0.05) */
  scale?: number;
};

function ParallaxLayer({
  depth = 20,
  depthX,
  depthY,
  inverted = false,
  rotate = 0,
  scale = 0,
  className,
  style,
  ...props
}: ParallaxLayerProps) {
  const { x: px, y: py } = useParallax();
  const dir = inverted ? -1 : 1;
  const dx = (depthX ?? depth) * dir;
  const dy = (depthY ?? depth) * dir;

  const x = useTransform(px, (v) => v * dx);
  const y = useTransform(py, (v) => v * dy);
  const rotateY = useTransform(px, (v) => v * rotate);
  const rotateX = useTransform(py, (v) => -v * rotate);
  const layerScale = useTransform(
    [px, py],
    ([vx, vy]: number[]) => 1 + Math.min(1, Math.hypot(vx, vy)) * scale
  );

  return (
    <motion.div
      data-slot="parallax-layer"
      className={cn("will-change-transform", className)}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        scale: layerScale,
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    />
  );
}

type ParallaxImageProps = Omit<ParallaxLayerProps, "children"> & {
  src: string;
  alt: string;
  imgClassName?: string;
  bleed?: number;
};

function ParallaxImage({
  src,
  alt,
  depth = 20,
  depthX,
  depthY,
  bleed = 0,
  className,
  imgClassName,
  style,
  ...props
}: ParallaxImageProps) {
  const overflowX = Math.abs(depthX ?? depth) + bleed;
  const overflowY = Math.abs(depthY ?? depth) + bleed;

  return (
    <ParallaxLayer
      data-slot="parallax-image"
      depth={depth}
      depthX={depthX}
      depthY={depthY}
      className={cn("absolute", className)}
      style={{
        top: -overflowY,
        bottom: -overflowY,
        left: -overflowX,
        right: -overflowX,
        ...style,
      }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn("size-full object-cover select-none", imgClassName)}
      />
    </ParallaxLayer>
  );
}

export { Parallax, ParallaxImage, ParallaxLayer, useParallax };
export type { ParallaxLayerProps, ParallaxProps };
