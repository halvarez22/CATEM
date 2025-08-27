import React, { useState, useMemo } from 'react';
import { ReportStatus } from '../types';
import StatusDisplay from './StatusDisplay';
import { SearchIcon } from './icons/SearchIcon';

// Mock function to simulate fetching report status
const getMockStatus = (trackingId: string): ReportStatus | null => {
    if (!trackingId.startsWith("CATEM-") || trackingId.length < 12) return null;
    
    // Simple logic to return a status based on the ID's last character
    const lastChar = trackingId.charCodeAt(trackingId.length - 1);
    const statuses = Object.values(ReportStatus);
    const index = lastChar % statuses.length;
    return statuses[index];
}


const TrackReport: React.FC = () => {
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

        // Simulate API call
        const foundStatus = getMockStatus(trackingId.trim());
        
        if(foundStatus) {
            setStatus(foundStatus);
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
                    }}
                    className="flex-grow w-full bg-[#374151] border border-[#4a5568] rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition font-mono"
                    placeholder="CATEM-XXXXXX-XXXX"
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
                        <p className="text-center text-[#e9b54f] bg-[#d69e2e]/20 p-3 rounded-md">{error}</p>
                    )}
                    {status && (
                        <StatusDisplay currentStatus={status} />
                    )}
                </div>
            )}
        </div>
    );
};

export default TrackReport;