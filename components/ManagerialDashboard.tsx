import React, { useMemo } from 'react';
import type { ReportData } from '../types';
import { ReportStatus } from '../types';
import type { DashboardFilters } from '../App';
import KPICard from './KPICard';
import SimpleBarChart from './charts/SimpleBarChart';

// Icons for KPIs
import { FolderIcon, FolderOpenIcon, CheckBadgeIcon, ClockIcon } from './icons/KPIIcons';

interface ManagerialDashboardProps {
  reports: ReportData[];
  onDrillDown: (filters: DashboardFilters) => void;
}

// Color palettes for charts
const statusColors: Record<ReportStatus, string> = {
  [ReportStatus.RECIBIDO]: '#3b82f6', // blue-500
  [ReportStatus.EN_REVISION]: '#eab308', // yellow-500
  [ReportStatus.INVESTIGACION]: '#8b5cf6', // purple-500
  [ReportStatus.RESUELTO]: '#22c55e', // green-500
  [ReportStatus.CERRADO]: '#64748b', // slate-500
  [ReportStatus.NO_PROCEDE]: '#ef4444', // red-500
};

const severityColors: Record<string, string> = {
    'Baja': '#6b7280', // gray-500
    'Media': '#f59e0b', // amber-500
    'Alta': '#f97316', // orange-500
    'Crítica': '#dc2626', // red-600
};

const categoryColors = [ '#38bdf8', '#fb923c', '#a78bfa', '#f472b6', '#4ade80', '#fbbf24'];

const ManagerialDashboard: React.FC<ManagerialDashboardProps> = ({ reports, onDrillDown }) => {
    
    const kpiData = useMemo(() => {
        const closedStatuses = [ReportStatus.RESUELTO, ReportStatus.CERRADO, ReportStatus.NO_PROCEDE];
        const openReports = reports.filter(r => !closedStatuses.includes(r.status));
        const closedReports = reports.filter(r => closedStatuses.includes(r.status));
        
        let totalResolutionTime = 0;
        let resolvedCount = 0;

        closedReports.forEach(report => {
            const startTime = new Date(report.timestamp).getTime();
            const lastNote = report.internalNotes[report.internalNotes.length - 1];
            // Use last note's timestamp as resolution time, otherwise skip
            if(lastNote) {
                const endTime = new Date(lastNote.timestamp).getTime();
                totalResolutionTime += (endTime - startTime);
                resolvedCount++;
            }
        });
        
        const avgResolutionTimeMs = resolvedCount > 0 ? totalResolutionTime / resolvedCount : 0;
        const avgResolutionDays = (avgResolutionTimeMs / (1000 * 60 * 60 * 24)).toFixed(1);

        return {
            total: reports.length,
            open: openReports.length,
            closed: closedReports.length,
            avgTime: resolvedCount > 0 ? `${avgResolutionDays} días` : 'N/A'
        }
    }, [reports]);

    const chartData = useMemo(() => {
        const statusData = Object.values(ReportStatus).map(status => ({
            label: status,
            value: reports.filter(r => r.status === status).length,
            color: statusColors[status]
        })).filter(item => item.value > 0);

        const categoryCounts = reports.reduce((acc, report) => {
            const category = report.analysis?.category || 'Sin Categoría';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const categoryData = Object.entries(categoryCounts).map(([label, value], index) => ({
            label,
            value,
            color: categoryColors[index % categoryColors.length]
        }));
        
        const severityCounts = reports.reduce((acc, report) => {
            const severity = report.analysis?.severity || 'Baja';
            acc[severity] = (acc[severity] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
         const severityOrder = ['Baja', 'Media', 'Alta', 'Crítica'];
         const severityData = severityOrder.map(label => ({
            label,
            value: severityCounts[label] || 0,
            color: severityColors[label]
        })).filter(item => item.value > 0);

        return { statusData, categoryData, severityData };
    }, [reports]);

    return (
        <div className="space-y-8 animate-fade-in">
             <div>
                <h2 className="text-3xl font-bold text-slate-100">Dashboard Gerencial</h2>
                <p className="text-md text-slate-400 mt-1">Análisis y monitoreo de la atención a quejas.</p>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total de Reportes" value={kpiData.total} description="Historial completo de reportes." icon={<FolderIcon className="w-6 h-6"/>} />
                <KPICard title="Reportes Abiertos" value={kpiData.open} description="Casos activos y en proceso." icon={<FolderOpenIcon className="w-6 h-6"/>} />
                <KPICard title="Reportes Cerrados" value={kpiData.closed} description="Casos resueltos o cerrados." icon={<CheckBadgeIcon className="w-6 h-6"/>} />
                <KPICard title="Tiempo de Resolución" value={kpiData.avgTime} description="Promedio para casos cerrados." icon={<ClockIcon className="w-6 h-6"/>} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1">
                    <SimpleBarChart 
                        title="Reportes por Estado" 
                        data={chartData.statusData}
                        onBarClick={(status) => onDrillDown({ status })}
                    />
                </div>
                 <div className="lg:col-span-1">
                     <SimpleBarChart 
                        title="Reportes por Categoría (IA)" 
                        data={chartData.categoryData}
                        onBarClick={(category) => onDrillDown({ category })}
                    />
                </div>
                 <div className="lg:col-span-1">
                     <SimpleBarChart 
                        title="Reportes por Severidad (IA)" 
                        data={chartData.severityData}
                        onBarClick={(severity) => onDrillDown({ severity })}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManagerialDashboard;
