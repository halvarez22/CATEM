import React, { useState, useMemo } from 'react';
import type { ReportData } from '../types';
import { getStateColor, getColorDescription } from '../data/mexicanStates';

interface SimpleMapViewProps {
  reports: ReportData[];
  onStateClick: (stateId: string, stateName: string, stateReports: ReportData[]) => void;
}

const SimpleMapView: React.FC<SimpleMapViewProps> = ({ reports, onStateClick }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<{state: string, count: number} | null>(null);

  // Estados de México con coordenadas simplificadas
  const states = [
    { id: 'AGU', name: 'Aguascalientes', x: 200, y: 300, width: 60, height: 40 },
    { id: 'BCN', name: 'Baja California', x: 50, y: 100, width: 80, height: 200 },
    { id: 'BCS', name: 'Baja California Sur', x: 100, y: 200, width: 60, height: 120 },
    { id: 'CAM', name: 'Campeche', x: 400, y: 400, width: 80, height: 60 },
    { id: 'CHP', name: 'Chiapas', x: 350, y: 450, width: 80, height: 60 },
    { id: 'CHH', name: 'Chihuahua', x: 150, y: 150, width: 100, height: 120 },
    { id: 'COA', name: 'Coahuila', x: 200, y: 200, width: 80, height: 80 },
    { id: 'COL', name: 'Colima', x: 250, y: 350, width: 40, height: 40 },
    { id: 'DUR', name: 'Durango', x: 180, y: 250, width: 80, height: 80 },
    { id: 'GUA', name: 'Guanajuato', x: 220, y: 320, width: 60, height: 60 },
    { id: 'GRO', name: 'Guerrero', x: 280, y: 380, width: 80, height: 60 },
    { id: 'HID', name: 'Hidalgo', x: 240, y: 300, width: 60, height: 60 },
    { id: 'JAL', name: 'Jalisco', x: 200, y: 350, width: 80, height: 80 },
    { id: 'MEX', name: 'México', x: 260, y: 320, width: 60, height: 60 },
    { id: 'MIC', name: 'Michoacán', x: 240, y: 360, width: 80, height: 60 },
    { id: 'MOR', name: 'Morelos', x: 280, y: 340, width: 40, height: 40 },
    { id: 'NAY', name: 'Nayarit', x: 180, y: 320, width: 60, height: 60 },
    { id: 'NL', name: 'Nuevo León', x: 220, y: 220, width: 80, height: 80 },
    { id: 'OAX', name: 'Oaxaca', x: 300, y: 420, width: 80, height: 60 },
    { id: 'PUE', name: 'Puebla', x: 280, y: 320, width: 60, height: 60 },
    { id: 'QUE', name: 'Querétaro', x: 240, y: 300, width: 50, height: 50 },
    { id: 'ROO', name: 'Quintana Roo', x: 450, y: 350, width: 60, height: 80 },
    { id: 'SLP', name: 'San Luis Potosí', x: 200, y: 280, width: 80, height: 60 },
    { id: 'SIN', name: 'Sinaloa', x: 150, y: 280, width: 80, height: 80 },
    { id: 'SON', name: 'Sonora', x: 100, y: 150, width: 100, height: 150 },
    { id: 'TAB', name: 'Tabasco', x: 380, y: 420, width: 60, height: 40 },
    { id: 'TAM', name: 'Tamaulipas', x: 250, y: 200, width: 80, height: 100 },
    { id: 'TLA', name: 'Tlaxcala', x: 270, y: 310, width: 30, height: 30 },
    { id: 'VER', name: 'Veracruz', x: 300, y: 350, width: 80, height: 100 },
    { id: 'YUC', name: 'Yucatán', x: 420, y: 380, width: 60, height: 60 },
    { id: 'ZAC', name: 'Zacatecas', x: 180, y: 280, width: 80, height: 80 }
  ];

  // Contar denuncias por estado
  const stateReportCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Inicializar todos los estados con 0
    states.forEach(state => {
      counts[state.id] = 0;
    });

    // Contar denuncias por estado
    reports.forEach(report => {
      if (report.state) {
        const state = states.find(s => s.name === report.state);
        if (state) {
          counts[state.id]++;
        }
      }
    });

    return counts;
  }, [reports]);

  const handleStateClick = (stateId: string, stateName: string) => {
    setSelectedState(stateId);
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

      {/* Mapa SVG Simplificado */}
      <div className="bg-white/5 rounded-lg p-4 overflow-auto border border-gray-600">
        <div className="relative" style={{ width: "100%", height: "500px", minHeight: "500px" }}>
          <svg 
            viewBox="0 0 600 600" 
            className="w-full h-full"
            style={{ backgroundColor: '#1e293b' }}
          >
            {/* Debug info */}
            <text x="10" y="20" fill="white" fontSize="12">
              Estados: {states.length} | Reportes: {reports.length}
            </text>
            
            {states.map((state) => {
              const denuncias = stateReportCounts[state.id] || 0;
              const color = getStateColor(denuncias);
              const isSelected = selectedState === state.id;
              
              return (
                <g key={state.id}>
                  <rect
                    x={state.x}
                    y={state.y}
                    width={state.width}
                    height={state.height}
                    fill={color}
                    stroke={isSelected ? '#d69e2e' : '#ffffff'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="cursor-pointer transition-all duration-200 hover:opacity-80"
                    onClick={() => handleStateClick(state.id, state.name)}
                    onMouseEnter={() => {
                      setTooltipContent({ state: state.name, count: denuncias });
                    }}
                    onMouseLeave={() => {
                      setTooltipContent(null);
                    }}
                  />
                  <text
                    x={state.x + state.width/2}
                    y={state.y + state.height/2}
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
          
          {/* Tooltip */}
          {tooltipContent && (
            <div className="absolute top-4 right-4 bg-[#1a202c] text-white p-3 rounded-lg shadow-lg z-10">
              <div className="font-semibold">{tooltipContent.state}</div>
              <div className="text-sm text-slate-300">
                {tooltipContent.count} denuncia{tooltipContent.count !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {getColorDescription(tooltipContent.count)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de estados con más denuncias */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Estados con Mayor Concentración de Denuncias</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {states
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
        
        {states.filter(state => stateReportCounts[state.id] > 0).length === 0 && (
          <p className="text-slate-400 text-center py-8">
            No hay denuncias registradas con información de ubicación geográfica.
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleMapView;
