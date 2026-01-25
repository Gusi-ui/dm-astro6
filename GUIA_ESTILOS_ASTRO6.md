# Guía de Estilos y Configuración - Diversidad Funcional Mataró

## Para Astro 6 con Cloudflare Pages

Este documento contiene todos los estilos, paleta de colores, configuraciones y patrones de UI del proyecto Diversidad Funcional Mataró, adaptados para Astro 6 desplegado en Cloudflare Pages con D1.

---

## 📦 Dependencias del Proyecto Actual

### Dependencias de Producción

```json
{
  "@astrojs/cloudflare": "^12.6.12",
  "@astrojs/tailwind": "^5.1.4",
  "astro": "^6.0.0-beta.0",
  "tailwindcss": "^3.4.1",
  "zod": "^3.23.8"
}
```

### Dependencias de Desarrollo

```json
{
  "@astrojs/check": "^0.9.3",
  "@cloudflare/workers-types": "^4.20241106.0",
  "@tailwindcss/typography": "^0.5.19",
  "@types/node": "^20.14.0",
  "@typescript-eslint/eslint-plugin": "^8.53.1",
  "@typescript-eslint/parser": "^8.53.1",
  "astro-eslint-parser": "^1.2.2",
  "eslint": "^9.39.2",
  "eslint-plugin-astro": "^1.5.0",
  "eslint-plugin-jsx-a11y": "^6.10.2",
  "prettier": "^3.8.1",
  "prettier-plugin-astro": "^0.14.1",
  "prettier-plugin-tailwindcss": "^0.7.2",
  "husky": "^9.1.7",
  "lint-staged": "^16.2.7",
  "typescript": "^5.5.0"
}
```

---

## 🎨 Paleta de Colores Actual

### Colores Principales (Azul y Púrpura)

```css
/* Azul - Color principal de marca */
primary-50: #f0f9ff
primary-100: #e0f2fe
primary-200: #bae6fd
primary-300: #7dd3fc
primary-400: #38bdf8
primary-500: #0ea5e9
primary-600: #0284c7 /* Principal */
primary-700: #0369a1 /* Hover/Active */
primary-800: #075985
primary-900: #0c4a6e

/* Púrpura - Color de acento */
accent-50: #fdf4ff
accent-100: #fae8ff
accent-200: #f5d0fe
accent-300: #f0abfc
accent-400: #e879f9
accent-500: #d946ef
accent-600: #c026d3 /* Principal */
accent-700: #a21caf /* Hover/Active */
accent-800: #86198f
accent-900: #701a75
```

### Colores de Fondo y Neutrales

```css
/* Modo Claro */
bg-white: #ffffff
bg-gray-50: #f9fafb
bg-gray-100: #f3f4f6
bg-gray-200: #e5e7eb
text-gray-600: #4b5563
text-gray-700: #374151
text-gray-800: #1f2937
text-gray-900: #111827

/* Modo Oscuro (para futuras implementaciones) */
bg-gray-700: #374151
bg-gray-800: #1f2937
bg-gray-900: #111827
dark:text-gray-100: #f3f4f6
dark:text-gray-200: #e5e7eb
dark:text-white: #ffffff
```

### Gradientes Principales

```css
/* Gradiente Hero Principal */
from-primary-600 via-primary-700 to-accent-600

/* Gradientes Alternativos */
from-primary-500 to-accent-500
from-primary-400 to-accent-400
```

---

## 🎨 Paleta de Colores Propuesta (Naranja/Ámbar)

### Nueva Paleta Principal

```css
/* Naranja - Color principal de marca */
orange-50: #fff7ed
orange-100: #ffedd5
orange-200: #fed7aa
orange-300: #fdba74
orange-400: #fb923c
orange-500: #f97316 /* Principal */
orange-600: #ea580c /* Hover/Active */
orange-700: #c2410c
orange-800: #9a3412
orange-900: #7c2d12

/* Ámbar - Color secundario */
amber-50: #fffbeb
amber-100: #fef3c7
amber-200: #fde68a
amber-300: #fcd34d
amber-400: #fbbf24
amber-500: #f59e0b /* Secundario */
amber-600: #d97706
amber-700: #b45309
amber-800: #92400e
amber-900: #78350f

/* Amarillo - Acento cálido */
yellow-300: #fde047
yellow-400: #facc15
yellow-500: #eab308
```

