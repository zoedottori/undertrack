# Prompt Plan V2 — Arquitectura Editorial e Interacción Web (UNDERTRACK)

## 🎯 Objetivo
Diseñar la plataforma web interactiva en 5 actos narrativos para Mateo (periodista deportivo de streaming y podcasts), traduciendo los modelos de Machine Learning en experiencias visuales editoriales de alta gama.

---

## 📋 Instrucciones y Criterios Dados al LLM

1. **Estructura Narrativa en 5 Pantallas:**
   - **Acto 0: La Espera (Hero):** Timer en cuenta regresiva hacia el GP de Brasil, selector de carreras (Brasil, Las Vegas, Qatar), nombre de Interlagos cursivo sobre el timer, hook editorial con tipografía slender y fondo vintage con blend mode `overlay`.
   - **Acto 1: Under the Surface (Física de Pistas):** Secuencia de scroll interactiva (480vh sticky): *"LA GEOMETRÍA TAMBIÉN CUENTA"* sube a la cabecera, devela el circuito 3D iluminado, despliega línea de tiempo vertical de 3 hitos de Interlagos y revela telemetría HUD (desnivel de 43m, rugosidad 3/5, etc.).
   - **Acto 2: The Signal (Gemelos Obvios vs. Ocultos):** Comparación visual entre Interlagos y Red Bull Ring (Austria) con 84.6% de correlación mecánica, lente central con monoplaza y 3 tarjetas analíticas de pilares.
   - **Acto 3: Under the Helmet (5 Estilos de Manejo):** Abanico circular de cartas de pilotos (10 pilotos en la grilla 2026), autos recortados sin fondo sobrepuestos, animación de aceleración y frenada al cambiar de piloto, y carteles con datos de telemetría y predicción adaptados al color de la escudería.
   - **Acto 4: The Crossover (Predictive Engine):** Dashboard centrado con estética de widget de clima / fluid dashboard que analiza la neutralización de la ventaja mecánica según el factor climático y el desnivel.

2. **Dirección Visual & Accesibilidad:**
   - Paleta: *Thermal Orange* (`#F2561D`), *Teal Sage* (`#99BFBB`), *Deep Teal* (`#061517`) y negro asfalto profundo (`#070B0D`).
   - Tipografías: `Inter` (datos técnicos, pesos Black a Thin) y `Playfair Display / Caveat` (notas de autor).
   - Barra de progreso lateral con monoplaza de F1 orientado verticalmente hacia abajo.
   - Botón de síntesis editorial para Mateo y selector bilingüe ESP/ING.

3. **Arquitectura y Despliegue:**
   - Separar el código en la carpeta autosuficiente `app/` (`index.html`, `estilos.css`, `script.js`, `assets/`, `data/`) para su publicación directa en Vercel o Netlify sin pasos de compilación complejos.
