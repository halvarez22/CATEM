import { ReportData, ReportStatus } from '../types';

export const mockReports: ReportData[] = [
  // NUEVO LEÓN - 12 denuncias (Muy alta intensidad - Rojo)
  {
    id: 'CATEM-ABC123-F4A1',
    title: 'Condiciones de Trabajo Inseguras en Monterrey',
    description: 'No se está proporcionando equipo de protección personal (EPP) adecuado en el área de soldadura de la planta en Monterrey, Nuevo León. Varios compañeros han sufrido quemaduras leves.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.INVESTIGACION,
    analysis: {
      category: 'Violación de Seguridad',
      severity: 'Alta',
      summary: 'El reporte indica una falta grave de equipo de protección en un área de alto riesgo, con incidentes ya ocurridos.',
      locations: ['Área de soldadura', 'Monterrey'],
      involvedParties: ['Compañeros'],
      keyDates: []
    },
    timestamp: '2025-07-15T10:30:00Z',
    internalNotes: [
        { text: 'Se ha notificado al supervisor de área. Pendiente de inspección.', author: 'Agente 001', timestamp: '2025-07-15T11:00:00Z' },
        { text: 'Inspección realizada. Se confirma la falta de EPP. Se emite recomendación urgente.', author: 'Agente 001', timestamp: '2025-07-16T14:20:00Z' }
    ]
  },
  {
    id: 'CATEM-NL001',
    title: 'Retraso de Pago en Apodaca',
    description: 'Salarios atrasados en planta automotriz de Apodaca.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Retraso en pagos', locations: ['Apodaca'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-20T09:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL002',
    title: 'Acoso Laboral en San Nicolás',
    description: 'Comportamiento inapropiado del supervisor en San Nicolás.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Acoso', severity: 'Alta', summary: 'Acoso sistemático', locations: ['San Nicolás'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-21T11:45:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL003',
    title: 'Horas Extra No Pagadas en Guadalupe',
    description: 'Horas extra no remuneradas en Guadalupe.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de pago', locations: ['Guadalupe'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-22T08:15:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL004',
    title: 'Condiciones Inseguras en Escobedo',
    description: 'Falta de medidas de seguridad en Escobedo.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Violación de Seguridad', severity: 'Alta', summary: 'Riesgo laboral', locations: ['Escobedo'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-23T14:20:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL005',
    title: 'Despido Injustificado en Santa Catarina',
    description: 'Despido sin justificación en Santa Catarina.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Alta', summary: 'Despido irregular', locations: ['Santa Catarina'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL006',
    title: 'Discriminación en García',
    description: 'Trato discriminatorio en García.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Discriminación', severity: 'Media', summary: 'Práctica discriminatoria', locations: ['García'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-25T16:30:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL007',
    title: 'Falta de Prestaciones en Juárez',
    description: 'Prestaciones no otorgadas en Juárez.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de prestaciones', locations: ['Juárez'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-26T12:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL008',
    title: 'Ambiente Hostil en Cadereyta',
    description: 'Ambiente de trabajo hostil en Cadereyta.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Acoso', severity: 'Alta', summary: 'Ambiente tóxico', locations: ['Cadereyta'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-27T09:15:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL009',
    title: 'Violación de Contrato en Salinas Victoria',
    description: 'Incumplimiento de contrato en Salinas Victoria.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Violación contractual', locations: ['Salinas Victoria'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-28T13:45:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL010',
    title: 'Falta de Capacitación en Pesquería',
    description: 'Ausencia de capacitación en Pesquería.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Violación de Seguridad', severity: 'Media', summary: 'Falta de entrenamiento', locations: ['Pesquería'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-29T11:20:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL011',
    title: 'Retención de Documentos en El Carmen',
    description: 'Documentos retenidos en El Carmen.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Retención ilegal', locations: ['El Carmen'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-30T15:10:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-NL012',
    title: 'Horarios Abusivos en Ciénega de Flores',
    description: 'Horarios excesivos en Ciénega de Flores.',
    files: [],
    state: 'Nuevo León',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Alta', summary: 'Explotación laboral', locations: ['Ciénega de Flores'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-31T08:30:00Z',
    internalNotes: []
  },

  // JALISCO - 8 denuncias (Alta intensidad - Naranja)
  {
    id: 'CATEM-DEF456-B2C3',
    title: 'Retraso de Pago en Guadalajara',
    description: 'La última quincena no ha sido pagada a tiempo en la planta de Guadalajara, Jalisco. No se nos ha dado una fecha concreta para el pago. Esto afecta a todo el departamento de ensamblaje.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.EN_REVISION,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Crítica',
      summary: 'Reporte sobre la falta de pago de salarios a un departamento completo, indicando un posible problema de liquidez de la empresa.',
      locations: ['Departamento de ensamblaje', 'Guadalajara'],
      involvedParties: ['Todo el departamento de ensamblaje'],
      keyDates: ['Última quincena']
    },
    timestamp: '2025-07-20T09:00:00Z',
    internalNotes: [
         { text: 'Caso asignado. Se contactará a RRHH de la empresa para verificar la situación.', author: 'Agente 002', timestamp: '2025-07-20T09:30:00Z' }
    ]
  },
  {
    id: 'CATEM-JAL001',
    title: 'Acoso en Zapopan',
    description: 'Comportamiento inapropiado en Zapopan.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Acoso', severity: 'Alta', summary: 'Acoso laboral', locations: ['Zapopan'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-21T11:45:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JAL002',
    title: 'Condiciones Inseguras en Tlaquepaque',
    description: 'Falta de seguridad en Tlaquepaque.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Violación de Seguridad', severity: 'Alta', summary: 'Riesgo laboral', locations: ['Tlaquepaque'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-22T08:15:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JAL003',
    title: 'Horas Extra No Pagadas en Tonalá',
    description: 'Horas extra no remuneradas en Tonalá.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de pago', locations: ['Tonalá'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-23T14:20:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JAL004',
    title: 'Despido Injustificado en Tlajomulco',
    description: 'Despido sin justificación en Tlajomulco.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Alta', summary: 'Despido irregular', locations: ['Tlajomulco'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JAL005',
    title: 'Discriminación en El Salto',
    description: 'Trato discriminatorio en El Salto.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Discriminación', severity: 'Media', summary: 'Práctica discriminatoria', locations: ['El Salto'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-25T16:30:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JAL006',
    title: 'Falta de Prestaciones en Puerto Vallarta',
    description: 'Prestaciones no otorgadas en Puerto Vallarta.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de prestaciones', locations: ['Puerto Vallarta'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-26T12:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JAL007',
    title: 'Ambiente Hostil en Lagos de Moreno',
    description: 'Ambiente de trabajo hostil en Lagos de Moreno.',
    files: [],
    state: 'Jalisco',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Acoso', severity: 'Alta', summary: 'Ambiente tóxico', locations: ['Lagos de Moreno'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-27T09:15:00Z',
    internalNotes: []
  },

  // CIUDAD DE MÉXICO - 6 denuncias (Alta intensidad - Naranja)
  {
    id: 'CATEM-GHI789-D4E5',
    title: 'Acoso Laboral en Ciudad de México',
    description: 'Un gerente de turno en la oficina de Ciudad de México constantemente hace comentarios inapropiados y asigna tareas imposibles de cumplir a ciertos empleados, creando un ambiente de trabajo hostil.',
    files: [],
    state: 'México',
    status: ReportStatus.RECIBIDO,
    analysis: {
      category: 'Acoso',
      severity: 'Alta',
      summary: 'Denuncia de acoso laboral sistemático por parte de una figura de autoridad, afectando el bienestar de los empleados.',
      locations: ['Ciudad de México'],
      involvedParties: ['Gerente de turno', 'Ciertos empleados'],
      keyDates: ['Constantemente']
    },
    timestamp: '2025-07-21T11:45:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-CDMX001',
    title: 'Condiciones Inseguras en Iztapalapa',
    description: 'Falta de medidas de seguridad en Iztapalapa.',
    files: [],
    state: 'México',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Violación de Seguridad', severity: 'Alta', summary: 'Riesgo laboral', locations: ['Iztapalapa'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-22T08:15:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-CDMX002',
    title: 'Horas Extra No Pagadas en Coyoacán',
    description: 'Horas extra no remuneradas en Coyoacán.',
    files: [],
    state: 'México',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de pago', locations: ['Coyoacán'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-23T14:20:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-CDMX003',
    title: 'Despido Injustificado en Álvaro Obregón',
    description: 'Despido sin justificación en Álvaro Obregón.',
    files: [],
    state: 'México',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Alta', summary: 'Despido irregular', locations: ['Álvaro Obregón'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-CDMX004',
    title: 'Discriminación en Gustavo A. Madero',
    description: 'Trato discriminatorio en Gustavo A. Madero.',
    files: [],
    state: 'México',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Discriminación', severity: 'Media', summary: 'Práctica discriminatoria', locations: ['Gustavo A. Madero'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-25T16:30:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-CDMX005',
    title: 'Falta de Prestaciones en Tlalpan',
    description: 'Prestaciones no otorgadas en Tlalpan.',
    files: [],
    state: 'México',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de prestaciones', locations: ['Tlalpan'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-26T12:00:00Z',
    internalNotes: []
  },

  // PUEBLA - 4 denuncias (Intensidad moderada - Amarillo)
  {
    id: 'CATEM-JKL012-A1B2',
    title: 'Despido Injustificado en Puebla',
    description: 'Fui despedido sin justificación alguna después de haber solicitado una licencia médica en la planta de Puebla. No me dieron liquidación conforme a la ley.',
    files: [],
    state: 'Puebla',
    status: ReportStatus.CERRADO,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Alta',
      summary: 'El empleado reporta un despido presuntamente injustificado y la falta de una liquidación adecuada tras un evento protegido (licencia médica).',
      locations: ['Puebla'],
      involvedParties: [],
      keyDates: ['Después de solicitar licencia médica']
    },
    timestamp: '2025-05-01T18:00:00Z',
    internalNotes: [
        { text: 'Se brindó asesoría legal al trabajador. Se inició proceso de conciliación.', author: 'Agente 004', timestamp: '2025-05-02T10:00:00Z' },
        { text: 'Se llegó a un acuerdo satisfactorio para el trabajador en la junta de conciliación. Caso cerrado.', author: 'Agente 004', timestamp: '2025-05-20T13:00:00Z' },
    ]
  },
  {
    id: 'CATEM-PUE001',
    title: 'Condiciones Inseguras en Tehuacán',
    description: 'Falta de seguridad en Tehuacán.',
    files: [],
    state: 'Puebla',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Violación de Seguridad', severity: 'Alta', summary: 'Riesgo laboral', locations: ['Tehuacán'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-22T08:15:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-PUE002',
    title: 'Horas Extra No Pagadas en Atlixco',
    description: 'Horas extra no remuneradas en Atlixco.',
    files: [],
    state: 'Puebla',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de pago', locations: ['Atlixco'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-23T14:20:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-PUE003',
    title: 'Acoso en San Martín Texmelucan',
    description: 'Comportamiento inapropiado en San Martín Texmelucan.',
    files: [],
    state: 'Puebla',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Acoso', severity: 'Alta', summary: 'Acoso laboral', locations: ['San Martín Texmelucan'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },

  // VERACRUZ - 3 denuncias (Intensidad moderada - Amarillo)
  {
    id: 'CATEM-PQR678-E5F6',
    title: 'Condiciones Inseguras en Veracruz',
    description: 'Las escaleras de emergencia en el puerto de Veracruz no cumplen con las normas de seguridad. Hay riesgo de accidentes graves.',
    files: [],
    state: 'Veracruz',
    status: ReportStatus.EN_REVISION,
    analysis: {
      category: 'Violación de Seguridad',
      severity: 'Crítica',
      summary: 'Condiciones de seguridad críticas en infraestructura de emergencia que podrían resultar en accidentes graves.',
      locations: ['Puerto de Veracruz'],
      involvedParties: ['Trabajadores portuarios'],
      keyDates: []
    },
    timestamp: '2025-07-22T08:15:00Z',
    internalNotes: [
        { text: 'Caso de alta prioridad asignado. Se coordinará inspección inmediata.', author: 'Agente 005', timestamp: '2025-07-22T08:30:00Z' }
    ]
  },
  {
    id: 'CATEM-VER001',
    title: 'Horas Extra No Pagadas en Xalapa',
    description: 'Horas extra no remuneradas en Xalapa.',
    files: [],
    state: 'Veracruz',
    status: ReportStatus.RECIBIDO,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de pago', locations: ['Xalapa'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-23T14:20:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-VER002',
    title: 'Despido Injustificado en Córdoba',
    description: 'Despido sin justificación en Córdoba.',
    files: [],
    state: 'Veracruz',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Alta', summary: 'Despido irregular', locations: ['Córdoba'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },

  // QUINTANA ROO - 2 denuncias (Baja intensidad - Verde)
  {
    id: 'CATEM-STU901-G6H7',
    title: 'Acoso en Cancún',
    description: 'Supervisor en el hotel de Cancún, Quintana Roo, hace comentarios sexistas a las empleadas del área de limpieza.',
    files: [],
    state: 'Quintana Roo',
    status: ReportStatus.INVESTIGACION,
    analysis: {
      category: 'Acoso',
      severity: 'Alta',
      summary: 'Denuncia de acoso sexual en el lugar de trabajo que afecta específicamente a trabajadoras.',
      locations: ['Cancún'],
      involvedParties: ['Supervisor', 'Empleadas de limpieza'],
      keyDates: []
    },
    timestamp: '2025-07-23T14:20:00Z',
    internalNotes: [
        { text: 'Caso sensible asignado a agente especializado en acoso laboral.', author: 'Agente 006', timestamp: '2025-07-23T14:45:00Z' }
    ]
  },
  {
    id: 'CATEM-ROO001',
    title: 'Condiciones Inseguras en Playa del Carmen',
    description: 'Falta de seguridad en Playa del Carmen.',
    files: [],
    state: 'Quintana Roo',
    status: ReportStatus.EN_REVISION,
    analysis: { category: 'Violación de Seguridad', severity: 'Alta', summary: 'Riesgo laboral', locations: ['Playa del Carmen'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },

  // GUANAJUATO - 2 denuncias (Baja intensidad - Verde)
  {
    id: 'CATEM-VWX234-H7I8',
    title: 'Falta de Pago en León',
    description: 'En la fábrica de calzado en León, Guanajuato, no se han pagado las prestaciones de fin de año conforme a la ley.',
    files: [],
    state: 'Guanajuato',
    status: ReportStatus.RECIBIDO,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Media',
      summary: 'Incumplimiento en el pago de prestaciones legales obligatorias.',
      locations: ['León'],
      involvedParties: ['Trabajadores de la fábrica'],
      keyDates: ['Fin de año']
    },
    timestamp: '2025-07-24T10:00:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-GUA001',
    title: 'Horas Extra No Pagadas en Celaya',
    description: 'Horas extra no remuneradas en Celaya.',
    files: [],
    state: 'Guanajuato',
    status: ReportStatus.INVESTIGACION,
    analysis: { category: 'Práctica Laboral Injusta', severity: 'Media', summary: 'Incumplimiento de pago', locations: ['Celaya'], involvedParties: [], keyDates: [] },
    timestamp: '2025-07-25T16:30:00Z',
    internalNotes: []
  },

  // SONORA - 1 denuncia (Baja intensidad - Verde)
  {
    id: 'CATEM-YZA567-I8J9',
    title: 'Condiciones Inseguras en Hermosillo',
    description: 'En la mina de Hermosillo, Sonora, no hay ventilación adecuada y varios trabajadores han presentado problemas respiratorios.',
    files: [],
    state: 'Sonora',
    status: ReportStatus.INVESTIGACION,
    analysis: {
      category: 'Violación de Seguridad',
      severity: 'Crítica',
      summary: 'Condiciones de trabajo que ponen en riesgo la salud de los trabajadores con evidencia de daños ya ocurridos.',
      locations: ['Mina de Hermosillo'],
      involvedParties: ['Trabajadores mineros'],
      keyDates: []
    },
    timestamp: '2025-07-25T16:30:00Z',
    internalNotes: [
        { text: 'Caso crítico. Se notificará a autoridades de seguridad laboral.', author: 'Agente 007', timestamp: '2025-07-25T17:00:00Z' }
    ]
  },

  // COAHUILA - 1 denuncia (Baja intensidad - Verde)
  {
    id: 'CATEM-BCD890-J9K0',
    title: 'Despido Masivo en Saltillo',
    description: 'En Saltillo, Coahuila, se despidió a 50 trabajadores sin justificación aparente, violando el contrato colectivo.',
    files: [],
    state: 'Coahuila',
    status: ReportStatus.EN_REVISION,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Crítica',
      summary: 'Despido masivo que podría constituir una violación grave del contrato colectivo y la ley laboral.',
      locations: ['Saltillo'],
      involvedParties: ['50 trabajadores despedidos'],
      keyDates: []
    },
    timestamp: '2025-07-26T12:00:00Z',
    internalNotes: [
        { text: 'Caso de despido masivo asignado a equipo especializado.', author: 'Agente 008', timestamp: '2025-07-26T12:30:00Z' }
    ]
  },

  // BAJA CALIFORNIA - 1 denuncia (Baja intensidad - Verde)
  {
    id: 'CATEM-MNO345-C3D4',
    title: 'Incumplimiento de Contrato en Tijuana',
    description: 'Las horas extra no se están pagando al doble como estipula el contrato colectivo en la maquiladora de Tijuana, Baja California. Se están pagando como horas normales.',
    files: [],
    state: 'Baja California',
    status: ReportStatus.RESUELTO,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Media',
      summary: 'El reporte alega un incumplimiento específico del contrato colectivo relacionado con el pago de horas extra.',
      locations: ['Tijuana'],
      involvedParties: [],
      keyDates: ['Horas extra']
    },
    timestamp: '2025-06-10T15:00:00Z',
    internalNotes: [
        { text: 'Se revisó el contrato y las nóminas. Se confirma la discrepancia.', author: 'Agente 003', timestamp: '2025-06-11T10:00:00Z' },
        { text: 'Se dialogó con la empresa. Aceptaron el error y realizarán el pago retroactivo. Se monitoreará.', author: 'Agente 003', timestamp: '2025-06-15T12:00:00Z' },
        { text: 'Pago retroactivo confirmado. El problema ha sido corregido en el sistema de nómina.', author: 'Agente 003', timestamp: '2025-07-01T16:00:00Z' },
    ]
  }
];