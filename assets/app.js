/* ═══════════════════════════════════════════════════════════════
   RenovaPro Website — vanilla JS app
   - i18n (DE/ES/EN) with live language switching
   - Pillars accordion + locked-pillar smart contact prefill
   - 9-Gewerke detail toggle
   - Process step hover state
   - Dresden map render
   - References table render
   - Contact form with validation + ticket generation
═══════════════════════════════════════════════════════════════ */

// ── i18n table ───────────────────────────────────────────────────
const COPY = {
  de: {
    nav: { leist: "Leistungen", proj: "Projekte", proz: "Prozess", uns: "Über uns", kontakt: "Kontakt" },
    hero: {
      pill: "12 aktive Baustellen in Dresden",
      h1a: "Renovierung, Reinigung &", h1b: "Bauleitung", h1c: " in Dresden.",
      sub: "Wir renovieren Ihre Wohnung, machen sie sauber und übergeben sie an Sie oder Ihren neuen Mieter — alles aus einer Hand. Ein fester Ansprechpartner, ein fairer Festpreis, ein Team das Ihre Sprache spricht.",
      cta1: "Angebot anfragen", cta2: "So arbeiten wir",
      s1: "Wohneinheiten übergeben", s2: "Mitarbeiter inhouse", s3: "Pünktlichkeit", s4: "Sprachen im Team"
    },
    leist: {
      eyebrow: "Was wir machen",
      h2a: "Vier Bereiche — ", h2b: "ein Ansprechpartner.",
      sub: "Vier Kerngeschäfte unter einem Dach. Klicken Sie auf einen Bereich, um die enthaltenen Leistungen zu sehen.",
      more: "9 Gewerke im Detail ansehen",
      locked: "Auf Anfrage — Kontakt hinterlassen"
    },
    pillars: [
      { i: "wrench", t: "Malerarbeiten", de: "Renovierung & Handwerk", d: "Maler-, Boden-, Fliesen- und Sanitärarbeiten — alles inhouse, ohne Subunternehmer-Kette.", items: ["Wand- & Deckenanstriche","Tapezier- und Spachtelarbeiten","Boden- und Fliesenverlegung","Bad-Komplettsanierung","Elektro & Sanitär (VDE-konform)","Innentüren & kleine Schreinerarbeiten"], lock: false },
      { i: "spray",  t: "Professionelle Reinigung", de: "Bauend- & Unterhaltsreinigung", d: "Bauendreinigung vor Übergabe, regelmäßige Treppenhausreinigung, Sonderreinigung.", items: ["Bauendreinigung & Übergabe-Vorbereitung","Wohnungsreinigung nach Auszug","Treppenhaus- und Gebäudereinigung","Glas- und Fensterreinigung","Sonder- und Grundreinigung"], lock: false },
      { i: "bolt",   t: "IT-Lösungen", de: "Software für Handwerk & Verwaltung", d: "Wir entwickeln intern — dieselben Tools können wir für andere Firmen anpassen. Auf Anfrage.", items: [], lock: true },
      { i: "shield", t: "Investitionen / Bauprojekte", de: "Strategische Partnerschaften", d: "Persönliche Termine. Bitte Kontakt hinterlassen — wir rufen zurück.", items: [], lock: true }
    ],
    process: { eyebrow: "So arbeiten wir", h2: "Vom Anruf bis zur Abnahme.", sub: "Klare Schritte, feste Fristen, ein Ansprechpartner pro Projekt." },
    proc: [
      { n: "01", t: "Aufmaß",     de: "Vor-Ort-Termin", d: "In 48 Stunden bei Ihnen — Maße, Fotos, Mängelliste." },
      { n: "02", t: "Angebot",    de: "LV / Festpreis",  d: "Schriftlich, pro Gewerk, in 5 Werktagen — keine Überraschungen." },
      { n: "03", t: "Ausführung", de: "Bauphase",        d: "Parallele Gewerke, tägliches Bautagebuch, mehrsprachiges Team." },
      { n: "04", t: "Qualität",   de: "QA + Reinigung",  d: "Eigener Inspektor, Mängellisten geschlossen, Endreinigung." },
      { n: "05", t: "Abnahme",    de: "Übergabe",        d: "Formelle Abnahme + 2 Jahre Gewährleistung." }
    ],
    trust: {
      eyebrow: "Vertrauen", h2: "Über 150 Wohneinheiten in Dresden übergeben.",
      sub: "Wir arbeiten seit 2019 mit den größten Vermietern in Sachsen.",
      n1: "Wohneinheiten übergeben", n2: "Pünktlichkeit (12 Monate)", n3: "Mitarbeiter inhouse", n4: "Jahre Gewährleistung",
      live: "Live · Aktive Baustellen", in_zahlen: "in Zahlen", stand: "Stand · Mai 2026", map_title: "Dresden · Karte",
      leg1: "In Bearbeitung", leg2: "Übergeben", leg3: "Aufmaß / Start"
    },
    proj: {
      eyebrow: "Referenzen", h2a: "Aktuelle ", h2b: "Projekte.",
      sub: "Eine Auswahl unserer laufenden und kürzlich übergebenen Wohneinheiten in Dresden.",
      head: { typ: "Auftragsart", einh: "Einheiten", reg: "Region", jahr: "Jahr", st: "Status" },
      done: "Übergeben", open: "In Ausführung",
      note: "Aus Datenschutzgründen nennen wir Auftraggeber und konkrete Adressen nur auf direkte Anfrage und mit Einverständnis."
    },
    about: {
      eyebrow: "Über uns · Dresden", h2a: "Handwerk mit ", h2b: "klarem Standard.",
      p1: "RenovaPro ist ein in Dresden ansässiges Handwerksunternehmen für Wohnungsrenovierung, Reinigung und Bauleitung. Festes, mehrsprachiges Team — alle Gewerke inhouse, ohne Subunternehmer-Kette.",
      p2: "Wir arbeiten nach den Standards institutioneller Vermieter: feste Fristen, klare Dokumentation, ein Ansprechpartner pro Projekt. Unsere interne Plattform sorgt für lückenlose Bautagebücher und transparente Übergaben.",
      quote: "„Ein Wort, ein Termin, eine Übergabe — ohne Umwege.\""
    },
    values: [
      { t: "Inhouse-Team",    d: "Alle Gewerke unter einem Dach. Keine Subunternehmer, keine Schnittstellen-Verluste." },
      { t: "Mehrsprachig",    d: "DE · ES · RU · SR · HR — Kommunikation ohne Reibung, Sicherheit auf der Baustelle." },
      { t: "Lückenlose Doku", d: "Tägliches Bautagebuch, Mängellisten, Abnahmeprotokoll — alles digital, alles nachvollziehbar." },
      { t: "Pünktlichkeit",   d: "96 % der Übergaben im vereinbarten Termin. Verlässlichkeit ist Teil des Vertrags." }
    ],
    kontakt: {
      eyebrow: "Kontakt", h2: "Schreiben Sie uns.",
      sub: "Antwort innerhalb von 24 Stunden, Vor-Ort-Termin in 48 Stunden.",
      title_lbl: "Anfrage", title: "Was können wir für Sie tun?",
      f_name_l: "Name *", f_name_p: "Thomas Müller",
      f_company: "Firma / Auftraggeber", f_company_p: "Hausverwaltung oder privat",
      f_email_l: "E-Mail *", f_email_p: "name@beispiel.de",
      f_phone: "Telefon", f_phone_p: "+49 351 123456",
      f_subject: "Worum geht es?",
      f_subject_o: ["Kostenloses Angebot","Wartungsvertrag","Bauleitung anfragen","Sonstiges"],
      f_msg_l: "Nachricht *", f_msg_p: "Adresse, Wohneinheiten, gewünschte Leistungen, Wunschtermin…",
      consent: "Mit dem Absenden akzeptieren Sie die Datenschutzerklärung.",
      send: "Anfrage senden", okT: "Vielen Dank!", okD: "Ihre Nachricht ist bei uns. Wir melden uns innerhalb von 24 Stunden.",
      ch_phone: "Telefon", ch_mail: "E-Mail", ch_loc: "Standort"
    },
    foot: {
      blurb: "Familienbetrieb für Wohnungsrenovierung, Reinigung und Bauleitung in Dresden. 13 Mitarbeiter, vier Sprachen, eine Plattform.",
      c1: "Leistungen", c2: "Unternehmen", c3: "Recht", portal: "Mitarbeiter-Portal",
      l1: "Renovierung", l2: "Reinigung", l3: "Elektro & Sanitär", l4: "Bauleitung",
      r1: "Impressum", r2: "Datenschutz", r3: "AGB"
    }
  },

  es: {
    nav: { leist: "Servicios", proj: "Proyectos", proz: "Proceso", uns: "Nosotros", kontakt: "Contacto" },
    hero: {
      pill: "12 obras activas en Dresden",
      h1a: "Renovaciones, limpieza y", h1b: "control de obra", h1c: " para grandes propietarios.",
      sub: "Empresa familiar en Dresden. Renovación integral, limpieza final y entrega — un solo contacto, precio cerrado, equipo multilingüe.",
      cta1: "Solicitar oferta", cta2: "Cómo trabajamos",
      s1: "Unidades entregadas", s2: "Trabajadores en casa", s3: "Puntualidad", s4: "Idiomas del equipo"
    },
    leist: {
      eyebrow: "Lo que hacemos", h2a: "Cuatro áreas — ", h2b: "un solo contacto.",
      sub: "Cuatro negocios bajo un mismo techo. Haz clic en un área para ver lo que incluye.",
      more: "Ver los 9 oficios en detalle", locked: "Bajo consulta — deja tus datos"
    },
    pillars: [
      { i: "wrench", t: "Trabajos de pintura", de: "Renovación y oficios", d: "Pintura, pisos, azulejos y sanitarios — todo en casa, sin cadena de subcontratistas.", items: ["Pintura de paredes y techos","Empapelado y enlucido","Pisos y azulejos","Reforma integral de baños","Eléctrica y sanitaria (VDE)","Puertas interiores y carpintería menor"], lock: false },
      { i: "spray",  t: "Limpieza profesional", de: "Limpieza final y mantenimiento", d: "Limpieza pre-entrega, escaleras, limpiezas especiales.", items: ["Limpieza final pre-entrega","Limpieza tras desocupación","Escaleras y comunes","Cristales y ventanas","Limpiezas especiales y a fondo"], lock: false },
      { i: "bolt",   t: "Soluciones IT", de: "Software para oficio y gestión", d: "Desarrollamos internamente. Adaptamos las mismas herramientas para otras empresas. Bajo consulta.", items: [], lock: true },
      { i: "shield", t: "Inversiones / Obra propia", de: "Asociaciones estratégicas", d: "Citas personales. Deja tu contacto y te llamamos.", items: [], lock: true }
    ],
    process: { eyebrow: "Cómo trabajamos", h2: "Del contacto a la entrega.", sub: "Pasos claros, plazos fijos, un solo responsable." },
    proc: [
      { n: "01", t: "Levantamiento", de: "On-site",         d: "En 48 horas — medidas, fotos, lista de defectos." },
      { n: "02", t: "Cotización",    de: "Precio cerrado",  d: "Por escrito, por oficio, en 5 días — sin sorpresas." },
      { n: "03", t: "Ejecución",     de: "Obra",            d: "Oficios en paralelo, bitácora diaria, equipo multilingüe." },
      { n: "04", t: "Calidad",       de: "QA + Limpieza",   d: "Inspector propio, defectos cerrados, limpieza final." },
      { n: "05", t: "Entrega",       de: "Abnahme",         d: "Entrega formal + 2 años de garantía." }
    ],
    trust: {
      eyebrow: "Confianza", h2: "Más de 150 unidades entregadas en Dresden.",
      sub: "Trabajamos desde 2019 con los grandes propietarios de Sajonia.",
      n1: "Unidades entregadas", n2: "Puntualidad (12 meses)", n3: "Trabajadores en casa", n4: "Años de garantía",
      live: "En vivo · Obras activas", in_zahlen: "en cifras", stand: "Mayo 2026", map_title: "Dresden · Mapa",
      leg1: "En obra", leg2: "Entregado", leg3: "Levantamiento / Inicio"
    },
    proj: {
      eyebrow: "Referencias", h2a: "Proyectos ", h2b: "actuales.",
      sub: "Una selección de nuestras unidades en obra y recientemente entregadas.",
      head: { typ: "Tipo de obra", einh: "Unidades", reg: "Región", jahr: "Año", st: "Estado" },
      done: "Entregado", open: "En ejecución",
      note: "Por motivos de privacidad, indicamos clientes y direcciones concretas solo bajo consulta directa y con su consentimiento."
    },
    about: {
      eyebrow: "Sobre nosotros · Dresden", h2a: "Oficio con ", h2b: "estándar claro.",
      p1: "RenovaPro es una empresa de Dresden dedicada a renovación de viviendas, limpieza y control de obra. Equipo fijo y multilingüe — todos los oficios en casa, sin cadena de subcontratistas.",
      p2: "Trabajamos con los estándares de los grandes propietarios: plazos fijos, documentación clara, un solo contacto por proyecto. Nuestra plataforma interna asegura bitácoras de obra completas y entregas transparentes.",
      quote: "„Una palabra, una cita, una entrega — sin rodeos.\""
    },
    values: [
      { t: "Equipo en casa",  d: "Todos los oficios bajo un mismo techo. Sin subcontratistas, sin pérdidas en el handoff." },
      { t: "Multilingüe",      d: "DE · ES · RU · SR · HR — comunicación sin fricción, seguridad en la obra." },
      { t: "Documentación completa", d: "Bitácora diaria, listas de defectos, acta de entrega — todo digital y trazable." },
      { t: "Puntualidad",      d: "96 % de entregas en la fecha pactada. La fiabilidad es parte del contrato." }
    ],
    kontakt: {
      eyebrow: "Contacto", h2: "Escríbenos.",
      sub: "Respuesta en 24 horas, visita en 48 horas.",
      title_lbl: "Solicitud", title: "¿Qué podemos hacer por ti?",
      f_name_l: "Nombre *", f_name_p: "María García",
      f_company: "Empresa / Cliente", f_company_p: "Administración o particular",
      f_email_l: "Email *", f_email_p: "nombre@ejemplo.com",
      f_phone: "Teléfono", f_phone_p: "+49 351 123456",
      f_subject: "¿De qué se trata?",
      f_subject_o: ["Cotización gratis","Contrato de mantenimiento","Bauleitung","Otro"],
      f_msg_l: "Mensaje *", f_msg_p: "Dirección, unidades, servicios deseados, fecha…",
      consent: "Al enviar aceptas la política de privacidad.",
      send: "Enviar solicitud", okT: "¡Gracias!", okD: "Tu mensaje llegó. Te respondemos en 24 horas.",
      ch_phone: "Teléfono", ch_mail: "Email", ch_loc: "Ubicación"
    },
    foot: {
      blurb: "Empresa familiar de renovación, limpieza y control de obra en Dresden. 13 trabajadores, cuatro idiomas, una plataforma.",
      c1: "Servicios", c2: "Empresa", c3: "Legal", portal: "Portal interno",
      l1: "Renovación", l2: "Limpieza", l3: "Eléctrica y sanitaria", l4: "Control de obra",
      r1: "Aviso legal", r2: "Privacidad", r3: "Términos"
    }
  },

  en: {
    nav: { leist: "Services", proj: "Projects", proz: "Process", uns: "About", kontakt: "Contact" },
    hero: {
      pill: "12 active worksites in Dresden",
      h1a: "Renovation, cleaning &", h1b: "site management", h1c: " for institutional landlords.",
      sub: "Family business in Dresden. Full refurb, final cleaning and handover — one contact, fixed price, multilingual team.",
      cta1: "Request quote", cta2: "How we work",
      s1: "Apartments delivered", s2: "Workers in-house", s3: "On-time rate", s4: "Languages in team"
    },
    leist: {
      eyebrow: "What we do", h2a: "Four areas — ", h2b: "one contact.",
      sub: "Four businesses under one roof. Click an area to see what's included.",
      more: "See all 9 trades in detail", locked: "On request — leave your contact"
    },
    pillars: [
      { i: "wrench", t: "Painting works", de: "Renovation & trades", d: "Painting, flooring, tiling and plumbing — all in-house.", items: ["Wall and ceiling painting","Wallpapering and plastering","Floor and tile work","Full bathroom refurb","Electrical and plumbing (VDE)","Interior doors and minor carpentry"], lock: false },
      { i: "spray",  t: "Professional cleaning", de: "Final & maintenance", d: "Pre-handover cleaning, stairwells, special cleaning.", items: ["Pre-handover cleaning","Move-out apartment cleaning","Stairwell and common areas","Glass and window cleaning","Special and deep cleaning"], lock: false },
      { i: "bolt",   t: "IT solutions", de: "Software for trades & ops", d: "We build in-house. We adapt the same tools for other firms. On request.", items: [], lock: true },
      { i: "shield", t: "Investments / Building projects", de: "Strategic partnerships", d: "Personal meetings only. Please leave your contact.", items: [], lock: true }
    ],
    process: { eyebrow: "How we work", h2: "From call to handover.", sub: "Clear steps, fixed deadlines, one owner per project." },
    proc: [
      { n: "01", t: "Survey",    de: "On-site",     d: "Within 48 hours — measurements, photos, defect list." },
      { n: "02", t: "Quote",     de: "Fixed price", d: "Written, per trade, in 5 business days — no surprises." },
      { n: "03", t: "Execution", de: "Build phase", d: "Parallel trades, daily construction log, multilingual team." },
      { n: "04", t: "Quality",   de: "QA + cleaning", d: "Own inspector, defects closed, final cleaning." },
      { n: "05", t: "Handover",  de: "Abnahme",     d: "Formal handover + 2-year warranty." }
    ],
    trust: {
      eyebrow: "Trust", h2: "150+ apartments delivered in Dresden.",
      sub: "Working with Saxony's largest landlords since 2019.",
      n1: "Apartments delivered", n2: "On-time rate (12mo)", n3: "Workers in-house", n4: "Years warranty",
      live: "Live · Active worksites", in_zahlen: "in numbers", stand: "May 2026", map_title: "Dresden · Map",
      leg1: "In progress", leg2: "Delivered", leg3: "Survey / Start"
    },
    proj: {
      eyebrow: "References", h2a: "Current ", h2b: "projects.",
      sub: "A selection of our running and recently delivered apartments.",
      head: { typ: "Type of work", einh: "Units", reg: "Region", jahr: "Year", st: "Status" },
      done: "Delivered", open: "In progress",
      note: "For privacy reasons, we only share clients and concrete addresses on direct request and with their consent."
    },
    about: {
      eyebrow: "About us · Dresden", h2a: "Craftsmanship, ", h2b: "clear standard.",
      p1: "RenovaPro is a Dresden-based trade company for apartment renovation, cleaning and site management. A stable, multilingual team — all trades in-house, with no subcontractor chain.",
      p2: "We work to the standards of institutional landlords: fixed deadlines, clear documentation, one contact per project. Our internal platform ensures complete construction logs and transparent handovers.",
      quote: "„One word, one date, one handover — without detours.\""
    },
    values: [
      { t: "In-house team",    d: "All trades under one roof. No subcontractors, no handoff losses." },
      { t: "Multilingual",     d: "DE · ES · RU · SR · HR — frictionless communication, safety on site." },
      { t: "Complete docs",    d: "Daily construction log, defect lists, handover protocol — all digital, all traceable." },
      { t: "On-time",          d: "96 % of handovers on the agreed date. Reliability is part of the contract." }
    ],
    kontakt: {
      eyebrow: "Contact", h2: "Get in touch.",
      sub: "Reply within 24 hours, on-site visit in 48 hours.",
      title_lbl: "Request", title: "What can we do for you?",
      f_name_l: "Name *", f_name_p: "Thomas Smith",
      f_company: "Company / client", f_company_p: "Property mgmt or private",
      f_email_l: "Email *", f_email_p: "name@example.com",
      f_phone: "Phone", f_phone_p: "+49 351 123456",
      f_subject: "What's it about?",
      f_subject_o: ["Free quote","Maintenance contract","Site management","Other"],
      f_msg_l: "Message *", f_msg_p: "Address, units, services, preferred date…",
      consent: "By submitting you accept the privacy policy.",
      send: "Send request", okT: "Thank you!", okD: "Your message arrived. We'll get back to you within 24 hours.",
      ch_phone: "Phone", ch_mail: "Email", ch_loc: "Location"
    },
    foot: {
      blurb: "Family-run renovation, cleaning and site management in Dresden. 13 workers, four languages, one platform.",
      c1: "Services", c2: "Company", c3: "Legal", portal: "Staff portal",
      l1: "Renovation", l2: "Cleaning", l3: "Electrical & plumbing", l4: "Site management",
      r1: "Imprint", r2: "Privacy", r3: "Terms"
    }
  }
};

