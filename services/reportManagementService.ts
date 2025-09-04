import type { 
    DetailedReport, 
    ReportNote, 
    ReportAction, 
    ReportRating, 
    ReportFilter, 
    ReportStats,
    ReportStatus 
} from '../types';

// Mock data para simular la base de datos
const mockReports: DetailedReport[] = [
    {
        id: "CATEM-ABC123-2024",
        title: "Incumplimiento de Contrato Colectivo",
        description: "La empresa no está respetando los términos del contrato colectivo firmado el año pasado.",
        category: "Incumplimiento de Contrato",
        severity: "Alta",
        status: ReportStatus.EN_REVISION,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:15:00Z",
        assignedTo: "Lic. María González",
        priority: "Alta",
        estimatedResolution: "2024-02-15",
        notes: [
            {
                id: "note-1",
                content: "Se ha solicitado documentación adicional al denunciante",
                author: "Lic. María González",
                createdAt: "2024-01-18T09:00:00Z",
                isInternal: true
            }
        ],
        actions: [
            {
                id: "action-1",
                action: "Revisar documentación del contrato colectivo",
                status: "En Progreso",
                assignedTo: "Lic. María González",
                dueDate: "2024-01-25",
                notes: "Documentación recibida, en proceso de análisis"
            }
        ]
    },
    {
        id: "CATEM-DEF456-2024",
        title: "Condiciones de Trabajo Inseguras",
        description: "Falta de equipo de protección personal en el área de producción",
        category: "Seguridad Laboral",
        severity: "Crítica",
        status: ReportStatus.INVESTIGACION,
        createdAt: "2024-01-10T08:00:00Z",
        updatedAt: "2024-01-22T16:30:00Z",
        assignedTo: "Ing. Carlos Ruiz",
        priority: "Urgente",
        estimatedResolution: "2024-01-30",
        notes: [
            {
                id: "note-2",
                content: "Inspección programada para el próximo lunes",
                author: "Ing. Carlos Ruiz",
                createdAt: "2024-01-20T11:00:00Z",
                isInternal: true
            }
        ],
        actions: [
            {
                id: "action-2",
                action: "Realizar inspección de seguridad",
                status: "Pendiente",
                assignedTo: "Ing. Carlos Ruiz",
                dueDate: "2024-01-29"
            }
        ]
    }
];

// Función para obtener un reporte detallado
export const getDetailedReport = async (trackingId: string): Promise<DetailedReport | null> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const report = mockReports.find(r => r.id === trackingId);
    return report || null;
};

// Función para obtener todos los reportes (para panel de administración)
export const getAllReports = async (filter?: ReportFilter): Promise<DetailedReport[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredReports = [...mockReports];
    
    if (filter) {
        if (filter.status) {
            filteredReports = filteredReports.filter(r => r.status === filter.status);
        }
        if (filter.severity) {
            filteredReports = filteredReports.filter(r => r.severity === filter.severity);
        }
        if (filter.priority) {
            filteredReports = filteredReports.filter(r => r.priority === filter.priority);
        }
        if (filter.category) {
            filteredReports = filteredReports.filter(r => r.category === filter.category);
        }
    }
    
    return filteredReports;
};

// Función para actualizar el estado de un reporte
export const updateReportStatus = async (
    trackingId: string, 
    newStatus: ReportStatus, 
    assignedTo?: string
): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const reportIndex = mockReports.findIndex(r => r.id === trackingId);
    if (reportIndex === -1) return false;
    
    mockReports[reportIndex].status = newStatus;
    mockReports[reportIndex].updatedAt = new Date().toISOString();
    if (assignedTo) {
        mockReports[reportIndex].assignedTo = assignedTo;
    }
    
    return true;
};

