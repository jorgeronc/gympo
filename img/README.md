# Imágenes de la web de GymPo

La página `index.html` espera estos archivos. Sube cada captura/asset con el
**nombre exacto** indicado y en la **carpeta** indicada. Puedes usar la versión
de Android o de iOS: el contenido coincide con el rótulo.

## Raíz `img/`

| Archivo          | Qué es                                                        |
|------------------|---------------------------------------------------------------|
| `icon.png`       | Icono de la app (cuadrado, engranaje sobre círculo negro).    |
| `banner.png`     | Banner/feature graphic 1024×500 (GymPo + "Entrena. Registra. Progresa."). Se usa como imagen para redes sociales (Open Graph). |

## Capturas de la tienda (también en `img/`)

Identifica cada una por el **rótulo** que trae impreso arriba:

| Archivo           | Rótulo de la captura                              |
|-------------------|---------------------------------------------------|
| `inicio.png`      | "Tu progreso, en tu bolsillo" (pantalla Inicio)   |
| `entrenar.png`    | "Registra cada serie con descanso automático"     |
| `rutinas.png`     | "Tus rutinas, listas en un toque"                 |
| `ejercicios.png`  | "Cientos de ejercicios con guía"                  |
| `progreso.png`    | "Visualiza tu progreso"                           |
| `musculos.png`    | "Descubre qué músculos trabajas más"              |
| `medidas.png`     | "Mide tu avance con fotos"                         |
| `perfil.png`      | "Tu perfil, tu progreso"                          |

## Assets derivados (generados)

- `og-banner.png` (1200×630) — imagen para redes (`og:image` / Twitter). Generada
  a partir de `banner.png` (que se conserva a 1024×500 = *feature graphic* de Google Play).
- `*.webp` — versión WebP de cada captura (≈83% más ligeras). El HTML las sirve con
  `<picture><source type="image/webp">` y `<img …png>` como respaldo.
- `../favicon.ico` (raíz) — favicon multi-tamaño generado desde `icon.png`.
- `clon-espalda.{png,webp}` — recorte de la figura del clon digital (vista Espalda),
  usado en el paso 5 de "Cómo funciona". El héroe de GymPo Pro usa `musculos.*` (vista Frente).

Para regenerarlos: `pip install Pillow` y reejecutar el script de generación.

## Notas

- Formato PNG o JPG (si usas JPG, cambia también la extensión en `index.html`).
- Todas las imágenes van en la misma carpeta `img/` (sin subcarpetas).
- `inicio.png` es la que aparece grande en el hero; el resto van en la galería.
- Tienes más capturas disponibles (Perfil, Revisa cada entrenamiento). Si quieres
  añadirlas a la galería, súbelas aquí y avísame para enlazarlas.