### Gradientes Propuestos (Naranja/Ámbar)

```css
/* Gradientes principales */
from-orange-500 to-amber-500
from-orange-600 to-amber-600
from-orange-400 to-amber-400

/* Gradientes de fondo */
from-orange-50 via-amber-50 to-yellow-50

/* Gradientes Hero */
from-orange-600 via-orange-700 to-amber-600
```

---

## 🎯 Configuración de Tailwind CSS (Actual)

### Archivo `tailwind.config.mjs`

```javascript
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'prose',
    'prose-lg',
    'prose-headings:font-bold',
    'prose-headings:text-gray-900',
    'prose-p:text-gray-600',
    'prose-a:text-primary-600',
    'hover:prose-a:text-primary-700',
    'prose-img:rounded-xl',
    {
      pattern: /^prose(-\w+)?$/,
      variants: ['lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
```

### Configuración Propuesta (Naranja/Ámbar)

```javascript
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    'prose',
    'prose-lg',
    'prose-headings:font-bold',
    'prose-headings:text-gray-900',
    'prose-p:text-gray-600',
    'prose-a:text-orange-600',
    'hover:prose-a:text-orange-700',
    'prose-img:rounded-xl',
    {
      pattern: /^prose(-\w+)?$/,
      variants: ['lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float-delay 8s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'float-delay': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-15px)',
          },
        },
      },
    },
  },
  plugins: [typography],
};
```

---

## 📄 Estilos Globales

### Archivo `src/styles/global.css` (Actual)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-white text-gray-900 antialiased;
    font-family:
      'Inter',
      system-ui,
      -apple-system,
      sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold;
  }

  a {
    @apply transition-colors duration-200;
  }

  /* Accesibilidad: focus visible */
  *:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary-600;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }

  .btn-secondary {
    @apply btn bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400;
  }

  .section-container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .card {
    @apply rounded-xl bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl;
  }
}
```

### Estilos Globales Propuestos (Mejorados)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-white text-gray-900 antialiased;
    font-family:
      'Inter',
      system-ui,
      -apple-system,
      sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold;
  }

  a {
    @apply transition-colors duration-200;
  }

  /* Accesibilidad: focus visible */
  *:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary-600;
  }
}

@layer components {
  /* Botones */
  .btn {
    @apply inline-flex transform items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg hover:from-primary-700 hover:to-accent-700 hover:shadow-xl focus:ring-primary-500;
  }

  .btn-secondary {
    @apply btn border-2 border-white bg-white/90 text-gray-900 shadow-lg backdrop-blur-xl hover:bg-white focus:ring-gray-400;
  }

  /* Contenedores */
  .section-container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  /* Tarjetas */
  .card {
    @apply rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl;
  }

  .card-hover-accent {
    @apply card hover:border-primary-500;
  }

  /* Badges */
  .badge {
    @apply inline-flex items-center rounded-full px-4 py-2 text-sm font-medium;
  }

  .badge-primary {
    @apply badge bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700;
  }

  .badge-glass {
    @apply badge border border-white/60 bg-white/40 shadow-xl backdrop-blur-xl;
  }
}

@layer utilities {
  /* Animaciones personalizadas */
  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delay {
    animation: float-delay 8s ease-in-out infinite;
  }

  /* Delays */
  .delay-200 {
    animation-delay: 0.2s;
  }
  .delay-300 {
    animation-delay: 0.3s;
  }
  .delay-400 {
    animation-delay: 0.4s;
  }
  .delay-500 {
    animation-delay: 0.5s;
  }
  .delay-600 {
    animation-delay: 0.6s;
  }

  /* Glassmorphism */
  .glass {
    @apply border border-white/50 bg-white/90 shadow-2xl backdrop-blur-xl;
  }

  /* Text utilities */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Text shadow para legibilidad */
  .text-shadow-strong {
    text-shadow:
      2px 2px 8px rgba(0, 0, 0, 0.8),
      0 0 20px rgba(0, 0, 0, 0.5);
  }

  .text-shadow-soft {
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.9);
  }
}

/* Better text selection */
::selection {
  background-color: #ea580c;
  color: white;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-color: currentColor;
  }
}
```

