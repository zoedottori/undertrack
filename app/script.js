// ========================================================
// UNDERTRACK — MOTOR DE INTERACCIÓN Y SCROLL (APP)
// ========================================================

    // 1. Estado Global e Inicializaciones
    let currentLang = 'ESP';
    let currentRace = 'brasil';
    let remainingSeconds = (typeof raceData !== 'undefined' && raceData.brasil) ? raceData.brasil.initialSeconds : 698370;
    let activePilotId = 'leclerc';

    // 2. Interruptor de Idioma (ESP / INGL)
    function toggleLang() {
      currentLang = currentLang === 'ESP' ? 'INGL' : 'ESP';
      const knob = document.getElementById('langKnob');
      const tEsp = document.getElementById('textEsp');
      const tIng = document.getElementById('textIng');
      
      if (currentLang === 'INGL') {
        knob.style.transform = 'translateX(44px)';
        tIng.className = 'relative z-10 w-1/2 text-center text-[10px] font-black text-white transition-colors duration-200';
        tEsp.className = 'relative z-10 w-1/2 text-center text-[10px] font-bold text-tealDeep/70 transition-colors duration-200';
      } else {
        knob.style.transform = 'translateX(0px)';
        tEsp.className = 'relative z-10 w-1/2 text-center text-[10px] font-black text-white transition-colors duration-200';
        tIng.className = 'relative z-10 w-1/2 text-center text-[10px] font-bold text-tealDeep/70 transition-colors duration-200';
      }
    }

    // 2. Carreras interactivas (Brasil, Las Vegas, Qatar)
    function switchRace(raceKey) {
      if (!raceData[raceKey]) return;
      currentRace = raceKey;
      remainingSeconds = raceData[raceKey].initialSeconds;

      // Actualizar textos del circuito
      const elRound = document.getElementById('circuitRound');
      const elName = document.getElementById('circuitName');
      const elBadge = document.getElementById('circuitDateBadge');
      const elSurfaceRound = document.getElementById('surfaceCircuitRound');
      const elSurfaceName = document.getElementById('surfaceCircuitName');

      if (elRound) elRound.textContent = raceData[raceKey].round;
      if (elName) elName.textContent = raceData[raceKey].name;
      if (elBadge) elBadge.textContent = raceData[raceKey].dateBadge;
      if (elSurfaceRound) elSurfaceRound.textContent = raceData[raceKey].round;
      if (elSurfaceName) elSurfaceName.textContent = raceData[raceKey].name;

      // Actualizar estilos activos de las pills
      const pills = ['brasil', 'lasvegas', 'qatar'];
      pills.forEach(p => {
        const el = document.getElementById('pill-' + p);
        if (!el) return;
        const dot = el.querySelector('span:first-child');
        if (p === raceKey) {
          el.className = 'race-pill flex items-center gap-1.5 px-4 py-1 rounded-full bg-neonOrange text-white text-[11px] font-bold tracking-wider uppercase shadow-md shadow-neonOrange/25 transition-all duration-300 cursor-pointer';
          if (dot) dot.className = 'w-1.5 h-1.5 rounded-full bg-white animate-pulse';
        } else {
          el.className = 'race-pill flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/5 border border-white/20 text-tealSage hover:text-white hover:border-tealSage/50 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer';
          if (dot) dot.className = 'w-1 h-1 rounded-full bg-transparent';
        }
      });

      updateTimerDisplay();

      // Recalcular posición del título animado con los nuevos textos
      if (typeof window.updateCircuitTitlePosition === 'function') {
        window.updateCircuitTitlePosition();
      }
    }

    function updateTimerDisplay() {
      const d = Math.floor(remainingSeconds / 86400);
      const h = Math.floor((remainingSeconds % 86400) / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;
      
      const elD = document.getElementById('tDays');
      const elH = document.getElementById('tHours');
      const elM = document.getElementById('tMins');
      const elS = document.getElementById('tSecs');

      if (elD) elD.textContent = String(d).padStart(2, '0');
      if (elH) elH.textContent = String(h).padStart(2, '0');
      if (elM) elM.textContent = String(m).padStart(2, '0');
      if (elS) elS.textContent = String(s).padStart(2, '0');
    }

    // Ticking en vivo cada segundo
    setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateTimerDisplay();
      }
    }, 1000);

    // ========================================================
    // 3. SECUENCIA DE SCROLL INTERACTIVA (PANTALLA 2 // LA PISTA)
    // ========================================================
    (function initSurfaceScrollSequence() {
      const container = document.getElementById('surface-scroll-container');
      const hookText = document.getElementById('surfaceHookText');
      const trackWrapper = document.getElementById('surfaceTrackWrapper');
      const hudLayer = document.getElementById('surfaceHudLayer');
      const node1 = document.getElementById('timelineNode1');
      const stem1 = document.getElementById('timelineStem1');
      const node2 = document.getElementById('timelineNode2');
      const stem2 = document.getElementById('timelineStem2');
      const node3 = document.getElementById('timelineNode3');
      const circuitDataRow = document.getElementById('circuitDataRow');
      const circuitPrimaryDock = document.getElementById('circuitPrimaryDock');
      const toggle = document.getElementById('toggleCircuitInfo');

      if (!container || !hookText || !trackWrapper || !hudLayer) return;

      let ticking = false;

      function updateSequence() {
        const rect = container.getBoundingClientRect();
        const windowH = window.innerHeight;
        const scrollableDist = container.offsetHeight - windowH;

        if (scrollableDist <= 0) return;

        const progress = Math.min(1, Math.max(0, -rect.top / scrollableDist));

        // Resting title position (top: 7rem / 112px, completely free of header)
        const restingTopPx = 112; 
        const centerTopPx = windowH * 0.5;

        // FASE 1: 0.00 -> 0.15: Fondo mapa + Título centrado grande
        if (progress <= 0.15) {
          hookText.style.top = '50%';
          hookText.style.transform = 'translate(-50%, -50%) scale(1)';
          hookText.style.opacity = '1';

          trackWrapper.style.opacity = '0';
          trackWrapper.style.transform = 'scale(0.96)';
          hudLayer.style.opacity = '0';
          hudLayer.style.pointerEvents = 'none';

          if (node1) { node1.style.opacity = '0'; node1.style.transform = 'translateY(12px)'; }
          if (stem1) { stem1.style.transform = 'scaleY(0)'; }
          if (node2) { node2.style.opacity = '0'; node2.style.transform = 'translateY(12px)'; }
          if (stem2) { stem2.style.transform = 'scaleY(0)'; }
          if (node3) { node3.style.opacity = '0'; node3.style.transform = 'translateY(12px)'; }
          if (circuitDataRow) { circuitDataRow.style.opacity = '0'; circuitDataRow.style.pointerEvents = 'none'; }
          if (circuitPrimaryDock) { circuitPrimaryDock.style.opacity = '0'; circuitPrimaryDock.style.pointerEvents = 'none'; }
        }
        // FASE 2: 0.15 -> 0.28: Título sube a la cabecera + Aparece el circuito 3D
        else if (progress <= 0.28) {
          const t = (progress - 0.15) / (0.28 - 0.15);
          const curY = centerTopPx - t * (centerTopPx - restingTopPx);
          const curScale = 1 - t * 0.22;
          
          hookText.style.top = `${curY}px`;
          hookText.style.transform = `translate(-50%, ${-50 * (1 - t)}%) scale(${curScale})`;
          hookText.style.opacity = '1';

          trackWrapper.style.opacity = String(t);
          trackWrapper.style.transform = `scale(${0.96 + 0.04 * t})`;
          
          hudLayer.style.opacity = String(t);
          hudLayer.style.pointerEvents = 'none';

          if (node1) { node1.style.opacity = '0'; node1.style.transform = 'translateY(12px)'; }
          if (stem1) { stem1.style.transform = 'scaleY(0)'; }
          if (node2) { node2.style.opacity = '0'; node2.style.transform = 'translateY(12px)'; }
          if (stem2) { stem2.style.transform = 'scaleY(0)'; }
          if (node3) { node3.style.opacity = '0'; node3.style.transform = 'translateY(12px)'; }
          if (circuitDataRow) { circuitDataRow.style.opacity = '0'; circuitDataRow.style.pointerEvents = 'none'; }
          if (circuitPrimaryDock) { circuitPrimaryDock.style.opacity = '0'; circuitPrimaryDock.style.pointerEvents = 'none'; }
        }
        // FASE 3: 0.28 -> 0.55: Línea de tiempo vertical progresiva con scroll (los 3 datos de color)
        else if (progress <= 0.55) {
          hookText.style.top = `${restingTopPx}px`;
          hookText.style.transform = 'translate(-50%, 0) scale(0.78)';
          hookText.style.opacity = '1';

          trackWrapper.style.opacity = '1';
          trackWrapper.style.transform = 'scale(1)';
          hudLayer.style.opacity = '1';
          hudLayer.style.pointerEvents = 'auto';

          const tLine = (progress - 0.28) / (0.55 - 0.28);

          // Hito 1 (0.00 -> 0.33)
          const op1 = Math.min(1, tLine * 3);
          if (node1) { node1.style.opacity = String(op1); node1.style.transform = `translateY(${12 * (1 - op1)}px)`; }
          
          // Tallo 1 (0.25 -> 0.55)
          const st1 = Math.max(0, Math.min(1, (tLine - 0.25) / 0.3));
          if (stem1) { stem1.style.transform = `scaleY(${st1})`; }

          // Hito 2 (0.35 -> 0.65)
          const op2 = Math.max(0, Math.min(1, (tLine - 0.35) / 0.3));
          if (node2) { node2.style.opacity = String(op2); node2.style.transform = `translateY(${12 * (1 - op2)}px)`; }

          // Tallo 2 (0.55 -> 0.85)
          const st2 = Math.max(0, Math.min(1, (tLine - 0.55) / 0.3));
          if (stem2) { stem2.style.transform = `scaleY(${st2})`; }

          // Hito 3 (0.65 -> 1.00)
          const op3 = Math.max(0, Math.min(1, (tLine - 0.65) / 0.35));
          if (node3) { node3.style.opacity = String(op3); node3.style.transform = `translateY(${12 * (1 - op3)}px)`; }

          // Datos del circuito aún completamente ocultos
          if (circuitDataRow) { circuitDataRow.style.opacity = '0'; circuitDataRow.style.pointerEvents = 'none'; }
          if (circuitPrimaryDock) { circuitPrimaryDock.style.opacity = '0'; circuitPrimaryDock.style.pointerEvents = 'none'; }
        }
        // FASE 4: 0.55 -> 0.85: PAUSA AMPLIA Y LIMPIA (Solo se ven el circuito y los datos de color)
        else if (progress <= 0.85) {
          hookText.style.top = `${restingTopPx}px`;
          hookText.style.transform = 'translate(-50%, 0) scale(0.78)';
          hookText.style.opacity = '1';

          trackWrapper.style.opacity = '1';
          trackWrapper.style.transform = 'scale(1)';
          hudLayer.style.opacity = '1';
          hudLayer.style.pointerEvents = 'auto';

          if (node1) { node1.style.opacity = '1'; node1.style.transform = 'translateY(0)'; }
          if (stem1) { stem1.style.transform = 'scaleY(1)'; }
          if (node2) { node2.style.opacity = '1'; node2.style.transform = 'translateY(0)'; }
          if (stem2) { stem2.style.transform = 'scaleY(1)'; }
          if (node3) { node3.style.opacity = '1'; node3.style.transform = 'translateY(0)'; }

          // Los datos técnicos se mantienen ocultos para que el usuario pueda apreciar la pista y la historia
          if (circuitDataRow) { circuitDataRow.style.opacity = '0'; circuitDataRow.style.pointerEvents = 'none'; }
          if (circuitPrimaryDock) { circuitPrimaryDock.style.opacity = '0'; circuitPrimaryDock.style.pointerEvents = 'none'; }
        }
        // FASE 5: 0.85 -> 0.96: RECIÉN AL SEGUIR SCROLLEANDO aparecen los datos técnicos del circuito
        else if (progress <= 0.96) {
          hookText.style.top = `${restingTopPx}px`;
          hookText.style.transform = 'translate(-50%, 0) scale(0.78)';
          hookText.style.opacity = '1';

          trackWrapper.style.opacity = '1';
          trackWrapper.style.transform = 'scale(1)';
          hudLayer.style.opacity = '1';
          hudLayer.style.pointerEvents = 'auto';

          if (node1) { node1.style.opacity = '1'; node1.style.transform = 'translateY(0)'; }
          if (stem1) { stem1.style.transform = 'scaleY(1)'; }
          if (node2) { node2.style.opacity = '1'; node2.style.transform = 'translateY(0)'; }
          if (stem2) { stem2.style.transform = 'scaleY(1)'; }
          if (node3) { node3.style.opacity = '1'; node3.style.transform = 'translateY(0)'; }

          const tData = (progress - 0.85) / (0.96 - 0.85);
          const opData = Math.min(1, tData * 1.4);
          if (circuitDataRow) { 
            circuitDataRow.style.opacity = String(opData); 
            circuitDataRow.style.pointerEvents = opData > 0.4 ? 'auto' : 'none'; 
          }
          if (circuitPrimaryDock) { 
            circuitPrimaryDock.style.opacity = String(opData); 
            circuitPrimaryDock.style.pointerEvents = opData > 0.4 ? 'auto' : 'none'; 
          }
        }
        // FASE 6: 0.96 -> 1.00: Atenuación suave final para que jamás se corte con la Pantalla 3
        else {
          const tOut = (progress - 0.96) / (1.00 - 0.96);
          const fadeOut = Math.max(0, 1 - tOut * 2.2);
          if (circuitPrimaryDock) { circuitPrimaryDock.style.opacity = String(fadeOut); }
        }
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateSequence();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      window.addEventListener('resize', updateSequence);
      updateSequence();

      if (toggle) {
        toggle.addEventListener('change', () => {
          const telemetryCards = document.querySelectorAll('.circuit-telemetry-hud');
          telemetryCards.forEach(card => {
            if (toggle.checked) {
              card.style.opacity = '1';
              card.style.pointerEvents = 'auto';
            } else {
              card.style.opacity = '0';
              card.style.pointerEvents = 'none';
            }
          });
        });
      }
    })();

    // ========================================================
    // 4. MÓDULO EDITORIAL DE MATEO (MODAL SÍNTESIS CON GROQ IA)
    // ========================================================
    const mateoEditorialData = {
      stream: `«Bienvenidos a la previa técnica de UNDERTRACK para el Gran Premio de São Paulo. Mucha atención hoy con la temperatura del asfalto: si pasa los 40 grados en San Pablo, el modelo de IA le prende fuego la alarma roja a McLaren. Pierden 1.2 puestos promedio en tandas largas por fatiga del tren delantero. Si Ferrari y Verstappen aguantan los primeros doce giros, la carrera cambia de manos en la subida de Junção. Ojo con la S do Senna en la largada: setenta y tres por ciento de probabilidad histórica de neutralización. Franco Colapinto larga con gomas medias y aire limpio: si el pelotón medio degrada rápido, tiene ritmo para pescar puntos.»`,
      reel: `🔥 ALERTA F1 BRASIL: ¿Por qué McLaren puede perder la carrera aunque hagan la Pole?\n\nEl modelo de IA de UNDERTRACK analizó más de 300 Grandes Premios: cuando el asfalto supera los 40°C, McLaren se cae a pedazos (-1.20 puestos en tandas largas) por micro-deslizamiento en curva lenta.\n\n¿Los favoritos según la física del circuito? Ferrari (+0.11 en calor) y Max Verstappen con su tracción mecánica. \n\n¿Y Franco Colapinto? En circuitos técnicos los gestores de gomas promedian +1.15 puestos ganados. ¡Guardá este video antes de la largada!`,
      fantasy: `🎯 CONSEJO FANTASY & APUESTA // UNDERTRACK BRASIL:\n• Evitar doble alineación de McLaren si el domingo hay sol y el asfalto pasa los 40°C (penalidad histórica de -1.20 puestos).\n• Valor Máximo: Charles Leclerc y Lewis Hamilton (+0.11 diferencial positivo en calor y chasis SF-26 superior en tracción en Junção).\n• Sleeper del Pelotón Medio: Franco Colapinto (#43 Alpine) con 88 en gestión de gomas y promedio de +1.26 puestos en pistas técnicas.`,
      groq: `⚡ ASISTENTE EN VIVO CON GROQ // LLAMA 3.3\n\nEscribí una pregunta técnica abajo o tocá uno de los botones rápidos para que la IA genere un análisis periodístico al instante en base a la telemetría real de Interlagos.\n\nEjemplos:\n• ¿Por qué el desnivel de 43m castiga a Williams?\n• ¿Quién tiene ventaja en tracción en la subida de Junção?\n• ¿Cómo impacta la lluvia en los pilotos de mitad de grilla?`
    };

    let activeMateoTab = 'stream';

    function openMateoModal() {
      const modal = document.getElementById('mateoModal');
      if (modal) modal.classList.remove('hidden');
      
      // Sincronizar badge de piloto activo
      const pilotNameBadge = document.getElementById('modalActivePilotName');
      const p = (typeof pilotsData !== 'undefined' && pilotsData[activePilotId]) ? pilotsData[activePilotId] : null;
      if (pilotNameBadge && p) pilotNameBadge.textContent = p.name;

      // Verificar si hay API key guardada
      const savedKey = localStorage.getItem('groq_api_key');
      const statusLabel = document.getElementById('groqKeyStatusLabel');
      const keyInput = document.getElementById('groqApiKeyInput');
      if (savedKey) {
        if (statusLabel) statusLabel.textContent = 'API Key de Groq configurada ✓';
        if (keyInput) keyInput.value = savedKey;
      }

      setMateoTab(activeMateoTab);
    }

    function closeMateoModal() {
      const modal = document.getElementById('mateoModal');
      if (modal) modal.classList.add('hidden');
    }

    function openClusterModal() {
      const modal = document.getElementById('clusterModal');
      if (modal) modal.classList.remove('hidden');
    }

    function closeClusterModal() {
      const modal = document.getElementById('clusterModal');
      if (modal) modal.classList.add('hidden');
    }

    window.addEventListener('click', (e) => {
      const cModal = document.getElementById('clusterModal');
      if (cModal && e.target === cModal) closeClusterModal();
      const mModal = document.getElementById('mateoModal');
      if (mModal && e.target === mModal) closeMateoModal();
    });

    function setMateoTab(tabKey) {
      activeMateoTab = tabKey;
      const textBox = document.getElementById('mateoModalText');
      if (textBox && mateoEditorialData[tabKey]) {
        textBox.innerHTML = `<div class="whitespace-pre-line">${mateoEditorialData[tabKey]}</div>`;
      }

      const tabs = ['stream', 'reel', 'fantasy', 'groq'];
      tabs.forEach(t => {
        const btn = document.getElementById('tabBtn' + t.charAt(0).toUpperCase() + t.slice(1));
        if (!btn) return;
        if (t === tabKey) {
          btn.className = 'py-2 px-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-neonOrange text-white shadow-md cursor-pointer transition-all';
        } else {
          btn.className = 'py-2 px-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider text-tealSage hover:text-white cursor-pointer transition-all';
        }
      });
    }

    function copyMateoText() {
      const text = mateoEditorialData[activeMateoTab] || '';
      navigator.clipboard.writeText(text).then(() => {
        const label = document.getElementById('copyBtnLabel');
        const icon = document.getElementById('copyBtnIcon');
        if (label) label.textContent = '¡Copiado!';
        if (icon) icon.textContent = '✓';
        setTimeout(() => {
          if (label) label.textContent = 'Copiar Texto';
          if (icon) icon.textContent = '📋';
        }, 2000);
      });
    }

    // ========================================================
    // 4.1 INTEGRACIÓN EN VIVO CON GROQ (LLAMA 3.3)
    // ========================================================
    function guardarGroqKey() {
      const input = document.getElementById('groqApiKeyInput');
      const label = document.getElementById('groqKeyStatusLabel');
      const details = document.getElementById('groqKeyDetails');
      if (!input) return;
      const key = input.value.trim();
      if (key.startsWith('gsk_')) {
        localStorage.setItem('groq_api_key', key);
        if (label) label.textContent = 'API Key guardada con éxito ✓';
        if (details) details.open = false;
      } else {
        alert('Por favor pegá una API Key válida de Groq (debe comenzar con gsk_).');
      }
    }

    function buildGroqSystemPrompt() {
      const p = (typeof pilotsData !== 'undefined' && pilotsData[activePilotId]) 
                ? pilotsData[activePilotId] 
                : { name: 'Charles Leclerc', team: 'Ferrari', cluster: 'ÉLITE METRONÓMICO', kpiConsistencia: '1.27', kpiPuestos: '+1.28', prediction: 'Favorable por balance en S2' };

      return `Sos el copiloto editorial y analista técnico de Mateo, periodista de F1 en streaming y podcasts.
Respondé en español rioplatense, directo, contundente y con lenguaje de automovilismo profesional (stints, graining, carga lateral, balance mecánico, telemetría).
Tus respuestas deben ser breves (2 a 4 oraciones), ideales para leer en voz alta al aire o armar un reel.

DATOS OFICIALES DE UNDERTRACK (CONTEXTO EMPÍRICO):
- Circuito: Autódromo de Interlagos (San Pablo, Brasil).
- Física de la pista: 43 metros de desnivel, tracción en subida desde Junção hacia la recta, frenada Brembo 4/5, abrasión Pirelli 3/5.
- Familia K-Means: Familia 2 (Mixtos y Técnicos, K=4, inercia 59.78).
- Gemelo mecánico: Red Bull Ring (Austria) con 84.6% de coincidencia de Pearson. Si un chasis o motor rindió en Austria, se replica en Brasil.
- Sensibilidad térmica: McLaren pierde -1.20 puestos en calor (>40°C de asfalto). Ferrari (+0.11) y Red Bull dominan en pista caliente.
- Piloto seleccionado en la pantalla: ${p.name} (${p.team}).
  * Estilo de manejo: ${p.cluster}
  * Consistencia en tanda: ${p.kpiConsistencia}s
  * Puestos ganados promedio: ${p.kpiPuestos}
  * Diagnóstico en pista: ${p.prediction}

LÍMITES Y GUARDRAILS OBLIGATORIOS:
1. Usá ÚNICAMENTE los datos de telemetría de UNDERTRACK provistos en este contexto.
2. Si te preguntan algo que no esté en estos datos o fuera del automovilismo, respondé exactamente: "Ese dato no forma parte de la telemetría de UNDERTRACK." y no inventes nada.`;
    }

    async function llamarApiGroq(promptUsuario) {
      let apiKey = localStorage.getItem('groq_api_key');
      if (!apiKey) {
        const inputVal = document.getElementById('groqApiKeyInput')?.value?.trim();
        if (inputVal && inputVal.startsWith('gsk_')) {
          apiKey = inputVal;
          localStorage.setItem('groq_api_key', apiKey);
        }
      }

      const textBox = document.getElementById('mateoModalText');
      const liveBadge = document.getElementById('groqLiveBadge');
      const sendBtn = document.getElementById('btnGroqSend');
      const sendIcon = document.getElementById('groqSendIcon');
      const sendText = document.getElementById('groqSendText');

      // Si no hay key, invitar a colocarla de forma prolija
      if (!apiKey) {
        if (textBox) {
          textBox.innerHTML = `
            <div class="p-3.5 rounded-xl bg-neonOrange/15 border border-neonOrange/40 text-white">
              <span class="font-black text-neonOrange block mb-1">🔑 FALTA TU API KEY DE GROQ</span>
              <p class="text-xs text-white/90 mb-2">Para que Llama 3 responda en vivo desde tu navegador, pegá tu clave gratuita de Groq (empieza con <code class="font-mono bg-black/60 px-1 py-0.5 rounded text-neonOrange">gsk_...</code>) en el campo inferior de configuración.</p>
              <p class="text-[11px] text-tealSage">La podés generar gratis en 30 segundos en <a href="https://console.groq.com/keys" target="_blank" class="underline text-neonOrange font-bold">console.groq.com/keys</a>.</p>
            </div>
          `;
        }
        const details = document.getElementById('groqKeyDetails');
        if (details) details.open = true;
        return;
      }

      // Estado de carga visual
      if (sendBtn) sendBtn.disabled = true;
      if (sendIcon) sendIcon.textContent = '⏳';
      if (sendText) sendText.textContent = 'Pensando...';
      if (liveBadge) liveBadge.classList.remove('hidden');

      if (textBox) {
        textBox.innerHTML = `
          <div class="flex items-center gap-3 py-8 justify-center text-tealSage">
            <svg class="animate-spin h-5 w-5 text-neonOrange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span class="text-xs font-mono uppercase tracking-wider text-white">Consultando telemetría en Groq (Llama 3.3)...</span>
          </div>
        `;
      }

      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: buildGroqSystemPrompt() },
              { role: 'user', content: promptUsuario }
            ],
            temperature: 0.5,
            max_tokens: 300
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Error ${response.status}: no se pudo conectar con Groq.`);
        }

        const data = await response.json();
        const textoRespuesta = data.choices?.[0]?.message?.content || 'No se recibió respuesta.';

        if (textBox) {
          textBox.innerHTML = `
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span class="text-[10px] font-mono text-neonOrange uppercase font-bold tracking-wider">⚡ RESPUESTA GROQ // LLAMA 3.3</span>
              <span class="text-[9px] font-mono text-tealSage">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="whitespace-pre-line text-white/95 leading-relaxed font-sans text-xs sm:text-sm">
              ${textoRespuesta}
            </div>
          `;
          mateoEditorialData['groq'] = textoRespuesta;
          activeMateoTab = 'groq';
        }
      } catch (error) {
        if (textBox) {
          textBox.innerHTML = `
            <div class="p-3.5 rounded-xl bg-red-900/30 border border-red-500/50 text-white">
              <span class="font-black text-red-400 block mb-1">⚠️ ERROR DE CONEXIÓN CON GROQ</span>
              <p class="text-xs text-white/90">${error.message}</p>
              <p class="text-[11px] text-tealSage mt-2">Verificá que tu API Key comience con gsk_ y esté activa en console.groq.com.</p>
            </div>
          `;
        }
      } finally {
        if (sendBtn) sendBtn.disabled = false;
        if (sendIcon) sendIcon.textContent = '⚡';
        if (sendText) sendText.textContent = 'Preguntar';
      }
    }

    function generarGuionConGroq(tipo) {
      const p = (typeof pilotsData !== 'undefined' && pilotsData[activePilotId]) 
                ? pilotsData[activePilotId] 
                : { name: 'Charles Leclerc' };

      let prompt = '';
      if (tipo === 'stream') {
        prompt = `Generá una apertura de streaming de 3 oraciones analizando las chances de ${p.name} en el GP de Interlagos según su estilo de manejo y la física de la pista.`;
      } else if (tipo === 'reel') {
        prompt = `Generá un guion de 30 segundos para reel con un gancho picante sobre ${p.name}, el asfalto caliente de Brasil y su predicción técnica.`;
      } else if (tipo === 'austria') {
        prompt = `Explicá en 3 oraciones por qué la correlación mecánica del 84.6% entre el Red Bull Ring de Austria e Interlagos permite anticipar el rendimiento de los monoplazas en Brasil.`;
      }
      llamarApiGroq(prompt);
    }

    function enviarPreguntaGroq() {
      const input = document.getElementById('groqCustomInput');
      if (!input) return;
      const pregunta = input.value.trim();
      if (!pregunta) {
        generarGuionConGroq('stream');
        return;
      }
      llamarApiGroq(pregunta);
    }


    function selectPilot(pilotId) {
      if (!pilotsData[pilotId]) return;
      activePilotId = pilotId;
      const p = pilotsData[pilotId];

      const hudCard = document.getElementById('pilotHudCard');
      const elName = document.getElementById('pilotName');
      const elTeam = document.getElementById('pilotTeam');
      const elNum = document.getElementById('pilotNumberBadge');
      const elCluster = document.getElementById('pilotClusterBadge');
      const elQuote = document.getElementById('pilotQuote');

      const elConsistencia = document.getElementById('kpiConsistencia');
      const elPuestos = document.getElementById('kpiPuestos');
      const elPuntos = document.getElementById('kpiPuntos');
      const elGestion = document.getElementById('kpiGestion');
      const elPredictionBox = document.getElementById('pilotPredictionBox');
      const elPredictionDot = document.getElementById('pilotPredictionDot');
      const elPredictionBadge = document.getElementById('pilotPredictionBadge');
      const elPredictionText = document.getElementById('pilotPredictionText');
      const elCar = document.getElementById('pilotOverlaidCar');

      if (elName) elName.textContent = p.name;
      if (elTeam) elTeam.textContent = p.team;
      if (elNum) {
        elNum.textContent = p.number;
        elNum.style.color = p.accentColor;
      }
      if (elCluster) {
        elCluster.textContent = p.cluster;
        elCluster.className = 'px-3.5 py-1 rounded-full font-sans font-black text-xs uppercase tracking-wider shadow-md ' + p.clusterBg;
      }
      if (elQuote) elQuote.textContent = p.quote;

      if (elConsistencia) elConsistencia.textContent = p.kpiConsistencia;
      if (elPuestos) {
        elPuestos.textContent = p.kpiPuestos;
        elPuestos.style.color = p.accentColor;
      }
      if (elPuntos) elPuntos.textContent = p.kpiPuntos;
      if (elGestion) elGestion.textContent = p.kpiGestion;

      if (elPredictionBox) {
        elPredictionBox.className = 'mt-2.5 p-2 sm:p-2.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-left transition-all ' + p.predBg;
      }
      if (elPredictionDot) elPredictionDot.style.backgroundColor = p.predDot;
      if (elPredictionBadge) {
        elPredictionBadge.textContent = p.predictionBadge;
        elPredictionBadge.style.color = p.accentColor;
      }
      if (elPredictionText) elPredictionText.textContent = p.prediction;

      // Actualizar monoplaza animado (sale veloz hacia la derecha, entra desde la izquierda y frena)
      if (elCar && p.carImg) {
        // 1. Acelera hacia la derecha
        elCar.style.transition = 'transform 0.32s cubic-bezier(0.4, 0, 1, 1), opacity 0.28s ease-in';
        elCar.style.transform = 'translateX(110%) scale(0.96)';
        elCar.style.opacity = '0';

        setTimeout(() => {
          elCar.src = p.carImg;
          // 2. Reposiciona instantáneamente a la izquierda fuera de pantalla
          elCar.style.transition = 'none';
          elCar.style.transform = 'translateX(-110%) scale(0.96)';
          elCar.style.opacity = '0';

          // 3. Entra desde la izquierda y se clava frenando en su posición
          requestAnimationFrame(() => {
            setTimeout(() => {
              elCar.style.transition = 'transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out';
              elCar.style.transform = 'translateX(0) scale(1)';
              elCar.style.opacity = '1';
            }, 30);
          });
        }, 320);
      }

      // Color, border y FILL interior adaptados dinámicamente al piloto
      if (hudCard) {
        if (p.hudBg) {
          hudCard.className = 'relative rounded-3xl p-5 sm:p-6 transition-all duration-500 shadow-2xl ' + p.hudBg;
        }
        hudCard.style.borderColor = p.borderColor;
        hudCard.style.boxShadow = p.boxShadow;
      }

      // Actualización de cartas del abanico con animación ultrasuave
      Object.keys(fanDeckLayout).forEach(id => {
        const card = document.getElementById('fan-' + id);
        if (!card) return;
        const cfg = fanDeckLayout[id];

        if (id === pilotId) {
          card.classList.add('active-pilot');
          card.style.transform = `rotate(${cfg.rot}deg) translateY(-14px) scale(1.04)`;
          card.style.zIndex = '45';
          card.style.borderColor = p.accentColor;
          card.style.borderWidth = '2px';
          card.style.boxShadow = `0 0 35px ${p.accentColor}99, 0 15px 35px rgba(0, 0, 0, 0.9)`;
        } else {
          card.classList.remove('active-pilot');
          card.style.transform = `rotate(${cfg.rot}deg) translateY(${cfg.translateY}px) scale(1)`;
          card.style.zIndex = String(cfg.z);
          card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          card.style.borderWidth = '1px';
          card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.6)';
        }
      });
    }

    // ========================================================
    // 6. SCROLL SPY HEADER NAVIGATION & PROGRESS BAR CON AUTITO
    // ========================================================
    (function initScrollSpyAndProgressBar() {
      const progLine = document.getElementById('sidebarProgressLine');
      const progCar = document.getElementById('sidebarProgressCar');

      const sections = [
        { id: 'inicio', navId: 'nav-inicio' },
        { id: 'surface-scroll-container', navId: 'nav-surface' },
        { id: 'signal', navId: 'nav-signal' },
        { id: 'helmet', navId: 'nav-helmet' },
        { id: 'crossover', navId: 'nav-crossover' }
      ];

      function onScroll() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollY / maxScroll : 0));

        // Actualizar barra de progreso y posición del autito
        if (progLine) progLine.style.height = `${progress * 100}%`;
        if (progCar) progCar.style.top = `${progress * 100}%`;

        // Scroll Spy para el Header Navigation
        const middleY = scrollY + window.innerHeight * 0.45;
        let activeSectionNavId = 'nav-inicio';

        sections.forEach(sec => {
          const el = document.getElementById(sec.id);
          if (!el) return;
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (middleY >= top && middleY < top + height) {
            activeSectionNavId = sec.navId;
          }
        });

        // Aplicar clase active-nav
        sections.forEach(sec => {
          const navEl = document.getElementById(sec.navId);
          if (!navEl) return;
          if (sec.navId === activeSectionNavId) {
            navEl.classList.add('active-nav');
          } else {
            navEl.classList.remove('active-nav');
          }
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      setTimeout(onScroll, 100);
    })();

    // Inicializar Piloto Seleccionado por Defecto (Norris - Centro Figma)
    

    window.addEventListener('DOMContentLoaded', () => {
      selectPilot('leclerc');
    });
    setTimeout(() => {
      selectPilot('leclerc');
    }, 100);

