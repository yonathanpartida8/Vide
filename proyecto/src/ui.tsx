import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import type { Palabra } from "./letra";

// Paleta de estilo.md §8
export const C = {
  negro: "#000000",
  caja: "#140E0D",
  naranja: "#F05E21",
  naranjaClaro: "#E37B4A",
  crema: "#F2EDE6",
  gris: "#7A7A7A",
  rojo: "#E0301E",
  flash: "#F2F0EC",
};

// Fuentes locales en public/fonts (Google Fonts descargadas)
const fuente = (family: string, file: string, weight: string) => {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight });
  return family;
};

export const F = {
  titulo: fuente("DM Sans", "dmsans-700.woff2", "700"),
  verso: fuente("Inter", "inter-800.woff2", "800"),
  mono: fuente("JetBrains Mono", "jbmono-500.woff2", "500"),
  display: fuente("Archivo Black", "archivoblack-400.woff2", "400"),
};

export const glow = (c = C.naranja, r = 18) =>
  `0 0 ${r}px ${c}B3, 0 0 ${r * 2}px ${c}55`;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Tiempo absoluto (segundos) dentro de una escena
const Inicio = createContext(0);
export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inicio = useContext(Inicio);
  return (frame + inicio) / fps;
};

// Escena: Sequence en tiempo absoluto + push-in de cámara (estilo.md §7)
export const Escena: React.FC<{
  name: string;
  desde: number;
  hasta: number;
  zoom?: [number, number];
  fondo?: string;
  children: React.ReactNode;
}> = ({ name, desde, hasta, zoom = [1, 1.08], fondo = C.caja, children }) => {
  const { fps } = useVideoConfig();
  const from = Math.round(desde * fps);
  const dur = Math.round(hasta * fps) - from;
  return (
    <Sequence name={name} from={from} durationInFrames={dur} premountFor={fps}>
      <Inicio.Provider value={from}>
        <Camara dur={dur} zoom={zoom} fondo={fondo}>
          {children}
        </Camara>
      </Inicio.Provider>
    </Sequence>
  );
};

const Camara: React.FC<{
  dur: number;
  zoom: [number, number];
  fondo: string;
  children: React.ReactNode;
}> = ({ dur, zoom, fondo, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: fondo, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, dur], zoom, {
            ...clamp,
            easing: Easing.inOut(Easing.quad),
          }),
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Índice de la palabra activa (la última cuyo inicio ya pasó)
const activa = (palabras: Palabra[], t: number) => {
  let i = -1;
  palabras.forEach((p, k) => {
    if (t >= p.s) i = k;
  });
  return i;
};

// Letra palabra a palabra (estilo.md §3): entra en 5 frames subiendo 10 px,
// la palabra que suena en naranja con glow, las anteriores en crema.
// `clave`: índice de la palabra remate, que se queda naranja y más grande.
export const Palabras: React.FC<{
  palabras: Palabra[];
  size?: number;
  clave?: number;
  claveScale?: number;
  font?: string;
  upper?: boolean;
  style?: React.CSSProperties;
}> = ({
  palabras,
  size = 56,
  clave,
  claveScale = 1.8,
  font = F.verso,
  upper = false,
  style,
}) => {
  const t = useT();
  const { fps } = useVideoConfig();
  const act = activa(palabras, t);
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        columnGap: size * 0.28,
        rowGap: size * 0.05,
        fontFamily: font,
        fontSize: size,
        lineHeight: 1.05,
        color: C.crema,
        ...style,
      }}
    >
      {palabras.map((p, k) => {
        const df = (t - p.s) * fps;
        const esClave = k === clave;
        const on = k === act || (esClave && k <= act);
        return (
          <span
            key={k}
            style={{
              display: "inline-block",
              opacity: interpolate(df, [0, 5], [0, 1], clamp),
              translate: `0px ${interpolate(df, [0, 5], [10, 0], {
                ...clamp,
                easing: Easing.out(Easing.cubic),
              })}px`,
              scale: esClave
                ? interpolate(df, [0, 4, 6], [0.85, 1.04, 1], clamp)
                : 1,
              fontSize: esClave ? size * claveScale : size,
              color: on ? C.naranja : C.crema,
              textShadow: on ? glow() : "none",
              textTransform: upper ? "uppercase" : "none",
            }}
          >
            {p.w}
          </span>
        );
      })}
    </div>
  );
};

