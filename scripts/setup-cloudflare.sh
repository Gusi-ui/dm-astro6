#!/bin/bash

# Script para configurar Cloudflare D1 y Workers

echo "🚀 Configurando Cloudflare para el proyecto..."
echo ""

# Verificar si wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler no está instalado. Instalando..."
    pnpm add -D wrangler
fi

echo "📦 Paso 1: Crear base de datos D1..."
echo "Ejecutando: pnpm wrangler d1 create astro6dm-db"
echo ""
pnpm wrangler d1 create astro6dm-db

echo ""
echo "✅ Base de datos creada. Copia el 'database_id' que aparece arriba."
echo ""
echo "📝 Paso 2: Actualiza wrangler.jsonc con el database_id"
echo "   - Abre wrangler.jsonc"
echo "   - Reemplaza 'YOUR_DATABASE_ID' con el ID que copiaste"
echo ""
read -p "¿Ya actualizaste wrangler.jsonc con el database_id? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📊 Paso 3: Aplicar migraciones..."
    pnpm wrangler d1 migrations apply astro6dm-db
    
    echo ""
    echo "✅ Configuración completada!"
    echo ""
    echo "🔐 Paso 4: Iniciar sesión en Cloudflare (si aún no lo has hecho)"
    echo "   Ejecuta: pnpm wrangler login"
    echo ""
    echo "📋 Paso 5: Obtener Account ID"
    echo "   Ve a: https://dash.cloudflare.com/"
    echo "   Copia tu Account ID del dashboard"
    echo ""
    echo "🎉 ¡Listo para hacer deploy!"
else
    echo ""
    echo "⚠️  Actualiza wrangler.jsonc primero y luego ejecuta:"
    echo "   pnpm wrangler d1 migrations apply astro6dm-db"
fi
