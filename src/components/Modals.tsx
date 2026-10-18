import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  TrendingUp, 
  Scale, 
  Snowflake, 
  Store, 
  Factory, 
  CheckCircle2,
  MessageSquareShare, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Copy, 
  Check, 
  Share2, 
  Languages, 
  X,
  Sparkles,
  ExternalLink,
  CheckCheck
} from 'lucide-react';
import { MathFormulaBreakdown, AdvisoryResponse, SupportedLanguage } from '../types';

// ==========================================
// 1. ALGORITHM EXPLANATION MODAL
// ==========================================

interface AlgorithmModalProps {
  isOpen: boolean;
  onClose: () => void;
  mathBreakdown?: MathFormulaBreakdown;
}

export const AlgorithmExplanationModal: React.FC<AlgorithmModalProps> = ({
  isOpen,
  onClose,
  mathBreakdown
}) => {
  if (!isOpen || !mathBreakdown) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-emerald-700/60 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-emerald-900/50">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Optimization Mathematics & Theorems
            </h3>
            <p className="text-xs text-slate-400">
              Formulas powering Opportunity Gain, Risk Modeling & Haversine Logistics
            </p>
          </div>
        </div>

        {/* Core Formula Cards */}
        <div className="space-y-3.5 mt-4">
          {/* Opportunity Gain Formula */}
          <div className="p-4 rounded-xl bg-[#09130e] border border-emerald-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
              <Scale className="w-4 h-4" />
              <span>1. Opportunity Gain Arbitrage Equation</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-sm text-emerald-300 font-bold border border-emerald-950">
              {mathBreakdown.opportunity_cost_formula}
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Computes the net financial delta of diverting perishable harvest from a crashing APMC Mandi to post-glut Cold Holding or Industrial Buyout.
            </p>
          </div>

          {/* Mandi Baseline Equation */}
          <div className="p-4 rounded-xl bg-[#130b0b] border border-rose-900/40">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1.5">
              <Store className="w-4 h-4" />
              <span>2. Distress Mandi Net Realization</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-rose-300 font-bold border border-rose-950">
              {mathBreakdown.fresh_mandi_formula}
            </div>
          </div>

          {/* Cold Storage Arbitrage Equation */}
          <div className="p-4 rounded-xl bg-[#0b1416] border border-cyan-900/40">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
              <Snowflake className="w-4 h-4" />
              <span>3. Cold Storage Arbitrage & Carrying Cost</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-cyan-300 font-bold border border-cyan-950">
              {mathBreakdown.cold_storage_formula}
            </div>
            <div className="flex items-center justify-between text-xs text-cyan-200 mt-2 font-mono">
              <span>Break-even Price: ₹{mathBreakdown.break_even_future_price_rs_kg}/kg</span>
              <span>Break-even Timeline: {mathBreakdown.break_even_holding_days} Days</span>
            </div>
          </div>

          {/* Processing Plant Equation */}
          <div className="p-4 rounded-xl bg-[#141109] border border-amber-900/40">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              <Factory className="w-4 h-4" />
              <span>4. Industrial Buyout Formulation</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 font-bold border border-amber-950">
              {mathBreakdown.processing_formula}
            </div>
          </div>
        </div>

        {/* Step by Step Breakdown */}
        <div className="mt-4 pt-4 border-t border-emerald-900/40">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
            Step-by-Step Scenario Analysis
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {mathBreakdown.step_by_step_explanation.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. WHATSAPP SIMULATION MODAL
// ==========================================

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  advisory?: AdvisoryResponse;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const WhatsAppSimulationModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  advisory,
  currentLanguage,
  onLanguageChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayVoice = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(advisory?.audio_script || 'Farmer advisory notice.');
        utterance.rate = 0.95;
        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(0);
        };
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleCopy = () => {
    if (advisory?.whatsapp_message_raw) {
      navigator.clipboard.writeText(advisory.whatsapp_message_raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !advisory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-[#0b1410] border border-emerald-700/60 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Smartphone Header / WhatsApp Green Bar */}
        <div className="bg-[#075e54] p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 border border-emerald-400 flex items-center justify-center font-bold text-sm shadow">
              🌱
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                Agri-Drishti Official (कृषि दृष्टि)
              </h3>
              <p className="text-[11px] text-emerald-200">
                Verified AI Advisory Bot • Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Advisory Language"
              className="bg-[#054c44] text-xs font-bold text-white px-2 py-1 rounded-lg border border-emerald-600 focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="p-4 overflow-y-auto flex-1 bg-[#0a120c] bg-opacity-95 space-y-3">
          {/* Date stamp pill */}
          <div className="flex justify-center">
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-white/5">
              Today • Real-time Dispatch
            </span>
          </div>

          {/* Voice Note Audio Bubble */}
          <div className="bg-[#1f2c24] border border-emerald-900/60 rounded-2xl rounded-tl-none p-3 max-w-[88%] shadow-md">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayVoice}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow transition transform active:scale-95 shrink-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                  <span className="font-semibold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    Audio Voice Note ({advisory.language.toUpperCase()})
                  </span>
                  <span className="font-mono text-emerald-400 text-[10px]">0:24</span>
                </div>

                {/* Animated Audio Waveform Bars */}
                <div className="flex items-center gap-0.5 h-4">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const height = isPlaying ? Math.max(20, Math.sin(i + audioProgress) * 100) : (i % 3 === 0 ? 80 : 40);
                    const isActive = (i / 28) * 100 <= audioProgress;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-100 ${
                          isActive ? 'bg-emerald-400' : 'bg-slate-700'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Formatted Text Message Bubble */}
          <div className="bg-[#1f2c24] border border-emerald-900/60 rounded-2xl rounded-tl-none p-3.5 max-w-[95%] shadow-md text-slate-100 text-xs leading-relaxed space-y-2">
            <div 
              dangerouslySetInnerHTML={{ __html: advisory.whatsapp_message_formatted }} 
              className="prose prose-invert prose-xs"
            />

            <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
              <span>Just now</span>
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#08100c] border-t border-emerald-900/60 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Message'}</span>
          </button>

          <a
            href={advisory.direct_share_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#25d366] hover:bg-[#20bd5a] text-black shadow-lg transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Send on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
