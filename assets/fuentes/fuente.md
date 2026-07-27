### Resumen del Análisis Tipográfico para la pagina

1. **Familia Tipográfica Principal:** * **Gotham** (de Hoefler & Co.) en sus variantes *Bold*, *Medium*, *Book* y *Light*.
   * Pila de respaldos (*Fallback Stack*): `sans-serif`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Roboto`, `Helvetica`, `Arial`.

2. **Jerarquía Visual y CSS por Sección:**
   * **H1 / Titulares Hero (Banners Principales):** `Gotham-Bold` / `Gotham-ExtraBold` (`700`/`800`), en mayúsculas (`text-transform: uppercase`), espaciado de letras amplio (`letter-spacing: 0.05em` a `0.1em`), tamaños de `42px`–`56px` en escritorio.
   * **H2 / Títulos de Sección:** `Gotham-Bold` (`700`), `28px`–`36px`, estético y geométrico para resaltar bloques como *"Shop by Category"* o *"Built for the Journey"*.
   * **H3 / Tarjetas de Producto:** `Gotham-Medium` (`600`/`500`), `18px`–`22px`, en formato título normal para mantener legibilidad en nombres como *"Traditional Leather Case"*.
   * **Subtítulos y Badges (H4/H5 / Eyebrows):** `Gotham-Bold` (`700`), `11px`–`14px`, mayúsculas con `letter-spacing: 0.1em` (*"NEW RELEASE"*, *"LIMITED EDITION"*).
   * **Cuerpo de Texto y Párrafos (`p`):** `Gotham-Book` / `Regular` (`400`), `14px`–`16px`, con `line-height: 1.5`–`1.6` para máxima legibilidad.
   * **Botones (CTA / Add to Cart):** `Gotham-Bold` (`700`), `14px`–`16px`, en mayúsculas sostenidas con amplio rastreo de caracteres.

markdown_content = """# Análisis de Tipografía y Sistema de Fuentes - Nomad Goods (nomadgoods.com)

Este documento detalla el análisis de la arquitectura tipográfica, jerarquía de fuentes, estilos CSS y dirección de arte visual del sitio e-commerce.

---

## 1. Visión General del Sistema Tipográfico

Nomad Goods utiliza un sistema de diseño visual sobrio, moderno y de alto impacto centrado en la **estética industrial, minimalista y premium**. 

* **Familia Tipográfica Principal:** **Gotham** (de Hoefler & Co. / Monotype) / **Maison Neue** (según variante del tema Shopify).
* **Familia Tipográfica de Respaldo (Fallback Stack):** `sans-serif`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `Helvetica`, `Arial`.
* **Estilo General:** Sans-serif geométrica / grotesca de proporciones limpias, versales marcadas (*uppercase*), alto contraste visual y espaciado de letras (*letter-spacing*) muy cuidado para encabezados.

---

## 2. Desglose Tipográfico por Nivel de Jerarquía (HTML / CSS)

### 2.1. Titular Principal de la Página / Banner Hero (`H1`)
* **Familia de Fuente:** `Gotham-Bold`, `Gotham`, `sans-serif` (o `Maison Neue Extended / Bold`)
* **Peso (`font-weight`):** `700` (Bold) / `800` (Extra Bold)
* **Transformación de Texto (`text-transform`):** `uppercase` (Mayúsculas sostenidas) o `capitalize` según la campaña.
* **Espaciado entre letras (`letter-spacing`):** `0.05em` a `0.1em` (Ligeramente expandido para dar carácter editorial).
* **Tamaño de Fuente (`font-size`):**
  * *Desktop:* `42px` - `56px` (`2.6rem` - `3.5rem`)
  * *Mobile:* `28px` - `36px` (`1.75rem` - `2.25rem`)
* **Uso:** Títulos principales de colecciones (ej. *"MagSafe Chargers"*, *"Leather Cases"*), ofertas principales en el Banner Hero de portada.

### 2.2. Encabezados de Sección (`H2`)
* **Familia de Fuente:** `Gotham-Bold`, `Gotham-Medium`, `sans-serif`
* **Peso (`font-weight`):** `700` (Bold)
* **Transformación de Texto:** `uppercase` o `normal` (Frases completas de marca)
* **Espaciado entre letras (`letter-spacing`):** `0.02em` a `0.05em`
* **Tamaño de Fuente (`font-size`):**
  * *Desktop:* `28px` - `36px` (`1.75rem` - `2.25rem`)
  * *Mobile:* `22px` - `26px` (`1.375rem` - `1.625rem`)
* **Uso:** Títulos de bloques de contenido en el Homepage (ej. *"Shop by Category"*, *"Built for the Journey"*, *"Featured Products"*).

### 2.3. Encabezados de Módulos y Tarjetas de Producto (`H3`)
* **Familia de Fuente:** `Gotham-Medium`, `Gotham-Book`, `sans-serif`
* **Peso (`font-weight`):** `600` (Semi-Bold) / `500` (Medium)
* **Transformación de Texto:** `normal` o `capitalize`
* **Tamaño de Fuente (`font-size`):**
  * *Desktop:* `18px` - `22px` (`1.125rem` - `1.375rem`)
  * *Mobile:* `16px` - `18px` (`1rem` - `1.125rem`)
* **Uso:** Nombres individuales de productos en rejillas de productos (ej. *"Traditional Leather Case"*, *"Base One Max"*), subtítulos de características técnicas.

### 2.4. Subtítulos y Etiquetas Menores (`H4` / `H5` / `H6`)
* **Familia de Fuente:** `Gotham-Bold` / `Gotham-Medium`
* **Peso (`font-weight`):** `600` / `700`
* **Transformación de Texto:** `uppercase`
* **Espaciado entre letras (`letter-spacing`):** `0.1em` (Tracked out)
* **Tamaño de Fuente (`font-size`):** `11px` - `14px` (`0.6875rem` - `0.875rem`)
* **Uso:** Kicker text, sobre-títulos decorativos sobre los H2 (ej. *"NEW RELEASE"*, *"LIMITED EDITION"*), labels de categorías.

---

## 3. Tipografía en Componentes Interactivos y UI

### 3.1. Navegación Principal (Navbar & Header Menu)
* **Familia:** `Gotham-Medium`, `sans-serif`
* **Peso (`font-weight`):** `500` / `600`
* **Tamaño (`font-size`):** `13px` - `15px`
* **Transformación:** `uppercase` o `normal` con `letter-spacing: 0.04em`
* **Estilo Hover:** Cambio sutil de color (`#000000` a `#555555` o viceversa según el tema claro/oscuro) sin alteración de ancho para evitar layout shift.

