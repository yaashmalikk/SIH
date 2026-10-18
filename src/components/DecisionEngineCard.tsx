import React, { useState } from 'react';
import { 
  Store, 
  Snowflake, 
  Factory, 
  TrendingUp, 
  Fuel, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Sliders,
  DollarSign,
  Sparkles,
  Award,
  Info
} from 'lucide-react';
import { RouteOptimizationResponse, SupportedLanguage } from '../types';

interface DecisionEngineCardProps {
  optimization?: RouteOptimizationResponse;
  language: SupportedLanguage;
  harvestQuantity: number;
  onHarvestQuantityChange: (qty: number) => void;
  holdingDays: number;
  onHoldingDaysChange: (days: number) => void;
  dieselPrice: number;
  onDieselPriceChange: (price: number) => void;
  futureMarkup: number;
  onFutureMarkupChange: (markup: number) => void;
  loading?: boolean;
}

export const DecisionEngineCard: React.FC<DecisionEngineCardProps> = ({
  optimization,
  language,
  harvestQuantity,
  onHarvestQuantityChange,
  holdingDays,
  onHoldingDaysChange,
  dieselPrice,
  onDieselPriceChange,
  futureMarkup,
  onFutureMarkupChange,
  loading = false
}) => {
  const [showSliders, setShowSliders] = useState(false);
  const [selectedOptionTab, setSelectedOptionTab] = useState<string>('ALL');

  if (!optimization) {
    return (
      <div className="glass-panel rounded-2xl p-6 border border-emerald-900/40 animate-pulse min-h-[350px] flex items-center justify-center">
        <p className="text-slate-400">Computing 3-way route optimization linear models...</p>
      </div>
    );
  }

  const {
    crop_name,
    region_name,
    optimal_choice,
    optimal_title,
    max_net_profit_rs,
    baseline_mandi_profit_rs,
    profit_lift_rs,
    profit_lift_pct,
    options,
    math_breakdown
  } = optimization;

  const getOptionIcon = (type: string) => {
    switch (type) {
      case 'COLD_STORAGE':
        return <Snowflake className="w-5 h-5 text-cyan-400" />;
      case 'PROCESSING_PLANT':
        return <Factory className="w-5 h-5 text-amber-400" />;
      default:
        return <Store className="w-5 h-5 text-rose-400" />;
    }
  };

  const getOptionTheme = (type: string, isOpt: boolean) => {
    if (isOpt) {
      return 'border-emerald-500/70 bg-gradient-to-b from-emerald-950/70 to-[#0e1f17] ring-1 ring-emerald-400/40 shadow-emerald-950/40';
    }
    switch (type) {
      case 'COLD_STORAGE':
        return 'border-cyan-900/50 bg-[#0a1518]/60 hover:border-cyan-700/60';
      case 'PROCESSING_PLANT':
        return 'border-amber-900/50 bg-[#161208]/60 hover:border-amber-700/60';
      default:
        return 'border-rose-950/50 bg-[#170c0c]/60 hover:border-rose-900/60';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-emerald-900/40 shadow-xl relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              3-Way Agri-Logistics Decision Engine
            </h2>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
              Prescriptive AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time Opportunity Cost Arbitrage • Fresh Mandi vs Cold Hub vs Processing Unit
          </p>
        </div>

        <button
          onClick={() => setShowSliders(!showSliders)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
            showSliders 
              ? 'bg-emerald-500 text-black border-emerald-400 font-bold' 
              : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800/60'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showSliders ? 'Hide Scenario Sim' : 'Scenario Simulator'}</span>
        </button>
      </div>

      {/* Scenario Simulator Sliders (Toggleable) */}
      {showSliders && (
        <div className="mt-4 p-4 rounded-xl bg-[#08100c] border border-emerald-800/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Harvest Lot Size:</span>
              <span className="text-emerald-400 font-mono font-bold">{harvestQuantity.toLocaleString()} kg</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="20000" 
              step="500" 
              value={harvestQuantity} 
              onChange={(e) => onHarvestQuantityChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Cold Holding Days:</span>
              <span className="text-cyan-400 font-mono font-bold">{holdingDays} Days</span>
            </div>
            <input 
              type="range" 
              min="7" 
              max="90" 
              step="1" 
              value={holdingDays} 
              onChange={(e) => onHoldingDaysChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Diesel Price:</span>
              <span className="text-amber-400 font-mono font-bold">₹{dieselPrice}/L</span>
            </div>
            <input 
              type="range" 
              min="80" 
              max="115" 
              step="1" 
              value={dieselPrice} 
              onChange={(e) => onDieselPriceChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Post-Glut Price Markup:</span>
              <span className="text-emerald-400 font-mono font-bold">+{futureMarkup}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={futureMarkup} 
              onChange={(e) => onFutureMarkupChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Top Banner: Optimum Recommendation & Profit Lift */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-teal-950/80 border border-emerald-500/40 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">
              Optimal Recommendation
            </span>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              {optimal_title}
            </h3>
            <p className="text-xs text-slate-300">
              Max net realization of <span className="text-emerald-300 font-bold font-mono">₹{max_net_profit_rs.toLocaleString()}</span> for {harvestQuantity.toLocaleString()} kg
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#0a1610] px-4 py-2.5 rounded-xl border border-emerald-800/60">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Profit Uplift vs Mandi</div>
            <div className="text-xl font-black font-mono text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-5 h-5" />
              +₹{profit_lift_rs.toLocaleString()}
            </div>
          </div>
          <div className="text-right border-l border-emerald-900/60 pl-3">
            <div className="text-[11px] text-slate-400 font-medium">Relative Lift</div>
            <div className="text-lg font-bold font-mono text-emerald-300">
              +{profit_lift_pct}%
            </div>
          </div>
        </div>
      </div>

      {/* 3 Decision Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {options.map((opt) => {
          const isOptimal = opt.is_recommended;
          const reason = opt.recommendation_reason[language] || opt.recommendation_reason.en;

          return (
            <div
              key={opt.option_type}
              className={`rounded-xl p-4.5 border transition-all flex flex-col justify-between ${getOptionTheme(opt.option_type, isOptimal)}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                      {getOptionIcon(opt.option_type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                        {opt.option_type.replace('_', ' ')}
                      </span>
                      <h4 className="font-bold text-sm text-white leading-tight">
                        {opt.title}
                      </h4>
                    </div>
                  </div>

                  {isOptimal && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-black px-2 py-0.5 rounded-full shadow-sm">
                      Best Choice
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-1">
                  📍 {opt.location_name} ({opt.distance_km} km)
                </p>

                {/* Net Realization Hero */}
                <div className="mt-3.5 p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">Net Realization</span>
                    <span className="text-lg font-extrabold font-mono text-white">
                      ₹{opt.net_profit_rs.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[11px]">
                    <span className="text-slate-400">Rate per kg:</span>
                    <span className={`font-mono font-bold ${isOptimal ? 'text-emerald-400' : 'text-slate-200'}`}>
                      ₹{opt.net_realization_per_kg}/kg
                    </span>
                  </div>
                </div>

                {/* Financial Breakdown Items */}
                <div className="mt-3 space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-slate-400">Gross Revenue:</span>
                    <span className="font-mono">₹{opt.gross_revenue_rs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-slate-400">Diesel Transit Fuel:</span>
                    <span className="font-mono text-rose-300">-₹{opt.transit_fuel_cost_rs.toLocaleString()}</span>
                  </div>
                  {opt.storage_fee_rs > 0 && (
                    <div className="flex justify-between py-0.5 border-b border-white/5">
                      <span className="text-slate-400">Holding Storage Rent:</span>
                      <span className="font-mono text-cyan-300">-₹{opt.storage_fee_rs.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-slate-400">Handling / Commission:</span>
                    <span className="font-mono text-slate-400">-₹{opt.handling_and_commission_rs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">Estimated Spoilage:</span>
                    <span className="font-mono text-rose-400">₹{opt.spoilage_loss_rs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Rationale Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300 leading-relaxed">
                {reason}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
