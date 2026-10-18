import React, { useState } from 'react';
import { 
  Truck, 
  Users, 
  MapPin, 
  Phone, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { FreightPoolResponse, SupportedLanguage } from '../types';

interface FreightPoolerCardProps {
  freightPool?: FreightPoolResponse;
  language: SupportedLanguage;
}

export const FreightPoolerCard: React.FC<FreightPoolerCardProps> = ({
  freightPool,
  language
}) => {
  const [joinedClusterIds, setJoinedClusterIds] = useState<Record<string, boolean>>({});

  if (!freightPool || freightPool.active_clusters.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 border border-emerald-900/40 animate-pulse min-h-[300px] flex items-center justify-center">
        <p className="text-slate-400">Locating optimal shared freight pooling routes...</p>
      </div>
    );
  }

  const handleJoin = (clusterId: string) => {
    setJoinedClusterIds(prev => ({
      ...prev,
      [clusterId]: !prev[clusterId]
    }));
  };

  const summary = freightPool.summary_message[language] || freightPool.summary_message.en;

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-emerald-900/40 shadow-xl relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Shared Logistics & Freight Pooler
            </h2>
            <span className="text-[10px] font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800/60">
              Haversine Routing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Consolidate smallholder harvests into multi-axle carriers to reduce per-kg transport diesel costs
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-300">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Green Supply Chain</span>
        </div>
      </div>

      {/* Summary Message */}
      <div className="mt-4 p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
        <span>{summary}</span>
      </div>

      {/* Clusters List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {freightPool.active_clusters.map((cluster) => {
          const isJoined = joinedClusterIds[cluster.cluster_id] || false;
          const isFull = cluster.capacity_utilized_pct >= 95;

          return (
            <div
              key={cluster.cluster_id}
              className="rounded-xl p-4.5 bg-[#0a1410] border border-emerald-900/50 hover:border-emerald-700/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cluster Title & Truck Type */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-sm">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {cluster.vehicle_type}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Departure: <span className="text-slate-300 font-medium">{cluster.departure_time_window}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {cluster.total_farmers_count} Farmers
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-3.5">
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span>Capacity Fill:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {cluster.pooled_quantity_kg.toLocaleString()} / {cluster.max_capacity_kg.toLocaleString()} kg ({cluster.capacity_utilized_pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull 
                          ? 'bg-amber-500' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      }`}
                      style={{ width: `${cluster.capacity_utilized_pct}%` }}
                    />
                  </div>
                </div>

                {/* Savings Cards Grid */}
                <div className="grid grid-cols-3 gap-2 mt-3.5 text-center">
                  <div className="bg-[#050b08] p-2 rounded-lg border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Solo Cost</span>
                    <span className="text-xs font-bold font-mono text-rose-400 line-through">
                      ₹{Math.round(cluster.solo_trip_cost_per_farmer_rs)}
                    </span>
                  </div>
                  <div className="bg-[#050b08] p-2 rounded-lg border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Pooled Cost</span>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      ₹{Math.round(cluster.pooled_cost_per_farmer_rs)}
                    </span>
                  </div>
                  <div className="bg-[#050b08] p-2 rounded-lg border border-emerald-900/40">
                    <span className="text-[10px] text-slate-400 block">Your Savings</span>
                    <span className="text-xs font-extrabold font-mono text-emerald-300">
                      ₹{Math.round(cluster.savings_per_farmer_rs)} ({cluster.savings_pct}%)
                    </span>
                  </div>
                </div>

                {/* Route Waypoints & Farmers */}
                <div className="mt-3.5 pt-3 border-t border-white/5">
                  <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pickup Route Stops:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cluster.pickup_route.map((stop, i) => (
                      <span key={i} className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Farmer Members Mini-List */}
                <div className="mt-2.5 space-y-1">
                  {cluster.members.map((m) => (
                    <div key={m.farmer_id} className="flex justify-between text-[11px] text-slate-400">
                      <span className={m.is_current_user ? 'text-emerald-300 font-bold' : ''}>
                        {m.farmer_name} ({m.village})
                      </span>
                      <span className="font-mono">{m.quantity_kg.toLocaleString()} kg</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Carbon Badge */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[11px] text-emerald-400/90">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>-{cluster.co2_saved_kg} kg CO₂</span>
                </div>

                <button
                  onClick={() => handleJoin(cluster.cluster_id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    isJoined
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Slot Reserved!</span>
                    </>
                  ) : (
                    <>
                      <span>Join Freight Pool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
