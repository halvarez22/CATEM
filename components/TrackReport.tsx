import React, { useState } from 'react';
import { ReportStatus, ReportData } from '../types';
import StatusDisplay from './StatusDisplay';
import { SearchIcon } from './icons/SearchIcon';

interface TrackReportProps {
    reports: ReportData[];
}

const TrackReport: React.FC<TrackReportProps> = ({ reports }) => {
    const [trackingId, setTrackingId] = useState('');
    const [status, setStatus] = useState<ReportStatus | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSearched(true);
        if (!trackingId.trim()) {
            setError("Por favor, ingrese un ID de seguimiento.");
            setStatus(null);
            return;
        }

        const foundReport = reports.find(r => r.id.toLowerCase() === trackingId.trim().toLowerCase());
        
        if(foundReport) {
            setStatus(foundReport.status);
            setError(null);
        } else {
            setStatus(null);
            setError("ID de seguimiento no válido o no encontrado. Por favor, verifique el ID e inténtelo de nuevo.");
        }
    };
    
    return (
        <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Seguimiento de Reporte</h2>
                <p className="text-sm text-slate-400 mt-2">Ingrese su ID de seguimiento para ver el estado actual de su reporte.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => {
                        setTrackingId(e.target.value);
                        setSearched(false);
                        setError(null);
                        setStatus(null);
                    }}
                    className="flex-grow w-full bg-[#374151] border border-[#4a5568] rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition font-mono"
                    placeholder="CATEM-XXXXXX-XXXX"
                    aria-label="ID de seguimiento"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#d69e2e] hover:bg-[#b88a2a] text-white font-bold py-3 px-6 rounded-md transition"
                >
                    <SearchIcon className="w-5 h-5"/>
                    <span>Buscar</span>
                </button>
            </form>

            {searched && (
                <div className="mt-8">
                    {error && (
                        <p role="alert" className="text-center text-[#e9b54f] bg-[#d69e2e]/20 p-3 rounded-md">{error}</p>
                    )}
                    {status && (
                        <div className="animate-fade-in-slow">
                             <StatusDisplay currentStatus={status} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrackReport;