// ── Static data (locale-independent) ─────────────────────────────
const GEWERKE = [
  { code: "ML", name: "Maler",     de: "Pintura",          d: "Wand- & Deckenanstriche, Tapezieren, Spachtelarbeiten." },
  { code: "FL", name: "Fliesen",   de: "Azulejos",         d: "Boden- und Wandfliesen, Badverkleidung mit Hydroisolierung." },
  { code: "OB", name: "Oberboden", de: "Pisos base",       d: "Estrich, Vinyl, Laminat, Parkett — vom Untergrund bis zur Übergabeleiste." },
  { code: "SA", name: "Sanitär",   de: "Fontanería",       d: "Bad-Komplettsanierung, Armaturen, Abflüsse, Heizungsanschluss." },
  { code: "EL", name: "Elektro",   de: "Eléctrica",        d: "Verkabelung, Sicherungskasten, Beleuchtung — VDE-konform." },
  { code: "TI", name: "Türen",     de: "Carpintería",      d: "Innentüren, Zargen, Schließanlagen, kleinere Schreinerarbeiten." },
  { code: "GB", name: "Allgemein", de: "Trabajo general",  d: "Beräumung, Trockenbau, Wandöffnungen, Vorarbeiten." },
  { code: "RE", name: "Reinigung", de: "Limpieza",         d: "Bauendreinigung, Glasreinigung, Übergabe-Vorbereitung." },
  { code: "AB", name: "Abnahme",   de: "Inspección final", d: "Formelle Abnahme mit dem Eigentümer, Mängelliste, Protokoll." }
];

