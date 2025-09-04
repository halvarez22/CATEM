
import { ReportData, ReportStatus } from '../types';

export const mockReports: ReportData[] = [
  {
    id: 'CATEM-ABC123-F4A1',
    title: 'Condiciones de Trabajo Inseguras',
    description: 'No se está proporcionando equipo de protección personal (EPP) adecuado en el área de soldadura. Varios compañeros han sufrido quemaduras leves.',
    files: [],
    status: ReportStatus.INVESTIGACION,
    analysis: {
      category: 'Violación de Seguridad',
      severity: 'Alta',
      summary: 'El reporte indica una falta grave de equipo de protección en un área de alto riesgo, con incidentes ya ocurridos.',
      locations: ['Área de soldadura'],
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
    id: 'CATEM-DEF456-B2C3',
    title: 'Retraso o Falta de Pago de Salarios',
    description: 'La última quincena no ha sido pagada a tiempo y no se nos ha dado una fecha concreta para el pago. Esto afecta a todo el departamento de ensamblaje.',
    files: [],
    status: ReportStatus.EN_REVISION,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Crítica',
      summary: 'Reporte sobre la falta de pago de salarios a un departamento completo, indicando un posible problema de liquidez de la empresa.',
      locations: ['Departamento de ensamblaje'],
      involvedParties: ['Todo el departamento de ensamblaje'],
      keyDates: ['Última quincena']
    },
    timestamp: '2025-07-20T09:00:00Z',
    internalNotes: [
         { text: 'Caso asignado. Se contactará a RRHH de la empresa para verificar la situación.', author: 'Agente 002', timestamp: '2025-07-20T09:30:00Z' }
    ]
  },
    {
    id: 'CATEM-GHI789-D4E5',
    title: 'Acoso Laboral o Mobbing',
    description: 'Un gerente de turno constantemente hace comentarios inapropiados y asigna tareas imposibles de cumplir a ciertos empleados, creando un ambiente de trabajo hostil.',
    files: [],
    status: ReportStatus.RECIBIDO,
    analysis: {
      category: 'Acoso',
      severity: 'Alta',
      summary: 'Denuncia de acoso laboral sistemático por parte de una figura de autoridad, afectando el bienestar de los empleados.',
      locations: [],
      involvedParties: ['Gerente de turno', 'Ciertos empleados'],
      keyDates: ['Constantemente']
    },
    timestamp: '2025-07-21T11:45:00Z',
    internalNotes: []
  },
  {
    id: 'CATEM-JKL012-A1B2',
    title: 'Incumplimiento de Contrato Colectivo',
    description: 'Las horas extra no se están pagando al doble como estipula el contrato colectivo. Se están pagando como horas normales.',
    files: [],
    status: ReportStatus.RESUELTO,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Media',
      summary: 'El reporte alega un incumplimiento específico del contrato colectivo relacionado con el pago de horas extra.',
      locations: [],
      involvedParties: [],
      keyDates: ['Horas extra']
    },
    timestamp: '2025-06-10T15:00:00Z',
    internalNotes: [
        { text: 'Se revisó el contrato y las nóminas. Se confirma la discrepancia.', author: 'Agente 003', timestamp: '2025-06-11T10:00:00Z' },
        { text: 'Se dialogó con la empresa. Aceptaron el error y realizarán el pago retroactivo. Se monitoreará.', author: 'Agente 003', timestamp: '2025-06-15T12:00:00Z' },
        { text: 'Pago retroactivo confirmado. El problema ha sido corregido en el sistema de nómina.', author: 'Agente 003', timestamp: '2025-07-01T16:00:00Z' },
    ]
  },
  {
    id: 'CATEM-MNO345-C3D4',
    title: 'Despido Injustificado',
    description: 'Fui despedido sin justificación alguna después de haber solicitado una licencia médica. No me dieron liquidación conforme a la ley.',
    files: [],
    status: ReportStatus.CERRADO,
    analysis: {
      category: 'Práctica Laboral Injusta',
      severity: 'Alta',
      summary: 'El empleado reporta un despido presuntamente injustificado y la falta de una liquidación adecuada tras un evento protegido (licencia médica).',
      locations: [],
      involvedParties: [],
      keyDates: ['Después de solicitar licencia médica']
    },
    timestamp: '2025-05-01T18:00:00Z',
    internalNotes: [
        { text: 'Se brindó asesoría legal al trabajador. Se inició proceso de conciliación.', author: 'Agente 004', timestamp: '2025-05-02T10:00:00Z' },
        { text: 'Se llegó a un acuerdo satisfactorio para el trabajador en la junta de conciliación. Caso cerrado.', author: 'Agente 004', timestamp: '2025-05-20T13:00:00Z' },
    ]
  },
];