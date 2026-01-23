#!/bin/bash

# Script para configurar Git y conectar con GitHub

echo "Inicializando repositorio Git..."
git init

echo "Añadiendo remoto de GitHub..."
git remote add origin https://github.com/Gusi-ui/dm-astro6.git

echo "Añadiendo todos los archivos..."
git add .

echo "Creando primer commit..."
git commit -m "Initial commit: Proyecto Astro 6 + Cloudflare para Asociación Diversidad Funcional"

echo "Configurando rama main..."
git branch -M main

echo "¡Listo! Ahora puedes hacer push con:"
echo "git push -u origin main"