### 3.2. Botones de Acción Principal (CTA / Call to Action)
* **Familia:** `Gotham-Bold`, `sans-serif`
* **Peso (`font-weight`):** `700`
* **Tamaño (`font-size`):** `14px` - `16px`
* **Transformación:** `uppercase`
* **Letter-spacing:** `0.08em`
* **Uso:** Botones como *"ADD TO CART"*, *"BUY NOW"*, *"EXPLORE COLLECTION"*.

### 3.3. Texto de Cuerpo / Párrafos (`p`, `span`, `li`)
* **Familia:** `Gotham-Book`, `Gotham-Light`, `sans-serif`
* **Peso (`font-weight`):** `400` (Regular) / `300` (Light)
* **Tamaño (`font-size`):** `14px` - `16px`
* **Altura de línea (`line-height`):** `1.5` - `1.6` (Para alta legibilidad en descripciones largas)
* **Color:** Gris muy oscuro / Casi negro (`#1a1a1a` o `#222222`) sobre fondos claros.

### 3.4. Precios y Badges de Producto
* **Familia:** `Gotham-Bold` o `Gotham-Medium`
* **Peso:** `700` para precios activos, `400` tachado para precios con descuento.
* **Tamaño:** `16px` - `20px` en tarjetas; `24px`+ en la ficha de producto (PDP).
* **Badges (ej. *"Best Seller"*, *"Pre-Order"*):** `10px` - `12px`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.1em`.

### 3.5. Pie de Página (Footer)
* **Familia:** `Gotham-Book`, `sans-serif`
* **Titulares de columna:** `12px` - `14px`, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.08em`.
* **Enlaces de navegación del Footer:** `12px` - `13px`, `font-weight: 400`, `color: #777777`.

---

## 4. Extracto de Implementación CSS Reutilizable

Para replicar el estilo tipográfico de Nomad Goods en un proyecto web (Next.js, Astro, Tailwind o CSS puro), se puede utilizar la siguiente estructura:

File saved successfully as analisis_fuentes_nomadgoods.md

```css
/* Definición de la pila tipográfica global */
:root {
  --font-primary: "Gotham", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-bold: "Gotham-Bold", --font-primary;
  --color-text-main: #111111;
  --color-text-muted: #666666;
}

body {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text-main);
  -webkit-font-smoothing: antialiased;
}

/* Títulos principales */
h1, .hero-title {
  font-family: var(--font-primary);
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.1;
}

/* Encabezados de sección */
h2, .section-title {
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

/* Nombres de producto */
h3, .product-card-title {
  font-weight: 600;
  font-size: 1.125rem;
  letter-spacing: 0.01em;
}

/* Botones CTA */
.btn-primary {
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 1rem 2rem;
  border-radius: 4px;
}