# estilo.md — Guía de estilo (derivada de `referencia.mp4`)

Fuente analizada: `assets/referencia.mp4` (720x1280, 30 fps, 38,1 s). Análisis: 76 fotogramas a 2 fps + detección de cambio de plano (ffmpeg `scene>0.08`) + transcripción palabra a palabra (faster-whisper small). Todos los valores en píxeles están **escalados ×1,5 a 1080x1920**.

Formato del vídeo: **lyric video / tipografía cinética**. No hay persona a cámara ni voz en off: la canción ES el guion, y cada verso se convierte en una escena de motion graphics donde la letra aparece palabra a palabra.

## 1. Estructura de pantalla (fija durante todo el vídeo)

| Zona | Posición (1080x1920) | Contenido |
|---|---|---|
| Fondo | todo | negro puro `#000000` |
| Título gancho | líneas centradas en y≈ 255–465 | 2 líneas, blanco `#FFFFFF`, sans bold ~90 px, interlineado 1,1. Estático, no se anima, visible del frame 0 al final |
| Caja de vídeo | y = 657 → 1263 (1080x606, 16:9) | toda la animación ocurre aquí |
| Marcas de esquina | dentro de la caja, 22 px de las esquinas | 4 escuadras en L de 14 px, trazo 2 px, gris `#8A8A8A` 60 % |
| Pie | centrado en y≈ 1545 | 1 línea blanca, sans bold ~50 px (en la ref.: "Built by Claude Opus 5.5") |

Fuente del título y pie: sans geométrica bold [SUPOSICIÓN: DM Sans 700; en la ref. podría ser Manrope/Plus Jakarta].

## 2. Ritmo de cortes

- Canción de la ref.: 13 versos en 38 s → **1 escena por verso, duración media 2,9 s** (rango 1,5–6 s).
- Escenas medidas: 0–4,4 s (dibujo de unicornio + "AGI") · 4,4–8,6 (unicornio neón) · 8,6–12,5 (gráfica de loss) · 12,5–16 (mapa topográfico, "SERVANT/BOSS") · 16–22 (terminal "ChatGPT, please…") · 22,5–24,1 (**ráfaga de 6 cortes en 1,6 s**: flash blanco, "UPPING", "P(DOOM)") · 24,1–25,6 ("FUTURE GOES FOOM") · 25,6–29,9 (habitación wireframe) · 29,9–30,6 (setas) · 30,6–31,2 (smiley) · 31,2–38 (shoggoth).
- La mayoría de transiciones **no son cortes secos**: el cambio de escena va pegado al primer golpe de voz del verso siguiente; dentro de la escena la cámara se mueve sin parar.
- En el punto de máxima energía de la canción hay un **cluster de cortes cada 3–8 frames** (≈0,1–0,27 s).

## 3. Subtítulos / letra (dentro de la caja)

- **Palabra a palabra**: cada palabra aparece en su timestamp exacto (Whisper `word_timestamps`). La palabra entra en ~4–6 frames (opacidad 0→1 + desplazamiento 8–12 px hacia arriba, o "tecleo" letra a letra en escenas de terminal a ~1 carácter/frame).
- **Palabras por bloque**: 1–6 (media ≈3,5). Un bloque = medio verso; se limpia entero al cambiar de bloque.
- **Palabra destacada**: la palabra que está sonando va en **naranja `#F05E21`** con glow (text-shadow 0 0 18 px naranja 70 %); las anteriores pasan a crema/blanco `#F2EDE6`. En bloques largos, la palabra clave final (sustantivo/remate) queda naranja y 1,3–2× más grande ("AGI", "surprise", "SERVANT", "FOOM", "EYES").
- Posición: no fija; se coloca donde la composición deja hueco (a menudo tercio izquierdo-superior de la caja o centrada). Siempre dentro de la caja, margen ≥ 40 px.
- Tamaños: texto de verso 40–60 px; palabra clave 110–200 px.
- Fuentes por tipo de escena [SUPOSICIÓN en nombres concretos]:
  - verso normal: sans heavy (≈ Inter 800).
  - terminal/prompt: monoespaciada (≈ JetBrains Mono / IBM Plex Mono 500), con cursor `|` naranja parpadeando cada 15 frames y subrayado naranja bajo la palabra activa.
  - palabra impacto: display extendida ultra-black en mayúsculas (≈ Archivo Black / Monument Extended), blanca con relleno o contorno.