const SITES = [
  { id: "S1", x: 28, y: 38, addr: "Dresden Süd-Ost",   tone: "green",   pct: 100 },
  { id: "S2", x: 44, y: 30, addr: "Dresden Nord",      tone: "default", pct: 64 },
  { id: "S3", x: 56, y: 46, addr: "Dresden Ost",       tone: "default", pct: 78 },
  { id: "S4", x: 38, y: 54, addr: "Dresden Süd",       tone: "amber",   pct: 38 },
  { id: "S5", x: 64, y: 28, addr: "Dresden Nord-Ost",  tone: "green",   pct: 100 },
  { id: "S6", x: 50, y: 62, addr: "Dresden West",      tone: "default", pct: 52 },
  { id: "S7", x: 32, y: 24, addr: "Dresden Nord-West", tone: "amber",   pct: 22 }
];

const REF_ROWS = [
  { typ_key: "ref_typ_1", einheiten: "12 WE", region_key: "ref_reg_1", jahr: "2025", status: "done" },
  { typ_key: "ref_typ_2", einheiten: "4 WE",  region_key: "ref_reg_2", jahr: "2025", status: "done" },
  { typ_key: "ref_typ_3", einheiten: "8 WE",  region_key: "ref_reg_3", jahr: "2026", status: "open" },
  { typ_key: "ref_typ_4", einheiten: "24 WE", region_key: "ref_reg_4", jahr: "2026", status: "open" }
];
const REF_LABELS = {
  de: { ref_typ_1: "Komplettsanierung", ref_typ_2: "Bad-Sanierung + EL", ref_typ_3: "Maler + Boden", ref_typ_4: "Komplettsanierung",
        ref_reg_1: "Dresden Süd-Ost",   ref_reg_2: "Dresden Nord-Ost",   ref_reg_3: "Dresden Ost",   ref_reg_4: "Dresden Nord" },
  es: { ref_typ_1: "Renovación integral", ref_typ_2: "Reforma de baño + EL", ref_typ_3: "Pintura + pisos", ref_typ_4: "Renovación integral",
        ref_reg_1: "Dresden Sureste",   ref_reg_2: "Dresden Nor-este",   ref_reg_3: "Dresden Este",   ref_reg_4: "Dresden Norte" },
  en: { ref_typ_1: "Full refurb", ref_typ_2: "Bathroom refurb + electrical", ref_typ_3: "Painting + flooring", ref_typ_4: "Full refurb",
        ref_reg_1: "Dresden South-East", ref_reg_2: "Dresden North-East", ref_reg_3: "Dresden East", ref_reg_4: "Dresden North" }
};

