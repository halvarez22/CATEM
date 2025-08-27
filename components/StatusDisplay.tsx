import React from 'react';
import { ReportStatus } from '../types';

interface StatusDisplayProps {
    currentStatus: ReportStatus;
}

const statusOrder: ReportStatus[] = [
    ReportStatus.RECIBIDO,
    ReportStatus.EN_REVISION,
    ReportStatus.INVESTIGACION,
    ReportStatus.RESUELTO,
    ReportStatus.CERRADO,
];

const statusDescriptions: Record<ReportStatus, string> = {
    [ReportStatus.RECIBIDO]: "Hemos recibido su reporte de forma segura. Está pendiente de asignación a un revisor.",
    [ReportStatus.EN_REVISION]: "Un revisor ha sido asignado y está evaluando la información proporcionada.",
    [ReportStatus.INVESTIGACION]: "El reporte ha sido validado y se ha iniciado un proceso de investigación formal.",
    [ReportStatus.RESUELTO]: "Se han tomado acciones correctivas basadas en la investigación. El caso está en proceso de cierre.",
    [ReportStatus.CERRADO]: "El caso ha sido cerrado. Agradecemos su contribución a un entorno laboral más justo.",
    [ReportStatus.NO_PROCEDE]: "Tras la revisión, no se encontraron elementos suficientes para iniciar una investigación. El caso ha sido cerrado."
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ currentStatus }) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const isTerminalStatus = currentStatus === ReportStatus.CERRADO || currentStatus === ReportStatus.NO_PROCEDE;
    
    if (currentStatus === ReportStatus.NO_PROCEDE) {
        return (
             <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-[#d69e2e] mb-2">Estado: No Procede</h3>
                <p className="text-slate-300 bg-[#374151] p-4 rounded-lg">{statusDescriptions[currentStatus]}</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-slow">
            <div className="flex justify-between items-center mb-2 px-2">
                {statusOrder.map((status) => (
                     <span key={status} className="text-xs text-slate-400 text-center flex-1">{status}</span>
                ))}
            </div>
            <div className="relative w-full h-2 bg-[#374151] rounded-full">
                <div 
                    className="absolute top-0 left-0 h-2 bg-[#d69e2e] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(currentIndex / (statusOrder.length - 1)) * 100}%` }}
                ></div>
                {statusOrder.map((status, index) => {
                    const isActive = index <= currentIndex;
                    return (
                        <div
                            key={status}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-500"
                            style={{ left: `${(index / (statusOrder.length - 1)) * 100}%` }}
                        >
                            <div className={`w-full h-full rounded-full ${isActive ? 'bg-[#d69e2e]' : 'bg-slate-500'}`}></div>
                        </div>
                    );
                })}
            </div>
             <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    Estado Actual: <span className="text-[#d69e2e]">{currentStatus}</span>
                </h3>
                <p className="text-slate-300 bg-[#374151] p-4 rounded-lg">{statusDescriptions[currentStatus]}</p>
            </div>
        </div>
    );
};

export default StatusDisplay;