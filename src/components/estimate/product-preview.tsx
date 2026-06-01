"use client";

import { motion } from "framer-motion";
import type {
  FrameFinish,
  GlassType,
  ProductType,
} from "@/lib/pricing";

const frameColors: Record<FrameFinish, string> = {
  white: "#e8e8e8",
  black: "#1f1f1f",
  "wood-finish": "#8a5a2b",
  "custom-color": "#b8902f",
};

const glassTints: Record<GlassType, string> = {
  "5mm": "rgba(150,200,220,0.30)",
  "8mm": "rgba(140,195,215,0.38)",
  "10mm": "rgba(130,190,210,0.45)",
  "12mm": "rgba(120,185,205,0.52)",
  toughened: "rgba(120,200,200,0.42)",
  laminated: "rgba(160,180,210,0.50)",
  reflective: "rgba(90,140,170,0.65)",
};

/**
 * A lightweight, animated 2.5D product preview that updates live with the
 * user's selections — giving the "configurator / 3D preview" feel without a
 * heavy WebGL dependency.
 */
export function ProductPreview({
  productType,
  frameFinish,
  glassType,
  ratio,
}: {
  productType: ProductType;
  frameFinish: FrameFinish;
  glassType: GlassType;
  ratio: number; // width / height
}) {
  const frame = frameColors[frameFinish];
  const glass = glassTints[glassType];

  // Constrain the drawn aspect ratio so it always looks good.
  const r = Math.min(2.2, Math.max(0.45, ratio || 1));
  const baseH = 240;
  const w = Math.min(360, baseH * r);
  const h = baseH;

  const isDoor = productType === "aluminium-door" || productType === "glass-door";
  const isSliding = productType === "sliding-window";
  const isRailing = productType === "balcony-railing";
  const isAcp = productType === "acp-panel";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/80 to-background p-6 [perspective:1200px]">
      <motion.div
        key={`${productType}-${frameFinish}-${glassType}`}
        initial={{ opacity: 0, rotateY: -12 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotateY: 8, rotateX: -4 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <svg
          width={w}
          height={isDoor ? h * 1.15 : h}
          viewBox={`0 0 ${w} ${isDoor ? h * 1.15 : h}`}
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Outer frame */}
          <rect
            x="2"
            y="2"
            width={w - 4}
            height={(isDoor ? h * 1.15 : h) - 4}
            rx="6"
            fill={frame}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="1"
          />

          {/* Glass area */}
          {!isAcp && !isRailing && (
            <g>
              <rect
                x="14"
                y="14"
                width={w - 28}
                height={(isDoor ? h * 1.15 : h) - 28}
                fill={glass}
              />
              <rect
                x="14"
                y="14"
                width={w - 28}
                height={(isDoor ? h * 1.15 : h) - 28}
                fill="url(#glassGrad)"
              />
              {/* Reflection streak */}
              <motion.rect
                x="14"
                y="14"
                width={Math.max(30, (w - 28) * 0.18)}
                height={(isDoor ? h * 1.15 : h) - 28}
                fill="rgba(255,255,255,0.25)"
                animate={{ x: [10, w - 60, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          )}

          {/* ACP panels */}
          {isAcp && (
            <g>
              {Array.from({ length: 3 }).map((_, i) =>
                Array.from({ length: 3 }).map((_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={16 + i * ((w - 32) / 3)}
                    y={16 + j * ((h - 32) / 3)}
                    width={(w - 32) / 3 - 4}
                    height={(h - 32) / 3 - 4}
                    fill={frame}
                    opacity={0.85 - (i + j) * 0.06}
                    stroke="rgba(0,0,0,0.2)"
                  />
                )),
              )}
            </g>
          )}

          {/* Railing verticals */}
          {isRailing && (
            <g>
              <rect x="14" y="14" width={w - 28} height={h - 28} fill={glass} />
              {Array.from({ length: 6 }).map((_, i) => (
                <rect
                  key={i}
                  x={20 + i * ((w - 40) / 6)}
                  y="14"
                  width="4"
                  height={h - 28}
                  fill={frame}
                />
              ))}
              <rect x="10" y="8" width={w - 20} height="10" rx="4" fill={frame} />
            </g>
          )}

          {/* Mullions / dividers */}
          {!isAcp && !isRailing && (
            <>
              {(isSliding || isDoor) && (
                <rect
                  x={w / 2 - 3}
                  y="14"
                  width="6"
                  height={(isDoor ? h * 1.15 : h) - 28}
                  fill={frame}
                />
              )}
              {!isSliding && !isDoor && (
                <>
                  <rect x={w / 2 - 3} y="14" width="6" height={h - 28} fill={frame} />
                  <rect x="14" y={h / 2 - 3} width={w - 28} height="6" fill={frame} />
                </>
              )}
            </>
          )}

          {/* Door handle */}
          {isDoor && (
            <rect
              x={w / 2 + 14}
              y={h * 0.55}
              width="6"
              height="40"
              rx="3"
              fill="#c9a227"
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
}