// ── SVG icon library ─────────────────────────────────────────────
const ICONS = {
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  spray:  '<path d="M3 3h6v6H3zM6 9v12M3 21h6"/><path d="M14 4h7M14 8h5M14 12h7"/>',
  bolt:   '<path d="M13 2L3 14h7l-1 8 11-12h-7z"/>',
  shield: '<path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/>',
  chev:   '<path d="m6 9 6 6 6-6"/>'
};
function svg(icon, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[icon]}</svg>`;
}

// ── State ────────────────────────────────────────────────────────
const STATE = {
  lang: "de",
  openPillar: null,
  openDetails: false
};

// ── Helpers ──────────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function applyI18n() {
  const t = COPY[STATE.lang];
  document.documentElement.lang = STATE.lang;
  $$("[data-i18n]").forEach(el => {
    const v = getPath(t, el.dataset.i18n);
    if (typeof v === "string") el.textContent = v;
  });
  // active state for lang switcher
  $$(".lang button").forEach(b => b.classList.toggle("on", b.dataset.lang === STATE.lang));
}

// ── Render: 4 service pillars ────────────────────────────────────
function renderPillars() {
  const t = COPY[STATE.lang];
  const root = $("#pillars");
  root.innerHTML = "";
  t.pillars.forEach((p, i) => {
    const isOpen = STATE.openPillar === i;
    const div = document.createElement("div");
    div.className = "pillar" + (p.lock ? " locked" : "") + (isOpen ? " open" : "");
    div.dataset.idx = String(i);
    const head = `
      <div class="pillar-head">
        <div class="pillar-icon">${svg(p.i, 20)}</div>
        ${p.lock
          ? `<span class="lock-badge">${svg("shield", 11)} <span>${t.leist.locked}</span></span>`
          : `<span class="chev-toggle">${svg("chev", 16)}</span>`}
      </div>
      <h3>${p.t}</h3>
      <div class="pillar-de">${p.de}</div>
      <p>${p.d}</p>`;
    let body = "";
    if (!p.lock) {
      const itemsHtml = p.items.map(it => `<li>${it}</li>`).join("");
      body = `<div class="pillar-items${isOpen ? " open" : ""}"><ul>${itemsHtml}</ul></div>`;
    }
    div.innerHTML = head + body;
    div.addEventListener("click", () => onPillarClick(i, p));
    root.appendChild(div);
  });
}

function onPillarClick(i, p) {
  if (p.lock) {
    const target = $("#kontakt");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    // prefill subject + tag message
    const t = COPY[STATE.lang];
    const subjEl = $("#f-subject");
    const msgEl = $("#f-msg");
    if (subjEl) {
      const lastOpt = t.kontakt.f_subject_o[t.kontakt.f_subject_o.length - 1];
      subjEl.value = lastOpt;
    }
    if (msgEl && !msgEl.value) {
      msgEl.value = `[${p.t}] `;
      msgEl.focus();
    }
    validateForm();
    return;
  }
  STATE.openPillar = STATE.openPillar === i ? null : i;
  renderPillars();
}

// ── Render: 9 Gewerke detail table ───────────────────────────────
function renderGewerke() {
  const root = $("#gewerke-table");
  root.innerHTML = GEWERKE.map(g => `
    <div class="gw-row">
      <div class="code">${g.code}</div>
      <div class="name">${g.name}<small>${g.de}</small></div>
      <div class="desc">${g.d}</div>
    </div>`).join("");
}

// ── Render: process steps ────────────────────────────────────────
function renderProcess() {
  const t = COPY[STATE.lang];
  const root = $("#process-track");
  root.innerHTML = "";
  let activeIdx = 2; // default highlight
  t.proc.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "step" + (i === activeIdx ? " on" : "");
    div.innerHTML = `
      <div class="step-dot">${p.n}</div>
      <div class="step-title">${p.t}</div>
      <div class="step-de">${p.de}</div>
      <div class="step-desc">${p.d}</div>`;
    div.addEventListener("mouseenter", () => {
      $$(".step", root).forEach(s => s.classList.remove("on"));
      div.classList.add("on");
    });
    root.appendChild(div);
  });
}

// ── Render: Dresden map ──────────────────────────────────────────
function renderMap() {
  const root = $("#map-svg");
  // SVG background (district silhouettes + Elbe + labels)
  const svgBg = `
    <svg viewBox="0 0 100 70" style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none">
      <defs>
        <pattern id="mapgrid" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(44,58,85,0.4)" stroke-width="0.2"/>
        </pattern>
      </defs>
      <rect width="100" height="70" fill="url(#mapgrid)"/>
      <path d="M 0,42 Q 18,38 28,40 Q 40,46 52,38 Q 65,30 78,34 Q 90,38 100,32" stroke="rgba(77,184,224,0.35)" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M 0,42 Q 18,38 28,40 Q 40,46 52,38 Q 65,30 78,34 Q 90,38 100,32" stroke="rgba(77,184,224,0.6)" stroke-width="0.6" fill="none" stroke-dasharray="0.5 1.5"/>
      <path d="M 8 18 Q 22 12 38 16 Q 50 22 48 32 Q 38 36 22 32 Q 10 28 8 18 Z" fill="rgba(27,37,56,0.5)" stroke="rgba(44,58,85,0.7)" stroke-width="0.3"/>
      <path d="M 52 14 Q 70 10 84 18 Q 92 26 86 32 Q 72 32 60 28 Q 50 22 52 14 Z" fill="rgba(27,37,56,0.5)" stroke="rgba(44,58,85,0.7)" stroke-width="0.3"/>
      <path d="M 16 46 Q 28 44 40 50 Q 50 58 42 64 Q 26 66 16 60 Q 10 52 16 46 Z" fill="rgba(27,37,56,0.5)" stroke="rgba(44,58,85,0.7)" stroke-width="0.3"/>
      <path d="M 54 48 Q 70 42 88 46 Q 94 56 84 62 Q 68 64 56 60 Q 50 54 54 48 Z" fill="rgba(27,37,56,0.5)" stroke="rgba(44,58,85,0.7)" stroke-width="0.3"/>
      <text x="22" y="24" fill="rgba(110,123,149,0.7)" font-size="2.8" font-family="JetBrains Mono" letter-spacing="0.3">PIESCHEN</text>
      <text x="62" y="20" fill="rgba(110,123,149,0.7)" font-size="2.8" font-family="JetBrains Mono" letter-spacing="0.3">LOSCHWITZ</text>
      <text x="22" y="56" fill="rgba(110,123,149,0.7)" font-size="2.8" font-family="JetBrains Mono" letter-spacing="0.3">PLAUEN</text>
      <text x="62" y="56" fill="rgba(110,123,149,0.7)" font-size="2.8" font-family="JetBrains Mono" letter-spacing="0.3">STRIESEN</text>
      <text x="44" y="40" fill="rgba(77,184,224,0.6)" font-size="2.4" font-family="JetBrains Mono" letter-spacing="0.4">ELBE</text>
    </svg>`;
  const pinsHtml = SITES.map(s => {
    const cls = s.tone === "green" ? "green" : s.tone === "amber" ? "amber" : "";
    const pctLbl = s.pct === 100 ? "✓" : `${s.pct}%`;
    return `<div class="map-pin ${cls}" style="left:${s.x}%;top:${s.y}%">
      <span class="pulse"></span>
      <span class="core"></span>
      <span class="label">${s.addr} · ${pctLbl}</span>
    </div>`;
  }).join("");
  root.innerHTML = svgBg + pinsHtml;
}

// ── Render: references table ─────────────────────────────────────
function renderRefs() {
  const t = COPY[STATE.lang];
  const labels = REF_LABELS[STATE.lang];
  const root = $("#ref-table");
  const head = `
    <div class="ref-head">
      <span>${t.proj.head.typ}</span>
      <span>${t.proj.head.einh}</span>
      <span>${t.proj.head.reg}</span>
      <span>${t.proj.head.jahr}</span>
      <span>${t.proj.head.st}</span>
    </div>`;
  const rows = REF_ROWS.map(r => `
    <div class="ref-row">
      <span class="ref-typ">${labels[r.typ_key]}</span>
      <span class="ref-mono">${r.einheiten}</span>
      <span class="ref-mono">${labels[r.region_key]}</span>
      <span class="ref-mono">${r.jahr}</span>
      <span class="ref-status ${r.status}"><span class="d"></span>${r.status === "done" ? t.proj.done : t.proj.open}</span>
    </div>`).join("");
  root.innerHTML = head + rows;
}

// ── Render: about value cards ────────────────────────────────────
function renderValues() {
  const t = COPY[STATE.lang];
  const root = $("#about-side");
  root.innerHTML = t.values.map((v, i) => `
    <div class="value-card">
      <div class="vc-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="vc-body">
        <div class="vc-t">${v.t}</div>
        <div class="vc-d">${v.d}</div>
      </div>
    </div>`).join("");
}

// ── Render: contact form (placeholders + select options) ─────────
function renderForm() {
  const t = COPY[STATE.lang].kontakt;
  $("#f-name").placeholder = t.f_name_p;
  $("#f-company").placeholder = t.f_company_p;
  $("#f-email").placeholder = t.f_email_p;
  $("#f-phone").placeholder = t.f_phone_p;
  $("#f-msg").placeholder = t.f_msg_p;
  // Preserve current subject if it matches one of the new options, else reset
  const subj = $("#f-subject");
  const prev = subj.value;
  subj.innerHTML = t.f_subject_o.map(o => `<option>${o}</option>`).join("");
  if (t.f_subject_o.includes(prev)) subj.value = prev;
}

// ── Form validation + submit ─────────────────────────────────────
function validateForm() {
  const ok = $("#f-name").value.trim() && $("#f-email").value.trim() && $("#f-msg").value.trim();
  $("#f-send").disabled = !ok;
  return ok;
}

function bindForm() {
  ["#f-name", "#f-email", "#f-msg"].forEach(sel => {
    $(sel).addEventListener("input", validateForm);
  });
  $("#contact-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm()) return;
    const ticket = "RP-26-" + Math.floor(1000 + Math.random() * 9000);
    $("#ticket").textContent = `Ticket #${ticket}`;
    $("#contact-form").hidden = true;
    $("#form-success").hidden = false;
  });
}

// ── Details toggle (9 Gewerke) ───────────────────────────────────
function bindDetailsToggle() {
  const btn = $("#details-toggle");
  const body = $("#details-body");
  btn.addEventListener("click", () => {
    STATE.openDetails = !STATE.openDetails;
    btn.classList.toggle("open", STATE.openDetails);
    body.classList.toggle("open", STATE.openDetails);
    body.classList.toggle("closed", !STATE.openDetails);
  });
}

// ── Language switcher ────────────────────────────────────────────
function bindLangSwitcher() {
  $$(".lang button").forEach(b => {
    b.addEventListener("click", () => {
      STATE.lang = b.dataset.lang;
      applyI18n();
      renderPillars();
      renderProcess();
      renderRefs();
      renderValues();
      renderForm();
      validateForm();
    });
  });
}

// ── Init ─────────────────────────────────────────────────────────
function init() {
  applyI18n();
  renderPillars();
  renderGewerke();
  renderProcess();
  renderMap();
  renderRefs();
  renderValues();
  renderForm();
  bindLangSwitcher();
  bindDetailsToggle();
  bindForm();
  validateForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
