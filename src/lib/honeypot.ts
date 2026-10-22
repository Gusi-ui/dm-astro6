/** Nombre del campo trampa de los formularios (ver components/forms/Honeypot.astro) */
export const HONEYPOT_FIELD = 'sitio_web';

/**
 * Las personas no ven el campo trampa, así que si llega relleno lo ha escrito
 * un bot. El endpoint responde como si todo hubiera ido bien, para no darle
 * pistas, pero no guarda ni envía nada.
 */
export const isHoneypotFilled = (value: unknown): boolean =>
  typeof value === 'string' && value.trim() !== '';