---

## 🧩 Componentes de UI

### 1. Header (Actual)

```astro
---
const currentPath = Astro.url.pathname;
---

<header class="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
  <nav class="section-container py-4" aria-label="Navegación principal">
    <div class="flex items-center justify-between">
      <a href="/" class="text-2xl font-bold text-primary-600 hover:text-primary-700">
        Diversidad Funcional Mataró
      </a>

      <ul class="hidden items-center gap-6 md:flex">
        <li>
          <a
            href="/"
            class={`${currentPath === '/' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="/blog"
            class={`${currentPath.startsWith('/blog') ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
          >
            Blog
          </a>
        </li>
        <li>
          <a
            href="/documentos"
            class={`${currentPath === '/documentos' ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'}`}
          >
            Documentos
          </a>
        </li>
        <li>
          <a href="/asociate" class="btn-primary">Únete</a>
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button
        id="mobile-menu-button"
        class="p-2 text-gray-700 hover:text-primary-600 md:hidden"
        aria-label="Menú móvil"
        aria-expanded="false"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="mt-4 hidden pb-4 md:hidden">
      <ul class="flex flex-col gap-4">
        <li><a href="/" class="block text-gray-700 hover:text-primary-600">Inicio</a></li>
        <li><a href="/blog" class="block text-gray-700 hover:text-primary-600">Blog</a></li>
        <li>
          <a href="/documentos" class="block text-gray-700 hover:text-primary-600">Documentos</a>
        </li>
        <li><a href="/asociate" class="btn-primary w-full text-center">Únete</a></li>
      </ul>
    </div>
  </nav>
</header>

<script>
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
    });
  }
</script>
```

### 2. Header Propuesto (Mejorado con Glassmorphism)

```astro
---
const currentPath = Astro.url.pathname;

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/blog', label: 'Blog', matchPrefix: true },
  { href: '/documentos', label: 'Documentos' },
];
---

<header
  class="fixed left-0 right-0 top-0 z-50 border-b border-primary-200/20 bg-white/90 shadow-2xl shadow-primary-500/5 backdrop-blur-xl"
