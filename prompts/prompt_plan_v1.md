# Prompt Plan V1 — Descubrimiento de Patrones y Modelado de Datos

## 🎯 Objetivo
Planificar el análisis exploratorio de datos (EDA), la limpieza de telemetría de Fórmula 1 (2018–2025) y la formulación del modelo de agrupamiento no supervisado de circuitos.

---

## 📋 Instrucciones y Criterios Dados al LLM

1. **Fuentes y Verificación:**
   - Trabajar exclusivamente con datos oficiales: Ergast API (tiempos de vuelta, paradas, resultados), OpenF1 API (compuestos de neumáticos y clima) y homologaciones de la FIA.
   - Cero datos sintéticos inventados. Si una variable histórica no está disponible, debe quedar vacía con trazabilidad explícita de su fuente.

2. **Modelo de Clustering de Pistas (K-Means):**
   - Agrupar los trazados del calendario en base a 5 variables empíricas de exigencia física:
     * `% de curvas lentas`
     * `% de curvas rápidas`
     * `% acelerador a fondo`
     * `Severidad de frenada` (escala 1 a 5 Brembo)
     * `Abrasión del asfalto` (escala 1 a 5 Pirelli)
   - Evaluar valores de $K \in [3, 5]$ calculando inercia y silueta para encontrar el número natural de familias de circuitos.

3. **Circuitos Gemelos (Correlación de Pearson):**
   - Cruzar los vectores físicos de cada circuito para identificar "gemelos ocultos" (pistas lejanas geográficamente que demandan exactamente lo mismo al monoplaza).
   - Generar el caso de estudio para el Gran Premio de Brasil (Interlagos) y su correlación con Red Bull Ring (Austria).

4. **Output Esperado:**
   - Scripts en Python (`codigo/`) para procesar los CSVs brutos y exportar las tablas consolidadas en `datasets_procesados/`.
