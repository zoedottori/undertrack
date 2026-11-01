// ========================================================
// UNDERTRACK — DATA & TELEMETRÍA (F1 INTELLIGENCE)
// ========================================================

    const raceData = {
      brasil: {
        round: 'RONDA 21',
        name: 'Autódromo de Interlagos, São Paulo',
        dateBadge: 'DOMINGO, 8 NOVIEMBRE, 14:00hs',
        initialSeconds: 8 * 86400 + 1 * 3600 + 59 * 60 + 30 // 08:01:59:30
      },
      lasvegas: {
        round: 'RONDA 22',
        name: 'Las Vegas Strip Circuit',
        dateBadge: 'DOMINGO, 22 NOVIEMBRE, 01:00hs',
        initialSeconds: 22 * 86400 + 13 * 3600 + 0 * 60 + 0
      },
      qatar: {
        round: 'RONDA 23',
        name: 'Lusail International Circuit, Doha',
        dateBadge: 'DOMINGO, 29 NOVIEMBRE, 13:00hs',
        initialSeconds: 29 * 86400 + 1 * 3600 + 0 * 60 + 0
      }
    };

    // ========================================================
    // 5. MÓDULO DE PILOTOS (UNDER THE HELMET // PANTALLA 4)
    // ========================================================
    const pilotsData = {
      norris: {
        name: "LANDO NORRIS",
        team: "McLaren F1 Team · Temporada 2026",
        number: "#4",
        cluster: "ÉLITE AGRESIVO",
        clusterBg: "bg-neonOrange text-white shadow-neonOrange/35",
        carImg: "assets/escuderias/mclaren.png",
        hudBg: "bg-[#25150e]/90 backdrop-blur-xl border border-neonOrange/60",
        accentColor: "#F2561D",
        borderColor: "rgba(242, 86, 29, 0.55)",
        boxShadow: "0 0 50px rgba(242, 86, 29, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-neonOrange/15 border-neonOrange/30",
        predDot: "#F2561D",
        quote: "Aprovechan el caos y el sobrepaso (62% en puntos). Explotan los huecos en frenada y asumen riesgos calculados, maximizando la ganancia de posiciones en relanzamientos.",
        kpiConsistencia: "1.32",
        kpiPuestos: "+1.60",
        kpiPuntos: "62",
        kpiGestion: "0.538",
        prediction: "♥ MATCH // Favorable en frenadas agresivas de Curva 1 y sobrepasos en 'S' de Senna si el asfalto no supera los 40°C.",
        predictionBadge: "♥ MATCH // PREVIA 2026:"
      },
      verstappen: {
        name: "MAX VERSTAPPEN",
        team: "Red Bull Racing · Temporada 2026",
        number: "#1",
        cluster: "ÉLITE METRONÓMICO",
        clusterBg: "bg-blue-600 text-white shadow-blue-600/40",
        carImg: "assets/escuderias/redbull.png",
        hudBg: "bg-[#0d162a]/90 backdrop-blur-xl border border-blue-500/60",
        accentColor: "#3B82F6",
        borderColor: "rgba(59, 130, 246, 0.6)",
        boxShadow: "0 0 50px rgba(37, 99, 235, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-blue-600/15 border-blue-500/30",
        predDot: "#3B82F6",
        quote: "Consistencia extrema (1.30s), 91% de carreras en los puntos y paradas mínimas. Precisión quirúrgica vuelta tras vuelta que domina la tracción en subida de Junção.",
        kpiConsistencia: "1.29",
        kpiPuestos: "+1.28",
        kpiPuntos: "91",
        kpiGestion: "0.530",
        prediction: "♥ MATCH // Máxima eficiencia en Mixtos y Técnicos. Tracción imbatible en la subida de Junção hacia la recta principal.",
        predictionBadge: "♥ MATCH // PREVIA 2026:"
      },
      leclerc: {
        name: "CHARLES LECLERC",
        team: "Scuderia Ferrari · SF-26",
        number: "#16",
        cluster: "ÉLITE METRONÓMICO",
        clusterBg: "bg-red-600 text-white shadow-red-600/40",
        carImg: "assets/escuderias/ferrari.png",
        hudBg: "bg-[#2b0d0f]/90 backdrop-blur-xl border border-red-500/60",
        accentColor: "#EF4444",
        borderColor: "rgba(239, 68, 68, 0.6)",
        boxShadow: "0 0 50px rgba(220, 38, 38, 0.45), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-red-600/15 border-red-500/30",
        predDot: "#EF4444",
        quote: "Precisión milimétrica en curvas lentas enlazadas y resistencia a la degradación térmica. Chasis Ferrari con ventaja neta (+0.11) si el asfalto sube de temperatura.",
        kpiConsistencia: "1.27",
        kpiPuestos: "+1.28",
        kpiPuntos: "91",
        kpiGestion: "0.534",
        prediction: "♥ MATCH // Favorable por balance mecánico en el Sector 2 y tolerancia del chasis SF-26 a pista caliente.",
        predictionBadge: "♥ MATCH // PREVIA 2026:"
      },
      colapinto: {
        name: "FRANCO COLAPINTO",
        team: "Alpine F1 Team · Temporada 2026",
        number: "#43",
        cluster: "GESTOR DE MIDFIELD",
        clusterBg: "bg-gradient-to-r from-sky-500 to-pink-500 text-white shadow-sky-500/35",
        carImg: "assets/escuderias/alpine.png",
        hudBg: "bg-[#0b1c2b]/90 backdrop-blur-xl border border-sky-400/60",
        accentColor: "#38BDF8",
        borderColor: "rgba(56, 189, 248, 0.6)",
        boxShadow: "0 0 50px rgba(14, 165, 233, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-sky-500/15 border-sky-400/30",
        predDot: "#38BDF8",
        quote: "Prolijos cuidando gomas (1.27s consistencia) y estirando stints. En pistas Mixtas y Técnicas escalan a +1.15 puestos ganados si conservan aire limpio en carrera.",
        kpiConsistencia: "1.19",
        kpiPuestos: "+1.15",
        kpiPuntos: "32",
        kpiGestion: "0.561",
        prediction: "♥ MATCH // En Interlagos la degradación del neumático trasero premia su ritmo en tandas con compuesto C3.",
        predictionBadge: "♥ MATCH // PREVIA 2026:"
      },
      russel: {
        name: "GEORGE RUSSELL",
        team: "Mercedes-AMG F1 Team · W17",
        number: "#63",
        cluster: "ÉLITE AGRESIVO",
        clusterBg: "bg-teal-500 text-black font-black shadow-teal-500/40",
        carImg: "assets/escuderias/mercedes.png",
        hudBg: "bg-[#091f1e]/90 backdrop-blur-xl border border-teal-400/60",
        accentColor: "#2DD4BF",
        borderColor: "rgba(45, 212, 191, 0.6)",
        boxShadow: "0 0 50px rgba(20, 184, 166, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-teal-500/15 border-teal-400/30",
        predDot: "#2DD4BF",
        quote: "Especialista en clasificaciones y relanzamientos con Safety Car (+0.32 delta caos). Explota los vértices rápidos apoyado en la carga aerodinámica.",
        kpiConsistencia: "1.34",
        kpiPuestos: "+1.04",
        kpiPuntos: "62",
        kpiGestion: "0.528",
        prediction: "⚠️ CONDICIONADO // Requiere aire limpio en las enlazadas del S2 para evitar recalentamiento prematuro.",
        predictionBadge: "⚠️ CONDICIONADO // PREVIA:"
      },
      sainz: {
        name: "CARLOS SAINZ",
        team: "Williams Racing · Temporada 2026",
        number: "#55",
        cluster: "ÉLITE METRONÓMICO",
        clusterBg: "bg-sky-600 text-white shadow-sky-600/40",
        carImg: "assets/escuderias/williams.png",
        hudBg: "bg-[#0d1a2c]/90 backdrop-blur-xl border border-sky-500/60",
        accentColor: "#00A0DE",
        borderColor: "rgba(0, 160, 222, 0.6)",
        boxShadow: "0 0 50px rgba(0, 160, 222, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-sky-600/15 border-sky-400/30",
        predDot: "#00A0DE",
        quote: "Lectura estratégica de carrera, alta consistencia (1.30s) y preservación de gomas. Optimiza paradas y maximiza puntos en trazados técnicos con desnivel.",
        kpiConsistencia: "1.30",
        kpiPuestos: "+1.28",
        kpiPuntos: "91",
        kpiGestion: "0.542",
        prediction: "♥ MATCH // Adaptado al desnivel y tracción mecánica de Interlagos para pescar puntos en el pelotón.",
        predictionBadge: "♥ MATCH // PREVIA 2026:"
      },
      bearman: {
        name: "OLIVER BEARMAN",
        team: "Haas F1 Team · Temporada 2026",
        number: "#87",
        cluster: "PILOTO DE LLUVIA",
        clusterBg: "bg-rose-600 text-white shadow-rose-600/40",
        carImg: "assets/escuderias/haas.png",
        hudBg: "bg-[#260f15]/90 backdrop-blur-xl border border-rose-500/60",
        accentColor: "#FB7185",
        borderColor: "rgba(251, 113, 133, 0.6)",
        boxShadow: "0 0 50px rgba(225, 29, 72, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-rose-600/15 border-rose-400/30",
        predDot: "#FB7185",
        quote: "En seco se ubica en mitad de grilla, pero en piso húmedo o con Safety Car da un salto descomunal (+1.60 puestos extra en mojado y +1.22 con banderas de caos).",
        kpiConsistencia: "1.53",
        kpiPuestos: "+2.70",
        kpiPuntos: "29",
        kpiGestion: "0.512",
        prediction: "🚨 ALERTA CAOS // Si llueve en San Pablo o interviene el Safety Car (44.6%), es el principal candidato a sorpresa.",
        predictionBadge: "🚨 FACTOR CLIMA // PREVIA:"
      },
      bottas: {
        name: "VALTTERI BOTTAS",
        team: "Kick Sauber F1 Team · Temporada 2026",
        number: "#77",
        cluster: "FONDISTA",
        clusterBg: "bg-[#52E252] text-black font-black shadow-emerald-500/40",
        carImg: "assets/escuderias/racingbull.png",
        hudBg: "bg-[#0d2312]/90 backdrop-blur-xl border border-emerald-400/60",
        accentColor: "#52E252",
        borderColor: "rgba(82, 226, 82, 0.6)",
        boxShadow: "0 0 50px rgba(82, 226, 82, 0.35), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-emerald-500/15 border-emerald-400/30",
        predDot: "#52E252",
        quote: "Acumula kilómetros y vueltas limpias en el fondo de grilla (7% en puntos, 2.1 paradas por carrera). Depende de neutralizaciones masivas para escalar.",
        kpiConsistencia: "1.48",
        kpiPuestos: "+1.54",
        kpiPuntos: "7",
        kpiGestion: "0.495",
        prediction: "⚠️ NEUTRAL // Ritmo de tanda larga condicionado por la tracción limitada del monoplaza en la subida.",
        predictionBadge: "⚠️ NEUTRAL // PREVIA:"
      },
      stroll: {
        name: "LANCE STROLL",
        team: "Aston Martin F1 Team · Temporada 2026",
        number: "#18",
        cluster: "PILOTO DE LLUVIA",
        clusterBg: "bg-emerald-700 text-white shadow-emerald-700/40",
        carImg: "assets/escuderias/astonmartin.png",
        hudBg: "bg-[#081f19]/90 backdrop-blur-xl border border-emerald-500/60",
        accentColor: "#34D399",
        borderColor: "rgba(52, 211, 153, 0.6)",
        boxShadow: "0 0 50px rgba(4, 120, 87, 0.4), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-emerald-700/15 border-emerald-500/30",
        predDot: "#34D399",
        quote: "Especialista en condiciones climáticas variables (+1.60 puestos en asfalto húmedo). En carreras secas sufre en consistencia de ritmo puro.",
        kpiConsistencia: "1.53",
        kpiPuestos: "+2.70",
        kpiPuntos: "29",
        kpiGestion: "0.518",
        prediction: "🌧️ FACTOR CLIMA // Monitorear el radar meteorológico: lluvia el domingo triplica sus probabilidades de puntos.",
        predictionBadge: "🌧️ FACTOR CLIMA // PREVIA:"
      },
      hulkenberg: {
        name: "NICO HÜLKENBERG",
        team: "Stake F1 Team / Audi · Temporada 2026",
        number: "#27",
        cluster: "GESTOR DE MIDFIELD",
        clusterBg: "bg-[#52E252] text-black font-black shadow-green-500/35",
        carImg: "assets/escuderias/audi.png",
        hudBg: "bg-[#0d2312]/90 backdrop-blur-xl border border-green-400/60",
        accentColor: "#4ADE80",
        borderColor: "rgba(74, 222, 128, 0.6)",
        boxShadow: "0 0 50px rgba(34, 197, 94, 0.35), 0 20px 45px rgba(0, 0, 0, 0.8)",
        predBg: "bg-green-500/15 border-green-400/30",
        predDot: "#4ADE80",
        quote: "Prolijo y regular en tandas medias (1.27s de consistencia). En circuitos técnicos cuida el neumático pero sufre pérdidas de tiempo en tren de DRS.",
        kpiConsistencia: "1.27",
        kpiPuestos: "+1.15",
        kpiPuntos: "32",
        kpiGestion: "0.550",
        prediction: "♥ MATCH // Sólido en frenadas en bajada de Curva 1 y gestión de desgaste lateral en curvas 8 y 9.",
        predictionBadge: "♥ MATCH // PREVIA 2026:"
      }
    };


    const fanDeckLayout = {
      bottas:      { rot: -22, translateY: 45, z: 10 },
      verstappen:  { rot: -17, translateY: 32, z: 12 },
      russel:      { rot: -12, translateY: 20, z: 14 },
      colapinto:   { rot: -6,  translateY: 8,  z: 16 },
      norris:      { rot: 0,   translateY: 0,  z: 20 },
      bearman:     { rot: 6,   translateY: 8,  z: 18 },
      leclerc:     { rot: 12,  translateY: -8, z: 30 },
      sainz:       { rot: 17,  translateY: 30, z: 16 },
      stroll:      { rot: 22,  translateY: 44, z: 14 },
      hulkenberg:  { rot: 26,  translateY: 60, z: 12 }
    };

// Exponer datos al ámbito global para la app
if (typeof window !== 'undefined') {
  window.raceData = raceData;
  window.pilotsData = pilotsData;
  window.fanDeckLayout = fanDeckLayout;
}
