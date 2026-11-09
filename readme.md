# UNDERTRACK — F1 CIRCUIT PHYSICS & INTELLIGENCE PLATFORM

UNDERTRACK es una web pensada para creadores de contenido de Fórmula 1. Busca transformar grandes cantidades de datos complejos -telemetría, circuitos, pilotos, neumáticos y condiciones de carrera— en información clara y fácil de entender.

a través del análisis estadístico y Machine Learning (agrupamiento de trazados por K-Means, correlación de circuitos gemelos de Pearson y perfiles de conducta de pilotos), identifica patrones y relaciones que no son evidentes a simple vista. Luego, utiliza inteligencia artificial para interpretar esos hallazgos y ayudar a convertirlos en historias e ideas de contenido.

el objetivo: mirar la Fórmula 1 MÁS ALLÁ DE LOS RESULTADOS y descubrir historias escondidas en los datos.

---

## INTEGRANTE
* ZOE Dottori

---

## ENTREGAS

### ENTREGA 1 — HIPÓTESIS Y CONTEXTO
* consigna:
  * elegir un tópico (moda, medios, planificación urbana o redes sociales) y formular una hipótesis de trabajo.
  * presentar los datasets seleccionados, un perfil de usuario, las funcionalidades principales de la app y un conjunto de referentes (diseño, interfaz, utilidad, datos).
* enlaces:
  * presentación entrega 1 y 2: https://www.figma.com/deck/Kb1HjxiWL3kISvR1UWg6Ce/entrega-uno-y-dos---zoe?node-id=1-42&t=Q3t8jyauj1cGhCbV-1

### ENTREGA 2 — PROTOTIPO DE BAJA FIDELIDAD
* consigna:
  * presentar el flujo de la app en papel, figma o esquema digital, evidenciando cómo interviene la ia en el proceso.
  * fundamentar los descubrimientos basados en datos y por qué el diseño responde a la hipótesis planteada.
* enlaces:
  * presentación entrega 1 y 2: https://www.figma.com/deck/Kb1HjxiWL3kISvR1UWg6Ce/entrega-uno-y-dos---zoe?node-id=1-42&t=Q3t8jyauj1cGhCbV-1

### ENTREGA 3 — PROTOTIPO ONLINE FUNCIONAL
* consigna:
  * publicar la app operativa, con integración de ia en tiempo real (groq api).
  * incluir una página de racional que explique la hipótesis, el procesamiento de datos y el rol de la ia.
  * demo en vivo durante la clase.
* enlaces:
  * url del prototipo online funcional: https://undertrackentregatres.vercel.app/
  * link de presentación entrega 3: https://www.figma.com/deck/lLHgU3QCCDDmR7rKRdABd2

### ENTREGA 4 — VERSIÓN FINAL
* consigna:
  * presentar el mayor grado de avance alcanzado, con demo en vivo.
  * explicar y defender las decisiones de diseño, datos y prompting tomadas a lo largo del proyecto.

---

## DESCRIPCIÓN DEL PROYECTO

UNDERTRACK aborda la previa del Gran Premio de Brasil analizando cómo las variables físicas de la pista condicionan el rendimiento mecánico y el estilo de manejo de los pilotos:

* ACTO 0: LA ESPERA (HERO)
  cuenta regresiva en vivo hacia la carrera, selector de grandes premios y contexto histórico con estética vintage de boxes.

* ACTO 1: UNDER THE SURFACE (FÍSICA DE PISTAS)
  agrupamiento no supervisado K-Means (K=4, inercia 59.78). Visualización del trazado tridimensional de Interlagos, su desnivel característico de 43 metros, línea de tiempo con hitos del circuito y telemetría de frenada y asfalto.

* ACTO 2: THE SIGNAL (CIRCUITOS GEMELOS)
  correlación multivariable de Pearson (r = 0.846). Comparación mecánica directa entre Interlagos y el Red Bull Ring de Austria, demostrando cómo exigencias físicas equivalentes anticipan el rendimiento de motores y chasis.

* ACTO 3: UNDER THE HELMET (ESTILOS DE MANEJO)
  clasificación de 10 pilotos de la grilla según consistencia, paradas en boxes, puntos y deltas bajo condiciones climáticas adversas, integrando monoplazas animados e indicadores de rendimiento.

* ACTO 4: THE CROSSOVER (PREDICTIVE ENGINE)
  panel de cruce de datos que evalúa la neutralización de la ventaja mecánica según la temperatura del asfalto y el desnivel del circuito.

---

## ESTRUCTURA DEL REPOSITORIO

La organización de carpetas responde a la estructura solicitada por la cátedra:

```text
nombre_proyecto/
├── readme.md               # Descripción, integrantes, estructura y fuentes
├── decisiones.md           # Registro fechado de hipótesis probadas y descartadas
├── .gitignore              # Configuración de exclusiones de archivos
├── datasets/               # Archivos CSV originales sin procesar
│   ├── diccionario.md      # Descripción de columnas, unidades y filtros aplicados
│   └── ... (20 archivos CSV brutos)
├── datasets_procesados/    # Datasets limpios, filtrados y tablas maestras
│   ├── diccionario_de_datos.md
│   ├── datos_cruzados/
│   └── datasets_maestros/
├── diseno/
│   ├── referencias/        # Material visual de referencia y recursos gráficos
│   │   └── crops_de_trabajo/
│   └── prototipos/
│       ├── flujo de la web en BAJA.pdf
│       ├── prototipo_v1/
│       └── prototipo_v2/
├── prompts/                # Prompts utilizados con modelos de lenguaje
│   ├── prompt_plan_v1.md
│   └── prompt_plan_v2.md
├── codigo/                 # Scripts de descarga, normalización y modelado
│   ├── clustering_pilotos.py
│   ├── descubrir_patrones.py
│   ├── generar_datasets_maestros.py
│   ├── limpiar_y_procesar.py
│   └── modelado_y_evaluacion.py
├── entregas/               # Registro documental por entrega
│   ├── entrega_1/
│   ├── entrega_2/
│   └── entrega_3/
└── app/                    # Directorio de producción para publicación web
    ├── index.html          # Estructura principal
    ├── estilos.css         # Hoja de estilos
    ├── script.js           # Lógica interactiva y control de scroll
    ├── data/
    │   └── data.js         # Datos de telemetría y configuración
    └── assets/             # Circuitos, escuderías, fondos, logo y pilotos
```

---

## FUENTES DE DATOS

1. ERGAST MOTOR RACING DATABASE
   tiempos de vuelta oficiales, cronometraje de paradas en boxes, clasificaciones y resultados históricos de carrera.

2. OPENF1 API
   telemetría de compuestos de neumáticos en tiempo real y registros meteorológicos de pista y aire.

3. PIRELLI MOTORSPORT ARCHIVE
   niveles de abrasión del asfalto y nominaciones oficiales de compuestos secos (C1 a C5).

4. FIA CIRCUIT HOMOLOGATION & BREMBO DATA
   topografía, longitud oficial, cantidad de curvas y escalas de severidad de frenada.


