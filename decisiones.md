# REGISTRO DE DECISIONES DE DISEÑO Y MODELADO // UNDERTRACK

Registro fechado de hipótesis, pruebas, descartes y justificaciones técnicas del proyecto F1 para la cátedra.

---

### 2026-10-15 · TAXONOMÍA FÍSICA DE CIRCUITOS (K-MEANS)
* **Hipótesis:** La clasificación tradicional de la FIA (callejero, permanente, híbrido) no explica el rendimiento mecánico real de los monoplazas.
* **Probado:** Agrupamiento no supervisado mediante K-Means probando K=3, K=4 y K=5 sobre variables de longitud, curvas lentas, desnivel vertical, abrasión y severidad de frenada.
* **Descartado:** K=3 agrupaba circuitos disímiles (ej. Monza con Interlagos). K=5 sobre-segmentaba con clusters de una sola pista.
* **Decisión:** Se adoptó K=4 (Inercia 59.78) que define 4 familias exactas:
  1. *Carga Lateral Extrema* (Silverstone, Suzuka)
  2. *Stop-and-Go* (Monza, Montreal)
  3. *Mixtos y Técnicos* (Interlagos, Spielberg, Hungaroring)
  4. *Laberintos Urbanos* (Mónaco, Bakú, Singapur)

---

### 2026-10-22 · CORRELACIÓN DE PISTAS GEMELAS (PEARSON)
* **Hipótesis:** Monoplazas que dominan en una pista trasladan su ventaja matemática a circuitos con igual perfil de tracción en desnivel.
* **Probado:** Matriz de correlación de Pearson entre todas las pistas del calendario 2024.
* **Descartado:** Comparar Interlagos con Spa-Francorchamps por similitud de longitud (r = 0.52, baja correlación de exigencia en tren trasero).
* **Decisión:** Se descubrió el *Gemelo Cinemático*: Spielberg (Austria, Ronda 11) y San Pablo (Brasil, Ronda 21) comparten una afinidad del 84.6% (r = 0.846). Quien tracciona sin derrapar en la pendiente alpina de Remus traslada su ventaja a la subida ciega de Junção.

---

### 2026-10-28 · PROTOTIPO EDITORIAL Y NARRATIVA PERIODÍSTICA
* **Hipótesis:** La visualización debe servir como consola de cabina en vivo para Mateo durante sus transmisiones de streaming, reels y podcasts.
* **Probado:** Dashboard analítico tipo SaaS con tablas de datos.
* **Descartado:** La estética SaaS fría desconecta de la épica del automovilismo y resulta abrumadora para la audiencia de streaming.
* **Decisión:** Experiencia editorial inmersiva tipo póster interactivo de automovilismo clásico con tipografía grotesca combinada con firmas manuscritas (`Caveat`), paleta en verde pista `#778562`, acentos flúor `#d4ff32`, fondo negro puro `#0A0A0C` en choque y blanco marfil de alta legibilidad.

---

### 2026-11-01 · INTERACTIVIDAD Y ABANICO DE PILOTOS
* **Hipótesis:** La parrilla completa de 22 pilotos debe explorarse sin saturar la pantalla.
* **Probado:** Grid estático de 22 tarjetas simultáneas.
* **Descartado:** Exceso de scroll vertical y pérdida de foco en la comparación visual.
* **Decisión:** Sistema de doble mazo (*Primer piloto* vs *Segundo piloto por escudería*) con abanico centrado interactivo que despliega 11 pilotos por tanda y abre un pop-up modal translúcido con la ficha técnica completa, métricas de telemetría y gancho para streaming al clickear.

---

### 2026-11-02 · DESPLIEGUE SEGURO EN VERCEL Y ASISTENCIA CON GROQ
* **Hipótesis:** Integrar una IA en vivo que responda preguntas de telemetría sin exponer credenciales privadas de API.
* **Probado:** Llamadas directas desde el cliente con API Key en el frontend.
* **Descartado:** Riesgo de seguridad y bloqueo por CORS/políticas en producción.
* **Decisión:** Implementación de Serverless Function en `api/groq.js` para Vercel que utiliza Llama 3.3 70B Versatile con `GROQ_API_KEY` almacenada en variables de entorno, complementada con un motor telemétrico offline de contingencia en caso de falta de conectividad.
