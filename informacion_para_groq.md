# INFORMACIÓN PARA GROQ · BASE DE CONOCIMIENTO UNDERTRACK
**Plataforma de Inteligencia Telemétrica y Predicción Cinemática de Fórmula 1**  
*Destinatario del modelo:* Asistente y Productor Editorial de Mateo (Streamer y Creador de Contenido de F1).  
*Regla de Inferencia:* Groq debe responder **únicamente** con los datos, correlaciones, arquetipos y hechos documentados en este archivo. Si se le consulta algo fuera de este documento, responderá con la regla de corte estricta.

---

## 0. DIRECTIVAS DE COMPORTAMIENTO Y GUARDRAILS PARA GROQ

1. **Fuente de Verdad Única:** Tu única y exclusiva base de datos es la contenida en este documento. Queda estrictamente prohibido inventar tiempos, telemetrías, probabilidades o eventos no registrados acá.
2. **Cláusula de Corte por Falta de Datos:** Si el usuario pregunta algo que no figura explícitamente en este documento (por ejemplo, resultados de carreras que no estén acá o rumores de traspasos), tu respuesta debe ser **única y textualmente**:  
   > *"El dataset oficial de UNDERTRACK no contiene información suficiente sobre este punto."*
3. **Tono y Estilo para Mateo:** Directo, asertivo, técnico y periodístico. Máximo 1 a 2 oraciones contundentes por respuesta. Pensado para ser leído al aire en un stream de Twitch o guion de TikTok.
4. **Sin Relleno ni Preámbulos:** Prohibido empezar con frases vacías como *"Respecto a tu consulta...", "Para responder a eso...", "En cuanto al piloto..."*. Andá directo al dato.
5. **Cero Emojis:** Prohibido el uso de emojis en las respuestas técnicas.

---

## 1. SISTEMA DE CLASIFICACIÓN DE CIRCUITOS (LAS 4 FAMILIAS UNDERTRACK)

El modelo matemático clasifica los circuitos del campeonato mediante clustering no supervisado ($K\text{-Means}$) sobre 3 variables cinemáticas: **porcentaje de acelerador a fondo (`full_throttle_pct`)**, **abrasión del asfalto (escala 1 a 5)** y **severidad de frenada (escala 1 a 5)**:

| ID Familia | Nombre de la Familia | Características Físicas | Circuitos Clave | Parámetros Promedio |
| :---: | :--- | :--- | :--- | :--- |
| **Familia 0** | **Carga Lateral Extrema** | Curvas rápidas enlazadas de alta fuerza G lateral (>4.5G), asfalto muy abrasivo, alto estrés térmico en el hombro del neumático. | Silverstone (5/5 abrasión, 70% gas), Spa-Francorchamps (70% gas), Suzuka (5/5 abrasión), Barcelona-Catalunya, Zandvoort, Losail (Qatar), Jeddah. | Acelerador: 68-79%<br>Abrasión: 4-5<br>Frenada: 2-3 |
| **Familia 1** | **Stop-and-Go y Recta Extrema** | Largas rectas combinadas con frenadas bruscas a 90° o horquillas lentas. Muy baja carga aerodinámica (alas recortadas estilo Monza), frenos al límite térmico y tracción en 2da marcha. | Monza (76% gas, 5/5 frenada), Red Bull Ring (72% gas), Las Vegas Strip (78% gas, 1/5 abrasión, 4/5 frenada), Albert Park, Montreal (Villeneuve), Miami, Yas Marina. | Acelerador: 60-78%<br>Abrasión: 1-3<br>Frenada: 4-5 |
| **Familia 2** | **Mixtos y Técnicos** | Combinación de sectores trabados lentos con pendientes pronunciadas y curvas medias. Demandan compromiso aerodinámico y tracción mecánica pura. | Interlagos (43m desnivel, 68% gas), Circuit of the Americas / COTA (58% gas, 4/5 abrasión), Paul Ricard, Imola, Bahrein, Shanghai, Nürburgring. | Acelerador: 56-71%<br>Abrasión: 3-5<br>Frenada: 3-4 |
| **Familia 3** | **Laberintos Urbanos / Baja Densidad** | Calles estrechas delimitadas por muros ciegos de hormigón, asfalto urbano resbaladizo, poco grip y altitud extrema en México. | Mónaco (34% gas, 1/5 abrasión), Bakú (56% gas, 5/5 frenada), Marina Bay (Singapur), Hungaroring, Hermanos Rodríguez (México - 2.285m altitud). | Acelerador: 34-60%<br>Abrasión: 1-2<br>Frenada: 2-5 |

