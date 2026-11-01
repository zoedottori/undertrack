/**
 * UNDERTRACK Web Application Controller
 * Compatible con file:// (script clásico) y http:// (ES module).
 */

(function() {
  const DATA = (typeof window !== 'undefined' && window.UNDERTRACK_DATA) 
    ? window.UNDERTRACK_DATA 
    : {};

  let currentRoundId = 'rodriguez';
  let activePilotId = 'colapinto';
  let activeMateoTab = 'streaming';
  let countdownInterval = null;

  function init() {
    if (!DATA.rounds) {
      console.warn("UNDERTRACK_DATA aún no está disponible.");
      return;
    }
    initRoundSelector();
    renderAll();
    initMateoModal();
    initBifurcation();
  }

  function initRoundSelector() {
    const selectorContainer = document.getElementById('round-selector-chips');
    if (!selectorContainer) return;

    selectorContainer.innerHTML = DATA.rounds.map(r => `
      <button class="px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded border transition-all ${
        r.id === currentRoundId
          ? 'bg-[#FF5813] text-white border-[#FF5813] shadow-[0_0_12px_rgba(255,88,19,0.4)]'
          : 'bg-[#082124] text-[#99B8B8] border-[rgba(153,184,184,0.2)] hover:border-[#99B8B8]'
      }" data-round="${r.id}">
        R${r.round} • ${r.name.replace('GP de ', '')}
      </button>
    `).join('');

    selectorContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        currentRoundId = btn.getAttribute('data-round');
        initRoundSelector();
        renderAll();
      });
    });
  }

  function renderAll() {
    const roundData = DATA[currentRoundId] || DATA.rodriguez;
    if (!roundData) return;
    
    // 1. Header & Chips
    setTxt('chip-round', roundData.roundNumber);
    setTxt('chip-city', roundData.cityCountry);
    setTxt('chip-circuit', roundData.circuitName);
    setTxt('chip-altitude', roundData.altitude);

    // 2. Editorial Hook
    setTxt('editorial-quote', `"${roundData.editorialHandwritten}"`);
    setTxt('editorial-bajada', roundData.editorialBajada);

    // 3. KPIs
    setTxt('kpi-longitud', roundData.kpis.longitud);
    setTxt('kpi-vueltas', `${roundData.kpis.vueltas} • ${roundData.kpis.distanciaTotal}`);
    setTxt('kpi-recta', roundData.kpis.rectaPrincipal);
    setTxt('kpi-particularidad', roundData.kpis.particularidad);
    setTxt('kpi-sc', roundData.kpis.probabilidadSC);

    // 4. Countdown Timer
    startCountdown(roundData.targetDate);

    // 5. Under The Surface
    setTxt('kmeans-family-badge', roundData.kmeansFamily.nombre);
    renderTrackVisual(roundData);
    renderSeverityBars(roundData.trackTelemetry);
    setTxt('track-alert-text', roundData.trackTelemetry.alertaTecnica);

    // 6. The Signal (Circuitos Gemelos)
    renderTheSignal(roundData.gemelo, roundData.circuitName);

    // 7. Under Pressure
    renderUnderPressure(roundData.presion);

    // 8. The Crossover
    renderTheCrossover(roundData.crossover);

    // 9. Under The Helmet
    renderUnderTheHelmet();

    // 10. Audit Table (Austin vs Realidad)
    renderAuditTable();
  }

  function setTxt(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  }

  function startCountdown(targetDateStr) {
    if (countdownInterval) clearInterval(countdownInterval);

    const target = new Date(targetDateStr).getTime();

    function update() {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTxt('timer-days', String(days).padStart(2, '0'));
      setTxt('timer-hours', String(hours).padStart(2, '0'));
      setTxt('timer-mins', String(mins).padStart(2, '0'));
      setTxt('timer-secs', String(secs).padStart(2, '0'));
    }

    update();
    countdownInterval = setInterval(update, 1000);
  }

  function renderTrackVisual(data) {
    const container = document.getElementById('track-svg-container');
    if (!container) return;

    const isMexico = currentRoundId === 'rodriguez';

    const svgPath = isMexico
      ? `M 120,120 L 780,120 C 820,120 840,140 840,180 L 840,240 C 840,270 820,290 790,290 L 620,290 C 600,290 580,310 580,340 L 580,440 C 580,470 560,490 530,490 L 320,490 C 300,490 280,470 280,440 L 280,360 C 280,330 250,300 210,300 L 150,300 C 120,300 100,280 100,250 L 100,160 C 100,130 110,120 120,120 Z`
      : `M 150,420 L 220,130 C 230,90 260,90 280,130 L 340,260 C 360,290 400,290 430,250 L 510,150 C 530,120 560,120 580,150 L 670,280 C 700,320 740,320 760,280 L 820,180 C 830,160 850,160 860,190 L 860,340 C 860,380 830,410 780,410 L 460,410 C 430,410 400,440 370,440 L 220,440 C 180,440 150,440 150,420 Z`;

    const hotspotsHtml = data.puntosCriticos.map(p => `
      <g class="cursor-pointer group" transform="translate(${p.x}, ${p.y})" onclick="window.showHotspotInfo('${p.id}')">
        <circle r="16" fill="rgba(255, 88, 19, 0.2)" class="animate-ping"></circle>
        <circle r="8" fill="#FF5813" stroke="#FFFFFF" stroke-width="2"></circle>
        <text y="-14" text-anchor="middle" fill="#ECEFF1" font-family="Inter" font-size="11" font-weight="700">${p.id}</text>
      </g>
    `).join('');

    container.innerHTML = `
      <svg viewBox="0 0 940 540" class="w-full h-full drop-shadow-[0_0_35px_rgba(4,82,89,0.3)]">
        <defs>
          <pattern id="telemetryGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(153, 184, 184, 0.05)" stroke-width="1"/>
          </pattern>
          <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5813"/>
            <stop offset="50%" stop-color="#045259"/>
            <stop offset="100%" stop-color="#99B8B8"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#telemetryGrid)" />
        <path d="${svgPath}" fill="none" stroke="rgba(4, 82, 89, 0.4)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${svgPath}" fill="none" stroke="url(#trackGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="180" y="80" fill="#99B8B8" font-family="monospace" font-size="11">[ SECTOR 1 // SPEED ]</text>
        <text x="740" y="90" fill="#FF5813" font-family="monospace" font-size="11">[ SECTOR 2 // ESSES ]</text>
        <text x="440" y="525" fill="#966237" font-family="monospace" font-size="11">[ SECTOR 3 // STADIUM ]</text>
        ${hotspotsHtml}
      </svg>
    `;

    const cardsContainer = document.getElementById('critical-points-cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = data.puntosCriticos.map(p => `
        <div class="undertrack-card p-4 border-l-2 border-l-[#FF5813] hover:bg-[rgba(153,184,184,0.06)] transition-all">
          <div class="flex items-center justify-between mb-1">
            <span class="font-mono text-xs text-[#FF5813] font-bold">[ ${p.id} ]</span>
            <span class="text-xs font-mono font-bold text-white bg-[#082124] px-2 py-0.5 rounded border border-[rgba(153,184,184,0.2)]">${p.kmh}</span>
          </div>
          <h4 class="text-sm font-bold text-white mb-1">${p.nombre}</h4>
          <p class="text-xs text-[#99B8B8] leading-relaxed">${p.desc}</p>
        </div>
      `).join('');
    }
  }

  function renderSeverityBars(telemetry) {
    const bars = [
      { label: "Abrasión del Asfalto", value: telemetry.abrasionLevel, max: 5, colorClass: "bar-papaya", desc: "Nivel de aspereza mineral" },
      { label: "Severidad de Frenada", value: telemetry.brakingSeverity, max: 5, colorClass: "bar-papaya", desc: "Deceleración G y temperatura de pastillas" },
      { label: "Carga Lateral (Estrés Térmico)", value: telemetry.lateralStress, max: 5, colorClass: "bar-teal", desc: "Fuerzas centrífugas en curvas rápidas" },
      { label: "Grip Mecánico / Tracción", value: telemetry.gripLevel, max: 5, colorClass: "bar-teal", desc: "Adherencia a la salida de curvas lentas" }
    ];

    const container = document.getElementById('severity-bars-container');
    if (container) {
      container.innerHTML = bars.map(b => `
        <div class="mb-4">
          <div class="flex justify-between items-center text-xs mb-1">
            <span class="font-semibold text-white tracking-wide">${b.label}</span>
            <span class="font-mono text-[#99B8B8] font-bold">${b.value} / ${b.max}</span>
          </div>
          <div class="bar-container">
            <div class="bar-fill ${b.colorClass}" style="width: ${(b.value / b.max) * 100}%"></div>
          </div>
          <p class="text-[11px] text-[#99B8B8] opacity-75 mt-1">${b.desc}</p>
        </div>
      `).join('');
    }

    setTxt('metric-vmax', telemetry.vMax);
    setTxt('metric-fullthrottle', telemetry.fullThrottle);
    setTxt('metric-braketime', telemetry.brakingTime);

    const tyresEl = document.getElementById('pirelli-compounds');
    if (tyresEl) {
      tyresEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#12191c] border border-[rgba(255,255,255,0.15)] text-xs text-white">
          <span class="w-2.5 h-2.5 rounded-full bg-white"></span> ${telemetry.pirelli.hard}
        </span>
        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#12191c] border border-[rgba(255,255,255,0.15)] text-xs text-yellow-400">
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> ${telemetry.pirelli.medium}
        </span>
        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#12191c] border border-[rgba(255,255,255,0.15)] text-xs text-red-500">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> ${telemetry.pirelli.soft}
        </span>
      `;
    }
  }

  function renderTheSignal(gemelo, currentCircuitName) {
    if (!gemelo) return;

    setTxt('signal-current-name', currentCircuitName);
    setTxt('signal-twin-name', gemelo.nombre);
    setTxt('signal-twin-name-col', gemelo.nombre);
    setTxt('signal-match-pct', gemelo.matchPct);
    setTxt('signal-pearson-r', `r = ${gemelo.correlacionR.toFixed(3)}`);
    setTxt('signal-current-char', gemelo.caracteristicaActual);
    setTxt('signal-twin-char', gemelo.caracteristicaGemelo);
    setTxt('signal-conclusion-text', gemelo.conclusion);

    const circleProgress = document.getElementById('signal-dial-progress');
    if (circleProgress) {
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (gemelo.correlacionR * circumference);
      circleProgress.style.strokeDasharray = `${circumference}`;
      circleProgress.style.strokeDashoffset = `${offset}`;
    }

    const tableBody = document.getElementById('signal-comparison-table');
    if (tableBody) {
      tableBody.innerHTML = gemelo.metricasComparadas.map(m => `
        <tr class="border-b border-[rgba(153,184,184,0.1)] text-xs">
          <td class="py-2.5 font-medium text-white">${m.metrica}</td>
          <td class="py-2.5 text-center font-mono text-[#99B8B8]">${m.actual}</td>
          <td class="py-2.5 text-center font-mono text-[#99B8B8]">${m.gemelo}</td>
          <td class="py-2.5 text-right font-mono font-bold text-[#FF5813]">${m.diff}</td>
        </tr>
      `).join('');
    }
  }

  function renderUnderPressure(presion) {
    if (!presion) return;

    setTxt('pressure-temp-ambient', presion.tempAmbiente);
    setTxt('pressure-temp-track', presion.tempAsfalto);
    setTxt('pressure-temp-status', presion.estadoTermico);
    setTxt('pressure-wind-rain', `Viento: ${presion.viento} • Lluvia: ${presion.lluviaProb}`);
    setTxt('pressure-critical-incidents', presion.puntoCriticoIncidentes);

    const tableContainer = document.getElementById('pressure-constructors-table');
    if (tableContainer) {
      tableContainer.innerHTML = presion.alertasConstructores.map(c => {
        const isNegative = c.delta < 0;
        const badgeColor = isNegative ? 'text-red-400 bg-[rgba(239,26,45,0.1)]' : 'text-emerald-400 bg-[rgba(16,185,129,0.1)]';
        return `
          <div class="undertrack-card p-3 flex items-center justify-between border-l-2 ${
            c.constructor === 'McLaren' ? 'border-l-[#FF5813] bg-[rgba(255,88,19,0.06)]' : 'border-l-transparent'
          }">
            <div class="flex items-center gap-3">
              <span class="font-bold text-white text-sm">${c.constructor}</span>
              <span class="text-[11px] font-mono px-2 py-0.5 rounded ${badgeColor} font-bold">
                ${c.delta > 0 ? '+' : ''}${c.delta.toFixed(2)} puestos
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[#99B8B8] hidden md:inline">${c.razon}</span>
              ${c.constructor === 'McLaren' ? `
                <button onclick="window.toggleExplainabilityModal()" class="px-2.5 py-1 text-xs font-bold font-mono text-white bg-[#FF5813] rounded hover:bg-[#e04604] transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(255,88,19,0.4)]">
                  <span>✦ ¿POR QUÉ?</span>
                </button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    setTxt('ai-sample-text', presion.explicabilidadIA.muestra);
    setTxt('ai-mechanic-text', presion.explicabilidadIA.mecanica);
    setTxt('ai-conclusion-text', presion.explicabilidadIA.conclusion);

    setTxt('strategy-plan-a-title', presion.estrategia.planA.nombre);
    setTxt('strategy-plan-a-stint', `${presion.estrategia.planA.compuestos} (Parada: ${presion.estrategia.planA.paradaVuelta})`);
    setTxt('strategy-plan-a-desc', presion.estrategia.planA.ventaja);

    setTxt('strategy-plan-b-title', presion.estrategia.planB.nombre);
    setTxt('strategy-plan-b-stint', `${presion.estrategia.planB.compuestos} (Paradas: ${presion.estrategia.planB.paradaVuelta})`);
    setTxt('strategy-plan-b-desc', presion.estrategia.planB.ventaja);
  }

  function renderTheCrossover(crossover) {
    if (!crossover) return;

    setTxt('crossover-circuit-family', crossover.familia);
    setTxt('crossover-insight-text', crossover.insight);

    const container = document.getElementById('crossover-profiles-container');
    if (container) {
      container.innerHTML = crossover.perfiles.map(p => `
        <div class="undertrack-card p-4 transition-all hover:border-[#FF5813]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-white">${p.perfil}</span>
            <span class="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#082124] text-[#FF5813] border border-[rgba(255,88,19,0.3)]">
              ${p.gananciaPromedio}
            </span>
          </div>
          <div class="flex flex-wrap gap-1.5 mt-2">
            ${p.pilotos.map(pilot => `
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[rgba(153,184,184,0.08)] text-[#99B8B8] border border-[rgba(153,184,184,0.15)]">
                ${pilot}
              </span>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  }

  function renderUnderTheHelmet() {
    const pilots = DATA.pilots || [];
    const activePilot = pilots.find(p => p.id === activePilotId) || pilots[0];
    if (!activePilot) return;

    const selectorContainer = document.getElementById('pilot-selector-pills');
    if (selectorContainer) {
      selectorContainer.innerHTML = pilots.map(p => `
        <button class="px-3 py-1.5 text-xs font-mono rounded border transition-all whitespace-nowrap flex items-center gap-2 ${
          p.id === activePilot.id
            ? 'bg-[#FF5813] text-white border-[#FF5813] shadow-[0_0_12px_rgba(255,88,19,0.4)]'
            : 'bg-[#12191c] text-[#99B8B8] border-[rgba(153,184,184,0.2)] hover:border-[#99B8B8]'
        }" data-pilot-id="${p.id}">
          <span class="w-2 h-2 rounded-full" style="background-color: ${p.teamColor}"></span>
          <span>${p.name.split(' ').pop()} #${p.dorsal}</span>
        </button>
      `).join('');

      selectorContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          activePilotId = btn.getAttribute('data-pilot-id');
          renderUnderTheHelmet();
        });
      });
    }

    setTxt('pilot-full-name', activePilot.name);
    setTxt('pilot-dorsal-team', `#${activePilot.dorsal} • ${activePilot.team}`);
    setTxt('pilot-profile-badge', activePilot.profile);
    setTxt('pilot-pos-mediana', `P${activePilot.posMediana.toFixed(1)}`);
    setTxt('pilot-gain-avg', activePilot.puestosGanados);
    setTxt('pilot-quote', `"${activePilot.quote}"`);
    setTxt('pilot-efemeride', activePilot.efemeride);

    drawRadarChart('pilot-radar-canvas', activePilot.radar, activePilot.teamColor);
  }

  function drawRadarChart(canvasId, stats, color = '#FF5813') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center * 0.72;

    ctx.clearRect(0, 0, size, size);

    const axes = [
      { name: "Ritmo", val: stats.ritmo },
      { name: "Frenada", val: stats.frenada },
      { name: "Gomas", val: stats.gomas },
      { name: "Caos", val: stats.caos },
      { name: "Largada", val: stats.largada }
    ];
    const total = axes.length;

    for (let r = 0.2; r <= 1.0; r += 0.2) {
      ctx.beginPath();
      for (let i = 0; i < total; i++) {
        const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
        const x = center + Math.cos(angle) * (radius * r);
        const y = center + Math.sin(angle) * (radius * r);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(153, 184, 184, 0.12)";
      ctx.stroke();
    }

    axes.forEach((axis, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(153, 184, 184, 0.2)";
      ctx.stroke();

      const textX = center + Math.cos(angle) * (radius + 22);
      const textY = center + Math.sin(angle) * (radius + 22);
      ctx.fillStyle = "#99B8B8";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${axis.name} (${axis.val})`, textX, textY);
    });

    ctx.beginPath();
    axes.forEach((axis, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const r = (axis.val / 100) * radius;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    ctx.fillStyle = "rgba(255, 88, 19, 0.35)";
    ctx.fill();
    ctx.strokeStyle = "#FF5813";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    axes.forEach((axis, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const r = (axis.val / 100) * radius;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#FF5813";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  function renderAuditTable() {
    const container = document.getElementById('audit-austin-table');
    if (!container || !DATA.auditAustin) return;

    container.innerHTML = DATA.auditAustin.map(a => {
      const badgeColor = a.statusClass === 'acierto' 
        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' 
        : 'bg-rose-950/60 text-rose-400 border-rose-800';

      return `
        <div class="undertrack-card p-4 hover:border-[#99B8B8] transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-white text-sm">${a.dimension}</span>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded border ${badgeColor} font-bold">
              ${a.veredicto}
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-2">
            <div class="bg-[rgba(10,14,16,0.6)] p-2.5 rounded border border-[rgba(153,184,184,0.1)]">
              <span class="text-[#FF5813] font-bold block mb-1">🔮 Pronóstico UNDERTRACK:</span>
              <span class="text-[#99B8B8]">${a.pronostico}</span>
            </div>
            <div class="bg-[rgba(10,14,16,0.6)] p-2.5 rounded border border-[rgba(153,184,184,0.1)]">
              <span class="text-[#99B8B8] font-bold block mb-1">🏁 Realidad en Carrera:</span>
              <span class="text-white">${a.realidad}</span>
            </div>
          </div>
          <p class="text-xs text-[#99B8B8] italic pt-1 border-t border-[rgba(153,184,184,0.08)]">
            <strong>Lectura analítica:</strong> ${a.analisis}
          </p>
        </div>
      `;
    }).join('');
  }

  function initMateoModal() {
    const openBtn = document.getElementById('btn-open-mateo-modal');
    const closeBtn = document.getElementById('btn-close-mateo-modal');
    const modal = document.getElementById('mateo-modal');
    const copyBtn = document.getElementById('btn-copy-script');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        updateMateoScriptContent();
        modal.classList.remove('hidden');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    document.querySelectorAll('.mateo-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mateo-tab-btn').forEach(b => {
          b.classList.remove('bg-[#FF5813]', 'text-white');
          b.classList.add('text-[#99B8B8]');
        });
        btn.classList.add('bg-[#FF5813]', 'text-white');
        btn.classList.remove('text-[#99B8B8]');
        activeMateoTab = btn.getAttribute('data-tab');
        updateMateoScriptContent();
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = document.getElementById('mateo-script-text').textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `<span>✓ ¡COPIADO AL PORTAPAPELES!</span>`;
          copyBtn.classList.replace('bg-[#FF5813]', 'bg-emerald-600');
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.replace('bg-emerald-600', 'bg-[#FF5813]');
          }, 2200);
        });
      });
    }
  }

  function updateMateoScriptContent() {
    const roundData = DATA[currentRoundId] || DATA.rodriguez;
    const scriptEl = document.getElementById('mateo-script-text');
    if (scriptEl && roundData && roundData.mateoAI) {
      scriptEl.textContent = roundData.mateoAI[activeMateoTab] || roundData.mateoAI.streaming;
    }
  }

  function initBifurcation() {
    const btnRouteA = document.getElementById('btn-route-a');
    const btnRouteB = document.getElementById('btn-route-b');

    if (btnRouteA) {
      btnRouteA.addEventListener('click', () => {
        const target = document.getElementById('section-the-signal');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (btnRouteB) {
      btnRouteB.addEventListener('click', () => {
        const target = document.getElementById('section-the-crossover');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  window.toggleExplainabilityModal = function() {
    const drawer = document.getElementById('ai-explainability-drawer');
    if (drawer) {
      drawer.classList.toggle('hidden');
      if (!drawer.classList.contains('hidden')) {
        drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  window.showHotspotInfo = function(id) {
    const roundData = DATA[currentRoundId] || DATA.rodriguez;
    if (!roundData) return;
    const point = roundData.puntosCriticos.find(p => p.id === id);
    if (point) {
      alert(`[ ${point.id} ] ${point.nombre}\nVelocidad: ${point.kmh}\n\n${point.desc}`);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
