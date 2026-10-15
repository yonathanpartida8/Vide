// Letra de musica.mp3 con tiempos por palabra (segundos).
// Fuente: faster-whisper medium con prompt (analisis/musica_words_p.json),
// verificada contra la voz aislada (REPET-SIM); large-v3 adelantaba ~0,5 s.
export type Palabra = { w: string; s: number };

export const LETRA = {
  pleaseNeed: [
    { w: "Please,", s: 0.0 },
    { w: "please,", s: 1.24 },
    { w: "I", s: 1.68 },
    { w: "really", s: 1.98 },
    { w: "need", s: 2.78 },
  ],
  youNextToMe: [
    { w: "you", s: 3.64 },
    { w: "next", s: 4.0 },
    { w: "to", s: 4.5 },
    { w: "me.", s: 4.96 },
  ],
  giveMe1: [
    { w: "Give", s: 6.0 },
    { w: "me", s: 6.36 },
    { w: "what", s: 6.64 },
    { w: "I", s: 6.9 },
    { w: "want.", s: 7.38 },
  ],
  howAmI: [
    { w: "How", s: 7.95 },
    { w: "am", s: 8.2 },
    { w: "I", s: 8.46 },
    { w: "supposed", s: 8.74 },
    { w: "to", s: 9.28 },
    { w: "please", s: 9.7 },
    { w: "you?", s: 10.12 },
  ],
  thatsAll: [
    { w: "That's", s: 12.76 },
    { w: "all", s: 13.62 },
    { w: "I", s: 14.2 },
    { w: "want.", s: 14.62 },
  ],
  whoAmI1: [
    { w: "Who", s: 16.82 },
    { w: "am", s: 17.78 },
    { w: "I?", s: 18.48 },
  ],
  whoAmI2: [
    { w: "Who", s: 22.2 },
    { w: "am", s: 22.6 },
    { w: "I?", s: 23.44 },
  ],
  giveMe2: [
    { w: "Give", s: 26.28 },
    { w: "me", s: 27.06 },
    { w: "what", s: 27.56 },
    { w: "I", s: 27.74 },
    { w: "want.", s: 28.0 },
  ],
  giveMe3: [
    { w: "Give", s: 29.12 },
    { w: "me", s: 29.42 },
    { w: "what", s: 29.86 },
    { w: "I", s: 30.06 },
    { w: "want.", s: 30.42 },
  ],
  giveMe4: [
    { w: "Give", s: 31.62 },
    { w: "me", s: 31.84 },
    { w: "what", s: 32.32 },
    { w: "I", s: 32.8 },
    { w: "want.", s: 32.96 },
  ],
} satisfies Record<string, Palabra[]>;