- Texto que sigue a un trazo: en algunas escenas la letra se escribe siguiendo la línea animada (curva de loss, curva de nivel).

## 4. Textos en pantalla (no-letra)

- Micro-UI de "interfaz técnica" en mono 14–18 px, gris `#7A7A7A`: ejes con ticks (`1e1`, `5k`, `STEP →`), cabeceras (`train/loss  run: you-and-me-v2`), paneles de tokens con probabilidades (`please 0.48 · just 0.21 · sudo 0.07`), contadores (`0002`, `0.16`). Pequeños chips rojos `#E0301E` como etiquetas.
- Sirven de textura; no hace falta leerlos. Su contenido son chistes internos del tema (en la ref.: jerga de IA).

## 5. B-roll

- **Cero vídeo real.** Todo son gráficos generados: line-art wireframe (unicornio, habitación con estanterías), gráficas, curvas de nivel concéntricas, terminal, y al final un render 3D gris (shoggoth) con ojos naranjas.
- Cada escena = metáfora visual literal del verso (verso "training loss" → gráfica de loss; "please" → prompt de terminal).
- Líneas: blanco a 30–60 % de opacidad, trazo 1–2 px; los elementos "vivos" en naranja con glow.

## 6. Transiciones

- Por defecto: **corte en el golpe** del primer fonema del verso.
- Morph/cámara: el dibujo de una escena se transforma en la siguiente (unicornio dibujado → unicornio neón) [SUPOSICIÓN: cross-dissolve de 6–10 frames].
- **Flash blanco** de 2–3 frames (`#F2F0EC`) justo antes del cluster de cortes rápidos.
- Glitch/eco: texto duplicado desplazado (eco vertical de 3–4 copias a 30 % de opacidad) en "UPPING".

## 7. Zooms y movimiento de cámara

- Movimiento constante: ninguna escena está quieta. Push-in lento 100 % → 106–110 % a lo largo de la escena.
- Dolly lateral en la gráfica (la cámara sigue la punta de la línea que se dibuja).
- Rotaciones 3D leves en wireframes (±10–15°).
- En palabras-impacto: escala 0,85 → 1,0 en 6 frames con easing `out(cubic)` + ligero overshoot.

## 8. Color y textura

- Fondo de caja: casi negro cálido `#140E0D` (mediana medida: rgb 20,13,15).
- Acento único: **naranja `#F05E21`** (medido rgb 240,94,33); variante clara `#E37B4A` para glow.
- Secundario: crema `#F2EDE6`, gris de UI `#7A7A7A`, rojo de chip `#E0301E`.
- Viñeta oscura en bordes de la caja (~35 %). Grano de película fino [SUPOSICIÓN: ~4 % de ruido].
- Glow/bloom en todo lo naranja.

## 9. Sonido

- Solo la canción, sin voz en off ni efectos [SUPOSICIÓN: no se detectan SFX separables].
- Nivel medio de la ref.: −16,4 dB, pico −2,3 dB. Objetivo de exportación: pico ≤ −1 dB, sin compresión extra.
- Música a 100 % desde el frame 0; sin fade-in; fin seco o fade-out ≤ 0,5 s.

## 10. Adaptación a este proyecto (tema: programación, Python, hacking)

- Audio: `assets/musica.mp3` (34 s, ≈103 BPM, beat cada 0,58 s; huecos de energía en 12–14 s y 31–33 s).
- Las metáforas visuales se cambian de IA → Python/hacking: terminal, traceback, barra de progreso de brute-force, mapa de red/nodos, hexdump, `import` en editor, shell root.
- Se mantiene layout, paleta y reglas de subtítulos de arriba.

## Correcciones aprobadas por el usuario

_(vacío — aquí se irán añadiendo las correcciones que el usuario apruebe)_
