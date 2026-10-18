import React from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Satellite, 
  TrendingDown, 
  Calendar, 
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Gauge
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { GlutPredictionResponse, SupportedLanguage } from '../types';

interface MarketSentimentCardProps {
  prediction?: GlutPredictionResponse;
  language: SupportedLanguage;
  loading?: boolean;
  onRefresh?: () => void;
}

export const MarketSentimentCard: React.FC<MarketSentimentCardProps> = ({
  prediction,
  language,
  loading = false,
  onRefresh
}) => {
  if (!prediction) {
    return (
      <div className="glass-panel rounded-2xl p-6 border border-emerald-900/40 animate-pulse flex items-center justify-center min-h-[350px]">
        <div className="text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-400 mb-2" />
          <p>Processing Sentinel-2 NDVI telemetry & Agmarknet feeds...</p>
        </div>
      </div>
    );
  }

  const {
    risk_score,
    traffic_light,
    expected_crash_window_days,
    projected_price_crash_pct,
    current_mandi_price_rs_kg,
    projected_crash_price_rs_kg,
    ndvi_surge_pct,
    arrival_anomaly_pct,
    historical_series,
    alert_headline,
    alert_summary,
    satellite_tile_url,
    crop_name,
    region_name
  } = prediction;

  const isRed = traffic_light === 'RED';
  const isAmber = traffic_light === 'AMBER';

  // Localized alert text
  const headlineText = alert_headline[language] || alert_headline.en;
  const summaryText = alert_summary[language] || alert_summary.en;

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-emerald-900/40 shadow-xl relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div 
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isRed ? 'bg-red-500' : isAmber ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-900/40">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
            isRed 
              ? 'bg-red-950/80 border border-red-500/50 text-red-400 shadow-red-950/50 animate-radar' 
              : isAmber 
              ? 'bg-amber-950/80 border border-amber-500/50 text-amber-400' 
              : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-400'
          }`}>
            {isRed ? <AlertOctagon className="w-5 h-5" /> : isAmber ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Early Harvest Glut Radar
              </h2>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                isRed 
                  ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse' 
                  : isAmber 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {traffic_light} ALERT ({risk_score}/100)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Copernicus Sentinel-2 NDVI & Agmarknet Real-time Fusion • {crop_name}, {region_name}
            </p>
          </div>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-evaluate</span>
          </button>
        )}
      </div>

      {/* Alert Headline Banner */}
      <div className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 ${
        isRed 
          ? 'bg-red-950/40 border-red-800/60 text-red-200' 
          : isAmber 
          ? 'bg-amber-950/40 border-amber-800/60 text-amber-200' 
          : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
      }`}>
        <Activity className={`w-5 h-5 shrink-0 mt-0.5 ${isRed ? 'text-red-400' : isAmber ? 'text-amber-400' : 'text-emerald-400'}`} />
        <div>
          <h4 className="font-bold text-sm tracking-tight">{headlineText}</h4>
          <p className="text-xs mt-1 text-slate-300 leading-relaxed">{summaryText}</p>
        </div>
      </div>

      {/* 4 Core Quantitative Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {/* Metric 1: Risk Probability Gauge */}
        <div className="bg-[#0b1410] border border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Glut Crash Risk</span>
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className={`text-2xl font-extrabold font-mono ${isRed ? 'text-red-400' : isAmber ? 'text-amber-400' : 'text-emerald-400'}`}>
              {risk_score}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                isRed ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${risk_score}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Price Drop Estimate */}
        <div className="bg-[#0b1410] border border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Projected Price Crash</span>
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-red-400">
              -{projected_price_crash_pct}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            ₹{current_mandi_price_rs_kg} → <span className="text-red-400 font-bold">₹{projected_crash_price_rs_kg}/kg</span>
          </p>
        </div>

        {/* Metric 3: Crash Timeline */}
        <div className="bg-[#0b1410] border border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Critical Window</span>
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-amber-400">
              {expected_crash_window_days}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Days</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Pre-emptive action required
          </p>
        </div>

        {/* Metric 4: Satellite NDVI Surge */}
        <div className="bg-[#0b1410] border border-emerald-900/50 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Sentinel-2 NDVI Surge</span>
            <Satellite className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-emerald-400">
              +{ndvi_surge_pct}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Arrivals Anomaly: <span className="text-amber-300 font-bold">+{arrival_anomaly_pct}%</span>
          </p>
        </div>
      </div>

      {/* Chart Section: 30-Day Historical Correlation */}
      <div className="mt-5 pt-4 border-t border-emerald-900/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              30-Day Time-Series: Sentinel-2 NDVI vs Mandi Price & Arrivals
            </h4>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Source: ESA Sentinel-2 MSI (10m) + Agmarknet
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historical_series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorArrivals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={(val) => val.slice(5)} 
                stroke="#475569" 
                fontSize={11} 
                tickLine={false} 
              />
              <YAxis 
                yAxisId="price" 
                orientation="left" 
                stroke="#ef4444" 
                fontSize={11} 
                tickLine={false} 
                domain={['auto', 'auto']}
                unit="₹"
              />
              <YAxis 
                yAxisId="ndvi" 
                orientation="right" 
                stroke="#10b981" 
                fontSize={11} 
                tickLine={false} 
                domain={[0.4, 0.9]} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0c1611', 
                  borderColor: '#1f3d2b', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#f8fafc',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}
                labelFormatter={(l) => `Date: ${l}`}
                formatter={(val: any, name: any) => {
                  if (name === 'price_rs_kg') return [`₹${val}/kg`, 'Mandi Price'];
                  if (name === 'ndvi') return [val, 'Sentinel-2 NDVI'];
                  if (name === 'arrivals_tonnes') return [`${val} MT`, 'Arrivals'];
                  return [val, name];
                }}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={28} 
                formatter={(value) => {
                  if (value === 'price_rs_kg') return <span className="text-red-400 text-xs font-semibold">Mandi Price (₹/kg)</span>;
                  if (value === 'ndvi') return <span className="text-emerald-400 text-xs font-semibold">NDVI Biomass</span>;
                  if (value === 'arrivals_tonnes') return <span className="text-amber-400 text-xs font-semibold">Arrivals (MT)</span>;
                  return value;
                }}
              />
              <ReferenceLine yAxisId="price" y={projected_crash_price_rs_kg} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Projected Crash', fill: '#f87171', fontSize: 10 }} />
              <Area 
                yAxisId="price" 
                type="monotone" 
                dataKey="price_rs_kg" 
                stroke="#ef4444" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
              />
              <Area 
                yAxisId="ndvi" 
                type="monotone" 
                dataKey="ndvi" 
                stroke="#10b981" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorNdvi)" 
              />
              <Area 
                yAxisId="price" 
                type="monotone" 
                dataKey="arrivals_tonnes" 
                stroke="#f59e0b" 
                strokeWidth={1.5} 
                fillOpacity={1} 
                fill="url(#colorArrivals)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
