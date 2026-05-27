import { useEffect, useRef } from "react";

/**
 * Subtle animated topographic / loss-landscape background.
 * Renders softly-evolving contour lines via a low-resolution scalar field
 * sampled on a coarse grid and traced with marching squares. Designed to
 * be ambient and inexpensive — runs at ~24fps, pauses when offscreen or
 * when the user prefers reduced motion.
 */
export function ContourBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Coarse grid — keeps cost low. ~110 cells across.
    const CELL = 14; // CSS px per grid cell
    let cols = 0;
    let rows = 0;
    let field: Float32Array = new Float32Array(0);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      field = new Float32Array(cols * rows);
    }
    resize();
    window.addEventListener("resize", resize);

    // Resolve theme colors once.
    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue("--foreground").trim() || "oklch(0.96 0.005 90)";
    const accent = styles.getPropertyValue("--accent").trim() || "oklch(0.78 0.12 65)";

    // Levels for contour iso-lines. A handful of bands is enough.
    const LEVELS = [-0.55, -0.32, -0.12, 0.08, 0.28, 0.5];

    function sampleField(t: number) {
      // Two slow-drifting gaussian "basins" plus a low-freq ripple.
      // Produces a calm, evolving topographic surface.
      const ax = 0.5 + 0.18 * Math.cos(t * 0.00013);
      const ay = 0.45 + 0.16 * Math.sin(t * 0.00011);
      const bx = 0.7 + 0.22 * Math.sin(t * 0.00009 + 1.7);
      const by = 0.6 + 0.2 * Math.cos(t * 0.00012 + 0.4);
      const phase = t * 0.00008;

      for (let j = 0; j < rows; j++) {
        const v = j / (rows - 1);
        for (let i = 0; i < cols; i++) {
          const u = i / (cols - 1);
          const dax = u - ax;
          const day = v - ay;
          const dbx = u - bx;
          const dby = v - by;
          const g1 = Math.exp(-(dax * dax + day * day) * 7);
          const g2 = -0.85 * Math.exp(-(dbx * dbx + dby * dby) * 9);
          const ripple = 0.18 * Math.sin((u * 4.2 + v * 3.1 + phase) * Math.PI);
          field[j * cols + i] = g1 + g2 + ripple - 0.05;
        }
      }
    }

    // Marching squares for a single iso level.
    function drawContour(level: number, alpha: number, color: string) {
      ctx!.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i];
          const b = field[j * cols + i + 1];
          const c = field[(j + 1) * cols + i + 1];
          const d = field[(j + 1) * cols + i];
          let idx = 0;
          if (a > level) idx |= 1;
          if (b > level) idx |= 2;
          if (c > level) idx |= 4;
          if (d > level) idx |= 8;
          if (idx === 0 || idx === 15) continue;

          const x = i * CELL;
          const y = j * CELL;

          // Edge interpolation helpers.
          const top = () => ({ x: x + (CELL * (level - a)) / (b - a), y });
          const right = () => ({ x: x + CELL, y: y + (CELL * (level - b)) / (c - b) });
          const bottom = () => ({ x: x + (CELL * (level - d)) / (c - d), y: y + CELL });
          const left = () => ({ x, y: y + (CELL * (level - a)) / (d - a) });

          const seg = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
          };

          switch (idx) {
            case 1: case 14: seg(left(), top()); break;
            case 2: case 13: seg(top(), right()); break;
            case 3: case 12: seg(left(), right()); break;
            case 4: case 11: seg(right(), bottom()); break;
            case 5: seg(left(), top()); seg(right(), bottom()); break;
            case 6: case 9: seg(top(), bottom()); break;
            case 7: case 8: seg(left(), bottom()); break;
            case 10: seg(left(), bottom()); seg(top(), right()); break;
          }
        }
      }
      ctx!.globalAlpha = alpha;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    let raf = 0;
    let last = 0;
    let running = true;

    function frame(now: number) {
      if (!running) return;
      // Throttle ~24fps to keep the work negligible.
      if (now - last < 42) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;

      ctx!.clearRect(0, 0, width, height);
      sampleField(now);

      // Mid-band lines are the most visible; outer bands fade out.
      for (let k = 0; k < LEVELS.length; k++) {
        const lvl = LEVELS[k];
        const center = (LEVELS.length - 1) / 2;
        const distance = Math.abs(k - center) / center;
        const baseAlpha = 0.07 * (1 - distance * 0.55);
        // One band gets a whisper of accent color.
        const color = k === 2 ? accent : fg;
        const a = k === 2 ? baseAlpha * 1.15 : baseAlpha;
        drawContour(lvl, a, color);
      }
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }

    if (reduced) {
      // Render a single static frame.
      sampleField(0);
      ctx.clearRect(0, 0, width, height);
      for (let k = 0; k < LEVELS.length; k++) {
        drawContour(LEVELS[k], 1, k === 2 ? accent : fg);
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      {/* Soft vignette + top/bottom fade for legibility. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 0%, transparent 45%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
