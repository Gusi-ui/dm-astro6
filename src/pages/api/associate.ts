import type { APIRoute } from 'astro';
import { Database } from '../../lib/db/client';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const db = locals.runtime?.env?.DB;
    
    if (!db) {
      return new Response(
        JSON.stringify({ success: false, error: 'Error de configuración del servidor' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const phone = formData.get('phone')?.toString();
    const message = formData.get('message')?.toString();

    // Validación básica
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'El nombre debe tener al menos 2 caracteres' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (message && message.length > 500) {
      return new Response(
        JSON.stringify({ success: false, error: 'El mensaje no puede exceder 500 caracteres' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const database = new Database(db);

    // Verificar si el email ya existe
    const existing = await database.getMemberByEmail(email);
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, error: 'Este email ya está registrado' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear nuevo miembro
    await database.createMember({
      name,
      email,
      phone: phone || undefined,
      message: message || undefined,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Gracias por unirte! Te contactaremos pronto por WhatsApp.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al procesar inscripción:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error al procesar tu solicitud. Por favor, intenta de nuevo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
