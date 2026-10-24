/**
 * Textos que rodean a las dos páginas legales (privacidad y eliminación de datos).
 * El cuerpo de cada texto legal va entero en src/components/legal/, uno por idioma.
 * El catalán es un borrador pendiente de revisión por un socio.
 */

export const legal = {
  es: {
    'privacy.title': 'Política de Privacidad - Diversidad Funcional Mataró',
    'privacy.description':
      'Política de privacidad y protección de datos de la Asociación Diversidad Funcional Mataró.',
    'privacy.heading': 'Política de Privacidad',
    'deletion.title': 'Política de Eliminación de Datos - Diversidad Funcional Mataró',
    'deletion.description': 'Cómo solicitar la eliminación de tus datos personales en DiverMataró.',
    'deletion.heading': 'Política de Eliminación de Datos',
    'deletion.seePrivacy': 'Ver Política de Privacidad',
    updated: 'Última actualización: 13 de febrero de 2025',
    back: 'Volver al inicio',
  },
  ca: {
    'privacy.title': 'Política de Privacitat - Diversitat Funcional Mataró',
    'privacy.description':
      'Política de privacitat i protecció de dades de l’Asociación Diversidad Funcional Mataró.',
    'privacy.heading': 'Política de Privacitat',
    'deletion.title': 'Política d’Eliminació de Dades - Diversitat Funcional Mataró',
    'deletion.description':
      'Com sol·licitar l’eliminació de les teves dades personals a DiverMataró.',
    'deletion.heading': 'Política d’Eliminació de Dades',
    'deletion.seePrivacy': 'Consulta la Política de Privacitat',
    updated: 'Darrera actualització: 13 de febrer de 2025',
    back: 'Torna a l’inici',
  },
} as const;
