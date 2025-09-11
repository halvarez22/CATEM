import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import type { ReportData } from '../types';
import { mexicoGeoData } from '../data/mexicoGeoData';
import { getStateColor, getColorDescription } from '../data/mexicanStates';
import { SearchIcon } from './icons/SearchIcon';

interface RealMapViewProps {
  reports: ReportData[];
  onStateClick: (stateId: string, stateName: string, stateReports: ReportData[]) => void;
}

const RealMapView: React.FC<RealMapViewProps> = ({ reports, onStateClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<{state: string, count: number} | null>(null);

  // Contar denuncias por estado usando el campo state directo
  const stateReportCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Inicializar todos los estados con 0
    mexicoGeoData.features.forEach(feature => {
      counts[feature.properties.id] = 0;
    });

    // Contar denuncias por estado usando el campo state del reporte
    reports.forEach(report => {
      if (report.state) {
        // Buscar el estado por nombre
        const feature = mexicoGeoData.features.find(f => f.properties.name === report.state);
        if (feature) {
          counts[feature.properties.id]++;
        }
      }
    });

    return counts;
  }, [reports]);

  // Filtrar estados basado en búsqueda
  const filteredFeatures = useMemo(() => {
    if (!searchTerm) return mexicoGeoData.features;
    
    return mexicoGeoData.features.filter(feature => 
      feature.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.properties.id.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Mapa SVG Real */}
      <div className="bg-white/5 rounded-lg p-4 overflow-auto border border-gray-600">
        <div className="relative" style={{ width: "100%", height: "500px", minHeight: "500px" }}>
          <ComposableMap
            projection="geoAlbers"
            projectionConfig={{
              scale: 1200,
              center: [-102, 23]
            }}
            width={800}
            height={500}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup>
              {/* Fondo del mapa */}
              <rect width="100%" height="100%" fill="#1e293b" />
              {/* Debug: Mostrar información */}
              <text x="10" y="20" fill="white" fontSize="12">
                Estados: {mexicoGeoData.features.length}
              </text>
              <text x="10" y="35" fill="white" fontSize="12">
                Reportes: {reports.length}
              </text>
              <Geographies geography={mexicoGeoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateId = geo.properties.id;
                    const stateName = geo.properties.name;
                    const denuncias = stateReportCounts[stateId] || 0;
                    const color = getStateColor(denuncias);
                    const isSelected = selectedState === stateId;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={color}
                        stroke={isSelected ? '#d69e2e' : '#ffffff'}
                        strokeWidth={isSelected ? 3 : 1}
                        style={{
                          default: {
                            fill: color,
                            stroke: isSelected ? '#d69e2e' : '#ffffff',
                            strokeWidth: isSelected ? 4 : 2,
                            outline: 'none',
                            cursor: 'pointer'
                          },
                          hover: {
                            fill: color,
                            stroke: '#d69e2e',
                            strokeWidth: 3,
                            outline: 'none',
                            cursor: 'pointer'
                          },
                          pressed: {
                            fill: color,
                            stroke: '#d69e2e',
                            strokeWidth: 4,
                            outline: 'none',
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => handleStateClick(stateId, stateName)}
                        onMouseEnter={() => {
                          setTooltipContent({ state: stateName, count: denuncias });
                        }}
                        onMouseLeave={() => {
                          setTooltipContent(null);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
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
          {mexicoGeoData.features
            .filter(feature => stateReportCounts[feature.properties.id] > 0)
            .sort((a, b) => stateReportCounts[b.properties.id] - stateReportCounts[a.properties.id])
            .slice(0, 9)
            .map(feature => {
              const stateId = feature.properties.id;
              const stateName = feature.properties.name;
              const denuncias = stateReportCounts[stateId];
              const color = getStateColor(denuncias);
              
              return (
                <div
                  key={stateId}
                  className="flex items-center justify-between p-3 bg-[#374151] rounded-lg hover:bg-[#4a5568] transition cursor-pointer"
                  onClick={() => handleStateClick(stateId, stateName)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-slate-200 font-medium">{stateName}</span>
                  </div>
                  <span className="text-[#d69e2e] font-bold">{denuncias}</span>
                </div>
              );
            })}
        </div>
        
        {mexicoGeoData.features.filter(feature => stateReportCounts[feature.properties.id] > 0).length === 0 && (
          <p className="text-slate-400 text-center py-8">
            No hay denuncias registradas con información de ubicación geográfica.
          </p>
        )}
      </div>
    </div>
  );
};

export default RealMapView;

