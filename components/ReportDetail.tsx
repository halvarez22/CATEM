
import React, { useState } from 'react';
import type { ReportData, Note } from '../types';
import { ReportStatus } from '../types';
import { LockIcon } from './icons/LockIcon';
import { FileTextIcon } from './icons/FileTextIcon';

interface ReportDetailProps {
  report: ReportData;
  onUpdateReport: (report: ReportData) => void;
  onBack: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onUpdateReport, onBack }) => {
  const [newStatus, setNewStatus] = useState<ReportStatus>(report.status);
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = () => {
    if (newStatus === report.status && !newNote.trim()) return; // No changes to save
    
    setIsSaving(true);
    const updatedReport = { ...report };

    updatedReport.status = newStatus;

    if (newNote.trim()) {
      const note: Note = {
        text: newNote.trim(),
        timestamp: new Date().toISOString(),
        author: 'Agente Interno',
      };
      updatedReport.internalNotes = [...report.internalNotes, note];
    }
    
    // Simulate async save
    setTimeout(() => {
        onUpdateReport(updatedReport);
        setNewNote('');
        setIsSaving(false);
    }, 500);
  };
  
  const hasExtractedEntities = report.analysis && (
    (report.analysis.locations && report.analysis.locations.length > 0) ||
    (report.analysis.involvedParties && report.analysis.involvedParties.length > 0) ||
    (report.analysis.keyDates && report.analysis.keyDates.length > 0)
  );

  return (
    <div className="animate-fade-in space-y-6">
        <button onClick={onBack} className="text-[#d69e2e] hover:text-[#e9b54f] font-semibold mb-4">
            &larr; Volver al Dashboard
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: User Report */}
        <div className="lg:col-span-2 bg-[#2d3748] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-slate-100 border-b border-[#374151] pb-3 mb-4">Detalles del Reporte</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-slate-400">ID de Seguimiento</p>
              <p className="font-mono text-[#d69e2e]">{report.id}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-400">Fecha de Recepción</p>
              <p>{new Date(report.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-400">Título</p>
              <p>{report.title}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-400">Descripción Detallada</p>
              <p className="bg-[#374151] p-3 rounded-md whitespace-pre-wrap">{report.description}</p>
            </div>
            {report.files.length > 0 && (
              <div>
                <p className="font-semibold text-slate-400">Archivos Adjuntos</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    {report.files.map((file, index) => (
                        <li key={index} className="flex items-center gap-2 text-blue-300">
                           <FileTextIcon className="w-4 h-4" /> {file.name}
                        </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Internal Management */}
        <div className="space-y-6">
            <div className="bg-[#2d3748] p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-slate-100 mb-3">Análisis de IA</h3>
                <div className="space-y-2 text-sm">
                    <p><strong className="text-slate-400">Categoría:</strong> {report.analysis?.category ?? 'N/A'}</p>
                    <p><strong className="text-slate-400">Severidad:</strong> {report.analysis?.severity ?? 'N/A'}</p>
                    <p className="text-slate-400 font-semibold mt-2">Resumen:</p>
                    <p className="text-slate-300 italic">"{report.analysis?.summary ?? 'No disponible.'}"</p>
                </div>
                {hasExtractedEntities && (
                  <div className="mt-4 pt-4 border-t border-[#374151]">
                      <h4 className="text-md font-semibold text-slate-200 mb-3">Entidades Clave (IA)</h4>
                      <div className="space-y-3 text-sm">
                          {report.analysis?.locations && report.analysis.locations.length > 0 && (
                              <div>
                                  <strong className="text-slate-400 block mb-1">Ubicaciones</strong>
                                  <div className="flex flex-wrap gap-2">
                                      {report.analysis.locations.map((loc, i) => (
                                          <span key={i} className="bg-purple-500/20 text-purple-300 px-2 py-1 text-xs font-medium rounded-full">{loc}</span>
                                      ))}
                                  </div>
                              </div>
                          )}
                          {report.analysis?.involvedParties && report.analysis.involvedParties.length > 0 && (
                              <div>
                                  <strong className="text-slate-400 block mb-1">Partes Involucradas</strong>
                                  <div className="flex flex-wrap gap-2">
                                      {report.analysis.involvedParties.map((party, i) => (
                                          <span key={i} className="bg-blue-500/20 text-blue-300 px-2 py-1 text-xs font-medium rounded-full">{party}</span>
                                      ))}
                                  </div>
                              </div>
                          )}
                          {report.analysis?.keyDates && report.analysis.keyDates.length > 0 && (
                              <div>
                                  <strong className="text-slate-400 block mb-1">Fechas Clave</strong>
                                  <div className="flex flex-wrap gap-2">
                                      {report.analysis.keyDates.map((date, i) => (
                                          <span key={i} className="bg-yellow-500/20 text-yellow-300 px-2 py-1 text-xs font-medium rounded-full">{date}</span>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
                )}
            </div>

            <div className="bg-[#2d3748] p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-slate-100 mb-4">Gestión del Caso</h3>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1">Actualizar Estado</label>
                    <select
                        id="status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                    >
                        {Object.values(ReportStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="mt-4">
                     <label htmlFor="internalNote" className="block text-sm font-medium text-slate-300 mb-1">Añadir Nota Interna</label>
                     <textarea
                        id="internalNote"
                        rows={4}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        placeholder="Añadir comentario de seguimiento..."
                    />
                </div>
                 <button 
                    onClick={handleSaveChanges} 
                    disabled={isSaving}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-[#d69e2e] hover:bg-[#b88a2a] disabled:bg-[#9a7224] text-white font-bold py-2 px-4 rounded-md transition"
                >
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            <div className="bg-[#2d3748] p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-slate-100 mb-3">Historial de Notas</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {report.internalNotes.length > 0 ? [...report.internalNotes].reverse().map((note, index) => (
                         <div key={index} className="text-sm bg-[#374151] p-3 rounded-md border-l-4 border-l-[#d69e2e]">
                            <p className="text-slate-300 whitespace-pre-wrap">{note.text}</p>
                            <p className="text-right text-slate-500 mt-2 text-[11px]">
                                - {note.author} el {new Date(note.timestamp).toLocaleString()}
                            </p>
                         </div>
                    )) : (
                        <p className="text-sm text-slate-400">No hay notas internas para este caso.</p>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;