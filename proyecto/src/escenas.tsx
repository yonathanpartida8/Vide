import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useVideoConfig,
} from "remotion";
import { LETRA } from "./letra";
import {
  Anillos,
  C,
  clamp,
  Eco,
  F,
  glow,
  Micro,
  Palabras,
  Tecleo,
  useT,
} from "./ui";
import { CodigoRapido } from "./codigo";

// A · "Please, please, I really need" → REPL de Python suplicando
export const EscenaREPL: React.FC = () => {
  const t = useT();
  const probs: [string, number][] = [
    ["please", 0.48],
    ["sudo", 0.21],
    ["root", 0.07],
    ["pls", 0.05],
    ["kindly", 0.03],
  ];
  return (
    <AbsoluteFill>
      <Anillos />
      <CodigoRapido
        desde={0}
        velocidad={9}
        lineas={11}
        size={15}
        opacidad={0.35}
        style={{ left: 50, top: 80, width: 520, height: 240 }}
      />
      <Micro style={{ left: 60, top: 50 }}>
        {"python3.12 · REPL · pid 1337"}
      </Micro>
      <div
        style={{
          position: "absolute",
          left: 610,
          top: 120,
          width: 300,
          padding: "10px 14px",
          background: "rgba(10,8,8,0.85)",
          border: `1px solid ${C.gris}55`,
          opacity: interpolate(t, [0.3, 0.6], [0, 1], clamp),
        }}
      >
        <Micro style={{ position: "relative" }}>{"next_token | ctx 4096"}</Micro>
        {probs.map(([w, p], k) => (
          <div
            key={w}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: F.mono,
              fontSize: 17,
              color: k === 0 ? C.naranja : C.gris,
              marginTop: 4,
            }}
          >
            <span style={{ width: 80 }}>{(k === 0 ? "▸ " : "  ") + w}</span>
            <div
              style={{
                height: 6,
                width: interpolate(t, [0.4, 1.4], [0, p * 260], {
                  ...clamp,
                  easing: Easing.out(Easing.cubic),
                }),
                background: k === 0 ? C.naranja : C.gris,
              }}
            />
            <span style={{ marginLeft: "auto" }}>{p.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 330,
          height: 100,
          background: "rgba(12,9,9,0.9)",
          borderTop: `1px solid ${C.gris}44`,
          borderBottom: `1px solid ${C.gris}44`,
        }}
      />
      <Tecleo
        palabras={LETRA.pleaseNeed}
        prompt=">>> "
        size={46}
        style={{ left: 90, top: 352 }}
      />
      <Micro style={{ left: 90, top: 450 }} color={C.rojo}>
        {"PROMPT 01"}
      </Micro>
      <Micro style={{ left: 200, top: 450 }}>
        {"temp 0.7 · top-p 0.95 · seed 0x2A"}
      </Micro>
    </AbsoluteFill>
  );
};

// B · "you next to me." → dos nodos de red que se conectan
export const EscenaRed: React.FC = () => {
  const t = useT();
  const avance = interpolate(t, [3.7, 5.0], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const a = { x: 250, y: 400 };
  const b = { x: 830, y: 400 };
  const nodos = Array.from({ length: 14 }, (_, k) => ({
    x: 80 + random(`nx${k}`) * 920,
    y: 60 + random(`ny${k}`) * 480,
  }));
  return (
    <AbsoluteFill>
      <CodigoRapido
        desde={3.6}
        velocidad={14}
        lineas={20}
        size={16}
        offset={18}
        opacidad={0.13}
        numeros={false}
        style={{ left: 40, top: 0, width: 1000 }}
      />
      <svg width={1080} height={606} style={{ position: "absolute" }}>
        {nodos.map((n, k) => (
          <g key={k}>
            <line
              x1={n.x}
              y1={n.y}
              x2={nodos[(k + 3) % 14].x}
              y2={nodos[(k + 3) % 14].y}
              stroke={C.crema}
              strokeOpacity={0.12}
            />
            <circle cx={n.x} cy={n.y} r={3} fill={C.crema} fillOpacity={0.4} />
          </g>
        ))}
        <path
          d={`M${a.x},${a.y} Q540,250 ${b.x},${b.y}`}
          stroke={C.naranja}
          strokeWidth={3}
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - avance}
          style={{ filter: `drop-shadow(0 0 8px ${C.naranja})` }}
        />
        {[a, b].map((n, k) => (
          <circle
            key={k}
            cx={n.x}
            cy={n.y}
            r={k === 0 || avance > 0.98 ? 14 : 8}
            fill={k === 0 || avance > 0.98 ? C.naranja : C.gris}
            style={{ filter: `drop-shadow(0 0 10px ${C.naranja})` }}
          />
        ))}
      </svg>
      <Micro style={{ left: a.x - 70, top: a.y + 30 }}>{"you · 10.0.0.7"}</Micro>
      <Micro
        style={{ left: b.x - 80, top: b.y + 30 }}
        color={avance > 0.98 ? C.naranja : C.gris}
      >
        {"me · 127.0.0.1"}
      </Micro>
      <Micro style={{ left: 60, top: 50 }}>
        {`$ ping 127.0.0.1   ttl=64   ${(avance * 0.042).toFixed(3)} ms`}
      </Micro>
      <Palabras
        palabras={LETRA.youNextToMe}
        size={60}
        clave={3}
        claveScale={2}
        style={{ left: 340, top: 110 }}
      />
    </AbsoluteFill>
  );
};

