import React, { useState, useMemo } from 'react';
import type { ReportData } from '../types';
import { mexicanStates, getStateColor, getColorDescription } from '../data/mexicanStates';
import { SearchIcon } from './icons/SearchIcon';

interface MapViewProps {
  reports: ReportData[];
  onStateClick: (stateId: string, stateName: string, stateReports: ReportData[]) => void;
}

const MapView: React.FC<MapViewProps> = ({ reports, onStateClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Contar denuncias por estado usando el campo state directo
  const stateReportCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Inicializar todos los estados con 0
    mexicanStates.forEach(state => {
      counts[state.id] = 0;
    });

    // Contar denuncias por estado usando el campo state del reporte
    reports.forEach(report => {
      if (report.state) {
        // Buscar el estado por nombre
        const state = mexicanStates.find(s => s.name === report.state);
        if (state) {
          counts[state.id]++;
        }
      }
    });

    return counts;
  }, [reports]);

  // Filtrar estados basado en búsqueda
  const filteredStates = useMemo(() => {
    if (!searchTerm) return mexicanStates;
    
    return mexicanStates.filter(state => 
      state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleStateClick = (stateId: string, stateName: string) => {
    setSelectedState(stateId);
    
    // Filtrar reportes del estado seleccionado usando el campo state directo
    const stateReports = reports.filter(report => report.state === stateName);

    onStateClick(stateId, stateName, stateReports);
  };

  const totalDenuncias = Object.values(stateReportCounts).reduce((sum: number, count: number) => sum + count, 0);

  return (
    <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Mapa de Calor - Denuncias por Estado</h2>
          <p className="text-sm text-slate-400 mt-1">
            Total de denuncias: <span className="text-[#d69e2e] font-semibold">{totalDenuncias}</span>
          </p>
        </div>
        
        <div className="w-full sm:w-80">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#374151] border border-[#4a5568] rounded-md py-2 pl-10 pr-4 text-slate-200 focus:ring-2 focus:ring-[#d69e2e] focus:border-[#d69e2e] transition"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Leyenda de colores */}
      <div className="mb-6 p-4 bg-[#1a202c]/50 rounded-lg">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Leyenda de Colores</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
            <span className="text-slate-300">10+ denuncias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ea580c' }}></div>
            <span className="text-slate-300">6-9 denuncias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#d97706' }}></div>
            <span className="text-slate-300">3-5 denuncias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#16a34a' }}></div>
            <span className="text-slate-300">1-2 denuncias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <span className="text-slate-300">0 denuncias</span>
          </div>
        </div>
      </div>

      {/* Mapa SVG */}
      <div className="bg-white/5 rounded-lg p-4 overflow-auto">
        <svg 
          viewBox="0 0 600 600" 
          className="w-full h-auto max-h-[600px]"
          style={{ minHeight: '400px' }}
        >
          {filteredStates.map((state) => {
            const denuncias = stateReportCounts[state.id] || 0;
            const color = getStateColor(denuncias);
            const isSelected = selectedState === state.id;
            
            return (
              <g key={state.id}>
                <path
                  d={state.path}
                  fill={color}
                  stroke={isSelected ? '#d69e2e' : '#ffffff'}
                  strokeWidth={isSelected ? 3 : 1}
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleStateClick(state.id, state.name)}
                />
                <text
                  x={state.coordinates[0]}
                  y={state.coordinates[1]}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-white pointer-events-none"
                  style={{ fontSize: '10px' }}
                >
                  {denuncias}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Lista de estados con más denuncias */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Estados con Mayor Concentración de Denuncias</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mexicanStates
            .filter(state => stateReportCounts[state.id] > 0)
            .sort((a, b) => stateReportCounts[b.id] - stateReportCounts[a.id])
            .slice(0, 9)
            .map(state => {
              const denuncias = stateReportCounts[state.id];
              const color = getStateColor(denuncias);
              
              return (
                <div
                  key={state.id}
                  className="flex items-center justify-between p-3 bg-[#374151] rounded-lg hover:bg-[#4a5568] transition cursor-pointer"
                  onClick={() => handleStateClick(state.id, state.name)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-slate-200 font-medium">{state.name}</span>
                  </div>
                  <span className="text-[#d69e2e] font-bold">{denuncias}</span>
                </div>
              );
            })}
        </div>
        
        {mexicanStates.filter(state => stateReportCounts[state.id] > 0).length === 0 && (
          <p className="text-slate-400 text-center py-8">
            No hay denuncias registradas con información de ubicación geográfica.
          </p>
        )}
      </div>
    </div>
  );
};

export default MapView;
