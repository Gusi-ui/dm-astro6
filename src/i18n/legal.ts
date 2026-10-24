/**
 * Textos que rodean a las dos páginas legales (privacidad y eliminación de datos).
 * El cuerpo de cada texto legal va entero en src/components/legal/, uno por idioma.
 * El catalán es un borrador pendiente de revisión por un socio.
 */

export const legal = {
  es: {
    'privacy.title': 'Política de Privacidad - Diversidad Funcional Mataró',
    'privacy.description':
      'Política de privacidad y protección de datos de ASSOCIACIO DIVERMATARO.',
    'privacy.heading': 'Política de Privacidad',
    'deletion.title': 'Política de Eliminación de Datos - Diversidad Funcional Mataró',
    'deletion.description': 'Cómo solicitar la eliminación de tus datos personales en DiverMataró.',
    'deletion.heading': 'Política de Eliminación de Datos',
    'deletion.seePrivacy': 'Ver Política de Privacidad',
    updated: 'Última actualización: 24 de octubre de 2026',
    back: 'Volver al inicio',
  },
  ca: {
    'privacy.title': 'Política de privacitat - Diversitat Funcional Mataró',
    'privacy.description':
      'Política de privacitat i protecció de dades de l’ASSOCIACIO DIVERMATARO.',
    'privacy.heading': 'Política de privacitat',
    'deletion.title': 'Política d’eliminació de dades - Diversitat Funcional Mataró',
    'deletion.description':
      'Com sol·licitar l’eliminació de les teves dades personals a DiverMataró.',
    'deletion.heading': 'Política d’eliminació de dades',
    'deletion.seePrivacy': 'Consulta la política de privacitat',
    updated: 'Darrera actualització: 24 d’octubre de 2026',
    back: 'Torna a l’inici',
  },
} as const;
