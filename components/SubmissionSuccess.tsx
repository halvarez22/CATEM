import React, { useState } from 'react';
import type { View } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SubmissionSuccessProps {
    trackingId: string;
    onNavigate: (view: View) => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ trackingId, onNavigate }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(trackingId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl text-center animate-fade-in">
             <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-100">Reporte Enviado con Éxito</h2>
            <p className="text-slate-400 mt-2">Su reporte ha sido recibido de forma segura y anónima.</p>
            
            <div className="mt-8 bg-[#1a202c] border border-[#374151] p-4 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Su ID de seguimiento único es:</p>
                <div className="flex items-center justify-center gap-4 bg-[#374151] p-3 rounded-md">
                    <span className="text-lg font-mono text-[#d69e2e] tracking-wider">{trackingId}</span>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-md bg-[#4a5568] hover:bg-[#5a6678] text-slate-200 transition-colors"
                        title={copied ? 'Copiado!' : 'Copiar ID'}
                    >
                         {copied ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="mt-6 bg-[#d69e2e]/20 text-[#d69e2e] p-4 rounded-md text-sm text-left">
                <p className="font-bold mb-2">¡Importante!</p>
                <p>Guarde este ID en un lugar seguro. Es la única forma de dar seguimiento a su reporte. Si lo pierde, no podrá ser recuperado por motivos de seguridad.</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                    onClick={() => onNavigate('track')} 
                    className="w-full sm:w-auto bg-[#d69e2e] hover:bg-[#b88a2a] text-white font-bold py-2 px-6 rounded-md transition"
                >
                    Seguir mi Reporte Ahora
                </button>
                <button 
                    onClick={() => onNavigate('form')} 
                    className="w-full sm:w-auto bg-[#374151] hover:bg-[#4a5568] text-slate-200 font-bold py-2 px-6 rounded-md transition"
                >
                    Crear Otro Reporte
                </button>
            </div>
        </div>
    );
};

export default SubmissionSuccess;