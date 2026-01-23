# Plan de Consolidación y Calidad de Código (Clean Code & Cloudflare)

## 1. Escudo de Calidad de Código (Clean Code Shield)

Para garantizar un código "100% limpio y sano" antes de cada push, implementaremos un sistema de validación automática.

### Herramientas a Implementar:

1.  **ESLint + Prettier**:
    - Configuración específica para Astro y TypeScript.
    - Reglas estrictas para prevenir errores comunes y asegurar consistencia de estilo.
    - Plugin de ordenamiento de importaciones y clases de Tailwind.
2.  **Husky + Lint-Staged**:
    - **Husky**: Intercepta el comando `git commit`.
    - **Lint-Staged**: Ejecuta las validaciones SOLO en los archivos que se han modificado (mucho más rápido).
    - **Regla**: Si hay errores o advertencias, el commit se bloquea automáticamente hasta que se corrijan.

### Flujo de Trabajo Resultante:

- Al intentar hacer commit:
  1.  Se formatea el código automáticamente (Prettier).
  2.  Se revisan errores de lógica y estilo (ESLint).
  3.  Se verifica la integridad de tipos (Astro Check).
  4.  Si todo está verde ✅ -> Commit exitoso.
  5.  Si hay fallos ❌ -> Commit rechazado con reporte de errores.

## 2. Configuración y Consolidación en Cloudflare

Aseguraremos que el entorno de Cloudflare esté listo para producción, más allá del simple despliegue de archivos estáticos.

### Acciones Pendientes:

1.  **Base de Datos D1**:
    - El proyecto referencia `astro6dm-db` (ID: `266aa...`).
    - **Acción**: Verificar si esta base de datos existe realmente en tu cuenta de Cloudflare y si tiene el esquema aplicado. Si no, inicializarla.
2.  **Variables de Entorno**:
    - Revisar si el proyecto necesita secretos en producción (ej. claves de API, tokens). Configurar estos en el panel de Cloudflare Pages o mediante `wrangler secret put`.
3.  **Optimizaciones**:
    - Habilitar compresión de assets automática en Cloudflare.
    - Revisar configuración de caché si fuera necesaria.

## 3. Hoja de Ruta de Implementación

1.  📦 **Instalar Dependencias de QA**: `eslint`, `prettier`, `husky`, `lint-staged`, y plugins asociados.
2.  ⚙️ **Configurar Reglas**: Crear `.eslintrc.cjs`, `.prettierrc`, y configuración de husky.
3.  🧪 **Prueba de Fuego**: Ejecutar una limpieza inicial de todo el código existente.
4.  ☁️ **Validación Cloudflare**: Ejecutar verificación de D1 y aplicar migraciones pendientes.
