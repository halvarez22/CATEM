import React from 'react';
import type { ReportData } from '../types';
import { ReportStatus } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { PrinterIcon } from './icons/PrinterIcon';

interface StateReportsProps {
  stateName: string;
  reports: ReportData[];
  onBack: () => void;
  onReportClick: (report: ReportData) => void;
}

const statusColors: Record<ReportStatus, string> = {
  [ReportStatus.RECIBIDO]: 'bg-blue-500/20 text-blue-300',
  [ReportStatus.EN_REVISION]: 'bg-yellow-500/20 text-yellow-300',
  [ReportStatus.INVESTIGACION]: 'bg-purple-500/20 text-purple-300',
  [ReportStatus.RESUELTO]: 'bg-green-500/20 text-green-300',
  [ReportStatus.CERRADO]: 'bg-slate-500/20 text-slate-400',
  [ReportStatus.NO_PROCEDE]: 'bg-red-500/20 text-red-400',
};

const severityColors: Record<string, string> = {
  'Baja': 'bg-gray-500/20 text-gray-300',
  'Media': 'bg-yellow-500/20 text-yellow-300',
  'Alta': 'bg-orange-500/20 text-orange-300',
  'Crítica': 'bg-red-500/20 text-red-300',
};

const StateReports: React.FC<StateReportsProps> = ({ 
  stateName, 
  reports, 
  onBack, 
  onReportClick 
}) => {
  const handleExportCSV = () => {
    const headers = ['ID de Seguimiento', 'Título', 'Categoría (IA)', 'Severidad (IA)', 'Estado', 'Fecha'];
    const rows = reports.map(report => [
      `"${report.id}"`,
      `"${report.title.replace(/"/g, '""')}"`,
      `"${report.analysis?.category ?? 'N/A'}"`,
      `"${report.analysis?.severity ?? 'N/A'}"`,
      `"${report.status}"`,
      `"${new Date(report.timestamp).toLocaleString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `denuncias_${stateName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="text-[#d69e2e] hover:text-[#e9b54f] font-semibold mb-2 no-print"
          >
            &larr; Volver al Mapa
          </button>
          <h2 className="text-2xl font-bold text-slate-100">
            Denuncias en {stateName}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {reports.length} denuncia{reports.length !== 1 ? 's' : ''} encontrada{reports.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={handleExportCSV} 
            className="flex items-center gap-2 text-sm bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-3 rounded-md transition"
          >
            <DownloadIcon className="w-4 h-4" />
            Exportar CSV
          </button>
          <button 
            onClick={handlePrintPDF} 
            className="flex items-center gap-2 text-sm bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-3 rounded-md transition"
          >
            <PrinterIcon className="w-4 h-4" />
            Imprimir / PDF
          </button>
        </div>
      </div>

      {reports.length > 0 ? (
        <div className="overflow-x-auto printable-table-container">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#374151] text-xs text-slate-300 uppercase tracking-wider">
              <tr>
                <th className="p-3">ID de Seguimiento</th>
                <th className="p-3">Título</th>
                <th className="p-3">Categoría (IA)</th>
                <th className="p-3">Severidad (IA)</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha</th>
                <th className="p-3 no-print">Acción</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id} className="border-b border-[#374151] hover:bg-[#3d4a5f] transition-colors">
                  <td className="p-3 font-mono text-slate-300">{report.id}</td>
                  <td className="p-3 max-w-xs truncate">{report.title}</td>
                  <td className="p-3 text-slate-400">{report.analysis?.category ?? 'N/A'}</td>
                  <td className="p-3">
                    <span className={`severity-badge px-2 py-1 text-xs font-semibold rounded-full ${severityColors[report.analysis?.severity ?? 'Baja']}`}>
                      {report.analysis?.severity ?? 'N/A'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`status-badge px-2 py-1 text-xs font-semibold rounded-full ${statusColors[report.status]}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{new Date(report.timestamp).toLocaleDateString()}</td>
                  <td className="p-3 no-print">
                    <button 
                      onClick={() => onReportClick(report)} 
                      className="text-[#d69e2e] hover:text-[#e9b54f] font-semibold"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No hay denuncias en {stateName}
          </h3>
          <p className="text-slate-400">
            No se encontraron denuncias con información geográfica para este estado.
          </p>
        </div>
      )}
    </div>
  );
};

export default StateReports;
