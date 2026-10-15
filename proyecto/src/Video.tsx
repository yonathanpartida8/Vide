import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Acabado, C, Escena, F } from "./ui";
import {
  Corte,
  EscenaDame,
  EscenaEditor,
  EscenaFinal,
  EscenaFuerzaBruta,
  EscenaRed,
  EscenaREPL,
  EscenaRoot,
  EscenaSerpiente,
  EscenaWhoami,
  Flash,
} from "./escenas";

// Layout fijo de estilo.md §1 (1080x1920)
const CAJA = { top: 657, height: 606 };

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.negro }}>
      <Audio src={staticFile("musica.wav")} />

      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: F.titulo,
          fontWeight: 700,
          fontSize: 90,
          lineHeight: 1.1,
          color: "#FFFFFF",
        }}
      >
        Python no es
        <br />
        "hacking"
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: CAJA.top,
          width: 1080,
          height: CAJA.height,
          overflow: "hidden",
        }}
      >
        <Escena name="A · Please, please (REPL)" desde={0} hasta={3.6}>
          <EscenaREPL />
        </Escena>
        <Escena name="B · you next to me (red)" desde={3.6} hasta={5.95}>
          <EscenaRed />
        </Escena>
        <Escena name="C · Give me what I want (hex)" desde={5.95} hasta={7.85} zoom={[1.02, 1.1]}>
          <EscenaDame />
        </Escena>
        <Escena name="D · How am I supposed (editor)" desde={7.85} hasta={12.6}>
          <EscenaEditor />
        </Escena>
        <Escena name="E · That's all I want (brute force)" desde={12.6} hasta={16.6}>
          <EscenaFuerzaBruta />
        </Escena>
        <Escena name="F · Who am I (whoami)" desde={16.6} hasta={21.85} zoom={[1, 1.12]}>
          <EscenaWhoami />
        </Escena>
        <Escena name="G0 · flash" desde={21.85} hasta={21.95} fondo={C.flash} zoom={[1, 1]}>
          <Flash />
        </Escena>
        <Escena name="G1 · sudo -i" desde={21.95} hasta={22.2} zoom={[1.1, 1]}>
          <Corte texto="$ sudo -i" mono size={60} />
        </Escena>
        <Escena name="G2 · WHO" desde={22.2} hasta={22.45} zoom={[1.15, 1]}>
          <Corte texto="WHO" />
        </Escena>
        <Escena name="G3 · ELF" desde={22.45} hasta={22.6} zoom={[1, 1.05]}>
          <Corte texto="7f 45 4c 46" mono size={70} color={C.naranja} />
        </Escena>
        <Escena name="G4 · AM" desde={22.6} hasta={23.0} zoom={[1.15, 1]}>
          <Corte texto="AM" />
        </Escena>
        <Escena name="G5 · denied" desde={23.0} hasta={23.2}>
          <Corte texto="Permission denied" mono size={56} color={C.rojo} />
        </Escena>
        <Escena name="G6 · su root" desde={23.2} hasta={23.44}>
          <Corte texto="$ su root" mono size={60} />
        </Escena>
        <Escena name="G7 · I?" desde={23.44} hasta={24.3} zoom={[1.2, 1]}>
          <Corte texto="I?" color={C.naranja} size={260} />
        </Escena>
        <Escena name="G8 · ROOT" desde={24.3} hasta={25.6}>
          <EscenaRoot />
        </Escena>
        <Escena name="H · Give me what I want x2 (serpiente)" desde={25.6} hasta={31.1}>
          <EscenaSerpiente />
        </Escena>
        <Escena name="I · final" desde={31.1} hasta={33.95} zoom={[1, 1.06]}>
          <EscenaFinal />
        </Escena>
        <Acabado />
      </div>

      <div
        style={{
          position: "absolute",
          top: 1515,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: F.titulo,
          fontWeight: 700,
          fontSize: 50,
          color: "#FFFFFF",
        }}
      >
        Hecho con Python + Remotion
      </div>
    </AbsoluteFill>
  );
};
