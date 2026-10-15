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
import { RafagaCodigo } from "./codigo";

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
        <Escena name="A · Please, please (REPL)" desde={0} hasta={3.4}>
          <EscenaREPL />
        </Escena>
        <Escena name="R1 · ráfaga código" desde={3.4} hasta={3.6} entrada="glitch" zoom={[1.1, 1]}>
          <RafagaCodigo desde={3.4} />
        </Escena>
        <Escena name="B · you next to me (red)" desde={3.6} hasta={5.8} entrada="barrido">
          <EscenaRed />
        </Escena>
        <Escena name="R2 · ráfaga código" desde={5.8} hasta={5.95} entrada="glitch" zoom={[1, 1.12]}>
          <RafagaCodigo desde={5.8} offset={12} />
        </Escena>
        <Escena name="C · Give me what I want (hex)" desde={5.95} hasta={7.75} zoom={[1.02, 1.1]} entrada="glitch">
          <EscenaDame />
        </Escena>
        <Escena name="R3 · ráfaga código" desde={7.75} hasta={7.85} zoom={[1.15, 1]}>
          <RafagaCodigo desde={7.75} offset={26} />
        </Escena>
        <Escena name="D · How am I supposed (editor)" desde={7.85} hasta={12.3} entrada="zoom">
          <EscenaEditor />
        </Escena>
        <Escena name="R4 · ráfaga código" desde={12.3} hasta={12.6} entrada="barrido" zoom={[1, 1.15]}>
          <RafagaCodigo desde={12.3} offset={34} />
        </Escena>
        <Escena name="E · That's all I want (brute force)" desde={12.6} hasta={16.3} entrada="glitch">
          <EscenaFuerzaBruta />
        </Escena>
        <Escena name="R5 · ráfaga código" desde={16.3} hasta={16.6} entrada="zoom" zoom={[1.1, 1]}>
          <RafagaCodigo desde={16.3} offset={5} />
        </Escena>
        <Escena name="F · Who am I (whoami)" desde={16.6} hasta={21.0} zoom={[1, 1.12]} entrada="iris">
          <EscenaWhoami />
        </Escena>
        <Escena name="R6 · ráfaga código larga" desde={21.0} hasta={21.85} entrada="barrido" zoom={[1, 1.25]}>
          <RafagaCodigo desde={21.0} offset={20} />
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
        <Escena name="G5 · denied" desde={23.0} hasta={23.2} entrada="glitch">
          <Corte texto="Permission denied" mono size={56} color={C.rojo} />
        </Escena>
        <Escena name="G6 · su root" desde={23.2} hasta={23.44}>
          <Corte texto="$ su root" mono size={60} />
        </Escena>
        <Escena name="G7 · I?" desde={23.44} hasta={24.3} zoom={[1.2, 1]} entrada="zoom">
          <Corte texto="I?" color={C.naranja} size={260} />
        </Escena>
        <Escena name="G8 · ROOT" desde={24.3} hasta={25.6} entrada="iris">
          <EscenaRoot />
        </Escena>
        <Escena name="R7 · ráfaga código" desde={25.6} hasta={26.2} entrada="glitch" zoom={[1, 1.2]}>
          <RafagaCodigo desde={25.6} offset={44} />
        </Escena>
        <Escena name="H · Give me what I want x2 (serpiente)" desde={26.2} hasta={31.1} entrada="barrido">
          <EscenaSerpiente />
        </Escena>
        <Escena name="R8 · ráfaga sobre H" desde={28.75} hasta={29.05} entrada="glitch" cola={false} zoom={[1.1, 1]}>
          <RafagaCodigo desde={28.75} offset={16} />
        </Escena>
        <Escena name="I · final" desde={31.1} hasta={33.95} zoom={[1, 1.06]} entrada="iris">
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
