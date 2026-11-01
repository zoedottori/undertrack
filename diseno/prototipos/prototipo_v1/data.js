/**
 * UNDERTRACK — Datasets Maestros & Configuración de Rondas F1 2026
 * Compatible tanto con carga de script clásico (file://) como con ES Modules.
 */

const UNDERTRACK_DATA = {
  rounds: [
    { id: "americas", round: 19, name: "GP de Estados Unidos", circuit: "Circuit of the Americas", city: "Austin, Texas", status: "COMPLETADA", date: "15 Oct 2026" },
    { id: "rodriguez", round: 20, name: "GP de México", circuit: "Autódromo Hermanos Rodríguez", city: "Ciudad de México", status: "ACTIVA / PRÓXIMA", date: "29 Oct 2026", targetDate: "2026-10-29T14:00:00-06:00" },
    { id: "interlagos", round: 21, name: "GP de São Paulo", circuit: "Autódromo José Carlos Pace", city: "São Paulo, Brasil", status: "SIGUIENTE", date: "05 Nov 2026" },
    { id: "vegas", round: 22, name: "GP de Las Vegas", circuit: "Las Vegas Strip Circuit", city: "Las Vegas, USA", status: "PRÓXIMA", date: "19 Nov 2026" },
    { id: "losail", round: 23, name: "GP de Qatar", circuit: "Losail International Circuit", city: "Lusail, Qatar", status: "PRÓXIMA", date: "26 Nov 2026" },
    { id: "yas_marina", round: 24, name: "GP de Abu Dhabi", circuit: "Yas Marina Circuit", city: "Yas Island, UAE", status: "GRAN FINAL", date: "03 Dic 2026" }
  ],

  // ══════════════════════════════════════════════════════════════════════════════
  // RONDA 20: GP DE MÉXICO (ACTIVA)
  // ══════════════════════════════════════════════════════════════════════════════
  rodriguez: {
    roundNumber: "ROUND 20 // 24",
    circuitName: "Autódromo Hermanos Rodríguez",
    cityCountry: "Ciudad de México, México",
    altitude: "2,285 msnm (Aire Enrarecido)",
    targetDate: new Date(Date.now() + (3 * 24 * 3600 + 4 * 3600 + 18 * 60) * 1000).toISOString(),
    
    // Editorial Hook
    editorialHandwritten: "En la delgadez del aire mexicano, la carga aerodinámica es un espejismo y la temperatura de frenos es una trampa mortal.",
    editorialBajada: "A 2.285 metros de altitud, la densidad atmosférica cae un 22%. Los alerones van configurados al máximo como en Mónaco, pero el coche genera la carga de Monza a 350 km/h. La refrigeración es el verdadero enemigo invisible.",
    
    // KPIs Clave
    kpis: {
      longitud: "4.304 km",
      vueltas: "71 Vueltas",
      distanciaTotal: "305.35 km",
      rectaPrincipal: "1,200 m (hasta T1)",
      particularidad: "-22% Densidad de Aire",
      probabilidadSC: "68% Histórico SC/VSC"
    },

    // Under The Surface
    kmeansFamily: {
      id: 3,
      nombre: "Familia 3 — Laberintos Urbanos / Baja Densidad & Rectas Terminales",
      descripcion: "Pistas con compromiso térmico asimétrico: frenadas terminales ultra-exigentes combinadas con sectores trabados de nula refrigeración."
    },

    trackTelemetry: {
      vMax: "354.2 km/h",
      fullThrottle: "50%",
      brakingTime: "17.4%",
      abrasionLevel: 2, // 1-5
      brakingSeverity: 4, // 1-5
      lateralStress: 2, // 1-5
      gripLevel: 3,
      pirelli: {
        hard: "C3 (Blanco)",
        medium: "C4 (Amarillo)",
        soft: "C5 (Rojo)"
      },
      alertaTecnica: "El turbo debe girar un 12% más rápido para entregar la misma potencia barométrica. Los conductos de freno van abiertos al límite, lo que destruye la eficiencia del flujo aerodinámico hacia el difusor."
    },

    puntosCriticos: [
      { id: "T1", nombre: "Curva 1 — Frenada Terminal", kmh: "354 a 89 km/h", desc: "La desaceleración más salvaje del año: 5.2G tras 1.2 km de succión en rebufo.", x: 220, y: 150 },
      { id: "T7", nombre: "Curvas 7-11 — Complejo de las Eses", kmh: "235 km/h", desc: "Cambios de apoyo rápidos donde el coche sin carga desliza y destruye la goma delantera.", x: 480, y: 220 },
      { id: "T13", nombre: "Curva 13 — Estadio Foro Sol", kmh: "72 km/h", desc: "Cero refrigeración de aire en el estadio. Frenos y gomas alcanzan pico térmico crítico.", x: 740, y: 310 }
    ],

    // The Signal: Circuitos Gemelos
    gemelo: {
      nombre: "Circuit Paul Ricard",
      pais: "Francia",
      correlacionR: 0.808,
      matchPct: "80.8%",
      caracteristicaActual: "Alerones High-Downforce pero carga real baja por altitud",
      caracteristicaGemelo: "Rectas interminables (Mistral) y frenadas de apoyo largo",
      metricasComparadas: [
        { metrica: "Velocidad Punta Máxima", actual: "354 km/h", gemelo: "348 km/h", diff: "+6 km/h" },
        { metrica: "% Tiempo en Frenada", actual: "17.4%", gemelo: "16.8%", diff: "+0.6%" },
        { metrica: "Consumo de Combustible", actual: "1.68 kg/vta", gemelo: "1.74 kg/vta", diff: "-0.06 kg" },
        { metrica: "Estrés Térmico Frenos", actual: "Crítico (5/5)", gemelo: "Medio (3/5)", diff: "Extremo" }
      ],
      conclusion: "Las escuderías con empaquetado de refrigeración eficiente (chasis con branquias amplias como Ferrari y Red Bull) trasladan de inmediato su ventaja frente a paquetes compactos que sufren asfixia."
    },

    // Under Pressure: Termodinámica & Clima
    presion: {
      tempAmbiente: "24°C",
      tempAsfalto: "44°C",
      estadoTermico: "Caliente (>40°C)",
      viento: "11 km/h NE",
      lluviaProb: "10%",
      puntoCriticoIncidentes: "Curva 1 (Vuelta 1) y salida de la Curva 4 tras coche de seguridad.",
      alertasConstructores: [
        { constructor: "McLaren", delta: -1.20, status: "ZONA CRÍTICA", nFrio: 209, nCaliente: 95, razon: "Sobrecalentamiento del tren delantero en calor; pérdida de -1.20 puestos en tandas largas." },
        { constructor: "Aston Martin", delta: -0.97, status: "ALERTA ALTA", nFrio: 135, nCaliente: 59, razon: "Dificultad de tracción al superar 40°C en pista." },
        { constructor: "Red Bull", delta: -0.68, status: "MODERADO", nFrio: 209, nCaliente: 92, razon: "Sólida tracción en curva lenta que mitiga la penalidad térmica." },
        { constructor: "Mercedes", delta: -0.21, status: "ESTABLE", nFrio: 220, nCaliente: 96, razon: "Equilibrio neutro, fuerte en frenadas en apoyo." },
        { constructor: "Ferrari", delta: +0.11, status: "VENTAJA NETA", nFrio: 208, nCaliente: 92, razon: "Resiliencia térmica superior (+0.11 puestos en calor). Excelente tracción mecánica." }
      ],
      explicabilidadIA: {
        titulo: "Razonamiento del Modelo de Calor: McLaren en México",
        muestra: "Se cruzaron 209 carreras en frío vs 95 con asfalto >40°C en la base maestra.",
        mecanica: "En las enlazadas del S2, la baja densidad del aire reduce el flujo refrigerante en un 22%. El tren delantero del McLaren sufre un 18% más de micro-deslizamiento térmico, disparando la degradación del neumático C4/C5.",
        conclusion: "A partir de la vuelta 14 de cada stint, proyectan ceder entre 0.25 y 0.35s por vuelta frente a Ferrari."
      },
      estrategia: {
        planA: {
          nombre: "Plan A — 1 Parada (Óptima)",
          compuestos: "Medio (C4) → Duro (C3)",
          paradaVuelta: "Vuelta 22 – 26",
          ventaja: "Minimiza la pérdida de 24.2s en la calle de boxes más larga del calendario."
        },
        planB: {
          nombre: "Plan B — 2 Paradas (Agresiva)",
          compuestos: "Blando (C5) → Duro (C3) → Medio (C4)",
          paradaVuelta: "V14 y V46",
          ventaja: "Permite atacar con aire limpio si hay degradación térmica prematura o Safety Car temprano."
        }
      }
    },

    // The Crossover: Perfiles de Piloto
    crossover: {
      familia: "Laberintos Urbanos / Pistas de Baja Densidad",
      insight: "En pistas donde el aire no frena el coche y las paredes/límites perdonan poco, los perfiles agresivos y cazadores de oportunidades superan la regularidad pura.",
      perfiles: [
        { perfil: "Piloto de Lluvia / Caos", gananciaPromedio: "+2.07 puestos", color: "#FF5813", pilotos: ["Oliver Bearman", "Lance Stroll"] },
        { perfil: "Oportunista de Caos", gananciaPromedio: "+1.64 puestos", color: "#966237", pilotos: ["Guanyu Zhou"] },
        { perfil: "Élite Agresivo", gananciaPromedio: "+1.60 puestos", color: "#045259", pilotos: ["Andrea Kimi Antonelli", "George Russell", "Fernando Alonso", "Sergio Pérez", "Alexander Albon"] },
        { perfil: "Élite Metronómico", gananciaPromedio: "+0.70 puestos", color: "#99B8B8", pilotos: ["Max Verstappen", "Charles Leclerc", "Lewis Hamilton", "Oscar Piastri", "Lando Norris", "Carlos Sainz"] },
        { perfil: "Gestor de Midfield", gananciaPromedio: "-0.12 puestos", color: "#666666", pilotos: ["Franco Colapinto", "Nico Hülkenberg", "Liam Lawson", "Yuki Tsunoda", "Gabriel Bortoleto", "Isack Hadjar"] }
      ]
    },

    // Mateo AI Scripts
    mateoAI: {
      streaming: "«Bienvenidos a la previa técnica de UNDERTRACK para el Gran Premio de México. Mucha atención hoy con la temperatura del asfalto: estamos en 44 grados y a más de dos mil doscientos metros de altura. La física del modelo nos da una alerta roja para McLaren: en asfalto caliente su coche pierde históricamente 1.2 puestos respecto al frío, porque el aire enrarecido no refrigera los frenos ni el tren delantero. Si Ferrari y Red Bull logran contener a Norris y Piastri en las primeras doce vueltas, la carrera se define por gestión térmica en el Foro Sol. Ojo con la Curva 1: sesenta y ocho por ciento de chances de Safety Car en la largada tras el embudo de mil doscientos metros.»",
      reel: "🔥 ALERTA F1 MÉXICO: ¿Por qué McLaren puede perder la carrera hoy? \n\nA 2.285 metros de altura el aire es 22% más delgado. Los autos van con alerones de Mónaco pero vuelan a 350 km/h como en Monza. \n\nEl modelo de IA de UNDERTRACK analizó más de 300 carreras: cuando el asfalto supera los 40°C, McLaren cae 1.2 puestos en tandas largas por sobrecalentamiento del tren delantero. \n\n¿Los favoritos según la física de pista? Ferrari y Red Bull. ¡Guardá este video antes de la largada!",
      fantasy: "🎯 CONSEJO FANTASY & APUESTA // UNDERTRACK:\n• Evitar doble alineación de McLaren en tandas largas si la pista supera 42°C.\n• Valor oculto: Ferrari (Leclerc/Hamilton) con +0.11 diferencial positivo en calor y superior tracción en tramos trabados.\n• Piloto de Midfield con mayor potencial de sobrepaso: Sergio Pérez / Albon (Élite Agresivo: +1.60 puestos en esta familia de pistas)."
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // RONDA 19: GP DE ESTADOS UNIDOS — AUSTIN (HISTÓRICA / AUDITADA)
  // ══════════════════════════════════════════════════════════════════════════════
  americas: {
    roundNumber: "ROUND 19 // 24",
    circuitName: "Circuit of the Americas (COTA)",
    cityCountry: "Austin, Texas, USA",
    altitude: "155 msnm (Bumps & Carga Lateral)",
    targetDate: "2026-10-15T14:00:00-05:00",

    editorialHandwritten: "El asfalto texano a 45 grados convirtió las eses de COTA en una centrifugadora térmica implacable.",
    editorialBajada: "La pista de Austin castigó el tren delantero en el S1 y la tracción en el S3. McLaren sufrió su mayor colapso térmico mientras Antonelli rompió todos los esquemas coronándose con Mercedes.",

    kpis: {
      longitud: "5.513 km",
      vueltas: "56 Vueltas",
      distanciaTotal: "308.40 km",
      rectaPrincipal: "1,016 m (Recta Trasera)",
      particularidad: "Ondulaciones (Bumps) severos en S1",
      probabilidadSC: "60% SC/VSC"
    },

    kmeansFamily: {
      id: 2,
      nombre: "Familia 2 — Mixtos y Técnicos",
      descripcion: "Circuitos completos con frenadas ciegas en subida, eses rápidas de alta energía y zonas lentas de tracción."
    },

    trackTelemetry: {
      vMax: "338.5 km/h",
      fullThrottle: "58%",
      brakingTime: "16.1%",
      abrasionLevel: 4,
      brakingSeverity: 4,
      lateralStress: 4,
      gripLevel: 3,
      pirelli: { hard: "C2 (Blanco)", medium: "C3 (Amarillo)", soft: "C4 (Rojo)" },
      alertaTecnica: "Bumps pronunciados exigieron subir la altura de marcha, comprometiendo la carga del efecto suelo en Williams y Aston Martin."
    },

    puntosCriticos: [
      { id: "T1", nombre: "Curva 1 — Horquilla Ciega en Subida", kmh: "315 a 78 km/h", desc: "Frenada vertical con compresión que bloquea el neumático delantero interior.", x: 210, y: 140 },
      { id: "T3-6", nombre: "Sector 1 — Eses de Silverstone-spec", kmh: "260 km/h", desc: "El mayor estrés térmico de la vuelta: +18% de micro-deslizamiento en calor.", x: 440, y: 260 },
      { id: "T12", nombre: "Curva 12 — Fin de Recta Trasera", kmh: "338 a 82 km/h", desc: "Zona principal de sobrepaso con frenada extrema a 5.4G.", x: 710, y: 190 }
    ],

    gemelo: {
      nombre: "Circuit Paul Ricard & Silverstone",
      pais: "Francia / UK",
      correlacionR: 0.811,
      matchPct: "81.1%",
      caracteristicaActual: "Compromiso de carga mixta y curvas de apoyo extendido",
      caracteristicaGemelo: "Curvas de alta energía lateral y degradación térmica frontal",
      metricasComparadas: [
        { metrica: "Velocidad Punta", actual: "338 km/h", gemelo: "342 km/h", diff: "-4 km/h" },
        { metrica: "% Tiempo en Frenada", actual: "16.1%", gemelo: "15.8%", diff: "+0.3%" },
        { metrica: "Consumo de Combustible", actual: "1.79 kg/vta", gemelo: "1.82 kg/vta", diff: "-0.03 kg" },
        { metrica: "Abrasión Asfáltica", actual: "4 / 5", gemelo: "3.8 / 5", diff: "Muy Alta" }
      ],
      conclusion: "El modelo predijo con precisión que McLaren repetiría el bajón de Paul Ricard y Silverstone al superar 40°C en pista."
    },

    presion: {
      tempAmbiente: "29°C",
      tempAsfalto: "45°C",
      estadoTermico: "Pista Caliente (>40°C)",
      viento: "18 km/h Sur",
      lluviaProb: "0%",
      puntoCriticoIncidentes: "Curva 1 en largada y baches de Curva 19.",
      alertasConstructores: [
        { constructor: "McLaren", delta: -1.20, status: "DESPLOME CONFIRMADO", nFrio: 209, nCaliente: 95, razon: "Norris P5 (+30.5s) y Piastri P7 (+52.6s) desconectados de la victoria." },
        { constructor: "Ferrari", delta: +0.11, status: "SUPERIORIDAD CONFIRMADA", nFrio: 208, nCaliente: 92, razon: "Leclerc P2 (+13s) y Hamilton P4 aplastaron el ritmo papaya." },
        { constructor: "Red Bull", delta: -0.68, status: "PODIO RESISTIDO", nFrio: 209, nCaliente: 92, razon: "Verstappen P3 resistiendo con tracción óptima." }
      ],
      explicabilidadIA: {
        titulo: "Razonamiento Validado: Colapso Térmico McLaren",
        muestra: "Cruce de 209 vs 95 carreras.",
        mecanica: "La goma delantera izquierda se sobrecalentó a más de 125°C en las eses de Austin.",
        conclusion: "Acierto total: McLaren perdió medio minuto frente a la punta en solo 40 vueltas."
      },
      estrategia: {
        planA: { nombre: "Plan A — 2 Paradas (Ganador)", compuestos: "Medio → Duro → Duro", paradaVuelta: "V18 y V38", ventaja: "Evitó la caída de ritmo de 1.8s por vuelta en las últimas 12 vueltas." },
        planB: { nombre: "Plan B — 1 Parada (Riesgosa)", compuestos: "Medio → Duro", paradaVuelta: "V24", ventaja: "Insostenible por degradación térmica en asfalto a 45°C." }
      }
    },

    crossover: {
      familia: "Familia 2 — Mixtos y Técnicos",
      insight: "Los pilotos metronómicos dominaron el podio y top 5: la consistencia milimétrica no perdona errores en curvas enlazadas.",
      perfiles: [
        { perfil: "Élite Metronómico", gananciaPromedio: "+1.28 puestos", color: "#99B8B8", pilotos: ["Leclerc (P2)", "Verstappen (P3)", "Hamilton (P4)", "Norris (P5)"] },
        { perfil: "Gestores de Midfield", gananciaPromedio: "+1.15 puestos", color: "#666666", pilotos: ["Lawson (P9)", "Gasly (P10)", "Colapinto (DNF)"] },
        { perfil: "Élite Agresivo", gananciaPromedio: "+1.04 puestos", color: "#045259", pilotos: ["Antonelli (P1 🥇)", "Russell (P8)", "Alonso (P16)"] }
      ]
    },

    mateoAI: {
      streaming: "«Lo que vimos en Austin valida punto por punto la tesis térmica de UNDERTRACK: McLaren se desmoronó en calor como lo anunciaban los datos (-1.2 puestos), mientras Antonelli dio el golpe del año para Mercedes con una victoria histórica.»",
      reel: "🏁 ACIERTO UNDERTRACK: Dijimos que McLaren se caía en calor... ¡y quedaron a medio minuto! Victoria descomunal de Kimi Antonelli en Austin.",
      fantasy: "Resultado oficial: Antonelli P1, Leclerc P2, Verstappen P3, Hamilton P4, Norris P5. Acierto de modelo en 85% de las predicciones térmicas."
    }
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // AUDITORÍA DE PRONÓSTICO VS REALIDAD (COTA AUSTIN)
  // ══════════════════════════════════════════════════════════════════════════════
  auditAustin: [
    {
      dimension: "Alerta Térmica McLaren",
      pronostico: "Caída drástica en calor (>40°C) por tren delantero. Fuera de la pelea por victoria.",
      realidad: "Norris terminó 5° (+30.5s) y Piastri 7° (+52.6s).",
      veredicto: "ACIERTO TOTAL",
      statusClass: "acierto",
      analisis: "La física del asfalto abrasivo a 45°C confirmó la penalidad histórica de -1.20 puestos en calor."
    },
    {
      dimension: "Poderío Ferrari en Calor",
      pronostico: "Resistencia térmica superior (+0.11). Superarían cómodamente a McLaren.",
      realidad: "Leclerc 2° (+13s) y Hamilton 4° (+18.5s). Ambos delante de McLaren.",
      veredicto: "ACIERTO TOTAL",
      statusClass: "acierto",
      analisis: "El chasis de Ferrari gestionó la temperatura sin degradar de golpe los neumáticos."
    },
    {
      dimension: "Podio de Verstappen",
      pronostico: "Ritmo metronómico y tracción tras horquillas para pelear podio.",
      realidad: "Verstappen terminó 3° (+17.4s), conteniendo los ataques de Hamilton.",
      veredicto: "ACIERTO TOTAL",
      statusClass: "acierto",
      analisis: "Max maximizó la velocidad en la recta trasera y el sector trabado."
    },
    {
      dimension: "El Ganador de la Carrera",
      pronostico: "Duelo centrado entre Ferrari y Red Bull.",
      realidad: "Victoria de Andrea Kimi Antonelli (Mercedes) por +13s sobre Leclerc.",
      veredicto: "DESVÍO",
      statusClass: "desvio",
      analisis: "El modelo no anticipó el ritmo demoledor del joven italiano de Mercedes frente a Russell (P8)."
    },
    {
      dimension: "Élite Metronómico en Top 5",
      pronostico: "Coparían la vanguardia por consistencia (+1.28 puestos).",
      realidad: "P2 Leclerc, P3 Verstappen, P4 Hamilton, P5 Norris. Monopolio del 2° al 5°.",
      veredicto: "ACIERTO TOTAL",
      statusClass: "acierto",
      analisis: "En trazados técnicos, la consistencia vuelta a vuelta no perdona deslices."
    },
    {
      dimension: "Comportamiento Williams",
      pronostico: "Compromiso grave en asfalto con baches (bumps) y alta carga.",
      realidad: "Albon 17° y Sainz 18° a 1 vuelta del puntero.",
      veredicto: "ACIERTO TOTAL",
      statusClass: "acierto",
      analisis: "El suelo del Williams no toleró las ondulaciones y perdieron carga aerodinámica."
    }
  ],

  // ══════════════════════════════════════════════════════════════════════════════
  // GRILLA COMPLETA 2026: 11 ESCUDERÍAS & 22 PILOTOS
  // ══════════════════════════════════════════════════════════════════════════════
  pilots: [
    {
      id: "colapinto",
      name: "Franco Colapinto",
      dorsal: 43,
      team: "Alpine F1 Team",
      teamColor: "#0093cc",
      profile: "Gestor de Midfield",
      posMediana: 15.0,
      puestosGanados: "+1.26 por carrera",
      radar: { ritmo: 74, frenada: 82, gomas: 88, caos: 79, largada: 85 },
      quote: "Especialista en alargar stints con aire limpio y pescar sobrepasos en frenada terminal.",
      efemeride: "En su primera temporada completa en 2026, Colapinto registra un +1.26 en puestos ganados en circuitos urbanos y técnicos, destacando por su precisión en el cuidado del compuesto medio."
    },
    {
      id: "leclerc",
      name: "Charles Leclerc",
      dorsal: 16,
      team: "Ferrari",
      teamColor: "#ef1a2d",
      profile: "Élite Metronómico",
      posMediana: 4.0,
      puestosGanados: "+0.78 por carrera",
      radar: { ritmo: 96, frenada: 94, gomas: 86, caos: 80, largada: 91 },
      quote: "Tracción quirúrgica y resistencia térmica en chasis SF-26.",
      efemeride: "Leclerc ostenta una consistencia de ritmo con desviación inferior a 1.27s en tandas largas, siendo el más rápido en salida de curvas de baja velocidad en México."
    },
    {
      id: "hamilton",
      name: "Lewis Hamilton",
      dorsal: 44,
      team: "Ferrari",
      teamColor: "#ef1a2d",
      profile: "Élite Metronómico",
      posMediana: 3.0,
      puestosGanados: "+1.25 por carrera",
      radar: { ritmo: 95, frenada: 96, gomas: 94, caos: 88, largada: 90 },
      quote: "Maestro en gestión de degradación térmica de neumáticos traseros.",
      efemeride: "En su año con Ferrari, Hamilton mantiene un 96.8% de carreras terminadas en los puntos en pistas de alta altitud y calor."
    },
    {
      id: "max_verstappen",
      name: "Max Verstappen",
      dorsal: 1,
      team: "Red Bull",
      teamColor: "#1e41ff",
      profile: "Élite Metronómico",
      posMediana: 2.0,
      puestosGanados: "+1.45 por carrera",
      radar: { ritmo: 99, frenada: 98, gomas: 92, caos: 85, largada: 95 },
      quote: "Poderío absoluto en recta trasera y estabilidad al límite en frenada de Curva 1.",
      efemeride: "Verstappen es el piloto con mayor porcentaje de vueltas lideradas en el Autódromo Hermanos Rodríguez en la era híbrida moderna."
    },
    {
      id: "norris",
      name: "Lando Norris",
      dorsal: 4,
      team: "McLaren",
      teamColor: "#FF5813",
      profile: "Élite Metronómico",
      posMediana: 6.0,
      puestosGanados: "+0.40 por carrera",
      radar: { ritmo: 93, frenada: 89, gomas: 76, caos: 82, largada: 88 },
      quote: "Velocidad pura a 1 vuelta, castigado en asfalto >40°C por sobrecalentamiento del tren delantero.",
      efemeride: "Sufre el diferencial de -1.20 puestos en condiciones de calor extremo, requiriendo aire limpio para evitar degradación prematura."
    },
    {
      id: "piastri",
      name: "Oscar Piastri",
      dorsal: 81,
      team: "McLaren",
      teamColor: "#FF5813",
      profile: "Élite Metronómico",
      posMediana: 4.0,
      puestosGanados: "+0.29 por carrera",
      radar: { ritmo: 92, frenada: 90, gomas: 78, caos: 84, largada: 89 },
      quote: "Gran temple mental, similar compromiso térmico que su compañero de equipo.",
      efemeride: "Piastri registra una de las trayectorias más limpias en las eses del Sector 2, pero sufre la falta de apoyo con aire enrarecido."
    },
    {
      id: "antonelli",
      name: "Andrea Kimi Antonelli",
      dorsal: 12,
      team: "Mercedes",
      teamColor: "#00d2be",
      profile: "Élite Agresivo",
      posMediana: 6.0,
      puestosGanados: "+1.37 por carrera",
      radar: { ritmo: 94, frenada: 91, gomas: 85, caos: 87, largada: 92 },
      quote: "El ganador de Austin: explosividad y adaptación inmediata al estrés de pista.",
      efemeride: "Logró su primera victoria en F1 en el GP de Austin 2026 superando a Leclerc por más de 13 segundos con una brillante gestión de gomas."
    },
    {
      id: "russell",
      name: "George Russell",
      dorsal: 63,
      team: "Mercedes",
      teamColor: "#00d2be",
      profile: "Élite Agresivo",
      posMediana: 6.0,
      puestosGanados: "+1.04 por carrera",
      radar: { ritmo: 92, frenada: 92, gomas: 80, caos: 85, largada: 90 },
      quote: "Agresivo en la largada y especialista en clasificatorias.",
      efemeride: "Russell promedia +1.60 puestos ganados en pistas urbanas y mixtas cuando clasifica en el Top 8."
    },
    {
      id: "perez",
      name: "Sergio Pérez",
      dorsal: 11,
      team: "Cadillac F1",
      teamColor: "#d4af37",
      profile: "Élite Agresivo",
      posMediana: 6.0,
      puestosGanados: "+2.39 por carrera",
      radar: { ritmo: 85, frenada: 88, gomas: 93, caos: 90, largada: 86 },
      quote: "Héroe local en México: rey de la remontada con neumáticos duros estirados.",
      efemeride: "Pérez lidera históricamente la métrica de puestos ganados desde grilla con +2.39 puestos de promedio en su carrera."
    },
    {
      id: "alonso",
      name: "Fernando Alonso",
      dorsal: 14,
      team: "Aston Martin",
      teamColor: "#229971",
      profile: "Élite Agresivo",
      posMediana: 8.0,
      puestosGanados: "+0.97 por carrera",
      radar: { ritmo: 89, frenada: 93, gomas: 89, caos: 94, largada: 93 },
      quote: "Lectura estratégica veterana y oportunismo letal en relanzadas de Safety Car.",
      efemeride: "Alonso registra la reacción de largada más consistente de la grilla en la recta de 1.2 km de CDMX."
    },
    {
      id: "hulkenberg",
      name: "Nico Hülkenberg",
      dorsal: 27,
      team: "Audi F1 Team",
      teamColor: "#e2001a",
      profile: "Gestor de Midfield",
      posMediana: 11.0,
      puestosGanados: "+1.07 por carrera",
      radar: { ritmo: 84, frenada: 87, gomas: 83, caos: 91, largada: 84 },
      quote: "La punta de lanza del debut de Audi: ritmo de clasificación implacable.",
      efemeride: "Hülkenberg gana un promedio de +2.38 posiciones en carreras con intervenciones de Safety Car."
    },
    {
      id: "bearman",
      name: "Oliver Bearman",
      dorsal: 87,
      team: "Haas F1 Team",
      teamColor: "#b6babd",
      profile: "Piloto de Lluvia / Caos",
      posMediana: 11.0,
      puestosGanados: "+3.33 por carrera",
      radar: { ritmo: 81, frenada: 85, gomas: 84, caos: 95, largada: 87 },
      quote: "Máxima ganancia neta en situaciones caóticas y asfalto cambiante.",
      efemeride: "Bearman tiene el promedio de puestos ganados más alto de la parrilla (+3.33) gracias a su agresividad en condiciones de pista verde."
    }
  ]
};

// Exponer en window para soporte universal file:// y script clásico
if (typeof window !== 'undefined') {
  window.UNDERTRACK_DATA = UNDERTRACK_DATA;
}

// Compatibilidad con módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UNDERTRACK_DATA };
}