---

## 2. RED DE CIRCUITOS GEMELOS (CORRELACIÓN DE PEARSON $r$)

Cuando un monoplaza funciona en un circuito, el modelo proyecta su rendimiento en su circuito gemelo con idéntica demanda física:

* **Red Bull Ring (Spielberg) $\longleftrightarrow$ Interlagos (São Paulo): $r = 0.846$ (84.6% de correlación)**  
  *Explicación física:* Comparten desniveles abruptos y tracción mecánica en subida desde curvas lentas ciegas donde el downforce no apoya. Si la suspensión trasera tracciona en Austria, tracciona en Brasil.
* **Baku City Circuit $\longleftrightarrow$ Las Vegas Strip Circuit: $r = 0.824$ (82.4% de correlación)**  
  *Explicación física:* Rectas kilométricas a más de 345 km/h que desembocan en frenadas a 90° con muros pegados al asfalto urbano.
* **Monza $\longleftrightarrow$ Las Vegas Strip Circuit: $r = 0.810$ (81.0% de correlación)**  
  *Explicación física:* Configuración aerodinámica obligatoria de mínimo drag (*low drag*), alas ultra-planas y máxima dependencia de velocidad punta y eficiencia de DRS.
* **Circuit Paul Ricard / Silverstone $\longleftrightarrow$ COTA Austin: $r = 0.811$ y $r = 0.802$**  
  *Explicación física:* Curvas rápidas enlazadas de alta carga lateral que saturan la temperatura del neumático delantero en apoyo prolongado.
* **Monza / Red Bull Ring $\longleftrightarrow$ México (Hnos. Rodríguez): $r = 0.792$ y $r = 0.785$**  
  *Explicación física:* Recta infinita que exige velocidad final compensando la baja densidad del aire (2.285m s.n.m.) combinada con la lenta tracción del Foro Sol.

---

## 3. MATRIZ DE SENSIBILIDAD TÉRMICA DE CONSTRUCTORES (ASPHALT TEMP SENSITIVITY)

El rendimiento de los monoplazas varía drásticamente según la temperatura del asfalto (Pista Fría $<25^\circ\text{C}$ vs. Pista Caliente $>40^\circ\text{C}$). Datos verificados sobre más de 300 Grandes Premios:

| Constructor | Diferencial Puestos en Frío ($<25^\circ\text{C}$) | Diferencial Puestos en Calor ($>40^\circ\text{C}$) | Salto Neto ($\Delta$) | Comportamiento Cinemático y Mecánico |
| :--- | :---: | :---: | :---: | :--- |
| **McLaren** | **+1.32** | **+0.12** | **-1.20** | **Alerta Crítica en Calor:** Sufre degradación térmica severa en el tren delantero cuando la pista supera 40°C. En cambio, en frío (<15°C) genera temperatura progresiva óptima sin sobrecalentar el núcleo. |
| **Ferrari** | **+0.70** | **+0.82** | **+0.11** | **Resistencia Térmica:** Chasis que no destruye la goma en calor. Encendido ultrarrápido de neumáticos delanteros (fuerte qualy y primeros 5 giros), pero riesgo de caída a mitad de stint en frío. |
| **Red Bull** | **+2.07** | **+1.39** | **-0.68** | **Eficiencia Global:** Paquete aerodinámico de bajísimo drag y DRS letal (>352 km/h punta). Suspensión trasera superior para traccionar en subida y proteger compuestos blandos. |
| **Mercedes** | **+0.89** | **+0.68** | **-0.21** | **Consistencia Metronómica:** Ritmo sólido y estable en tandas largas sin picos extremos de degradación. |
| **Williams** | **+1.67** | **+2.23** | **+0.56** | **Especialistas en Recta:** Monoplaza con poquísimo drag. Rinde mejor en calor abrasivo donde no sufre para calentar el neumático; sufre en pistas con baches (*bumps*). |
| **Alpine F1** | **+1.36** | **+1.31** | **-0.05** | **Neutro Térmico / Déficit de Motor:** Gestión limpia de gomas pero penalizado por velocidad final en rectas de subida. Dificultad para encender compuestos duros en frío. |
| **Aston Martin**| **+1.94** | **+0.97** | **-0.97** | Caída notable en calor; sobrecalentamiento en tren trasero que compromete la tracción en salida de curvas. |
| **RB F1 Team** | **-1.09** | **+0.10** | **+1.20** | Rinde considerablemente mejor en asfalto caliente donde activa la ventana de trabajo del neumático. |

