import React, { useState } from 'react';
import { 
  MapPin, 
  Store, 
  Snowflake, 
  Factory, 
  Truck, 
  Navigation, 
  Layers, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { RegionHub, DestinationNode, RouteOptimizationResponse } from '../types';

interface SupplyChainMapProps {
  region?: RegionHub;
  optimization?: RouteOptimizationResponse;
  selectedCropName: string;
}

export const SupplyChainMap: React.FC<SupplyChainMapProps> = ({
  region,
  optimization,
  selectedCropName
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  if (!region) return null;

  const destinations = region.destinations || [];
  const activeOptChoice = optimization?.optimal_choice;

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'COLD_STORAGE':
        return <Snowflake className="w-4 h-4 text-cyan-400" />;
      case 'PROCESSING_PLANT':
        return <Factory className="w-4 h-4 text-amber-400" />;
      default:
        return <Store className="w-4 h-4 text-rose-400" />;
    }
  };

  const getNodeBorderColor = (type: string, isRecommended: boolean) => {
    if (isRecommended) return 'border-emerald-400 ring-2 ring-emerald-400/50 shadow-emerald-950/60';
    switch (type) {
      case 'COLD_STORAGE': return 'border-cyan-500/50';
      case 'PROCESSING_PLANT': return 'border-amber-500/50';
      default: return 'border-rose-500/50';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-emerald-900/40 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Geospatial Supply Chain Network
            </h2>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
              Interactive Flow
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-modal logistics topology for {region.name} • {region.district}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Mandi</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Cold Storage</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Processing Unit</span>
        </div>
      </div>

      {/* SVG Interactive Map Container */}
      <div className="mt-4 relative w-full h-[280px] bg-[#060c08] rounded-xl border border-emerald-950 flex items-center justify-center overflow-hidden">
        {/* Ambient Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Animated Connecting Flow Lines from Origin (Center) to Destinations */}
          {destinations.map((dest, idx) => {
            // Calculate pseudo canvas positions for origin (50%, 50%) and destinations in a semi-circle
            const total = destinations.length;
            const angle = ((idx - (total - 1) / 2) * 48 - 90) * (Math.PI / 180);
            const targetX = 50 + Math.cos(angle) * 36;
            const targetY = 50 + Math.sin(angle) * 36;

            const isOpt = dest.type === activeOptChoice;

            return (
              <g key={dest.id}>
                {/* Connecting Path */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${targetX}%`}
                  y2={`${targetY}%`}
                  stroke={isOpt ? '#10b981' : '#334155'}
                  strokeWidth={isOpt ? 2.5 : 1.2}
                  strokeDasharray={isOpt ? '6,4' : '3,3'}
                  className={isOpt ? 'animate-pulse' : ''}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Origin Node (Farmer / FPO Hub) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border-2 border-emerald-300 flex items-center justify-center text-white shadow-xl shadow-emerald-950/80 ring-4 ring-emerald-500/20">
            <MapPin className="w-7 h-7 animate-bounce" />
          </div>
          <span className="mt-1.5 text-xs font-bold text-emerald-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60 shadow-md">
            Your Farm Hub
          </span>
          <span className="text-[10px] text-slate-400">
            {region.fpo_name}
          </span>
        </div>

        {/* Radial Destination Nodes */}
        {destinations.map((dest, idx) => {
          const total = destinations.length;
          const angle = ((idx - (total - 1) / 2) * 48 - 90) * (Math.PI / 180);
          const targetX = 50 + Math.cos(angle) * 36;
          const targetY = 50 + Math.sin(angle) * 36;

          const isOpt = dest.type === activeOptChoice;

          return (
            <div
              key={dest.id}
              style={{ top: `${targetY}%`, left: `${targetX}%` }}
              onClick={() => setSelectedNodeId(dest.id === selectedNodeId ? null : dest.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group flex flex-col items-center transition-transform transform hover:scale-110`}
            >
              <div className={`w-11 h-11 rounded-xl bg-[#0c1611] border-2 flex items-center justify-center shadow-lg ${getNodeBorderColor(dest.type, isOpt)}`}>
                {getNodeIcon(dest.type)}
              </div>
              <span className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/90 border shadow-md whitespace-nowrap ${
                isOpt ? 'text-emerald-300 border-emerald-500' : 'text-slate-300 border-slate-700'
              }`}>
                {dest.name.slice(0, 18)}...
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {dest.distance_km} km
              </span>
            </div>
          );
        })}
      </div>

      {/* Destinations Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {destinations.map((dest) => {
          const isOpt = dest.type === activeOptChoice;

          return (
            <div
              key={dest.id}
              onClick={() => setSelectedNodeId(dest.id)}
              className={`p-3.5 rounded-xl border transition cursor-pointer ${
                isOpt 
                  ? 'bg-emerald-950/40 border-emerald-600/60 ring-1 ring-emerald-500/30' 
                  : 'bg-[#08100c] border-emerald-950 hover:border-emerald-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                    {getNodeIcon(dest.type)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white leading-tight">
                      {dest.name}
                    </h5>
                    <span className="text-[10px] text-slate-400">
                      {dest.city} • {dest.distance_km} km
                    </span>
                  </div>
                </div>

                {isOpt && (
                  <span className="text-[9px] font-black uppercase bg-emerald-400 text-black px-1.5 py-0.5 rounded">
                    Selected
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-white/5 text-xs">
                <span className="text-slate-400 text-[11px]">
                  {dest.type === 'MANDI' ? 'Mandi Price:' : dest.type === 'COLD_STORAGE' ? 'Storage Rate:' : 'Contract Buyout:'}
                </span>
                <span className="font-mono font-bold text-white">
                  {dest.type === 'COLD_STORAGE' ? `₹${dest.base_price_or_rate}/kg/day` : `₹${dest.base_price_or_rate}/kg`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
