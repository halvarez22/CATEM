import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ReportData } from '../types';
import { mexicoPreciseGeoJSON } from '../data/mexicoPreciseGeoJSON';
import { SearchIcon } from './icons/SearchIcon';

// Fix para iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ProfessionalHeatMapProps {
  reports: ReportData[];
  onStateClick: (stateId: string, stateName: string, stateReports: ReportData[]) => void;
}

// Paleta de colores profesional con gradiente de intensidad
const getHeatMapColor = (count: number): string => {
  if (count === 0) return '#3b82f6'; // Azul - Sin denuncias
  if (count >= 1 && count <= 2) return '#16a34a'; // Verde claro - Pocas denuncias
  if (count >= 3 && count <= 5) return '#d97706'; // Amarillo - Denuncias moderadas
  if (count >= 6 && count <= 9) return '#ea580c'; // Naranja - Muchas denuncias
  return '#dc2626'; // Rojo - Muy altas denuncias (10+)
};

const getColorDescription = (count: number): string => {
  if (count === 0) return 'Sin denuncias';
  if (count >= 1 && count <= 2) return 'Baja intensidad';
  if (count >= 3 && count <= 5) return 'Intensidad moderada';
  if (count >= 6 && count <= 9) return 'Alta intensidad';
  return 'Muy alta intensidad';
};

const ProfessionalHeatMap: React.FC<ProfessionalHeatMapProps> = ({ reports, onStateClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<{state: string, count: number} | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Contar denuncias por estado
  const stateReportCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Inicializar todos los estados con 0
    mexicoPreciseGeoJSON.features.forEach(feature => {
      counts[feature.properties.id] = 0;
    });

    // Contar denuncias por estado
    reports.forEach(report => {
      if (report.state) {
        const feature = mexicoPreciseGeoJSON.features.find(f => f.properties.name === report.state);
        if (feature) {
          counts[feature.properties.id]++;
        }
      }
    });

    return counts;
  }, [reports]);

  // Filtrar estados basado en búsqueda
  const filteredFeatures = useMemo(() => {
    if (!searchTerm) return mexicoPreciseGeoJSON.features;
    
    return mexicoPreciseGeoJSON.features.filter(feature => 
      feature.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.properties.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleStateClick = (stateId: string, stateName: string) => {
    setSelectedState(stateId);
    const stateReports = reports.filter(report => report.state === stateName);
    onStateClick(stateId, stateName, stateReports);
  };

  const totalDenuncias = Object.values(stateReportCounts).reduce((sum: number, count: number) => sum + count, 0);

  // Función para obtener el estilo del estado
  const getStateStyle = (feature: any) => {
    const stateId = feature.properties.id;
    const denuncias = stateReportCounts[stateId] || 0;
    const color = getHeatMapColor(denuncias);
    const isSelected = selectedState === stateId;
    
    return {
      fillColor: color,
      weight: isSelected ? 4 : 2,
      opacity: 1,
      color: isSelected ? '#d69e2e' : '#ffffff',
      dashArray: '3',
      fillOpacity: 0.8
    };
  };

  // Función para manejar eventos de los estados
  const onEachFeature = (feature: any, layer: any) => {
    const stateId = feature.properties.id;
    const stateName = feature.properties.name;
    const denuncias = stateReportCounts[stateId] || 0;
    
    // Popup con información del estado
    layer.bindPopup(`
      <div class="p-3 min-w-[200px]">
        <h3 class="font-bold text-lg text-gray-800 mb-2">${stateName}</h3>
        <div class="flex items-center gap-2 mb-2">
          <div class="w-4 h-4 rounded" style="background-color: ${getHeatMapColor(denuncias)}"></div>
          <span class="text-sm font-semibold text-gray-700">${denuncias} denuncia${denuncias !== 1 ? 's' : ''}</span>
        </div>
        <p class="text-xs text-gray-600">${getColorDescription(denuncias)}</p>
        <button 
          onclick="window.dispatchEvent(new CustomEvent('stateClick', {detail: {stateId: '${stateId}', stateName: '${stateName}'}}))"
          class="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
        >
          Ver Detalles
        </button>
      </div>
    `);
    
    // Eventos de mouse
    layer.on({
      mouseover: (e: any) => {
        setTooltipContent({ state: stateName, count: denuncias });
        e.target.setStyle({
          weight: 4,
          color: '#d69e2e',
          fillOpacity: 0.9
        });
      },
      mouseout: (e: any) => {
        setTooltipContent(null);
        e.target.setStyle({
          weight: selectedState === stateId ? 4 : 2,
          color: selectedState === stateId ? '#d69e2e' : '#ffffff',
          fillOpacity: 0.8
        });
      },
      click: () => {
        handleStateClick(stateId, stateName);
      }
    });
  };

  // Escuchar eventos personalizados del popup
  useEffect(() => {
    const handleStateClickEvent = (event: any) => {
      const { stateId, stateName } = event.detail;
      handleStateClick(stateId, stateName);
    };

    window.addEventListener('stateClick', handleStateClickEvent);
    return () => window.removeEventListener('stateClick', handleStateClickEvent);
  }, []);

  return (
    <div className="bg-[#2d3748] p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Mapa de Calor - Distribución de Denuncias</h2>
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

      {/* Leyenda de colores profesional */}
      <div className="mb-6 p-4 bg-[#1a202c]/50 rounded-lg">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Leyenda de Intensidad</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
            <span className="text-slate-300">Muy alta (10+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ea580c' }}></div>
            <span className="text-slate-300">Alta (6-9)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#d97706' }}></div>
            <span className="text-slate-300">Moderada (3-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#16a34a' }}></div>
            <span className="text-slate-300">Baja (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
            <span className="text-slate-300">Sin denuncias (0)</span>
          </div>
        </div>
      </div>

      {/* Mapa de Calor Profesional */}
      <div className="bg-white/5 rounded-lg p-4 overflow-auto border border-gray-600">
        <div className="relative" style={{ width: "100%", height: "600px", minHeight: "600px" }}>
          <MapContainer
            center={[23.6345, -102.5528]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
            zoomControl={true}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            touchZoom={true}
            dragging={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
              data={mexicoPreciseGeoJSON}
              style={getStateStyle}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
          
          {/* Tooltip personalizado */}
          {tooltipContent && (
            <div className="absolute top-4 right-4 bg-[#1a202c] text-white p-3 rounded-lg shadow-lg z-10 min-w-[200px]">
              <div className="font-semibold text-lg">{tooltipContent.state}</div>
              <div className="flex items-center gap-2 mt-2">
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: getHeatMapColor(tooltipContent.count) }}
                ></div>
                <span className="text-sm text-slate-300">
                  {tooltipContent.count} denuncia{tooltipContent.count !== 1 ? 's' : ''}
                </span>
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
          {mexicoPreciseGeoJSON.features
            .filter(feature => stateReportCounts[feature.properties.id] > 0)
            .sort((a, b) => stateReportCounts[b.properties.id] - stateReportCounts[a.properties.id])
            .slice(0, 9)
            .map(feature => {
              const stateId = feature.properties.id;
              const stateName = feature.properties.name;
              const denuncias = stateReportCounts[stateId];
              const color = getHeatMapColor(denuncias);
              
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
        
        {mexicoPreciseGeoJSON.features.filter(feature => stateReportCounts[feature.properties.id] > 0).length === 0 && (
          <p className="text-slate-400 text-center py-8">
            No hay denuncias registradas con información de ubicación geográfica.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalHeatMap;
