import React from 'react';
import { 
  Sprout, 
  Languages, 
  MessageSquareShare, 
  HelpCircle, 
  TrendingDown, 
  TrendingUp, 
  Radio,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Crop, RegionHub, MarketTickerItem, SupportedLanguage } from '../types';

interface NavbarProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  selectedCropId: string;
  onCropChange: (cropId: string) => void;
  crops: Crop[];
  selectedRegionId: string;
  onRegionChange: (regionId: string) => void;
  regions: RegionHub[];
  tickerItems: MarketTickerItem[];
  onOpenWhatsApp: () => void;
  onOpenAlgorithm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  selectedCropId,
  onCropChange,
  crops,
  selectedRegionId,
  onRegionChange,
  regions,
  tickerItems,
  onOpenWhatsApp,
  onOpenAlgorithm,
}) => {
  const currentCrop = crops.find(c => c.id === selectedCropId) || crops[0];

  const getCropLocalizedName = (crop: Crop) => {
    if (currentLanguage === 'hi') return `${crop.hindi_name} (${crop.name})`;
    if (currentLanguage === 'mr') return `${crop.marathi_name} (${crop.name})`;
    if (currentLanguage === 'kn') return `${crop.kannada_name} (${crop.name})`;
    return crop.name;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/30 bg-[#070d0a]/90 backdrop-blur-xl">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/40">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-300 via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                  Agri-Drishti
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
                  कृषि दृष्टि
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/80 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Sentinel-2 AI Glut Radar Active</span>
              </div>
            </div>
          </div>

          {/* Selectors: Crop & Region */}
          <div className="hidden md:flex items-center gap-3">
            {/* Crop Selector */}
            <div className="flex items-center gap-2 bg-[#0e1712] border border-emerald-900/50 rounded-xl px-3 py-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedCropId}
                onChange={(e) => onCropChange(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-200 focus:outline-none cursor-pointer"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0e1712] text-slate-100">
                    {getCropLocalizedName(c)}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Selector */}
            <div className="flex items-center gap-2 bg-[#0e1712] border border-emerald-900/50 rounded-xl px-3 py-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedRegionId}
                onChange={(e) => onRegionChange(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-200 focus:outline-none cursor-pointer max-w-[210px] truncate"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#0e1712] text-slate-100">
                    {r.name} ({r.state})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-[#0e1712] border border-emerald-900/50 rounded-xl px-2.5 py-1.5">
              <Languages className="w-4 h-4 text-emerald-400" />
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                aria-label="Select Language"
                className="bg-transparent text-xs font-bold text-emerald-300 focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-[#0e1712]">EN</option>
                <option value="hi" className="bg-[#0e1712]">हिंदी</option>
                <option value="mr" className="bg-[#0e1712]">मराठी</option>
                <option value="kn" className="bg-[#0e1712]">ಕನ್ನಡ</option>
              </select>
            </div>

            {/* Algorithm Info Button */}
            <button
              onClick={onOpenAlgorithm}
              title="Mathematical Formula Breakdown"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Formula</span>
            </button>

            {/* WhatsApp Advisory Modal Trigger */}
            <button
              onClick={onOpenWhatsApp}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/60 ring-1 ring-emerald-400/30 transition transform hover:-translate-y-0.5"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>WhatsApp Advisory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Selectors Bar */}
      <div className="md:hidden px-4 py-2 bg-[#0a120e] border-t border-emerald-950 flex items-center justify-between gap-2">
        <select
          value={selectedCropId}
          onChange={(e) => onCropChange(e.target.value)}
          aria-label="Select Crop (Mobile)"
          className="bg-[#0e1712] border border-emerald-900 text-xs font-semibold text-slate-200 rounded-lg px-2 py-1 flex-1"
        >
          {crops.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.hindi_name})
            </option>
          ))}
        </select>
        <select
          value={selectedRegionId}
          onChange={(e) => onRegionChange(e.target.value)}
          aria-label="Select Region (Mobile)"
          className="bg-[#0e1712] border border-emerald-900 text-xs font-semibold text-slate-200 rounded-lg px-2 py-1 flex-1 truncate"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Live Market Ticker Strip */}
      <div className="bg-[#040806] border-t border-emerald-950/80 px-4 py-1.5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Mandi Live</span>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
            {tickerItems.map((item) => {
              const isDrop = item.price_change_pct < 0;
              return (
                <div key={item.crop_id} className="flex items-center gap-1.5 text-slate-300 text-xs">
                  <span className="font-semibold text-slate-200">{item.crop_name}:</span>
                  <span className="font-mono font-bold text-white">₹{item.current_price.toFixed(1)}/kg</span>
                  <span className={`flex items-center text-[11px] font-bold ${isDrop ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isDrop ? <TrendingDown className="w-3 h-3 mr-0.5" /> : <TrendingUp className="w-3 h-3 mr-0.5" />}
                    {item.price_change_pct > 0 ? `+${item.price_change_pct}` : item.price_change_pct}%
                  </span>
                  {item.status === 'CRASH_RISK' && (
                    <span className="text-[9px] bg-red-950/80 text-red-400 border border-red-800/60 px-1.5 py-0.2 rounded font-bold uppercase">
                      Glut Risk
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
