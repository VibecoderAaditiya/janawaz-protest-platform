import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  Flame, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Radio, 
  AlertTriangle, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';

// Map Recenter Controller
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
};

// Custom Marker Generator
const createCustomMarker = (protest, isSelected) => {
  const isLive = protest.status === 'live';
  const color = isLive ? '#ef4444' : '#f59e0b';
  const pulseClass = isLive ? 'protest-pulse-live' : '';

  const html = `
    <div class="relative flex items-center justify-center ${pulseClass}">
      <div style="
        background: ${isLive ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #f59e0b, #d97706)'};
        color: white;
        border-radius: 9999px;
        width: ${isSelected ? '38px' : '30px'};
        height: ${isSelected ? '38px' : '30px'};
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        cursor: pointer;
        transition: transform 0.2s;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="${isSelected ? '18' : '15'}" height="${isSelected ? '18' : '15'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-protest-pin',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

export const ProtestMapView = () => {
  const { 
    filteredProtests, 
    selectedCity, 
    setSelectedCity,
    selectedProtest, 
    setSelectedProtest,
    toggleRSVP 
  } = useApp();

  const cityObj = CITIES.find(c => c.id === selectedCity) || CITIES[0];
  const centerPos = [cityObj.lat, cityObj.lng];
  const mapZoom = cityObj.zoom;

  return (
    <div className="relative w-full h-[480px] lg:h-[620px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
      
      {/* Map Overlay Badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
            {cityObj.name} Live Map
          </span>
        </div>
        <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
          {filteredProtests.length} Movements Active
        </span>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-3 text-[11px] shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-slate-200 font-medium">Live Now</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-200 font-medium">Scheduled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-200 font-medium">Peaceful / Safe</span>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={centerPos}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeMapView center={centerPos} zoom={mapZoom} />

        {/* Dark CartoDB / OSM Tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Protests Markers & Safety Radius */}
        {filteredProtests.map(protest => {
          const isSelected = selectedProtest?.id === protest.id;
          const isLive = protest.status === 'live';

          return (
            <React.Fragment key={protest.id}>
              {/* Optional Safety / Gathering Perimeter radius */}
              {isLive && (
                <Circle
                  center={[protest.lat, protest.lng]}
                  radius={500}
                  pathOptions={{
                    fillColor: '#ef4444',
                    fillOpacity: 0.12,
                    color: '#ef4444',
                    weight: 1,
                    dashArray: '4, 4'
                  }}
                />
              )}

              <Marker
                position={[protest.lat, protest.lng]}
                icon={createCustomMarker(protest, isSelected)}
                eventHandlers={{
                  click: () => {
                    setSelectedProtest(protest);
                  }
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[220px] max-w-[260px] text-slate-100">
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        protest.status === 'live' 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {protest.status === 'live' ? '🔥 Live Now' : '📅 Scheduled'}
                      </span>
                      <span className="text-[10px] text-slate-300 font-medium">
                        {protest.cityName}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-white leading-snug line-clamp-2 mb-1">
                      {protest.title}
                    </h4>

                    <p className="text-[11px] text-slate-300 flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-brand-400 shrink-0" />
                      <span className="truncate">{protest.venue}</span>
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-700/60 text-[10px] text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-brand-400" />
                        <strong className="text-slate-200">{protest.headcount.toLocaleString()}</strong> joined
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {protest.safetyStatus.level === 'green' ? '✓ Verified Safe' : '⚠️ Alert'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProtest(protest)}
                      className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Full Dossier</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