// Tecleo monoespaciado: cada palabra se escribe a 1 carácter/frame desde su
// tiempo; la palabra activa en naranja y subrayada; cursor naranja (15 f).
export const Tecleo: React.FC<{
  palabras: Palabra[];
  prompt?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ palabras, prompt = "", size = 44, style }) => {
  const t = useT();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const act = activa(palabras, t);
  return (
    <div
      style={{
        position: "absolute",
        fontFamily: F.mono,
        fontWeight: 500,
        fontSize: size,
        color: C.crema,
        whiteSpace: "pre",
        ...style,
      }}
    >
      <span style={{ color: C.gris }}>{prompt}</span>
      {palabras.map((p, k) => {
        if (k > act) return null;
        const n = Math.max(0, Math.floor((t - p.s) * fps) + 1);
        const on = k === act;
        return (
          <span
            key={k}
            style={{
              color: on ? C.naranja : C.crema,
              textShadow: on ? glow(C.naranja, 12) : "none",
              borderBottom: on ? `3px solid ${C.naranja}` : "none",
            }}
          >
            {(k > 0 ? " " : "") + p.w.slice(0, n)}
          </span>
        );
      })}
      <span
        style={{
          color: C.naranja,
          opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
        }}
      >
        |
      </span>
    </div>
  );
};

// Micro-UI técnica (estilo.md §4)
export const Micro: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  size?: number;
}> = ({ children, style, color = C.gris, size = 17 }) => (
  <div
    style={{
      position: "absolute",
      fontFamily: F.mono,
      fontSize: size,
      color,
      letterSpacing: 1,
      whiteSpace: "pre",
      ...style,
    }}
  >
    {children}
  </div>
);

// Curvas de nivel concéntricas ondulantes (fondo recurrente de la ref.)
export const Anillos: React.FC<{
  cx?: number;
  cy?: number;
  n?: number;
  opacidad?: number;
}> = ({ cx = 540, cy = 303, n = 22, opacidad = 0.45 }) => {
  const t = useT();
  const paths = Array.from({ length: n }, (_, i) => {
    const r0 = 18 + i * 26;
    const pts = Array.from({ length: 73 }, (_, a) => {
      const ang = (a / 72) * Math.PI * 2;
      const r =
        r0 +
        Math.sin(ang * 5 + i * 0.7 + t * 1.3) * (3 + i * 0.6) +
        Math.sin(ang * 3 - t) * (2 + i * 0.4);
      return `${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`;
    });
    return { d: "M" + pts.join("L") + "Z", i };
  });
  return (
    <svg
      width={1080}
      height={606}
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <radialGradient id="nucleo">
          <stop offset="0" stopColor={C.naranja} stopOpacity={0.45} />
          <stop offset="1" stopColor={C.naranja} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={260} fill="url(#nucleo)" />
      {paths.map(({ d, i }) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i < 6 ? C.naranjaClaro : C.crema}
          strokeOpacity={opacidad * (1 - i / (n + 4))}
          strokeWidth={1.4}
        />
      ))}
    </svg>
  );
};

// Capas globales de la caja: viñeta, grano y escuadras de esquina
export const Acabado: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <svg width={1080} height={606} style={{ position: "absolute" }}>
        <filter id="grano">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.9}
            numOctaves={2}
            seed={Math.floor(random(frame) * 1000)}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={1080} height={606} filter="url(#grano)" opacity={0.06} />
        {[
          [22, 22, 1, 1],
          [1058, 22, -1, 1],
          [22, 584, 1, -1],
          [1058, 584, -1, -1],
        ].map(([x, y, sx, sy], k) => (
          <path
            key={k}
            d={`M${x},${y + 14 * sy}L${x},${y}L${x + 14 * sx},${y}`}
            stroke="#8A8A8A"
            strokeOpacity={0.6}
            strokeWidth={2}
            fill="none"
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Eco vertical (glitch de "UPPING" en la ref.)
export const Eco: React.FC<{
  texto: string;
  size: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ texto, size, color = C.crema, style }) => (
  <div style={{ position: "absolute", ...style }}>
    {[3, 2, 1].map((k) => (
      <div
        key={k}
        style={{
          position: "absolute",
          top: k * size * 0.09,
          left: 0,
          fontFamily: F.display,
          fontSize: size,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `2px ${color}`,
          opacity: 0.3 - k * 0.06,
          whiteSpace: "nowrap",
        }}
      >
        {texto}
      </div>
    ))}
    <div
      style={{
        position: "relative",
        fontFamily: F.display,
        fontSize: size,
        lineHeight: 1,
        color,
        whiteSpace: "nowrap",
        textShadow: color === C.naranja ? glow() : "none",
      }}
    >
      {texto}
    </div>
  </div>
);

export { clamp };
