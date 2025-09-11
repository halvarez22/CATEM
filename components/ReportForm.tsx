import React, { useState, useRef } from 'react';
import { analyzeReport, generateTrackingId } from '../services/geminiService';
import { LockIcon } from './icons/LockIcon';
import { UploadIcon } from './icons/UploadIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { MicIcon } from './icons/MicIcon';
import type { ReportData } from '../types';
import { ReportStatus } from '../types';
import { mexicanStates } from '../data/mexicanStates';

interface ReportFormProps {
    onSubmitted: (report: ReportData) => void;
}

const commonReportTypes = [
    "Seleccione un tipo de reporte...",
    "Incumplimiento de Contrato Colectivo",
    "Condiciones de Trabajo Inseguras",
    "Acoso Laboral o Mobbing",
    "Retraso o Falta de Pago de Salarios",
    "Despido Injustificado",
    "Violación a la Libertad Sindical",
    "Discriminación",
    "Otro",
];

const stateOptions = [
    "Seleccione su estado...",
    ...mexicanStates.map(state => state.name).sort()
];

const ReportForm: React.FC<ReportFormProps> = ({ onSubmitted }) => {
    const [reportType, setReportType] = useState(commonReportTypes[0]);
    const [otherTitle, setOtherTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedState, setSelectedState] = useState(stateOptions[0]);
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const allowedDocTypes = ['.pdf', '.doc', '.docx', '.txt'];
            const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a'];
            const allowedVisualTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime', 'video/x-matroska'];
            
            const acceptedFiles: File[] = [];
            let validationError = '';

            newFiles.forEach((file: File) => {
                let isValid = false;
                const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

                if (event.target.accept.includes('audio')) {
                    isValid = allowedAudioTypes.includes(file.type);
                } else if (event.target.accept.includes('image') || event.target.accept.includes('video')) {
                    isValid = allowedVisualTypes.includes(file.type);
                } else { // Documents
                    isValid = allowedDocTypes.includes(fileExtension);
                }

                if (file.size > 10 * 1024 * 1024) { // 10MB limit
                    validationError = `El archivo "${file.name}" excede el límite de 10MB.`;
                    isValid = false;
                }
                
                if (isValid) {
                    acceptedFiles.push(file);
                } else if (!validationError) {
                     validationError = `El tipo de archivo "${file.name}" no es válido.`;
                }
            });
            
            if (validationError) {
                setError(validationError);
            } else {
                 setError(null);
            }

            if(acceptedFiles.length > 0) {
                 setFiles(prevFiles => {
                     const existingFileNames = new Set(prevFiles.map(f => f.name));
                     const trulyNewFiles = acceptedFiles.filter(f => !existingFileNames.has(f.name));
                     return [...prevFiles, ...trulyNewFiles];
                 });
            }
        }
    };


    const removeFile = (fileName: string) => {
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (reportType === commonReportTypes[0]) {
            setError("Por favor, seleccione un tipo de reporte.");
            return;
        }
        if (reportType === 'Otro' && !otherTitle.trim()) {
            setError("Cuando selecciona 'Otro', debe especificar un título para el reporte.");
            return;
        }
        if (selectedState === stateOptions[0]) {
            setError("Por favor, seleccione su estado.");
            return;
        }
        if (!description.trim()) {
            setError("La descripción detallada es obligatoria.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // Simulate report analysis
            const analysisResult = await analyzeReport(description);
            
            const trackingId = generateTrackingId();
            const finalTitle = reportType === 'Otro' ? otherTitle.trim() : reportType;

            const newReport: ReportData = {
                id: trackingId,
                title: finalTitle,
                description: description.trim(),
                files,
                state: selectedState,
                status: ReportStatus.RECIBIDO,
                analysis: analysisResult,
                timestamp: new Date().toISOString(),
                internalNotes: [],
            };
            
            // In a real app, you would now upload the report data and files to a secure server.
            
            setTimeout(() => { // Simulate network delay
              onSubmitted(newReport);
            }, 500);

        } catch (e) {
            console.error("Submission failed", e);
            setError("No se pudo enviar el reporte. Por favor, inténtelo de nuevo más tarde.");
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Crear Reporte Anónimo</h2>
                <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">Su identidad está protegida. No registramos información personal ni su dirección IP.</p>
            </div>
            
            <div className="flex items-center gap-3 bg-[#d69e2e]/20 text-[#d69e2e] p-3 rounded-md mb-6 text-sm">
                <LockIcon className="w-5 h-5 flex-shrink-0" />
                <span>Toda la comunicación está cifrada para garantizar su confidencialidad.</span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="reportType" className="block text-sm font-medium text-slate-300 mb-1">Título del Reporte (*)</label>
                    <select
                        id="reportType"
                        value={reportType}
                        onChange={(e) => {
                            setReportType(e.target.value);
                             if (e.target.value !== 'Otro') {
                                setOtherTitle('');
                            }
                        }}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        aria-required="true"
                    >
                        {commonReportTypes.map(type => (
                            <option key={type} value={type} disabled={type === commonReportTypes[0]}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {reportType === 'Otro' && (
                     <div className="animate-fade-in">
                        <label htmlFor="otherTitle" className="block text-sm font-medium text-slate-300 mb-1">Especifique el Título (*)</label>
                        <input
                            type="text"
                            id="otherTitle"
                            value={otherTitle}
                            onChange={(e) => setOtherTitle(e.target.value)}
                            className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                            placeholder="Ej: Falta de equipo de protección personal"
                            required
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-1">Estado (*)</label>
                    <select
                        id="state"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        aria-required="true"
                    >
                        {stateOptions.map(state => (
                            <option key={state} value={state} disabled={state === stateOptions[0]}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Descripción Detallada (*)</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        placeholder="Describa la situación con el mayor detalle posible. Incluya fechas, lugares y personas involucradas si es posible, sin revelar su identidad."
                        required
                        aria-required="true"
                    />
                </div>

                <div>
                    <span className="block text-sm font-medium text-slate-300 mb-2">Adjuntar Evidencia (Opcional, máx 10MB por archivo)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input type="file" ref={docInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" multiple />
                        <button type="button" onClick={() => docInputRef.current?.click()} className="flex items-center justify-center gap-2 w-full bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-4 rounded-md transition">
                            <FileTextIcon className="w-5 h-5" /> Documento
                        </button>
                        
                        <input type="file" ref={audioInputRef} onChange={handleFileChange} className="hidden" accept="audio/*" multiple />
                        <button type="button" onClick={() => audioInputRef.current?.click()} className="flex items-center justify-center gap-2 w-full bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-4 rounded-md transition">
                            <MicIcon className="w-5 h-5" /> Audio
                        </button>
                        
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" multiple />
                         <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 w-full bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-4 rounded-md transition">
                            <UploadIcon className="w-5 h-5" /> Imagen/Video
                        </button>
                    </div>
                </div>
                
                {files.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-slate-300">Archivos adjuntos:</h3>
                        <ul className="space-y-1" aria-label="Lista de archivos adjuntos">
                            {files.map(file => (
                                <li key={file.name} className="flex items-center justify-between bg-[#374151] p-2 rounded-md text-sm">
                                    <span className="text-slate-300 truncate pr-2">{file.name}</span>
                                    <button onClick={() => removeFile(file.name)} className="text-red-400 hover:text-red-300 font-bold" aria-label={`Quitar archivo ${file.name}`}>&times;</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {error && <p role="alert" className="text-[#e9b54f] text-sm">{error}</p>}
                
                <button
                    type="submit"
                    disabled={isLoading || !description.trim() || (reportType !== 'Otro' && reportType === commonReportTypes[0]) || (reportType === 'Otro' && !otherTitle.trim()) || selectedState === stateOptions[0]}
                    className="w-full flex items-center justify-center gap-3 bg-[#d69e2e] hover:bg-[#b88a2a] disabled:bg-[#9a7224] disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
                >
                    {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Procesando de forma segura...
                        </>
                    ) : (
                        <>
                            <LockIcon className="w-5 h-5" />
                            Enviar Reporte de Forma Segura
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default ReportForm;
