import { ElevationLabels, ItineraryDateRange, ItineraryDayItem } from '../models/itinerary.models';

/** One destination offered in the demo, with its own departures, plan and legend labels. */
export interface ItineraryDestination {
  key: string;
  label: string;
  dateRanges: ItineraryDateRange[];
  items: ItineraryDayItem[];
  legendLabels: ElevationLabels;
}

/** `baseCamp`/`summit` legend wording is the same everywhere; only `baseCity` differs per destination. */
function elevationLabels(baseCityLabel: string): ElevationLabels {
  return {
    baseCamp: 'Refugio / campo de altura',
    summit: 'Cumbre',
    baseCity: baseCityLabel,
  };
}

// ---------------------------------------------------------------------------
// Ecuador — Corazón + Cotopaxi + Chimborazo
// ---------------------------------------------------------------------------

const ECUADOR_DATE_RANGES: ItineraryDateRange[] = [
  { startDate: new Date(2026, 4, 5), endDate: new Date(2026, 4, 10) },
  { startDate: new Date(2026, 10, 11), endDate: new Date(2026, 10, 16) },
];

const ECUADOR_ITEMS: ItineraryDayItem[] = [
  {
    dayNumber: 1,
    elevation: 4790,
    category: 'baseCamp',
    basePlace: 'Volcán Corazón',
    title: 'Caminata de aclimatación',
    content: `<p>Machachi – Volcán Corazón</p>
      <ul>
        <li>6:00 am: Encuentro en la ciudad de Machachi, Ecuador.</li>
        <li>6:00 a 7:00 am: Desayuno.</li>
        <li>7:00 a 8:00 am: Traslado al Volcán Corazón (4.790 msnm).</li>
        <li>9:30 am: Inicio del trekking al Volcán Corazón.</li>
        <li>2:30 pm: Descenso al parqueadero.</li>
        <li>4:00 pm: Almuerzo de marcha.</li>
        <li>4:30 pm: Llegada a la ciudad de Machachi.</li>
      </ul>
      <p>Este día es de vital importancia, ya que hace parte de una aclimatación progresiva para los volcanes Cotopaxi y Chimborazo.</p>
      <p>Esta noche no incluye hospedaje.</p>`,
    mealsIncluded: true,
    acommodationIncluded: false,
  },
  {
    dayNumber: 2,
    elevation: 4864,
    category: 'baseCamp',
    basePlace: 'Refugio José Rivas – Cotopaxi',
    title: 'Caminata de aproximación',
    content: `<ul>
        <li>8:00 am: Desayuno.</li>
        <li>10:00 am: Traslado al Parque Nacional Cotopaxi.</li>
        <li>11:30 am: Trekking de aproximadamente 40 minutos al Refugio José Rivas, ubicado a 4.864 msnm.</li>
        <li>12:30 pm: Almuerzo y alistamiento de equipo esencial para el intento de cumbre del Cotopaxi.</li>
        <li>6:00 pm: Cena y descanso.</li>
      </ul>
      <p>Nota: traer saco de dormir (sleeping) para los refugios.</p>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 3,
    elevation: 5897,
    category: 'summit',
    basePlace: 'Volcán Cotopaxi',
    title: 'Día de cumbre',
    content: `<ul>
        <li>11:00 pm (noche anterior): Bebida caliente e inicio del intento de cumbre del Volcán Cotopaxi, en su punto más alto a 5.897 msnm.</li>
        <li>5:00 am: Llegada al borde del glaciar y colocación de equipo técnico de nieve.</li>
        <li>8:00 am: Cumbre. Se intenta la mejor toma fotográfica, si el clima lo permite, y se inicia el descenso al refugio.</li>
        <li>12:00 m: Llegada al refugio; alistamos el equipaje completo, tomamos desayuno (incluido) y nos desplazamos al parqueadero del Cotopaxi.</li>
        <li>3:00 pm: El vehículo nos traslada hasta la ciudad de Machachi. Cena (no incluida) y descanso.</li>
      </ul>
      <p>Nota: el descanso y hospedaje de esta noche no están incluidos.</p>`,
    mealsIncluded: true,
    acommodationIncluded: false,
  },
  {
    dayNumber: 4,
    elevation: 2850,
    category: 'baseCity',
    basePlace: 'Machachi',
    title: 'Día libre',
    content: '<p>Descanso. Alimentación y hospedaje no incluidos.</p>',
    mealsIncluded: false,
    acommodationIncluded: false,
  },
  {
    dayNumber: 5,
    elevation: 4850,
    category: 'baseCamp',
    basePlace: 'Refugio Carrel – Chimborazo',
    title: 'Caminata de aproximación',
    content: `<ul>
        <li>8:00 am: Desayuno.</li>
        <li>9:00 am: Traslado hasta el Refugio Hermanos Carrel, en el Volcán Chimborazo.</li>
        <li>12:00 m: Almuerzo en un restaurante de montaña catalogado como uno de los más altos del mundo.</li>
        <li>1:00 pm: Ingreso al Parque Nacional Chimborazo.</li>
        <li>2:30 pm: Ubicación en la zona de descanso y trekking de reconocimiento alrededor de la zona, para aclimatar a la altura alcanzada.</li>
        <li>6:00 pm: Cena y descanso.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 6,
    elevation: 6263,
    category: 'summit',
    basePlace: 'Volcán Chimborazo',
    title: 'Cumbre y fin de expedición',
    content: `<ul>
        <li>11:00 pm: Inicio del intento de cumbre.</li>
        <li>6:00 am: Llegada a la cumbre Veintimilla.</li>
        <li>7:00 am: Llegada a la cumbre máxima, Whymper (6.263 msnm). Dependiendo del clima, podremos tomarnos el tiempo necesario para disfrutar la vista y las mejores fotos.</li>
        <li>8:00 am: Trekking de descenso hacia el campamento de altura.</li>
        <li>1:00 pm: Descanso y merienda.</li>
        <li>3:00 pm: Trekking de descenso al Refugio Carrel, donde nos espera el transporte privado.</li>
        <li>4:00 pm: El vehículo nos traslada hasta la ciudad de Machachi, donde llegamos al hostal y procedemos a descansar. El resto del día es libre, y allí termina nuestra expedición.</li>
      </ul>
      <p>Se sugiere que el montañista llegue un día antes, para evitar retrasos en cada momento de nuestra Xperiencia. Es indispensable contar con experiencia en alta montaña.</p>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
];

// ---------------------------------------------------------------------------
// Bolivia — Pequeño Alpamayo + Huayna Potosí + Illimani
// ---------------------------------------------------------------------------

const BOLIVIA_DATE_RANGES: ItineraryDateRange[] = [
  { startDate: new Date(2026, 8, 6), endDate: new Date(2026, 8, 15) },
];

const BOLIVIA_ITEMS: ItineraryDayItem[] = [
  {
    dayNumber: 1,
    elevation: 3640,
    category: 'baseCity',
    basePlace: 'La Paz',
    title: 'Día de llegada',
    content: '<p>Encuentro en La Paz, Bolivia, charla y organización.</p>',
    mealsIncluded: false,
    acommodationIncluded: false,
  },
  {
    dayNumber: 2,
    elevation: 5000,
    category: 'baseCamp',
    basePlace: 'Pequeño Alpamayo',
    title: 'Caminata de aproximación',
    content: `<p>La Paz – Laguna Chiarkhota</p>
      <ul>
        <li>8:30 AM: Salida de La Paz hacia La Rinconada (4.500 msnm), un viaje de aprox. 2.5 a 3 horas.</li>
        <li>12:00 m: Almuerzo.</li>
        <li>Aproximación: Caminata suave de 1 hora hasta el Campo Base en Laguna Chiarkhota (4.670 msnm).</li>
        <li>3:00 pm: Llegada a campamento base.</li>
        <li>6:00 pm: Cena y descanso.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 3,
    elevation: 5370,
    category: 'summit',
    basePlace: 'Pequeño Alpamayo',
    title: 'Día de cumbre',
    content: `<ul>
        <li>01:00 AM: Inicio del ascenso. Se bordea la laguna y se asciende por morrena hasta el glaciar. Aproximadamente 6 a 8 horas.</li>
        <li>Pico Tarija (5.300 msnm): Se debe alcanzar primero esta cumbre. Desde aquí se realiza un pequeño descenso técnico en roca/hielo (aprox. 50 m) para conectar con la arista final.</li>
        <li>Cumbre: Ascenso por la arista final hasta la cima del Pequeño Alpamayo (5.410 msnm).</li>
        <li>Retorno: Descenso al Campo Base, breve descanso para tomar desayuno, caminata a La Rinconada y transporte de vuelta a La Paz (llegada aprox. 6:00 pm).</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 4,
    elevation: 3640,
    category: 'baseCity',
    basePlace: 'La Paz',
    title: 'Día libre',
    content: '<p>Descanso</p>',
    mealsIncluded: false,
    acommodationIncluded: false,
  },
  {
    dayNumber: 5,
    elevation: 5130,
    category: 'baseCamp',
    basePlace: 'Huayna Potosí',
    title: 'Caminata de aproximación',
    content: `<p>El Huayna Potosí (6.088 msnm) es posiblemente el «seismil» más popular del mundo debido a su rápido acceso desde La Paz y su ruta normal técnicamente asequible.</p>
      <p>La Paz – Campo Base – Práctica en glaciar</p>
      <ul>
        <li>Salida: Partida desde La Paz esquina Illampu y Sagárnaga (aprox. 8:30 AM) hacia el Paso Zongo (4.700 msnm). El trayecto dura unas 2 horas.</li>
        <li>11:30 am: Almuerzo en el refugio del Campo Base.</li>
        <li>11:30 am: Trekking durante 3 horas aproximadamente al campo alto de Huayna Potosí (5.270 msnm) y descanso.</li>
        <li>5:00 pm: Cena y organización para el intento de cumbre.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 6,
    elevation: 6088,
    category: 'summit',
    basePlace: 'Huayna Potosí',
    title: 'Día de cumbre',
    content: `<p>Intento de cumbre – Retorno a La Paz</p>
      <ul>
        <li>12:00 M: Desayuno y organización.</li>
        <li>1:00 AM: Inicio del ascenso en total oscuridad. Se avanza encordado por el glaciar.</li>
      </ul>
      <p>Pasos clave:</p>
      <ul>
        <li>Pala Chica: Una pared de nieve/hielo de unos 30-50 m.</li>
        <li>La arista final: Un tramo expuesto y estético que lleva directamente a la cima.</li>
        <li>Cumbre: Llegada al amanecer, 6.088 msnm (aprox. 06:30 AM). Vistas espectaculares del Lago Titicaca y la Cordillera Real.</li>
        <li>Descenso: Retorno al Campo Alto (2 horas), breve descanso, desayuno y descenso final al Campo Base (1.5 horas).</li>
        <li>Retorno: Transporte de regreso a La Paz, llegando alrededor de las 4:00 pm.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 7,
    elevation: 3640,
    category: 'baseCity',
    basePlace: 'La Paz',
    title: 'Día libre',
    content: '<p>Descanso</p>',
    mealsIncluded: false,
    acommodationIncluded: false,
  },
  {
    dayNumber: 8,
    elevation: 4500,
    category: 'baseCamp',
    basePlace: 'Illimani',
    title: 'Ascenso en montaña',
    content: `<p>El Illimani (6.438 msnm) es el guardián de la ciudad de La Paz y el desafío definitivo para muchos montañistas en la Cordillera Real. Es una montaña exigente que requiere una condición física excelente y una aclimatación técnica previa (idealmente haber subido el Huayna Potosí antes).</p>
      <p>Itinerario: Nevado Illimani (3 días)</p>
      <p>La Paz – Pinaya – Campo Base (Puente Roto)</p>
      <ul>
        <li>8:00 AM: Traslado de La Paz en 4×4 hacia el pueblo de Pinaya (aprox. 3-5 horas). El camino ofrece vistas espectaculares del gigante de los Andes.</li>
        <li>1:00 PM: Aproximación: Caminata de 2 a 3 horas desde Pinaya hasta el Campo Base, conocido como Puente Roto (4.500 msnm). Es un campamento cómodo y amplio.</li>
        <li>4:00 PM: Descanso: Campamento base (carpa).</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 9,
    elevation: 5400,
    category: 'baseCamp',
    basePlace: 'Illimani',
    title: 'Ascenso en montaña',
    content: `<p>Campo Base – Campo Alto (Nido de Cóndores)</p>
      <ul>
        <li>7:00 AM: Desayuno y alistamiento de equipos.</li>
        <li>8:00 AM: Trekking exigente de 4 a 5 horas por sendero de roca y morrena.</li>
        <li>1:00 PM: Campamento Nido de Cóndores (5.500 msnm). Es un campamento espectacular ubicado en una arista de roca, pero muy frío y expuesto al viento.</li>
        <li>6:00 PM: Cena y descanso.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 10,
    elevation: 6438,
    category: 'summit',
    basePlace: 'Illimani',
    title: 'Cumbre y fin de expedición',
    content: `<ul>
        <li>12:00 PM: Intento de Cumbre Sur (6.438 msnm).</li>
        <li>01:00 AM: Inicio del ascenso. Es una jornada larga de 6 a 9 horas de subida.</li>
        <li>Desafíos técnicos:</li>
        <li>La Gran Muralla.</li>
        <li>Grietas: Se debe navegar con cuidado por un glaciar muy fracturado.</li>
        <li>Altitud: El esfuerzo por encima de los 6.000 m es agotador.</li>
        <li>Cumbre: Llegada a la cima sur, el punto más alto.</li>
        <li>8:00 AM: Descenso: Retorno a Nido de Cóndores para descansar y desayunar. Continuar el descenso hasta el Campo Base.</li>
      </ul>
      <p>Campo Base – Pinaya – La Paz</p>
      <ul>
        <li>Descenso: Caminata final de retorno a Pinaya (2 horas).</li>
        <li>Retorno: Encuentro con el transporte 4×4 y regreso a La Paz, llegando por la tarde para una merecida cena de celebración.</li>
        <li>Al siguiente día vamos a pasear por el Salar de Uyuni, el cementerio de trenes y la Laguna Cañapa, para observar flamencos.</li>
      </ul>
      <p>Este último paseo corre por tu cuenta.</p>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
];

// ---------------------------------------------------------------------------
// Perú — Laguna Churup + Yanapacha + Alpamayo
// ---------------------------------------------------------------------------

const PERU_DATE_RANGES: ItineraryDateRange[] = [
  { startDate: new Date(2026, 6, 17), endDate: new Date(2026, 6, 24) },
];

const PERU_ITEMS: ItineraryDayItem[] = [
  {
    dayNumber: 1,
    elevation: 4480,
    category: 'summit',
    basePlace: 'Laguna Churup',
    title: 'Caminata de aclimatación',
    content: `<ul>
        <li>6:00 am: Desayuno nutritivo, a gusto personal.</li>
        <li>10:00 am: Traslado a la caminata de aclimatación en la Laguna Churup.</li>
        <li>11:30 am: Trekking de reconocimiento de 6 km aproximadamente, ubicado a 4.480 msnm.</li>
        <li>12:30 pm: Almuerzo y alistamiento de equipo con lo esencial, preparativos para nuestra primera montaña.</li>
        <li>6:00 pm: Cena y descanso (no incluido).</li>
      </ul>`,
    mealsIncluded: false,
    acommodationIncluded: false,
  },
  {
    dayNumber: 2,
    elevation: 4900,
    category: 'baseCamp',
    basePlace: 'Yanapacha',
    title: 'Caminata de aproximación',
    content: `<p>Huaraz – Cebollapampa – Campo Base</p>
      <ul>
        <li>07:00 am: Salida de Huaraz en transporte privado hacia el Callejón de Huaylas, pasando por Yungay.</li>
        <li>10:30 am: Llegada a la curva de Cebollapampa, en la carretera hacia el Paso Portachuelo de Llanganuco.</li>
        <li>11:00 am: Inicio de la aproximación: caminata de 3 a 4 horas por un sendero definido, ganando altura gradualmente.</li>
        <li>02:30 pm: Llegada al Campo Base de Yanapacha (aprox. 4.900 msnm).</li>
        <li>Tarde: Preparación de equipo técnico (crampones, piolets, cuerdas) y cena temprana para descansar.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 3,
    elevation: 5460,
    category: 'summit',
    basePlace: 'Yanapacha',
    title: 'Día de cumbre',
    content: `<p>Intento de cumbre – Retorno a Huaraz</p>
      <ul>
        <li>02:00 am: Bebida caliente y salida del campamento.</li>
        <li>03:00 am: Llegada al borde del glaciar. Comienza la parte técnica con encordamiento; la ascensión tiene pendientes de entre 45° y 65°, dependiendo de la ruta y las condiciones de la nieve.</li>
        <li>07:30 am: Cumbre del Nevado Yanapacha. Vista panorámica del Huascarán y el Contrahierbas.</li>
        <li>10:00 am: Descenso (con rápel en los tramos más empinados) de vuelta al Campo Base.</li>
        <li>12:00 m: Almuerzo y tarde de descanso.</li>
        <li>06:00 pm: Cena y descanso.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 4,
    elevation: 3052,
    category: 'baseCity',
    basePlace: 'Huaraz',
    title: 'Día libre',
    content: '<p>Descanso</p>',
    mealsIncluded: false,
    acommodationIncluded: false,
  },
  {
    dayNumber: 5,
    elevation: 4300,
    category: 'baseCamp',
    basePlace: 'Alpamayo',
    title: 'Caminata de aproximación',
    content: `<p>Huaraz – Cashapampa – Campo Base</p>
      <ul>
        <li>05:00 am: Recogida en el hotel en Huaraz, en transporte privado.</li>
        <li>06:00 am: Desayuno y levantamiento de campamento.</li>
        <li>08:00 am: Alistamiento de equipos, encuentro con arrieros y carga de equipaje en burros.</li>
        <li>09:00 am: Inicio del trekking por la quebrada.</li>
        <li>12:00 m: Llegada a Llamacorral (3.760 msnm). Parada técnica para almorzar.</li>
        <li>01:00 pm: Continuación del trekking desde Llamacorral hasta el Campo Base (Arhuaycocha), pasando por las lagunas Ichiccocha y Jatuncocha.</li>
        <li>05:00 pm: Llegada al Campo Base (Arhuaycocha), a 4.300 msnm. Es el punto donde termina el tránsito con animales (burros) y comienza el terreno de alta montaña. Preparación de equipo para el glaciar.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 6,
    elevation: 5400,
    category: 'baseCamp',
    basePlace: 'Alpamayo',
    title: 'Caminata de aproximación',
    content: `<p>Campo Base – Campamento Alto (Campo 1)</p>
      <ul>
        <li>08:00 am: Inicio del trekking. Tramo de caminata pesada hasta la morrena.</li>
        <li>11:00 am: Llegada al borde del glaciar y cambio a crampones. Progresión encordada.</li>
        <li>01:00 pm: Escalada técnica del muro de hielo/nieve para acceder al collado y subida de equipo.</li>
        <li>03:00 pm: Llegada al Campamento Alto (5.400 msnm), con vistas directas a la pared Ferrari del intento de cumbre. Levantamiento de campamento.</li>
        <li>06:00 pm: Cena y descanso.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 7,
    elevation: 4300,
    category: 'baseCamp',
    basePlace: 'Alpamayo',
    title: 'Caminata de retorno',
    content: `<p>Campamento Alto – Campo Base (Arhuaycocha)</p>
      <ul>
        <li>08:00 am: Desmontaje del campamento, tras disfrutar de un amanecer inolvidable, y desayuno.</li>
        <li>10:00 am: Inicio del descenso técnico por el glaciar, con rápel o descenso encordado desde el collado.</li>
        <li>12:00 m: Llegada a la morrena (4.900 msnm). Cambio de calzado y alistamiento de equipo técnico.</li>
        <li>03:00 pm: Llegada al Campo Base (4.300 msnm).</li>
        <li>04:00 pm: Organización de equipo para carga en burros al día siguiente. Cena y descanso.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: true,
  },
  {
    dayNumber: 8,
    elevation: 3052,
    category: 'baseCity',
    basePlace: 'Huaraz',
    title: 'Retorno y fin de expedición',
    content: `<p>Campo Base – Cashapampa – Huaraz</p>
      <ul>
        <li>07:00 am: Desmontaje del campamento, desayuno y carga de equipaje pesado en los burros.</li>
        <li>09:00 am: Inicio del trekking de retorno por la Quebrada Santa Cruz (tramo largo, pero en descenso constante).</li>
        <li>01:00 pm: Parada técnica para almuerzo de marcha en Llamacorral.</li>
        <li>03:30 pm: Llegada a Cashapampa (2.900 msnm). Fin del trekking.</li>
        <li>04:00 pm: Transporte privado de retorno a Huaraz.</li>
        <li>07:00 pm: Llegada a Huaraz.</li>
      </ul>`,
    mealsIncluded: true,
    acommodationIncluded: false,
  },
];

/** Destinations offered in the demo, in display order. */
export const ITINERARY_DESTINATIONS: ItineraryDestination[] = [
  {
    key: 'ecuador',
    label: 'Ecuador',
    dateRanges: ECUADOR_DATE_RANGES,
    items: ECUADOR_ITEMS,
    legendLabels: elevationLabels('Descanso en Machachi'),
  },
  {
    key: 'bolivia',
    label: 'Bolivia',
    dateRanges: BOLIVIA_DATE_RANGES,
    items: BOLIVIA_ITEMS,
    legendLabels: elevationLabels('Descanso en La Paz'),
  },
  {
    key: 'peru',
    label: 'Perú',
    dateRanges: PERU_DATE_RANGES,
    items: PERU_ITEMS,
    legendLabels: elevationLabels('Descanso en Huaraz'),
  },
];