// Función para agregar una nota a un reporte
export const addReportNote = async (
    trackingId: string,
    content: string,
    author: string,
    isInternal: boolean = true
): Promise<ReportNote | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const reportIndex = mockReports.findIndex(r => r.id === trackingId);
    if (reportIndex === -1) return null;
    
    const newNote: ReportNote = {
        id: `note-${Date.now()}`,
        content,
        author,
        createdAt: new Date().toISOString(),
        isInternal
    };
    
    mockReports[reportIndex].notes.push(newNote);
    mockReports[reportIndex].updatedAt = new Date().toISOString();
    
    return newNote;
};

// Función para agregar una acción a un reporte
export const addReportAction = async (
    trackingId: string,
    action: string,
    assignedTo: string,
    dueDate: string
): Promise<ReportAction | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const reportIndex = mockReports.findIndex(r => r.id === trackingId);
    if (reportIndex === -1) return null;
    
    const newAction: ReportAction = {
        id: `action-${Date.now()}`,
        action,
        status: 'Pendiente',
        assignedTo,
        dueDate,
        notes: ''
    };
    
    mockReports[reportIndex].actions.push(newAction);
    mockReports[reportIndex].updatedAt = new Date().toISOString();
    
    return newAction;
};

// Función para actualizar el estado de una acción
export const updateActionStatus = async (
    trackingId: string,
    actionId: string,
    newStatus: 'Pendiente' | 'En Progreso' | 'Completada' | 'Cancelada',
    notes?: string
): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const reportIndex = mockReports.findIndex(r => r.id === trackingId);
    if (reportIndex === -1) return false;
    
    const actionIndex = mockReports[reportIndex].actions.findIndex(a => a.id === actionId);
    if (actionIndex === -1) return false;
    
    mockReports[reportIndex].actions[actionIndex].status = newStatus;
    if (newStatus === 'Completada') {
        mockReports[reportIndex].actions[actionIndex].completedAt = new Date().toISOString();
    }
    if (notes) {
        mockReports[reportIndex].actions[actionIndex].notes = notes;
    }
    
    mockReports[reportIndex].updatedAt = new Date().toISOString();
    
    return true;
};

// Función para calificar un reporte
export const rateReport = async (
    trackingId: string,
    rating: Omit<ReportRating, 'submittedAt'>
): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const reportIndex = mockReports.findIndex(r => r.id === trackingId);
    if (reportIndex === -1) return false;
    
    const fullRating: ReportRating = {
        ...rating,
        submittedAt: new Date().toISOString()
    };
    
    mockReports[reportIndex].rating = fullRating;
    mockReports[reportIndex].updatedAt = new Date().toISOString();
    
    return true;
};

// Función para obtener estadísticas
export const getReportStats = async (): Promise<ReportStats> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const total = mockReports.length;
    const byStatus: Record<ReportStatus, number> = {
        [ReportStatus.RECIBIDO]: 0,
        [ReportStatus.EN_REVISION]: 0,
        [ReportStatus.INVESTIGACION]: 0,
        [ReportStatus.RESUELTO]: 0,
        [ReportStatus.CERRADO]: 0,
        [ReportStatus.NO_PROCEDE]: 0
    };
    
    const bySeverity: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    
    mockReports.forEach(report => {
        byStatus[report.status]++;
        bySeverity[report.severity] = (bySeverity[report.severity] || 0) + 1;
        byPriority[report.priority] = (byPriority[report.priority] || 0) + 1;
    });
    
    // Calcular tiempo promedio de resolución (simulado)
    const averageResolutionTime = 15.5; // días
    
    // Calcular puntuación de satisfacción promedio
    const ratedReports = mockReports.filter(r => r.rating);
    const satisfactionScore = ratedReports.length > 0 
        ? ratedReports.reduce((sum, r) => sum + (r.rating?.satisfaction || 0), 0) / ratedReports.length
        : 0;
    
    return {
        total,
        byStatus,
        bySeverity,
        byPriority,
        averageResolutionTime,
        satisfactionScore
    };
};

