import React, { useState, useEffect } from 'react';
import { getAllReports, updateReportStatus, addReportNote, addReportAction, getReportStats } from '../services/reportManagementService';
import type { ReportData } from '../types';
import { ReportStatus } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { LockIcon } from './icons/LockIcon';

interface AdminPanelProps {
    onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
    const [filter, setFilter] = useState<any>({});
    const [newNote, setNewNote] = useState('');
    const [newAction, setNewAction] = useState({
        action: '',
        assignedTo: '',
        dueDate: ''
    });

    useEffect(() => {
        loadData();
    }, [filter]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [reportsData, statsData] = await Promise.all([
                getAllReports(),
                getReportStats()
            ]);
            setReports(reportsData);
            setStats(statsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (reportId: string, newStatus: ReportStatus) => {
        try {
            const success = await updateReportStatus(reportId, newStatus);
            if (success) {
                setReports(prev => prev.map(r => 
                    r.id === reportId 
                        ? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
                        : r
                ));
                if (selectedReport?.id === reportId) {
                    setSelectedReport(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null);
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleAddNote = async () => {
        if (!selectedReport || !newNote.trim()) return;
        
        try {
            const note = await addReportNote();
            if (note) {
                setSelectedReport(prev => prev ? { ...prev, notes: [...prev.notes, note] } : null);
                setNewNote('');
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleAddAction = async () => {
        if (!selectedReport || !newAction.action.trim() || !newAction.assignedTo.trim() || !newAction.dueDate) return;
        
        try {
            const action = await addReportAction();
            if (action) {
                setSelectedReport(prev => prev ? { ...prev, actions: [...prev.actions, action] } : null);
                setNewAction({ action: '', assignedTo: '', dueDate: '' });
            }
        } catch (error) {
            console.error('Error adding action:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: ReportStatus) => {
        switch (status) {
            case ReportStatus.RECIBIDO: return 'bg-blue-100 text-blue-800';
            case ReportStatus.EN_REVISION: return 'bg-yellow-100 text-yellow-800';
            case ReportStatus.INVESTIGACION: return 'bg-orange-100 text-orange-800';
            case ReportStatus.RESUELTO: return 'bg-green-100 text-green-800';
            case ReportStatus.CERRADO: return 'bg-gray-100 text-gray-800';
            case ReportStatus.NO_PROCEDE: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'Baja': return 'text-green-400';
            case 'Media': return 'text-yellow-400';
            case 'Alta': return 'text-orange-400';
            case 'Crítica': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    if (loading) {
        return (
            <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d69e2e] mx-auto"></div>
                    <p className="text-slate-300 mt-4">Cargando panel de administración...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-100">Panel de Administración</h2>
                <button
                    onClick={onBack}
                    className="bg-[#374151] hover:bg-[#4a5568] text-slate-300 px-4 py-2 rounded-md transition"
                >
                    Volver
                </button>
            </div>

            {/* Estadísticas */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#374151] p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#d69e2e]">{stats.total}</p>
                        <p className="text-slate-400 text-sm">Total Reportes</p>
                    </div>
                    <div className="bg-[#374151] p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-400">{stats.byStatus[ReportStatus.RESUELTO]}</p>
                        <p className="text-slate-400 text-sm">Resueltos</p>
                    </div>
                    <div className="bg-[#374151] p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-400">{stats.averageResolutionTime.toFixed(1)}</p>
                        <p className="text-slate-400 text-sm">Días Promedio</p>
                    </div>
                    <div className="bg-[#374151] p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-yellow-400">{stats.satisfactionScore.toFixed(1)}</p>
                        <p className="text-slate-400 text-sm">Satisfacción</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de Reportes */}
                <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Reportes</h3>
                    
                    {/* Filtros */}
                    <div className="space-y-3 mb-4">
                        <select
                            value={filter.status || ''}
                            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value as ReportStatus || undefined }))}
                            className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        >
                            <option value="">Todos los estados</option>
                            {Object.values(ReportStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        
                        <select
                            value={filter.severity || ''}
                            onChange={(e) => setFilter(prev => ({ ...prev, severity: e.target.value as any || undefined }))}
                            className="w-full bg-[#374151] border border-[#4a5568] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                        >
                            <option value="">Todas las severidades</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                            <option value="Crítica">Crítica</option>
                        </select>
                    </div>

                    {/* Lista */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                onClick={() => setSelectedReport(report)}
                                className={`p-3 rounded-lg cursor-pointer transition ${
                                    selectedReport?.id === report.id 
                                        ? 'bg-[#d69e2e] text-white' 
                                        : 'bg-[#374151] hover:bg-[#4a5568] text-slate-200'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-mono text-sm">{report.id}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                        {report.status}
                                    </span>
                                </div>
                                <p className="text-sm font-medium truncate">{report.title}</p>
                                <p className="text-xs opacity-75">{formatDate(report.createdAt)}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className={`text-xs ${getSeverityColor(report.severity)}`}>
                                        {report.severity}
                                    </span>
                                    {report.assignedTo && (
                                        <span className="text-xs opacity-75">{report.assignedTo}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detalles del Reporte Seleccionado */}
                <div className="lg:col-span-2">
                    {selectedReport ? (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-100 mb-4">
                                Detalles: {selectedReport.id}
                            </h3>
                            
                            {/* Información Principal */}
                            <div className="bg-[#374151] p-4 rounded-lg mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-slate-200 font-medium mb-2">{selectedReport.title}</h4>
                                        <p className="text-slate-300 text-sm">{selectedReport.description}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 text-sm">Estado:</span>
                                            <select
                                                value={selectedReport.status}
                                                onChange={(e) => handleStatusUpdate(selectedReport.id, e.target.value as ReportStatus)}
                                                className="bg-[#4a5568] border border-[#2d3748] rounded px-2 py-1 text-slate-200 text-sm"
                                            >
                                                {Object.values(ReportStatus).map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 text-sm">Severidad:</span>
                                            <span className={`text-sm ${getSeverityColor(selectedReport.severity)}`}>
                                                {selectedReport.severity}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 text-sm">Creado:</span>
                                            <span className="text-slate-300 text-sm">{formatDate(selectedReport.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="mb-6">
                                <h4 className="text-slate-200 font-medium mb-3">Acciones</h4>
                                <div className="space-y-3">
                                    {selectedReport.actions.map((action) => (
                                        <div key={action.id} className="bg-[#374151] p-3 rounded-lg">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-slate-200 font-medium">{action.action}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    action.status === 'Completada' ? 'bg-green-100 text-green-800' :
                                                    action.status === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {action.status}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm">Asignado a: {action.assignedTo}</p>
                                            <p className="text-slate-400 text-sm">Fecha límite: {formatDate(action.dueDate)}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Nueva Acción */}
                                <div className="bg-[#374151] p-4 rounded-lg mt-4">
                                    <h5 className="text-slate-200 font-medium mb-3">Agregar Nueva Acción</h5>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={newAction.action}
                                            onChange={(e) => setNewAction(prev => ({ ...prev, action: e.target.value }))}
                                            placeholder="Descripción de la acción"
                                            className="w-full bg-[#4a5568] border border-[#2d3748] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                                        />
                                        <input
                                            type="text"
                                            value={newAction.assignedTo}
                                            onChange={(e) => setNewAction(prev => ({ ...prev, assignedTo: e.target.value }))}
                                            placeholder="Responsable"
                                            className="w-full bg-[#4a5568] border border-[#2d3748] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                                        />
                                        <input
                                            type="date"
                                            value={newAction.dueDate}
                                            onChange={(e) => setNewAction(prev => ({ ...prev, dueDate: e.target.value }))}
                                            className="w-full bg-[#4a5568] border border-[#2d3748] rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                                        />
                                        <button
                                            onClick={handleAddAction}
                                            className="w-full bg-[#d69e2e] hover:bg-[#b88a2a] text-white font-bold py-2 px-4 rounded-md transition"
                                        >
                                            Agregar Acción
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notas */}
                            <div className="mb-6">
                                <h4 className="text-slate-200 font-medium mb-3">Notas</h4>
                                <div className="space-y-3 mb-4">
                                    {selectedReport.notes.map((note) => (
                                        <div key={note.id} className="bg-[#374151] p-3 rounded-lg">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-slate-200 font-medium">{note.author}</span>
                                                <span className="text-slate-400 text-sm">{formatDate(note.createdAt)}</span>
                                            </div>
                                            <p className="text-slate-300 text-sm">{note.content}</p>
                                            {note.isInternal && (
                                                <div className="flex items-center gap-1 mt-2">
                                                    <LockIcon className="w-4 h-4 text-slate-500" />
                                                    <span className="text-xs text-slate-500">Nota interna</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Nueva Nota */}
                                <div className="bg-[#374151] p-4 rounded-lg">
                                    <h5 className="text-slate-200 font-medium mb-3">Agregar Nota</h5>
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        placeholder="Escriba una nota interna..."
                                        className="w-full bg-[#4a5568] border border-[#2d3748] rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
                                        rows={3}
                                    />
                                    <button
                                        onClick={handleAddNote}
                                        className="mt-3 bg-[#d69e2e] hover:bg-[#b88a2a] text-white font-bold py-2 px-4 rounded-md transition"
                                    >
                                        Agregar Nota
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400">
                            <FileTextIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Seleccione un reporte para ver los detalles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