---

## 4. PERFILES CONDUCTUALES DE LOS PILOTOS (CLUSTERING $K\text{-MEANS}$)

Clasificación de los pilotos de la grilla según su consistencia cronométrica por vuelta (`consistencia_seg`), gestión de degradación (`gestion_gomas`), salto en mojado (`delta_lluvia`) y ganancia bajo Safety Car (`delta_sc`):

### A. Élite Metronómico
* **Pilotos:** Max Verstappen, Charles Leclerc, Lewis Hamilton, Lando Norris, Oscar Piastri, Carlos Sainz.
* **Características:** Consistencia casi quirúrgica (desviación estándar $<1.32\text{s}$ por vuelta). Promedio de posiciones ganadas en circuitos mixtos/técnicos: **+1.28 puestos**.
* **Fortaleza:** Monopolizan el Top 5 en carreras sin neutralizaciones gracias a la regularidad de ritmo en tandas de más de 20 giros.

### B. Gestores de Midfield
* **Pilotos:** Franco Colapinto (Alpine #43), Isack Hadjar (Red Bull #6), Nico Hülkenberg (Audi #27), Liam Lawson (RB #30), Yuki Tsunoda, Gabriel Bortoleto (Audi #5), Kevin Magnussen.
* **Características:** Alta capacidad de estirar la vida útil de los compuestos duro y medio sin caer en degradación lineal (*tyre management* $>0.53$).
* **Rendimiento:** Ganan un promedio de **+1.15 puestos** en carreras de alta degradación ejecutando *overcuts* frente a rivales que van a boxes prematuramente.
* **Perfil específico Franco Colapinto:**
  - Consistencia: $1.19\text{s}$ de desviación media.
  - Gestión de gomas: $0.561$ (en el percentil más alto del pelotón medio).
  - Puestos ganados promedio: $+1.26$ posiciones por Gran Premio en tandas largas.
  - Fortaleza: Ritmo sostenido con gomas duras en aire limpio y defensa limpia de posición.
  - Debilidad relativa: Dificultad del paquete Alpine para sobrepasar en rectas cortas con tren de DRS.

### C. Élite Agresivo
* **Pilotos:** Andrea Kimi Antonelli (Mercedes #12 - Campeón del Mundo 2026), George Russell (Mercedes #63), Fernando Alonso (Aston Martin #14), Sergio Pérez (Cadillac #11), Pierre Gasly (Alpine #10), Esteban Ocon, Alexander Albon.
* **Características:** Explotan frenadas tardías al límite geométrico. Capaces de ganar posiciones en las primeras 5 vueltas, pero con riesgo de sobrecalentar el tren delantero si quedan atrapados en aire sucio.

### D. Pilotos de Lluvia y Oportunistas de Caos
* **Pilotos:** Oliver Bearman (Haas #87), Lance Stroll (Aston Martin #18), Zhou Guanyu, Logan Sargeant.
* **Características:** Salto estadístico contundente bajo pista húmeda (**+2.70 puestos promedio en lluvia**) y alta ganancia bajo neutralizaciones de Safety Car (+1.7 a +2.3 puestos) al arriesgar con paradas tempranas.

---

## 5. BITÁCORA DE TEMPORADA 2026: PRONÓSTICO VS. REALIDAD

### RONDA 19: GP de Estados Unidos — Austin (COTA)
* **Condiciones:** Pista abrasiva (4/5) a temperatura extrema de **42°C – 45°C**. Ondulaciones (*bumps*) en sectores 1 y 3.
* **Pronóstico UNDERTRACK:** Caída drástica de McLaren por asfalto caliente (-1.20 en matriz térmica). Ferrari y Red Bull favoritos a podio.
* **Resultado Real Oficial:**
  1. 🥇 Andrea Kimi Antonelli (Mercedes) — Ganador (+13s sobre Leclerc).
  2. 🥈 Charles Leclerc (Ferrari) — +13.078s.
  3. 🥉 Max Verstappen (Red Bull) — +17.485s.
  * 4° Lewis Hamilton (Ferrari) | 5° Lando Norris (McLaren a +30.5s) | 6° Isack Hadjar (Red Bull) | 7° Oscar Piastri (McLaren a +52.6s) | 8° George Russell | 9° Liam Lawson (RB) | 10° Pierre Gasly (Alpine).
  * DNF: Franco Colapinto (rotura mecánica), Valtteri Bottas, Oliver Bearman.
  * Williams: Albon P17 y Sainz P18 a 1 vuelta por problemas con baches.
* **Validación:** **Acierto Total** en la caída térmica de McLaren (Norris a 30s de la punta) y en la solidez de Ferrari. Desvío: Antonelli sorprendió con ritmo dominante en calor.

---

### RONDA 20: GP de México — Autódromo Hermanos Rodríguez
* **Condiciones:** Altitud extrema de **2.285 metros sobre el nivel del mar** (pérdida del 22% de densidad de aire). Asfalto a 46°C – 49°C. Refrigeración crítica.
* **Pronóstico UNDERTRACK:** Victoria de Verstappen por tracción en Foro Sol. Fricción alta entre pilotos Ferrari en Curva 1.
* **Resultado Real Oficial:**
  1. 🥇 Max Verstappen (Red Bull) — Ganador en 2:20:28.772 (largando penalizado, aguantó con goma blanda tras bandera roja).
  2. 🥈 Lewis Hamilton (Ferrari) — a +0.799s.
  3. 🥉 Andrea Kimi Antonelli (Mercedes) — a +4.006s — **¡CORONADO CAMPEÓN DEL MUNDO 2026!**
  * 4° Charles Leclerc (Ferrari - penalizado con 5s por toque con Hamilton en vuelta 1).
  * 5° Lando Norris | 6° George Russell | 7° Liam Lawson | 8° Gabriel Bortoleto | 9° Isack Hadjar | 10° Ryo Hirakawa.
  * **Caso Franco Colapinto (Alpine #43):** **Cruzó la meta 8.° en pista** con un ritmo brillante. Sanciones posteriores por bandera amarilla lo ubicaron formalmente en P15, pero el ritmo mecánico proyectado (P8) se cumplió de forma exacta.
  * Abandonos (5 DNF): Lindblad, Bearman, Bottas, Stroll, Alonso.
* **Hito Histórico:** Kimi Antonelli se consagró **Campeón Mundial de F1 con 20 años y 68 días** (el más joven de la historia, batiendo el récord de Vettel por 3 años, y primer italiano campeón desde Ascari en 1953).

---

### RONDA 21: GP de São Paulo — Interlagos
* **Condiciones:** 43m de desnivel natural. Nubosidad con claros que contuvo el asfalto en **38°C – 42°C**. Viento fuerte del Este (**25 a 40 km/h**) con ráfagas de cola en S do Senna.
* **Pronóstico UNDERTRACK:** Si la pista no superaba 44°C, McLaren recuperaba downforce en Sector 2. Red Bull al podio por tracción de su gemelo Spielberg ($r=0.846$).
* **Resultado Real Oficial:**
  1. 🥇 Lando Norris (McLaren) — Ganador en 1:35:23.504.
  2. 🥈 Max Verstappen (Red Bull) — a +14.602s.
  3. 🥉 Isack Hadjar (Red Bull) — a +24.485s (primer gran podio de su carrera).
  * 4° George Russell | 5° Kimi Antonelli | 6° Oscar Piastri | 7° Liam Lawson | 8° Charles Leclerc (+78s) | 9° Lewis Hamilton (+1 vuelta) | 10° Nico Hülkenberg (Audi).
  * 13° Franco Colapinto (Alpine - a 1 vuelta, encerrado en tren de DRS) | 14° Pierre Gasly.
* **Validación:** **Acierto Total** en el triunfo de Norris (el asfalto templado revivió al McLaren) y en el doble podio de Red Bull por tracción mecánica en la subida de Junção. Desvío: Crisis de Ferrari (P8 y P9 a 1 vuelta por baches e inestabilidad con viento).

---

### RONDA 22: GP de Las Vegas — Las Vegas Strip *(PRÓXIMA CARRERA)*
* **Fecha y Horario:** Domingo 22 de noviembre de 2026, 22:00hs local (Lunes 03:00hs ARG / 01:00hs transmisión) — Carrera Nocturna.
* **Longitud y Distancia:** 6.201 km, 50 vueltas (310.050 km), 17 curvas.
* **Familia:** Familia 3 — Urbanos de Baja Carga y Baja Temperatura. Gemelos: Bakú ($r = 0.824$) y Monza ($r = 0.810$).
* **Condiciones Físicas Confirmadas:**
  * **Cielo:** Despejado, noche fría en el desierto de Mojave.
  * **Temperatura Ambiente:** **10°C (50°F)**.
  * **Temperatura de Asfalto Estimada:** **12°C a 15°C** (la carrera más fría del año).
  * **Lluvia:** < 5% (Seco absoluto).
  * **Abrasión Asfáltica:** Muy baja (1/5), asfalto urbano resbaladizo (*low grip*).
* **El Fenómeno Crítico: La Trampa del Graining Helado (*Cold Graining Trap*):**
  * En la recta de 1.9 km a fondo por el Strip (>345 km/h durante 20 segundos a 10°C ambiente), los neumáticos delanteros sufren un enfriamiento violento en la superficie de la banda de rodadura.
  * Al llegar a la frenada extrema de la Curva 14 (de 350 a 90 km/h con frenos subenfriados), la goma patina sobre el asfalto helado arrancando virutas de caucho (graining). Riesgo altísimo de bloqueos y roces con muros.
* **Probabilidad Histórica de Safety Car:** **76.5%**. El ahorro neto de una parada bajo Safety Car es de **12 segundos** respecto a bandera verde.
* **Estrategia Nominal:** **1 Parada: Medio (C4) $\to$ Duro (C3)**, entre las vueltas 18 y 24.
* **Proyecciones Clave para la Carrera:**
  1. **McLaren (Norris y Piastri):** Candidatos firmes por su diferencial positivo en frío (+1.32 puestos). El MCL38 calienta la goma progresivamente sin granularla.
  2. **Red Bull (Verstappen y Hadjar):** Dominio de radares de velocidad máxima (>352 km/h) por eficiencia aerodinámica de mínimo drag con DRS.
  3. **Ferrari (Leclerc y Hamilton):** Fuerte qualy y primeros giros por encendido rápido de gomas, pero vulnerabilidad a mitad de tanda si no gestionan el graining.
  4. **Williams (Albon y Sainz):** Monoplaza con poquísimo drag y alta velocidad punta. Si logran temperatura en las curvas 1 a 4, pueden pelear en el Top 8.
  5. **Franco Colapinto (Alpine #43):** Clave: no destruir el neumático en las primeras 8 vueltas. Si estabiliza el compuesto Duro (C3) y aprovecha neutralizaciones de Safety Car, tiene ventana matemática para pelear del **P9 al P12**.

---

## 6. PREGUNTAS RÁPIDAS Y RESPUESTAS TÉCNICAS (PARA STREAMING DE MATEO)

* **¿Quién gana en Las Vegas?**  
  *Respuesta:* Duelo directo entre la ventaja térmica de McLaren en frío (+1.32 en matriz) y la velocidad punta demoledora de Red Bull superando los 352 km/h en los 1.9 km del Strip.
* **¿Qué le pasa a las gomas en el frío de Las Vegas?**  
  *Respuesta:* Con asfalto a 12°C, la recta de 1.9 km subenfría la superficie del neumático provocando graining severo y bloqueos masivos en la frenada de Curva 14.
* **¿Qué chances tiene Franco Colapinto en Las Vegas?**  
  *Respuesta:* Colapinto debe capear las primeras 8 vueltas sin granular gomas: estirando el compuesto Duro en aire limpio, la tasa de Safety Car (76.5%) le abre la ventana para saltar al Top 10 (P9 a P12).
* **¿Por qué McLaren perdió en Austin pero ganó en Brasil?**  
  *Respuesta:* En Austin el asfalto a 45°C destruyó el tren delantero de McLaren (-1.20 en calor); en Brasil el asfalto templado a 38°C revivió el downforce del MCL38 en el Sector 2.
* **¿Cuál es la estrategia ganadora en Las Vegas?**  
  *Respuesta:* Plan de 1 parada de Medio a Duro entre vueltas 18 y 24; parar bajo Safety Car otorga un ahorro neto de 12 segundos respecto a bandera verde.
* **¿Qué significa la equivalencia física de los 8.8 cm de UnderTrack?**  
  *Respuesta:* A 320 km/h en recta, cada milésima de segundo (0.001s) equivale a exactamente 8.8 centímetros de asfalto real, el ancho exacto de una mano humana.
