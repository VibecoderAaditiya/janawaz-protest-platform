import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayersControl } from 'react-leaflet';
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
  Layers,
  Crosshair
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
  const pulseClass = isLive ? 'protest-pulse-live' : '';

  const html = `
    <div class="relative flex items-center justify-center ${pulseClass}">
      <div style="
        background: ${isLive ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #f59e0b, #d97706)'};
        color: white;
        border-radius: 9999px;
        width: ${isSelected ? '38px' : '32px'};
        height: ${isSelected ? '38px' : '32px'};
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid #ffffff;
        box-shadow: 0 4px 14px rgba(0,0,0,0.6);
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
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
    iconSize: [36, 36],
    iconAnchor: [18, 18],
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
    showToast
  } = useApp();

  const [mapStyle, setMapStyle] = useState('osm'); // 'osm' | 'satellite' | 'topo'

  const cityObj = CITIES.find(c => c.id === selectedCity) || CITIES[0];
  const centerPos = [cityObj.lat, cityObj.lng];
  const mapZoom = cityObj.zoom;

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          showToast('Located your current coordinates in India!', 'success');
        },
        () => {
          showToast('Location permission denied or unavailable. Centered on ' + cityObj.name, 'info');
        }
      );
    }
  };

  return (
    <div className="relative w-full h-[480px] lg:h-[620px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      
      {/* Map Overlay Badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-xl">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-xs font-extrabold text-slate-100 uppercase tracking-wider">
            {cityObj.name} Live Radar
          </span>
        </div>
        <span className="text-[11px] text-brand-400 font-bold border-l border-slate-700 pl-2">
          {filteredProtests.length} Movements
        </span>
      </div>

      {/* Map Layer Switcher & Locate Controls */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5">
        
        {/* Style Switcher */}
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 flex items-center gap-1 shadow-lg text-[10px] font-bold text-slate-300">
          <button
            onClick={() => setMapStyle('osm')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mapStyle === 'osm' ? 'bg-brand-600 text-white shadow-sm' : 'hover:text-white'
            }`}
          >
            Street (Free OSM)
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              mapStyle === 'satellite' ? 'bg-brand-600 text-white shadow-sm' : 'hover:text-white'
            }`}
          >
            Satellite
          </button>
        </div>

        {/* Locate GPS button */}
        <button
          onClick={handleLocateMe}
          className="w-8 h-8 rounded-xl bg-slate-900/95 hover:bg-slate-800 border border-slate-700/80 text-slate-200 flex items-center justify-center shadow-lg transition-all"
          title="Locate Me"
        >
          <Crosshair className="w-4 h-4 text-brand-400" />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 px-3.5 flex items-center gap-3.5 text-[11px] shadow-xl">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-slate-200 font-semibold">Live Assembly</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-200 font-semibold">Scheduled Movement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-slate-200 font-semibold">Peaceful Zone</span>
        </div>
      </div>

      {/* Leaflet Map with 100% Free OpenStreetMap & Esri World Imagery (Zero API Keys) */}
      <MapContainer
        center={centerPos}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeMapView center={centerPos} zoom={mapZoom} />

        {/* Tile Layers without any API key restrictions */}
        {mapStyle === 'osm' && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        )}

        {mapStyle === 'satellite' && (
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />
        )}

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
                  radius={600}
                  pathOptions={{
                    fillColor: '#ef4444',
                    fillOpacity: 0.15,
                    color: '#ef4444',
                    weight: 1.5,
                    dashArray: '5, 5'
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
                        {protest.safetyStatus.level === 'green' ? '✓ Safe Assembly' : '⚠️ Police Barricades'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProtest(protest)}
                      className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md"
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