// Volcado hexadecimal que se desplaza (textura de fondo)
const Hexdump: React.FC<{ opacidad?: number }> = ({ opacidad = 0.22 }) => {
  const t = useT();
  const off = Math.floor(t * 30);
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        top: -((t * 120) % 28),
        fontFamily: F.mono,
        fontSize: 20,
        lineHeight: "28px",
        color: C.crema,
        opacity: opacidad,
        whiteSpace: "pre",
      }}
    >
      {Array.from({ length: 24 }, (_, r) => {
        const fila = off + r;
        const bytes = Array.from({ length: 16 }, (_, k) =>
          Math.floor(random(`h${fila}-${k}`) * 256)
            .toString(16)
            .padStart(2, "0"),
        ).join(" ");
        return (
          <div key={r}>
            {(fila * 16).toString(16).padStart(8, "0") + "  " + bytes}
          </div>
        );
      })}
    </div>
  );
};

// C · "Give me what I want." → bloque display sobre hexdump
export const EscenaDame: React.FC = () => (
  <AbsoluteFill>
    <Hexdump />
    <Palabras
      palabras={LETRA.giveMe1}
      size={92}
      font={F.display}
      upper
      clave={4}
      claveScale={1.7}
      style={{ left: 70, top: 150, width: 940, rowGap: 0 }}
    />
    <Micro style={{ left: 70, top: 520 }} color={C.rojo}>
      {"0x41414141 · buffer overflow"}
    </Micro>
  </AbsoluteFill>
);

// D · "How am I supposed to please you?" → editor + traceback (hueco 10–12,6 s)
export const EscenaEditor: React.FC = () => {
  const t = useT();
  const { fps } = useVideoConfig();
  const codigo = [
    "import socket, os",
    "",
    "def please(target):",
    "    s = socket.socket()",
    "    s.connect((target, 22))",
    "    return s.recv(1024)",
    "",
    'please("10.0.0.7")',
  ];
  const lineas = Math.floor(interpolate(t, [7.95, 10.0], [0, 8], clamp));
  const err = t >= 10.4;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 70,
          width: 470,
          height: 470,
          background: "rgba(8,6,6,0.9)",
          border: `1px solid ${C.gris}44`,
          padding: "16px 18px",
          fontFamily: F.mono,
          fontSize: 19,
          lineHeight: "30px",
          color: C.crema,
          whiteSpace: "pre",
        }}
      >
        <Micro style={{ position: "relative", marginBottom: 8 }}>
          {"please.py  ·  UTF-8  ·  Python"}
        </Micro>
        {codigo.slice(0, lineas).map((l, k) => (
          <div key={k}>
            <span style={{ color: C.gris }}>{String(k + 1).padStart(2) + "  "}</span>
            <span style={{ color: l.startsWith("def") ? C.naranja : C.crema }}>
              {l}
            </span>
          </div>
        ))}
        {err ? (
          <div
            style={{
              color: C.rojo,
              marginTop: 12,
              fontSize: 17,
              lineHeight: "24px",
              opacity: interpolate((t - 10.4) * fps, [0, 3], [0, 1], clamp),
              textShadow: glow(C.rojo, 8),
            }}
          >
            {"Traceback (most recent call last):\n" +
              '  File "please.py", line 8\n' +
              "PermissionError: [Errno 13]\n" +
              "  Permission denied"}
          </div>
        ) : null}
      </div>
      {t >= 10.5 ? (
        <CodigoRapido
          desde={10.5}
          velocidad={22}
          lineas={5}
          size={16}
          offset={40}
          style={{
            left: 60,
            top: 445,
            width: 470,
            height: 125,
            borderLeft: `3px solid ${C.rojo}`,
            paddingLeft: 12,
          }}
        />
      ) : null}
      <Palabras
        palabras={LETRA.howAmI}
        size={58}
        clave={6}
        claveScale={2.1}
        style={{ left: 60, top: 120, width: 470 }}
      />
    </AbsoluteFill>
  );
};

