import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, clamp, F, glow, useT } from "./ui";

// Código Python temático (redes, hashes, escaneo) que se muestra a toda
// velocidad. Solo es decorado: no hace falta que se lea.
const FUENTE = `#!/usr/bin/env python3
import socket, hashlib, itertools
from concurrent.futures import ThreadPoolExecutor

TARGET = "10.0.0.7"
PORTS = range(1, 1025)

def scan(port: int) -> int | None:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.3)
    if s.connect_ex((TARGET, port)) == 0:
        return port
    s.close()

with ThreadPoolExecutor(max_workers=256) as pool:
    open_ports = [p for p in pool.map(scan, PORTS) if p]
print(f"[+] open: {open_ports}")

def crack(h: str, wordlist: str) -> str | None:
    with open(wordlist, "rb") as f:
        for line in f:
            pw = line.strip()
            if hashlib.sha256(pw).hexdigest() == h:
                return pw.decode()
    return None

# brute force sobre el charset
charset = "abcdefghijklmnopqrstuvwxyz0123456789"
for n in range(1, 7):
    for combo in itertools.product(charset, repeat=n):
        guess = "".join(combo)
        if hashlib.md5(guess.encode()).hexdigest() == target_hash:
            print("[+] FOUND:", guess)
            raise SystemExit

class Payload:
    def __init__(self, cmd: bytes):
        self.cmd = cmd
    def encode(self) -> bytes:
        return bytes(b ^ 0x41 for b in self.cmd)

payload = Payload(b"whoami").encode()
sock.sendall(payload + b"\\x00" * 32)
resp = sock.recv(4096)
assert b"root" in resp, "permission denied"
os.setuid(0)  # please...`.split("\n");

const KW =
  /\b(import|from|def|class|return|if|for|in|with|as|while|None|print|raise|assert|lambda|and|or|not|self)\b/g;

// Coloreado mínimo: comentarios grises, cadenas crema apagado, palabras clave naranja
const Linea: React.FC<{ texto: string }> = ({ texto }) => {
  const hash = texto.indexOf("#");
  if (hash === 0 || texto.trimStart().startsWith("#"))
    return <span style={{ color: C.gris }}>{texto}</span>;
  const partes: React.ReactNode[] = [];
  const re = new RegExp(`("[^"]*"|'[^']*'|${KW.source})`, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(texto))) {
    if (m.index > last) partes.push(texto.slice(last, m.index));
    const tok = m[0];
    const esCadena = tok.startsWith('"') || tok.startsWith("'");
    partes.push(
      <span key={k++} style={{ color: esCadena ? "#C9B79C" : C.naranja }}>
        {tok}
      </span>,
    );
    last = m.index + tok.length;
  }
  partes.push(texto.slice(last));
  return <>{partes}</>;
};

// Panel de código que avanza `velocidad` líneas/s; la última línea se teclea.
export const CodigoRapido: React.FC<{
  desde: number; // segundo absoluto en que empieza
  velocidad?: number;
  lineas?: number;
  size?: number;
  offset?: number;
  opacidad?: number;
  numeros?: boolean;
  style?: React.CSSProperties;
}> = ({
  desde,
  velocidad = 12,
  lineas = 14,
  size = 18,
  offset = 0,
  opacidad = 1,
  numeros = true,
  style,
}) => {
  const t = useT();
  const pos = Math.max(0, (t - desde) * velocidad) + offset;
  const idx = Math.floor(pos);
  const frac = pos - idx;
  const filas = Array.from({ length: lineas }, (_, r) => idx - lineas + 1 + r);
  return (
    <div
      style={{
        position: "absolute",
        fontFamily: F.mono,
        fontSize: size,
        lineHeight: 1.5,
        color: C.crema,
        whiteSpace: "pre",
        overflow: "hidden",
        opacity: opacidad,
        ...style,
      }}
    >
      {filas.map((n) => {
        if (n < 0) return <div key={n}>&nbsp;</div>;
        const texto = FUENTE[n % FUENTE.length];
        const ultima = n === idx;
        const visible = ultima
          ? texto.slice(0, Math.ceil(texto.length * frac))
          : texto;
        return (
          <div key={n}>
            {numeros ? (
              <span style={{ color: "#4A4040" }}>
                {String((n % 999) + 1).padStart(3) + "  "}
              </span>
            ) : null}
            <Linea texto={visible} />
            {ultima ? (
              <span style={{ color: C.naranja, textShadow: glow(C.naranja, 8) }}>
                ▌
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

// Ráfaga a pantalla completa: código grande pasando a toda velocidad,
// con una franja naranja de "ejecución" barriendo.
export const RafagaCodigo: React.FC<{ desde: number; offset?: number }> = ({
  desde,
  offset = 0,
}) => {
  const t = useT();
  return (
    <AbsoluteFill>
      <CodigoRapido
        desde={desde}
        velocidad={60}
        lineas={16}
        size={30}
        offset={offset}
        style={{ left: 50, top: -20, width: 1000 }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 46,
          top: interpolate(t - desde, [0, 0.4], [600, -50], clamp),
          background: `${C.naranja}33`,
          borderTop: `2px solid ${C.naranja}`,
        }}
      />
    </AbsoluteFill>
  );
};
