import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Satellite, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Radio,
  RefreshCw,
  Award
} from 'lucide-react';
import { 
  Crop, 
  RegionHub, 
  GlutPredictionResponse, 
  RouteOptimizationResponse, 
  FreightPoolResponse, 
  AdvisoryResponse,
  MarketTickerItem,
  SupportedLanguage 
} from './types';
import { api } from './api';
import { Navbar } from './components/Navbar';
import { MarketSentimentCard } from './components/MarketSentimentCard';
import { DecisionEngineCard } from './components/DecisionEngineCard';
import { FreightPoolerCard } from './components/FreightPoolerCard';
import { SupplyChainMap } from './components/SupplyChainMap';
import { AlgorithmExplanationModal, WhatsAppSimulationModal } from './components/Modals';

export const App: React.FC = () => {
  // State
  const [crops, setCrops] = useState<Crop[]>([]);
  const [regions, setRegions] = useState<RegionHub[]>([]);
  const [tickerItems, setTickerItems] = useState<MarketTickerItem[]>([]);
  
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('nashik-tomato');
  const [language, setLanguage] = useState<SupportedLanguage>('hi');

  // Simulation Sliders
  const [harvestQuantity, setHarvestQuantity] = useState<number>(5000);
  const [holdingDays, setHoldingDays] = useState<number>(30);
  const [dieselPrice, setDieselPrice] = useState<number>(92);
  const [futureMarkup, setFutureMarkup] = useState<number>(45);

  // API Responses
  const [prediction, setPrediction] = useState<GlutPredictionResponse | undefined>();
  const [optimization, setOptimization] = useState<RouteOptimizationResponse | undefined>();
  const [freightPool, setFreightPool] = useState<FreightPoolResponse | undefined>();
  const [advisory, setAdvisory] = useState<AdvisoryResponse | undefined>();

  // Modals
  const [isAlgorithmOpen, setIsAlgorithmOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'all' | 'glut' | 'optimization' | 'logistics' | 'map'>('all');

  // 1. Initial Load: Crops, Regions, Ticker
  useEffect(() => {
    async function loadMeta() {
      const [cropsData, regionsData, tickerData] = await Promise.all([
        api.getCrops(),
        api.getRegions(),
        api.getTicker(),
      ]);
      setCrops(cropsData);
      setRegions(regionsData);
      setTickerItems(tickerData);
    }
    loadMeta();
  }, []);

  // 2. Fetch Intelligence Data whenever crop, region, or scenario inputs change
  useEffect(() => {
    async function fetchIntelligence() {
      setLoading(true);
      try {
        const [predData, optData, poolData, advData] = await Promise.all([
          api.getGlutForecast(selectedCropId, selectedRegionId),
          api.solveRouteOptimization({
            cropId: selectedCropId,
            regionId: selectedRegionId,
            harvestQuantityKg: harvestQuantity,
            dieselPrice: dieselPrice,
            holdingDays: holdingDays,
            qualityGrade: 'A',
            futurePriceMarkup: futureMarkup,
          }),
          api.getFreightPool(selectedCropId, selectedRegionId, harvestQuantity),
          api.generateAdvisory({
            cropId: selectedCropId,
            regionId: selectedRegionId,
            farmerName: 'Ramesh Patil',
            quantityKg: harvestQuantity,
            language: language,
          }),
        ]);

        setPrediction(predData);
        setOptimization(optData);
        setFreightPool(poolData);
        setAdvisory(advData);
      } catch (err) {
        console.error('Error fetching intelligence:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchIntelligence();
  }, [selectedCropId, selectedRegionId, harvestQuantity, holdingDays, dieselPrice, futureMarkup, language]);

  const currentCrop = crops.find(c => c.id === selectedCropId) || crops[0];
  const currentRegion = regions.find(r => r.id === selectedRegionId) || regions[0];

  return (
    <div className="min-h-screen bg-[#070c09] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        selectedCropId={selectedCropId}
        onCropChange={setSelectedCropId}
        crops={crops}
        selectedRegionId={selectedRegionId}
        onRegionChange={setSelectedRegionId}
        regions={regions}
        tickerItems={tickerItems}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenAlgorithm={() => setIsAlgorithmOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero KPI Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* KPI 1: Harvest Risk Level */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Glut Warning</span>
              <Radio className={`w-3.5 h-3.5 ${prediction?.traffic_light === 'RED' ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`} />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-xl sm:text-2xl font-black font-mono ${
                prediction?.traffic_light === 'RED' ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {prediction ? `${prediction.risk_score}/100` : '---'}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                {prediction?.traffic_light || 'NORMAL'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {prediction ? `Crash within ${prediction.expected_crash_window_days} days` : 'Calculating...'}
            </p>
          </div>

          {/* KPI 2: Satellite Biomass Anomaly */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-900/40">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Sentinel-2 Anomaly</span>
              <Satellite className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                {prediction ? `+${prediction.ndvi_surge_pct}%` : '---'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              Arrival Spike: <span className="text-amber-300 font-bold">+{prediction?.arrival_anomaly_pct}%</span>
            </p>
          </div>

          {/* KPI 3: Optimal Arbitrage Lift */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-900/40">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Arbitrage Profit Lift</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-300">
                {optimization ? `+₹${optimization.profit_lift_rs.toLocaleString()}` : '---'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {optimization ? `+${optimization.profit_lift_pct}% vs Mandi distress sale` : 'Calculating...'}
            </p>
          </div>

          {/* KPI 4: Shared Freight Savings */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-900/40">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Pooled Freight Savings</span>
              <Truck className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-teal-300">
                {freightPool?.active_clusters[0] ? `₹${Math.round(freightPool.active_clusters[0].savings_per_farmer_rs)}` : '---'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                ({freightPool?.active_clusters[0]?.savings_pct}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {freightPool?.active_clusters[0] ? `-${freightPool.active_clusters[0].co2_saved_kg} kg CO₂ saved` : 'Calculating...'}
            </p>
          </div>
        </div>

        {/* Section View Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-emerald-950">
          {[
            { id: 'all', label: '📊 Unified Intelligence Dashboard' },
            { id: 'glut', label: '🛰️ Early Warning Glut Radar' },
            { id: 'optimization', label: '⚡ 3-Way Logistics Decision Engine' },
            { id: 'logistics', label: '🚚 Shared Freight Pooling' },
            { id: 'map', label: '🗺️ Geospatial Network Topology' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-black shadow-md shadow-emerald-950'
                  : 'bg-[#0b1410] text-slate-300 hover:text-white border border-emerald-900/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Grid Modules */}
        <div className="space-y-6">
          {(activeTab === 'all' || activeTab === 'glut') && (
            <MarketSentimentCard
              prediction={prediction}
              language={language}
              loading={loading}
              onRefresh={() => {
                api.getGlutForecast(selectedCropId, selectedRegionId).then(setPrediction);
              }}
            />
          )}

          {(activeTab === 'all' || activeTab === 'optimization') && (
            <DecisionEngineCard
              optimization={optimization}
              language={language}
              harvestQuantity={harvestQuantity}
              onHarvestQuantityChange={setHarvestQuantity}
              holdingDays={holdingDays}
              onHoldingDaysChange={setHoldingDays}
              dieselPrice={dieselPrice}
              onDieselPriceChange={setDieselPrice}
              futureMarkup={futureMarkup}
              onFutureMarkupChange={setFutureMarkup}
              loading={loading}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(activeTab === 'all' || activeTab === 'logistics') && (
              <FreightPoolerCard
                freightPool={freightPool}
                language={language}
              />
            )}

            {(activeTab === 'all' || activeTab === 'map') && (
              <SupplyChainMap
                region={currentRegion}
                optimization={optimization}
                selectedCropName={currentCrop?.name || 'Crop'}
              />
            )}
          </div>
        </div>
      </main>

      {/* Floating Action / WhatsApp Simulation Banner */}
      <div className="sticky bottom-4 z-30 max-w-xl mx-auto px-4 w-full">
        <div className="glass-panel bg-[#075e54]/95 border border-emerald-400/50 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3 text-white backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
              📲
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">
                Simulate Direct WhatsApp Advisory Dispatch
              </div>
              <div className="text-[11px] text-emerald-100">
                Localized in {language === 'hi' ? 'हिंदी' : language === 'mr' ? 'मराठी' : language === 'kn' ? 'ಕನ್ನಡ' : 'English'} with Audio Script
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow hover:bg-emerald-100 transition whitespace-nowrap"
          >
            Preview Dispatch
          </button>
        </div>
      </div>

      {/* Modals */}
      <AlgorithmExplanationModal
        isOpen={isAlgorithmOpen}
        onClose={() => setIsAlgorithmOpen(false)}
        mathBreakdown={optimization?.math_breakdown}
      />

      <WhatsAppSimulationModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        advisory={advisory}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Footer */}
      <footer className="border-t border-emerald-950/80 bg-[#040806] py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-300 font-semibold">Agri-Drishti (कृषि दृष्टि)</span>
            <span>• Geospatial Supply Chain & Glut Prevention Engine</span>
          </div>
          <div>
            Data: Copernicus Sentinel-2 Level-2A • Agmarknet Ministry of Agriculture & Farmers Welfare
          </div>
        </div>
      </footer>
    </div>
  );
};
