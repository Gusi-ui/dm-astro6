import type { APIRoute } from 'astro';
import { Database } from '../../lib/db/client';
import { getD1Database } from '../../lib/cloudflare';

// Endpoint para administradores - listar miembros
// En producción, deberías añadir autenticación aquí
export const GET: APIRoute = async () => {
  try {
    const db = getD1Database();

    if (!db) {
      return new Response(
        JSON.stringify({ success: false, error: 'Error de configuración del servidor' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const database = new Database(db);
    const members = await database.getAllMembers();

    return new Response(
      JSON.stringify({
        success: true,
        data: members,
        count: members.length,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Error al obtener miembros:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error al obtener los miembros' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
