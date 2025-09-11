import type {
    ReportData
} from '../types';
import { ReportStatus } from '../types';

// Mock data simplificado para el mapa
const mockReports: ReportData[] = [
    {
        id: "CATEM-ABC123-2024",
        title: "Incumplimiento de Contrato Colectivo",
        description: "La empresa no está respetando los términos del contrato colectivo firmado el año pasado.",
        files: [],
        state: "Ciudad de México",
        status: ReportStatus.EN_REVISION,
        analysis: {
            category: "Incumplimiento de Contrato",
            severity: "Alta",
            summary: "Caso de incumplimiento de contrato colectivo que requiere investigación inmediata."
        },
        timestamp: "2024-01-15T10:30:00Z",
        internalNotes: []
    },
    {
        id: "CATEM-DEF456-2024",
        title: "Horas Extras No Pagadas",
        description: "Trabajadores realizando horas extras sin compensación adecuada.",
        files: [],
        state: "Jalisco",
        status: ReportStatus.RECIBIDO,
        analysis: {
            category: "Salarios",
            severity: "Media",
            summary: "Reporte de horas extras no pagadas en planta de Guadalajara."
        },
        timestamp: "2024-01-16T14:20:00Z",
        internalNotes: []
    },
    {
        id: "CATEM-GHI789-2024",
        title: "Condiciones de Trabajo Inseguras",
        description: "Falta de equipo de protección personal en área de producción.",
        files: [],
        state: "Nuevo León",
        status: ReportStatus.INVESTIGACION,
        analysis: {
            category: "Seguridad Laboral",
            severity: "Crítica",
            summary: "Condiciones de trabajo peligrosas que ponen en riesgo la integridad de los trabajadores."
        },
        timestamp: "2024-01-17T09:15:00Z",
        internalNotes: []
    },
    {
        id: "CATEM-JKL012-2024",
        title: "Discriminación Laboral",
        description: "Trato discriminatorio por género en procesos de promoción.",
        files: [],
        state: "Puebla",
        status: ReportStatus.RESUELTO,
        analysis: {
            category: "Discriminación",
            severity: "Alta",
            summary: "Caso de discriminación de género resuelto exitosamente."
        },
        timestamp: "2024-01-18T16:45:00Z",
        internalNotes: []
    },
    {
        id: "CATEM-MNO345-2024",
        title: "Falta de Capacitación",
        description: "Trabajadores sin capacitación adecuada para sus funciones.",
        files: [],
        state: "Veracruz",
        status: ReportStatus.CERRADO,
        analysis: {
            category: "Capacitación",
            severity: "Baja",
            summary: "Caso cerrado tras implementar programa de capacitación."
        },
        timestamp: "2024-01-19T11:30:00Z",
        internalNotes: []
    }
];

// Función para obtener un reporte por ID
export const getReportById = async (trackingId: string): Promise<ReportData | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const report = mockReports.find(r => r.id === trackingId);
    return report || null;
};

// Función para obtener todos los reportes
export const getAllReports = async (): Promise<ReportData[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockReports];
};

// Función para actualizar el estado de un reporte
export const updateReportStatus = async (
    trackingId: string, 
    newStatus: ReportStatus
): Promise<ReportData | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reportIndex = mockReports.findIndex(r => r.id === trackingId);
    if (reportIndex === -1) return null;
    
    mockReports[reportIndex].status = newStatus;
    return mockReports[reportIndex];
};

// Funciones placeholder para compatibilidad
export const addReportNote = async (): Promise<any> => null;
export const addReportAction = async (): Promise<any> => null;
export const updateActionStatus = async (): Promise<any> => null;
export const submitReportRating = async (): Promise<any> => null;
export const getReportStats = async (): Promise<any> => ({ total: 0, byStatus: {}, bySeverity: {}, byPriority: {}, avgRating: 0 });