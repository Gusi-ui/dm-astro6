/**
 * Textos de la interfaz común (cabecera, pie, plantilla base) en cada idioma.
 *
 * El catalán es un borrador pendiente de revisión por un socio: cualquier cambio
 * de redacción se hace aquí, sin tocar los componentes.
 */

export const ui = {
  es: {
    'site.name': 'Diversidad Funcional Mataró',
    'site.description':
      'Asociación de Diversidad Funcional en Mataró. Trabajamos por una sociedad con accesibilidad universal.',
    'layout.skipLink': 'Saltar al contenido principal',

    'nav.home': 'Inicio',
    'nav.association': 'Asociación',
    'nav.blog': 'Blog',
    'nav.documents': 'Documentos',
    'nav.contact': 'Contacto',
    'nav.join': 'Únete',
    'nav.main': 'Navegación principal',
    'nav.language': 'Idioma',
    'nav.mobileMenu': 'Menú móvil',

    'services.support': 'Apoyo Personalizado',
    'services.community': 'Comunidad Inclusiva',
    'services.actions': 'Actos Reivindicativos',
    'services.recognition': 'Reconocimiento Social',
    'services.accessibility': 'Accesibilidad Universal',
    'services.innovation': 'Innovación Constante',

    'footer.homeLink': 'Ir al inicio',
    'footer.mission':
      'Trabajamos de manera altruista y sin ánimo de lucro por una sociedad con accesibilidad universal, inclusión plena e integración real en Mataró.',
    'footer.follow': 'Síguenos',
    'footer.navLabel': 'Navegación del footer',
    'footer.navHeading': 'Navega',
    'footer.services': 'Servicios',
    'footer.contact': 'Contacto',
    'footer.email': 'Email',
    'footer.location': 'Ubicación',
    'footer.findUs': 'Encuéntranos',
    'footer.showMap': 'Mostrar mapa',
    'footer.mapNotice': 'Se carga Google Maps',
    'footer.mapTitle': 'Ubicación de DiverMataró en Mataró, Barcelona',
    'footer.ctaTitle': '¿Quieres ser parte del cambio?',
    'footer.ctaText': 'No cobramos ningún tipo de cuota · Todo es voluntario',
    'footer.ctaButton': 'Asóciate Gratis',
    'footer.privacy': 'Privacidad',
    'footer.dataDeletion': 'Eliminación de datos',
    'footer.madeWith': 'Hecho con',
    'footer.madeFor': 'por y para la diversidad',

    'whatsapp.message':
      'Hola, estoy contactando desde la página web de DiverMataró. Cuéntanos qué necesitas.',
    'whatsapp.tooltip': '¿Hablamos?',
    'whatsapp.label': 'Contactar por WhatsApp',

    'form.honeypot': 'No rellenes este campo',

    'services.badge': 'Nuestros Servicios',
    'services.back': 'Volver a servicios',
  },
  ca: {
    'site.name': 'Diversitat Funcional Mataró',
    'site.description':
      'Associació de Diversitat Funcional a Mataró. Treballem per una societat amb accessibilitat universal.',
    'layout.skipLink': 'Salta al contingut principal',

    'nav.home': 'Inici',
    'nav.association': 'Associació',
    'nav.blog': 'Blog',
    'nav.documents': 'Documents',
    'nav.contact': 'Contacte',
    'nav.join': 'Uneix-te',
    'nav.main': 'Navegació principal',
    'nav.language': 'Idioma',
    'nav.mobileMenu': 'Menú mòbil',

    'services.support': 'Suport personalitzat',
    'services.community': 'Comunitat inclusiva',
    'services.actions': 'Actes reivindicatius',
    'services.recognition': 'Reconeixement social',
    'services.accessibility': 'Accessibilitat universal',
    'services.innovation': 'Innovació constant',

    'footer.homeLink': 'Ves a l’inici',
    'footer.mission':
      'Treballem de manera altruista i sense ànim de lucre per una societat amb accessibilitat universal, inclusió plena i integració real a Mataró.',
    'footer.follow': 'Segueix-nos',
    'footer.navLabel': 'Navegació del peu de pàgina',
    'footer.navHeading': 'Navega',
    'footer.services': 'Serveis',
    'footer.contact': 'Contacte',
    'footer.email': 'Correu',
    'footer.location': 'Ubicació',
    'footer.findUs': 'On som',
    'footer.showMap': 'Mostra el mapa',
    'footer.mapNotice': 'Es carrega Google Maps',
    'footer.mapTitle': 'Ubicació de DiverMataró a Mataró, Barcelona',
    'footer.ctaTitle': 'Vols formar part del canvi?',
    'footer.ctaText': 'No cobrem cap mena de quota · Tot és voluntari',
    'footer.ctaButton': 'Associa’t gratis',
    'footer.privacy': 'Privacitat',
    'footer.dataDeletion': 'Eliminació de dades',
    'footer.madeWith': 'Fet amb',
    'footer.madeFor': 'per i per a la diversitat',

    'whatsapp.message':
      'Hola, contacto des de la pàgina web de DiverMataró. Explica’ns què necessites.',
    'whatsapp.tooltip': 'En parlem?',
    'whatsapp.label': 'Contacta per WhatsApp',

    'form.honeypot': 'No omplis aquest camp',

    'services.badge': 'Els nostres serveis',
    'services.back': 'Torna als serveis',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];
