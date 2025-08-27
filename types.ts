
export type View = 'form' | 'success' | 'track';

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
}