>
  <!-- Gradiente decorativo superior -->
  <div
    class="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-60"
  >
  </div>

  <nav class="section-container py-4" aria-label="Navegación principal">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <a
        href="/"
        class="group relative text-2xl font-bold text-primary-600 transition-colors duration-300 hover:text-primary-700"
      >
        <span class="relative z-10">Diversidad Funcional Mataró</span>
        <div
          class="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary-400/20 to-accent-400/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
        >
        </div>
      </a>

      <!-- Desktop Navigation -->
      <ul class="hidden items-center gap-2 md:flex">
        {
          navItems.map(({ href, label, matchPrefix }) => {
            const isActive = matchPrefix
              ? currentPath.startsWith(href) && href !== '/'
              : currentPath === href;

            return (
              <li>
                <a href={href} class="group relative" aria-current={isActive ? 'page' : undefined}>
                  <div class="relative">
                    {/* Glow effect */}
                    <div
                      class={`absolute -inset-2 rounded-xl bg-gradient-to-r from-primary-400 to-accent-400 blur-lg transition-opacity duration-500 ${
                        isActive ? 'opacity-40' : 'opacity-0 group-hover:opacity-40'
                      }`}
                    />

                    {/* Link container */}
                    <div
                      class={`relative rounded-xl border px-4 py-2.5 shadow-md transition-all duration-500 group-hover:shadow-xl ${
                        isActive
                          ? 'border-primary-400/70 bg-gradient-to-br from-primary-50 to-accent-50 shadow-lg'
                          : 'border-white/70 bg-gradient-to-br from-white to-primary-50/30'
                      }`}
                    >
                      <span
                        class={`whitespace-nowrap text-base font-semibold transition-colors duration-300 ${
                          isActive
                            ? 'text-primary-600'
                            : 'text-gray-800 group-hover:text-primary-600'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })
        }

        <li>
          <a href="/asociate" class="btn-primary ml-2"> Únete </a>
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button
        id="mobile-menu-button"
        class="rounded-lg p-2 text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 md:hidden"
        aria-label="Menú móvil"
        aria-expanded="false"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="mt-4 hidden pb-4 md:hidden">
      <ul class="flex flex-col gap-3">
        {
          navItems.map(({ href, label }) => (
            <li>
              <a
                href={href}
                class="block rounded-lg px-4 py-2 text-gray-700 transition-all hover:bg-primary-50 hover:text-primary-600"
              >
                {label}
              </a>
            </li>
          ))
        }
        <li>
          <a href="/asociate" class="btn-primary w-full text-center"> Únete </a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<script>
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
    });
  }
</script>
```

### 3. Hero (Actual)

```astro
<section
  class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 py-20 text-white md:py-32"
>
  <div class="section-container">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="mb-6 animate-fade-in text-4xl font-bold md:text-6xl">
        Por una Sociedad con Accesibilidad Universal
      </h1>
      <p class="mb-8 text-xl text-primary-100 md:text-2xl">
        Trabajamos por los derechos humanos de las personas con diversidad funcional en Mataró
      </p>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <a href="/asociate" class="btn bg-white text-primary-600 hover:bg-primary-50">
          Únete a Nosotros
        </a>
        <a
          href="/blog"
          class="btn border-2 border-white/30 bg-primary-500/20 text-white hover:bg-primary-500/30"
        >
          Conoce Nuestro Trabajo
        </a>
      </div>
    </div>
  </div>

  <!-- Decorative elements -->
  <div class="absolute bottom-0 left-0 right-0 h-20 bg-white"></div>
</section>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
</style>
```

### 4. Hero Propuesto (Con iconos flotantes y mejoras visuales)

```astro
---
// Iconos flotantes decorativos (puedes usar SVG inline)
---

<section
  class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600"
>
  <!-- Iconos flotantes decorativos -->
  <div class="absolute left-10 top-20 z-10 hidden animate-float lg:block">
    <div
      class="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-lg"
    >
      <svg
        class="h-8 w-8 animate-pulse text-primary-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        ></path>
      </svg>
    </div>
  </div>

  <div class="absolute right-20 top-40 z-10 hidden animate-float-delay lg:block">
    <div
      class="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-lg"
    >
      <svg
        class="h-10 w-10 animate-pulse text-accent-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        ></path>
      </svg>
    </div>
  </div>

  <div class="absolute bottom-32 left-1/4 z-10 hidden animate-float lg:block">
    <div
      class="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-lg"
    >
      <svg
        class="h-7 w-7 animate-pulse text-yellow-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    </div>
  </div>

  <!-- Contenido principal -->
  <div class="section-container relative z-20 py-20">
    <div class="mx-auto max-w-4xl text-center">
      <!-- Badge -->
      <div
        class="mb-8 inline-flex animate-fade-in items-center rounded-full border border-white/60 bg-white/40 px-4 py-2 shadow-2xl backdrop-blur-xl"
      >
        <svg class="mr-2 h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <span class="text-sm font-medium text-white drop-shadow-lg">
          Comprometidos con la diversidad funcional
        </span>
      </div>

      <!-- Título principal -->
      <h1
        class="text-shadow-strong mb-6 animate-fade-in text-5xl font-bold text-white delay-200 md:text-7xl"
      >
        Por una Sociedad con
        <span
          class="mt-2 block bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent"
        >
          Accesibilidad Universal
        </span>
      </h1>

      <!-- Descripción -->
      <p
        class="text-shadow-soft mx-auto mb-10 max-w-3xl animate-fade-in text-xl leading-relaxed text-white/95 delay-300 md:text-2xl"
      >
        Trabajamos por los derechos humanos de las personas con diversidad funcional en Mataró
      </p>

      <!-- CTAs -->
      <div class="delay-400 flex animate-fade-in flex-col justify-center gap-4 sm:flex-row">
        <a
          href="/asociate"
          class="group inline-flex transform items-center rounded-2xl bg-white px-8 py-4 font-bold text-primary-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary-50"
        >
          <span>Únete a Nosotros</span>
          <svg
            class="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
        <a
          href="/blog"
          class="group inline-flex transform items-center rounded-2xl border-2 border-white bg-white/90 px-8 py-4 font-bold text-primary-700 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white"
        >
          Conoce Nuestro Trabajo
          <svg
            class="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </a>
      </div>

      <!-- Stats o iconos informativos -->
      <div
        class="mx-auto mt-16 grid max-w-4xl animate-fade-in grid-cols-2 gap-6 delay-500 md:grid-cols-4"
      >
        <a
          href="/blog"
          class="group block cursor-pointer rounded-2xl p-4 text-center transition-all duration-300 hover:bg-black/30"
        >
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/50 bg-white/30 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary-400 group-hover:bg-primary-500"
          >
            <svg
              class="h-10 w-10 text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div class="text-shadow-strong mb-2 text-2xl font-bold text-white transition-colors">
            Comunidad
          </div>
          <div class="text-shadow-soft text-sm text-white">Unidos por la inclusión</div>
        </a>

        <a
          href="/documentos"
          class="group block cursor-pointer rounded-2xl p-4 text-center transition-all duration-300 hover:bg-black/30"
        >
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/50 bg-white/30 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-accent-400 group-hover:bg-accent-500"
          >
            <svg
              class="h-10 w-10 text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <div class="text-shadow-strong mb-2 text-2xl font-bold text-white transition-colors">
            Recursos
          </div>
          <div class="text-shadow-soft text-sm text-white">Información útil</div>
        </a>

        <a
          href="/blog"
          class="group block cursor-pointer rounded-2xl p-4 text-center transition-all duration-300 hover:bg-black/30"
        >
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/50 bg-white/30 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400 group-hover:bg-yellow-500"
          >
            <svg
              class="h-10 w-10 text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <div class="text-shadow-strong mb-2 text-2xl font-bold text-white transition-colors">
            Blog
          </div>
          <div class="text-shadow-soft text-sm text-white">Noticias y artículos</div>
        </a>

        <a
          href="/asociate"
          class="group block cursor-pointer rounded-2xl p-4 text-center transition-all duration-300 hover:bg-black/30"
        >
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/50 bg-white/30 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-green-400 group-hover:bg-green-500"
          >
            <svg
              class="h-10 w-10 text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div class="text-shadow-strong mb-2 text-2xl font-bold text-white transition-colors">
            Asóciate
          </div>
          <div class="text-shadow-soft text-sm text-white">Forma parte</div>
        </a>
      </div>
    </div>
  </div>

  <!-- Wave decoration -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg class="h-20 w-full fill-white md:h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path
        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
      ></path>
    </svg>
  </div>
</section>
```

### 5. Tarjetas de Características

```astro
---
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const { title, description, icon, href } = Astro.props as FeatureCardProps;
---

<a
  href={href}
  class="group relative block overflow-hidden rounded-3xl border-2 border-gray-100 bg-white p-8 no-underline shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary-500 hover:shadow-2xl"
>
  {/* Icon Container */}
  <div
    class="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 transition-transform duration-300 group-hover:scale-110"
  >
    <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon}></path>
    </svg>
  </div>

  {/* Content */}
  <div class="relative">
    <h3
      class="mb-4 text-xl font-bold text-gray-900 no-underline transition-colors duration-300 group-hover:text-primary-600"
    >
      {title}
    </h3>
    <p class="leading-relaxed text-gray-600 no-underline">
      {description}
    </p>
  </div>

  {/* Arrow Icon */}
  <div
    class="absolute bottom-6 right-6 h-10 w-10 transform text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-500"
  >
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
    </svg>
  </div>
</a>
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)

```css
/* Mobile: < 640px (por defecto) */
.clase {
  /* estilos base */
}

/* Small (sm): ≥ 640px */
@media (min-width: 640px) {
  .sm:clase {
    /* estilos */
  }
}

/* Medium (md): ≥ 768px */
@media (min-width: 768px) {
  .md:clase {
    /* estilos */
  }
}

/* Large (lg): ≥ 1024px */
@media (min-width: 1024px) {
  .lg:clase {
    /* estilos */
  }
}

/* Extra Large (xl): ≥ 1280px */
@media (min-width: 1280px) {
  .xl:clase {
    /* estilos */
  }
}
```

### Patrones Comunes

```html
<!-- Ocultar en móvil, mostrar en desktop -->
<div class="hidden lg:block">Desktop</div>

<!-- Mostrar en móvil, ocultar en desktop -->
<div class="lg:hidden">Mobile</div>

<!-- Grid responsive -->
<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  <!-- Items -->
</div>

<!-- Texto responsive -->
<h1 class="text-4xl md:text-6xl lg:text-7xl">Título</h1>

<!-- Padding responsive -->
<div class="px-4 sm:px-6 lg:px-8">Contenido</div>
```

---

## ♿ Accesibilidad

### Skip Link

```html
<a
  href="#main-content"
  class="sr-only z-50 rounded-md bg-primary-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
>
  Saltar al contenido principal
</a>
```

### ARIA Labels

```html
<!-- Botones de icono -->
<button aria-label="Abrir menú principal">
  <svg />
</button>

<!-- Links externos -->
<a
  href="URL"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Síguenos en Facebook (abre en nueva pestaña)"
>
  <svg />
</a>

<!-- Navegación activa -->
<a href="/ruta/" aria-current={isActive ? 'page' : undefined}>
  Link
</a>

<!-- Elementos decorativos -->
<div aria-hidden="true">
  <!-- Decoración -->
</div>
```

---

## 🚀 Comandos de Desarrollo

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Preview local
pnpm preview

# Type checking
pnpm check

# Deploy a Cloudflare Pages
pnpm deploy
```

---

## 📋 Checklist de Implementación

### Fase 1: Estilos Base ✓

- [x] Configuración actual de Tailwind CSS
- [x] Estilos globales base
- [x] Paleta de colores primaria (azul/púrpura)
- [ ] Implementar paleta naranja/ámbar alternativa
- [ ] Añadir animaciones personalizadas
- [ ] Implementar glassmorphism utilities

### Fase 2: Componentes ✓

- [x] Header básico con navegación
- [x] Hero básico con gradiente
- [ ] Header mejorado con glassmorphism
- [ ] Hero mejorado con iconos flotantes
- [ ] Tarjetas de características mejoradas
- [ ] Badges y pills

### Fase 3: Accesibilidad

- [ ] Implementar skip link
- [ ] Mejorar ARIA labels
- [ ] Verificar contraste de colores
- [ ] Probar navegación por teclado

### Fase 4: Optimización

- [ ] Optimizar animaciones
- [ ] Implementar prefers-reduced-motion
- [ ] Optimizar imágenes
- [ ] Mejorar performance

---

## 💡 Próximos Pasos Sugeridos

1. **Decidir paleta de colores**: Mantener azul/púrpura o cambiar a naranja/ámbar
2. **Implementar componentes mejorados**: Header y Hero con glassmorphism
3. **Añadir animaciones**: Floating icons, fade-in, etc.
4. **Mejorar accesibilidad**: Skip links, mejor contraste, ARIA labels
5. **Testing**: Probar en diferentes dispositivos y navegadores

---

## 🎉 Conclusión

Esta guía contiene:

✅ Configuración actual completa del proyecto
✅ Paleta de colores actual (azul/púrpura)
✅ Paleta alternativa propuesta (naranja/ámbar)
✅ Componentes actuales documentados
✅ Componentes mejorados propuestos
✅ Mejoras de UI con glassmorphism
✅ Animaciones personalizadas
✅ Guías de accesibilidad
✅ Patrones responsive

**Listo para implementar en la rama de desarrollo** 🚀