// E · "That's all I want." → fuerza bruta que llega al 100 % en "want."
export const EscenaFuerzaBruta: React.FC = () => {
  const t = useT();
  const fin = LETRA.thatsAll[3].s;
  const p = interpolate(t, [12.6, fin], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.quad),
  });
  const dentro = t >= fin;
  const intento = Math.floor(t * 30);
  const pwds = ["hunter2", "admin123", "letmein", "qwerty", "p4ssw0rd", "dragon", "monkey", "iloveyou", "trustno1", "s3cr3t"];
  return (
    <AbsoluteFill>
      <Micro style={{ left: 60, top: 50 }}>
        {"$ python3 brute.py --target 10.0.0.7 --wordlist rockyou.txt"}
      </Micro>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 120,
          fontFamily: F.mono,
          fontSize: 20,
          lineHeight: "30px",
          color: C.gris,
          whiteSpace: "pre",
        }}
      >
        {Array.from({ length: 7 }, (_, k) => {
          const n = intento - k;
          const pw = pwds[Math.floor(random(`p${n}`) * pwds.length)];
          return (
            <div key={k} style={{ opacity: 1 - k * 0.13 }}>
              {`[${String(n * 37).padStart(6, "0")}] ${pw.padEnd(10)} ✗`}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 380,
          height: 26,
          border: `1px solid ${C.gris}88`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${p * 100}%`,
            background: C.naranja,
            boxShadow: glow(),
          }}
        />
      </div>
      <Micro style={{ left: 60, top: 420 }} color={dentro ? C.naranja : C.gris} size={20}>
        {dentro
          ? "[+] ACCESS GRANTED · password: wutiwant"
          : `${Math.floor(p * 100)}%  ·  ${(intento * 37).toLocaleString("en")} intentos`}
      </Micro>
      <Palabras
        palabras={LETRA.thatsAll}
        size={62}
        clave={3}
        claveScale={1.9}
        style={{ left: 560, top: 110, width: 470 }}
      />
    </AbsoluteFill>
  );
};

// F · "Who am I?" → `whoami` en la terminal; responde "guest"
export const EscenaWhoami: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Anillos cx={540} cy={330} opacidad={0.35} />
      <CodigoRapido
        desde={16.6}
        velocidad={11}
        lineas={8}
        size={15}
        offset={8}
        opacidad={0.6}
        style={{ right: 40, top: 30, width: 470, height: 200 }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          height: 150,
          background: "rgba(12,9,9,0.9)",
          borderTop: `1px solid ${C.gris}44`,
          borderBottom: `1px solid ${C.gris}44`,
        }}
      />
      <Tecleo
        palabras={LETRA.whoAmI1}
        prompt="guest@kali:~$ "
        size={50}
        style={{ left: 80, top: 268 }}
      />
      {t >= 19.8 ? (
        <Micro style={{ left: 80, top: 340 }} color={C.crema} size={34}>
          {"guest"}
        </Micro>
      ) : null}
      <Micro style={{ left: 80, top: 420 }} color={C.rojo}>
        {"UID 1000"}
      </Micro>
      <Micro style={{ left: 180, top: 420 }}>{"groups: guest · no sudo"}</Micro>
    </AbsoluteFill>
  );
};

// G · Ráfaga: flash blanco + cortes cada 3–8 frames + "ROOT"
export const Flash: React.FC = () => <AbsoluteFill style={{ background: C.flash }} />;

export const Corte: React.FC<{ texto: string; color?: string; size?: number; mono?: boolean }> = ({
  texto,
  color = C.crema,
  size = 200,
  mono = false,
}) =>
  mono ? (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Micro style={{ position: "relative" }} color={color} size={size}>
        {texto}
      </Micro>
    </AbsoluteFill>
  ) : (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Eco texto={texto} size={size} color={color} style={{ position: "relative" }} />
    </AbsoluteFill>
  );

export const EscenaRoot: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Anillos opacidad={0.25} />
      <div
        style={{
          fontFamily: F.display,
          fontSize: 230,
          lineHeight: 1,
          color: C.naranja,
          textShadow: glow(C.naranja, 30),
          scale: interpolate(t, [24.3, 24.45, 24.5], [0.85, 1.04, 1], clamp),
        }}
      >
        ROOT
      </div>
      <Micro style={{ left: 60, top: 520 }} color={C.crema} size={22}>
        {"uid=0(root) gid=0(root) groups=0(root)"}
      </Micro>
    </AbsoluteFill>
  );
};

// H · "Give me what I want." ×2 → la serpiente (Python) despierta
export const EscenaSerpiente: React.FC = () => {
  const t = useT();
  const dibujo = interpolate(t, [26.2, 27.6], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const fase = t * 2.2;
  const cuerpo = (desp: number) =>
    Array.from({ length: 61 }, (_, k) => {
      const x = 60 + k * 16;
      const y = 340 + Math.sin(k * 0.22 + fase) * 90 * (0.4 + k / 100) + desp;
      return `${k === 0 ? "M" : "L"}${x},${y.toFixed(1)}`;
    }).join("");
  const cabeza = {
    x: 60 + 60 * 16,
    y: 340 + Math.sin(60 * 0.22 + fase) * 90 * 1.0,
  };
  const segunda = t >= 29.0;
  return (
    <AbsoluteFill>
      <CodigoRapido
        desde={26.2}
        velocidad={16}
        lineas={20}
        size={16}
        offset={30}
        opacidad={0.12}
        numeros={false}
        style={{ left: 560, top: 0, width: 500 }}
      />
      <svg width={1080} height={606} style={{ position: "absolute" }}>
        {Array.from({ length: 9 }, (_, k) => (
          <path
            key={k}
            d={cuerpo((k - 4) * 9)}
            stroke={k === 4 ? C.naranja : C.crema}
            strokeOpacity={k === 4 ? 0.9 : 0.25}
            strokeWidth={k === 4 ? 2.5 : 1.2}
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - dibujo}
          />
        ))}
        {dibujo > 0.98 ? (
          <g style={{ filter: `drop-shadow(0 0 10px ${C.naranja})` }}>
            <circle cx={cabeza.x - 18} cy={cabeza.y - 14} r={7} fill={C.naranja} />
            <circle cx={cabeza.x + 4} cy={cabeza.y - 14} r={7} fill={C.naranja} />
          </g>
        ) : null}
      </svg>
      <Micro style={{ left: 60, top: 50 }}>{"import this  # the zen of python"}</Micro>
      {!segunda ? (
        <Palabras
          palabras={LETRA.giveMe2}
          size={70}
          font={F.display}
          upper
          clave={4}
          claveScale={1.6}
          style={{ left: 60, top: 90, width: 700, rowGap: 0 }}
        />
      ) : (
        <Palabras
          palabras={LETRA.giveMe3}
          size={70}
          font={F.display}
          upper
          clave={4}
          claveScale={1.6}
          style={{ left: 60, top: 90, width: 700, rowGap: 0 }}
        />
      )}
      <Micro style={{ right: 60, top: 520 }} color={C.rojo}>
        {segunda ? "payload 2/2" : "payload 1/2"}
      </Micro>
    </AbsoluteFill>
  );
};

// I · "Give me what I want." final (hueco 31–33 s) → la terminal se apaga
export const EscenaFinal: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(t, [33.5, 33.95], [1, 0], clamp),
      }}
    >
      <Anillos opacidad={interpolate(t, [31.1, 33.4], [0.1, 0.35], clamp)} />
      <Tecleo
        palabras={LETRA.giveMe4}
        prompt="root@kali:~# "
        size={48}
        style={{ left: 80, top: 275 }}
      />
      {t >= 33.2 ? (
        <Micro style={{ left: 80, top: 360 }}>{"[Process completed]"}</Micro>
      ) : null}
    </AbsoluteFill>
  );
};
