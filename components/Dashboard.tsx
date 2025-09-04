import React, { useState, useMemo, useEffect } from 'react';
import type { ReportData } from '../types';
import { ReportStatus } from '../types';
import ReportDetail from './ReportDetail';
import { SearchIcon } from './icons/SearchIcon';
import type { DashboardFilters } from '../App';
import { DownloadIcon } from './icons/DownloadIcon';
import { PrinterIcon } from './icons/PrinterIcon';


interface DashboardProps {
  reports: ReportData[];
  onUpdateReport: (report: ReportData) => void;
  initialFilters?: DashboardFilters;
  onBackToManagerial: () => void;
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

const uniqueCategories = (reports: ReportData[]) => {
    const categories = new Set(reports.map(r => r.analysis?.category).filter(Boolean));
    return Array.from(categories) as string[];
}

const Dashboard: React.FC<DashboardProps> = ({ reports, onUpdateReport, initialFilters, onBackToManagerial }) => {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const hasInitialFilters = useMemo(() => initialFilters && Object.keys(initialFilters).length > 0, [initialFilters]);

  useEffect(() => {
    setStatusFilter(initialFilters?.status || 'All');
    setCategoryFilter(initialFilters?.category || 'All');
    setSeverityFilter(initialFilters?.severity || 'All');
  }, [initialFilters]);

  const filteredReports = useMemo(() => {
    return reports
      .filter(report => {
        if (!startDate && !endDate) return true;
        const reportDate = new Date(report.timestamp);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        if (start) start.setUTCHours(0, 0, 0, 0);
        if (end) end.setUTCHours(23, 59, 59, 999);
        if (start && end) return reportDate >= start && reportDate <= end;
        if (start) return reportDate >= start;
        if (end) return reportDate <= end;
        return true;
      })
      .filter(report => statusFilter === 'All' || report.status === statusFilter)
      .filter(report => categoryFilter === 'All' || report.analysis?.category === categoryFilter)
      .filter(report => severityFilter === 'All' || report.analysis?.severity === severityFilter)
      .filter(report =>
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [reports, searchTerm, statusFilter, categoryFilter, severityFilter, startDate, endDate]);
  
  const handleUpdateAndGoBack = (updatedReport: ReportData) => {
    onUpdateReport(updatedReport);
    setSelectedReport(updatedReport); // Refresh the detail view with new data
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setSeverityFilter('All');
    setStartDate('');
    setEndDate('');
    if(hasInitialFilters) {
        onBackToManagerial();
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID de Seguimiento', 'Título', 'Categoría (IA)', 'Severidad (IA)', 'Estado', 'Fecha'];
    const rows = filteredReports.map(report => [
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
    link.setAttribute("download", `reportes_catem_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };


  if (selectedReport) {
    return (
      <ReportDetail
        report={selectedReport}
        onUpdateReport={handleUpdateAndGoBack}
        onBack={() => setSelectedReport(null)}
      />
    );
  }

  return (
    <div id="dashboard-container" className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
       {hasInitialFilters && (
         <button onClick={handleResetFilters} className="text-[#d69e2e] hover:text-[#e9b54f] font-semibold mb-4 no-print">
            &larr; Volver al Dashboard Gerencial y limpiar filtros
        </button>
       )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-100">Dashboard de Atención a Quejas</h2>
            <p className="text-sm text-slate-400 mt-1">Mostrando {filteredReports.length} de {reports.length} reportes</p>
        </div>
         <div id="dashboard-actions" className="flex items-center gap-3 flex-shrink-0">
            <button onClick={handleExportCSV} className="flex items-center gap-2 text-sm bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-3 rounded-md transition">
                <DownloadIcon className="w-4 h-4" />
                Exportar a CSV
            </button>
            <button onClick={handlePrintPDF} className="flex items-center gap-2 text-sm bg-[#374151] hover:bg-[#4a5568] text-slate-300 font-medium py-2 px-3 rounded-md transition">
                <PrinterIcon className="w-4 h-4" />
                Imprimir / PDF
            </button>
        </div>
      </div>
      
       <div id="dashboard-filters" className="flex flex-wrap items-end gap-4 mb-6 p-4 bg-[#1a202c]/50 rounded-lg">
          <div className="flex-grow" style={{minWidth: '200px'}}>
                <label htmlFor="search" className="block text-xs font-medium text-slate-400 mb-1">Búsqueda</label>
                <div className="relative">
                    <input
                        id="search"
                        type="text"
                        placeholder="Buscar por ID o título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#374151] border border-[#4a5568] rounded-md py-2 pl-10 pr-4 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
            </div>
            <div className="flex-grow" style={{minWidth: '150px'}}>
                 <label htmlFor="statusFilter" className="block text-xs font-medium text-slate-400 mb-1">Estado</label>
                 <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                >
                    <option value="All">Todos los Estados</option>
                    {Object.values(ReportStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <div className="flex-grow" style={{minWidth: '150px'}}>
                 <label htmlFor="categoryFilter" className="block text-xs font-medium text-slate-400 mb-1">Categoría</label>
                 <select
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                >
                    <option value="All">Todas las Categorías</option>
                    {uniqueCategories(reports).map(cat => (
                         <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
             <div className="flex-grow" style={{minWidth: '150px'}}>
                 <label htmlFor="severityFilter" className="block text-xs font-medium text-slate-400 mb-1">Severidad</label>
                 <select
                    id="severityFilter"
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                >
                    <option value="All">Todas las Severidades</option>
                     {['Baja', 'Media', 'Alta', 'Crítica'].map(sev => (
                         <option key={sev} value={sev}>{sev}</option>
                    ))}
                </select>
            </div>
             <div className="flex-grow" style={{minWidth: '130px'}}>
                 <label htmlFor="startDate" className="block text-xs font-medium text-slate-400 mb-1">Fecha Inicio</label>
                 <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-[6px] text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition" />
            </div>
             <div className="flex-grow" style={{minWidth: '130px'}}>
                 <label htmlFor="endDate" className="block text-xs font-medium text-slate-400 mb-1">Fecha Fin</label>
                 <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-[6px] text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition" />
            </div>
            <div className="flex-shrink-0">
                <button onClick={handleResetFilters} className="w-full bg-[#4a5568] hover:bg-[#5a6678] text-slate-200 font-bold py-2 px-4 rounded-md transition">Limpiar</button>
            </div>
        </div>


      <div className="overflow-x-auto printable-table-container">
        <table id="dashboard-table" className="w-full text-left text-sm">
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
            {filteredReports.length > 0 ? filteredReports.map(report => (
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
                  <button onClick={() => setSelectedReport(report)} className="text-[#d69e2e] hover:text-[#e9b54f] font-semibold">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={7} className="text-center p-8 text-slate-400">
                        No se encontraron reportes que coincidan con los filtros aplicados.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;