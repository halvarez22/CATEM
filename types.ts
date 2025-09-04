export type View = 'form' | 'success' | 'track' | 'dashboard' | 'managerialDashboard' | 'login';

export enum ReportStatus {
    RECIBIDO = "Recibido",
    EN_REVISION = "En Revisión",
    INVESTIGACION = "En Investigación",
    RESUELTO = "Resuelto",
    CERRADO = "Cerrado",
    NO_PROCEDE = "No Procede"
}

export interface Report {
    title: string;
    description: string;
    files: File[];
}

export interface AnalyzedReport {
    category: string;
    severity: 'Baja' | 'Media' | 'Alta' | 'Crítica';
    summary: string;
    keyDates?: string[];
    locations?: string[];
    involvedParties?: string[];
}

export interface Note {
    text: string;
    timestamp: string;
    author: string; // e.g., 'Agente Interno'
}

// Represents the full report object as stored in the system
export interface ReportData extends Report {
    id: string;
    status: ReportStatus;
    analysis: AnalyzedReport | null;
    timestamp: string;
    internalNotes: Note[];
}
