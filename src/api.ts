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

const API_BASE = '/api';

// Fallback Mock Data
const MOCK_CROPS: Crop[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    hindi_name: 'टमाटर',
    marathi_name: 'टोमॅटो',
    kannada_name: 'ಟೊಮ್ಯಾಟೊ',
    category: 'Horticulture / Highly Perishable',
    default_shelf_life_days: 4,
    default_price_per_kg: 24.0,
    default_spoilage_rate_fresh: 4.5,
    default_spoilage_rate_cold: 0.05,
    storage_cost_per_kg_day: 0.14,
    processing_yield_pct: 0.94,
    processing_contract_price_kg: 21.5,
    icon_name: 'Cherry'
  },
  {
    id: 'onion',
    name: 'Onion',
    hindi_name: 'प्याज',
    marathi_name: 'कांदा',
    kannada_name: 'ಈರುಳ್ಳಿ',
    category: 'Alliums / Semi-Perishable',
    default_shelf_life_days: 21,
    default_price_per_kg: 18.0,
    default_spoilage_rate_fresh: 1.2,
    default_spoilage_rate_cold: 0.02,
    storage_cost_per_kg_day: 0.08,
    processing_yield_pct: 0.90,
    processing_contract_price_kg: 16.5,
    icon_name: 'Sparkles'
  },
  {
    id: 'potato',
    name: 'Potato',
    hindi_name: 'आलू',
    marathi_name: 'बटाटा',
    kannada_name: 'ಆಲೂಗಡ್ಡೆ',
    category: 'Tubers / Storable',
    default_shelf_life_days: 45,
    default_price_per_kg: 15.0,
    default_spoilage_rate_fresh: 0.8,
    default_spoilage_rate_cold: 0.015,
    storage_cost_per_kg_day: 0.07,
    processing_yield_pct: 0.96,
    processing_contract_price_kg: 17.0,
    icon_name: 'Layers'
  },
  {
    id: 'green_chilli',
    name: 'Green Chilli',
    hindi_name: 'हरी मिर्च',
    marathi_name: 'हिरवी मिरची',
    kannada_name: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ',
    category: 'Spices / Perishable',
    default_shelf_life_days: 7,
    default_price_per_kg: 42.0,
    default_spoilage_rate_fresh: 3.0,
    default_spoilage_rate_cold: 0.04,
    storage_cost_per_kg_day: 0.20,
    processing_yield_pct: 0.88,
    processing_contract_price_kg: 39.0,
    icon_name: 'Flame'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    hindi_name: 'सोयाबीन',
    marathi_name: 'सोयाबीन',
    kannada_name: 'ಸೋಯಾಬೀನ್',
    category: 'Oilseeds / Commercial',
    default_shelf_life_days: 180,
    default_price_per_kg: 46.0,
    default_spoilage_rate_fresh: 0.2,
    default_spoilage_rate_cold: 0.005,
    storage_cost_per_kg_day: 0.05,
    processing_yield_pct: 0.98,
    processing_contract_price_kg: 47.5,
    icon_name: 'Package'
  }
];

const MOCK_REGIONS: RegionHub[] = [
  {
    id: 'nashik-tomato',
    name: 'Nashik Horticultural Cluster',
    state: 'Maharashtra',
    district: 'Nashik (Pimpalgaon-Niphad Belt)',
    lat: 20.0059,
    lng: 73.7898,
    primary_crop_ids: ['tomato', 'onion'],
    fpo_name: 'Sahyadri Farmers Producer Co-op Ltd.',
    active_farmer_count: 1420,
    total_planted_hectares: 12450.0,
    destinations: [
      {
        id: 'nashik-mandi',
        name: 'Pimpalgaon Baswant APMC Mandi',
        type: 'MANDI',
        state: 'Maharashtra',
        city: 'Pimpalgaon Baswant',
        lat: 20.1712,
        lng: 73.9856,
        base_price_or_rate: 22.0,
        capacity_tonnes: 1200.0,
        current_occupancy_pct: 92.0,
        quality_acceptance: ['Grade A', 'Grade B', 'Grade C'],
        distance_km: 28.0
      },
      {
        id: 'sahyadri-cold',
        name: 'Sahyadri CA Cold Storage & Ripening Terminal',
        type: 'COLD_STORAGE',
        state: 'Maharashtra',
        city: 'Mohadi, Dindori',
        lat: 20.1980,
        lng: 73.8340,
        base_price_or_rate: 0.14,
        capacity_tonnes: 4500.0,
        current_occupancy_pct: 54.0,
        quality_acceptance: ['Grade A', 'Grade B'],
        distance_km: 36.0
      },
      {
        id: 'nashik-pulping',
        name: 'Kisan Kraft Puree & Aseptic Tomato Pulping Unit',
        type: 'PROCESSING_PLANT',
        state: 'Maharashtra',
        city: 'Ambad MIDC Industrial Park',
        lat: 19.9530,
        lng: 73.7420,
        base_price_or_rate: 21.0,
        capacity_tonnes: 2800.0,
        current_occupancy_pct: 40.0,
        quality_acceptance: ['Grade A', 'Grade B', 'Grade C (Pulpable)'],
        processing_type: 'Tomato Puree, Paste & Aseptic Bags',
        distance_km: 31.0
      }
    ]
  },
  {
    id: 'kolar-tomato',
    name: 'Kolar-Chikkaballapur Tomato Belt',
    state: 'Karnataka',
    district: 'Kolar & Srinivaspur',
    lat: 13.1367,
    lng: 78.1291,
    primary_crop_ids: ['tomato', 'green_chilli'],
    fpo_name: 'Kolar Gold Horticultural Farmers Federation',
    active_farmer_count: 2150,
    total_planted_hectares: 18200.0,
    destinations: [
      {
        id: 'kolar-mandi',
        name: 'Kolar APMC Yard (Asia\'s 2nd Largest Market)',
        type: 'MANDI',
        state: 'Karnataka',
        city: 'Kolar Town',
        lat: 13.1410,
        lng: 78.1340,
        base_price_or_rate: 25.0,
        capacity_tonnes: 2500.0,
        current_occupancy_pct: 96.0,
        quality_acceptance: ['Grade A', 'Grade B'],
        distance_km: 16.0
      },
      {
        id: 'bengaluru-cold',
        name: 'Hosakote Integrated Agri-Logistics Cold Hub',
        type: 'COLD_STORAGE',
        state: 'Karnataka',
        city: 'Hosakote Expressway',
        lat: 13.0720,
        lng: 77.7980,
        base_price_or_rate: 0.15,
        capacity_tonnes: 6000.0,
        current_occupancy_pct: 48.0,
        quality_acceptance: ['Grade A', 'Grade B'],
        distance_km: 42.0
      },
      {
        id: 'kolar-foodpark',
        name: 'Dabur & Godrej Agrovet Food Processing Center',
        type: 'PROCESSING_PLANT',
        state: 'Karnataka',
        city: 'Narasapura Industrial Area',
        lat: 13.1650,
        lng: 77.9820,
        base_price_or_rate: 23.0,
        capacity_tonnes: 3200.0,
        current_occupancy_pct: 42.0,
        quality_acceptance: ['Grade A', 'Grade B', 'Pulpable'],
        processing_type: 'Ketchup, Canning & Dehydrated Flakes',
        distance_km: 28.0
      }
    ]
  },
  {
    id: 'lasalgaon-onion',
    name: 'Lasalgaon Onion Capital Hub',
    state: 'Maharashtra',
    district: 'Nashik (Niphad, Yeola, Chandwad)',
    lat: 20.1472,
    lng: 74.2256,
    primary_crop_ids: ['onion', 'tomato'],
    fpo_name: 'Maharashtra State Onion Growers Cooperative',
    active_farmer_count: 3100,
    total_planted_hectares: 28400.0,
    destinations: [
      {
        id: 'lasalgaon-mandi',
        name: 'Lasalgaon APMC (India\'s Largest Onion Market)',
        type: 'MANDI',
        state: 'Maharashtra',
        city: 'Lasalgaon',
        lat: 20.1490,
        lng: 74.2280,
        base_price_or_rate: 19.5,
        capacity_tonnes: 4500.0,
        current_occupancy_pct: 89.0,
        quality_acceptance: ['All Grades'],
        distance_km: 12.0
      },
      {
        id: 'niphad-cold',
        name: 'Niphad Solar-Powered Ventilated Onion Chawl',
        type: 'COLD_STORAGE',
        state: 'Maharashtra',
        city: 'Niphad',
        lat: 20.0880,
        lng: 74.1120,
        base_price_or_rate: 0.08,
        capacity_tonnes: 12000.0,
        current_occupancy_pct: 38.0,
        quality_acceptance: ['Grade A', 'Grade B'],
        distance_km: 24.0
      },
      {
        id: 'jain-dehydration',
        name: 'Jain Farm Fresh Onion Dehydration Plant',
        type: 'PROCESSING_PLANT',
        state: 'Maharashtra',
        city: 'Jalgaon Road Food Park',
        lat: 20.3540,
        lng: 74.4560,
        base_price_or_rate: 18.2,
        capacity_tonnes: 5000.0,
        current_occupancy_pct: 52.0,
        quality_acceptance: ['White & Red Onions'],
        processing_type: 'Dehydrated Onion Flakes & Powder',
        distance_km: 48.0
      }
    ]
  },
  {
    id: 'agra-potato',
    name: 'Agra-Farrukhabad Potato Belt',
    state: 'Uttar Pradesh',
    district: 'Agra & Hathras',
    lat: 27.1767,
    lng: 78.0081,
    primary_crop_ids: ['potato', 'wheat'],
    fpo_name: 'Braj Agri Producer Company Ltd.',
    active_farmer_count: 2890,
    total_planted_hectares: 34100.0,
    destinations: [
      {
        id: 'agra-mandi',
        name: 'Khandari Agra APMC Mandi',
        type: 'MANDI',
        state: 'Uttar Pradesh',
        city: 'Agra',
        lat: 27.2010,
        lng: 78.0120,
        base_price_or_rate: 14.5,
        capacity_tonnes: 3800.0,
        current_occupancy_pct: 94.0,
        quality_acceptance: ['All Grades'],
        distance_km: 22.0
      },
      {
        id: 'agra-mega-cold',
        name: 'Yamuna Expressway Agri Mega Cold Hub',
        type: 'COLD_STORAGE',
        state: 'Uttar Pradesh',
        city: 'Hathras Highway',
        lat: 27.3100,
        lng: 78.0850,
        base_price_or_rate: 0.07,
        capacity_tonnes: 25000.0,
        current_occupancy_pct: 45.0,
        quality_acceptance: ['Grade A', 'Grade B'],
        distance_km: 38.0
      },
      {
        id: 'pepsico-chips',
        name: 'PepsiCo / Lay\'s Potato Processing Plant',
        type: 'PROCESSING_PLANT',
        state: 'Uttar Pradesh',
        city: 'Kosi Kalan Industrial Area',
        lat: 27.7850,
        lng: 77.4420,
        base_price_or_rate: 17.5,
        capacity_tonnes: 8000.0,
        current_occupancy_pct: 60.0,
        quality_acceptance: ['Atlantic & Chipsona Varieties'],
        processing_type: 'Crisps, French Fries & Starch',
        distance_km: 68.0
      }
    ]
  },
  {
    id: 'indore-soybean',
    name: 'Malwa Plateau Soybean Hub',
    state: 'Madhya Pradesh',
    district: 'Indore & Ujjain',
    lat: 22.7196,
    lng: 75.8577,
    primary_crop_ids: ['soybean'],
    fpo_name: 'Malwa Nimar Kisan Producer Union',
    active_farmer_count: 2400,
    total_planted_hectares: 22000.0,
    destinations: [
      {
        id: 'indore-mandi',
        name: 'Choithram Indore Mandi',
        type: 'MANDI',
        state: 'Madhya Pradesh',
        city: 'Indore',
        lat: 22.6850,
        lng: 75.8340,
        base_price_or_rate: 45.0,
        capacity_tonnes: 3000.0,
        current_occupancy_pct: 82.0,
        quality_acceptance: ['All Grades'],
        distance_km: 18.0
      },
      {
        id: 'indore-silo',
        name: 'Adani Agri Silos & Grain Storage Hub',
        type: 'COLD_STORAGE',
        state: 'Madhya Pradesh',
        city: 'Dewas Road',
        lat: 22.8200,
        lng: 75.9500,
        base_price_or_rate: 0.05,
        capacity_tonnes: 20000.0,
        current_occupancy_pct: 40.0,
        quality_acceptance: ['Grade A', 'Grade B'],
        distance_km: 30.0
      },
      {
        id: 'indore-oil',
        name: 'Ruchi Soya / Patanjali Solvent Extraction Plant',
        type: 'PROCESSING_PLANT',
        state: 'Madhya Pradesh',
        city: 'Pithampur SEZ',
        lat: 22.6100,
        lng: 75.6800,
        base_price_or_rate: 48.0,
        capacity_tonnes: 6500.0,
        current_occupancy_pct: 50.0,
        quality_acceptance: ['Grade A', 'High Oil Content'],
        processing_type: 'Refined Oil & Soya Chunks (DOC)',
        distance_km: 35.0
      }
    ]
  }
];

export const api = {
  async getCrops(): Promise<Crop[]> {
    try {
      const res = await fetch(`${API_BASE}/crops`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return MOCK_CROPS;
    }
  },

  async getRegions(): Promise<RegionHub[]> {
    try {
      const res = await fetch(`${API_BASE}/regions`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return MOCK_REGIONS;
    }
  },

  async getTicker(): Promise<MarketTickerItem[]> {
    try {
      const res = await fetch(`${API_BASE}/ticker`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return [
        { crop_id: 'tomato', crop_name: 'Tomato (Pimpalgaon)', current_price: 22.0, price_change_pct: -18.4, status: 'CRASH_RISK' },
        { crop_id: 'onion', crop_name: 'Onion (Lasalgaon)', current_price: 19.5, price_change_pct: -4.2, status: 'STABLE' },
        { crop_id: 'potato', crop_name: 'Potato (Agra)', current_price: 14.5, price_change_pct: -2.1, status: 'MODERATE' },
        { crop_id: 'green_chilli', crop_name: 'Green Chilli (Guntur)', current_price: 42.0, price_change_pct: 6.5, status: 'HEALTHY' },
        { crop_id: 'soybean', crop_name: 'Soybean (Indore)', current_price: 46.0, price_change_pct: 1.8, status: 'STABLE' },
      ];
    }
  },

  async getGlutForecast(cropId: string, regionId: string): Promise<GlutPredictionResponse> {
    try {
      const res = await fetch(`${API_BASE}/predictions/glut-forecast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop_id: cropId, region_id: regionId }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      // Mock Fallback
      const crop = MOCK_CROPS.find(c => c.id === cropId) || MOCK_CROPS[0];
      const region = MOCK_REGIONS.find(r => r.id === regionId) || MOCK_REGIONS[0];
      const isRed = cropId === 'tomato' || cropId === 'green_chilli';
      
      const history = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const progress = i / 29;
        return {
          date: d.toISOString().split('T')[0],
          ndvi: +(0.52 + 0.24 * Math.pow(progress, 1.4)).toFixed(3),
          arrivals_tonnes: Math.round(900 + 1100 * Math.pow(progress, 2) + Math.sin(i) * 30),
          price_rs_kg: +(28 - progress * 8 + Math.cos(i) * 0.8).toFixed(1),
          crash_probability: +(0.1 + progress * progress * 0.8).toFixed(2),
          anomaly_flag: i >= 22
        };
      });

      return {
        id: 'pred-mock-1',
        crop_id: crop.id,
        crop_name: crop.name,
        region_id: region.id,
        region_name: region.name,
        state: region.state,
        risk_score: isRed ? 88 : 52,
        traffic_light: isRed ? 'RED' : 'AMBER',
        alert_headline: {
          en: `🚨 High Harvest Glut Alert: Severe price crash expected for ${crop.name} in 4-6 days!`,
          hi: `🚨 भारी आवक चेतावनी: 4-6 दिनों में ${crop.hindi_name} के भाव में भारी गिरावट का अनुमान!`,
          mr: `🚨 प्रचंड आवक इशारा: पुढील ४-६ दिवसांत ${crop.marathi_name} च्या दरात मोठी घसरण होण्याची शक्यता!`,
          kn: `🚨 ತೀವ್ರ ಬೆಲೆ ಕುಸಿತದ ಮುನ್ನೆಚ್ಚರಿಕೆ: 4-6 ದಿನಗಳಲ್ಲಿ ${crop.kannada_name} ಬೆಲೆಯಲ್ಲಿ ಭಾರಿ ಕುಸಿತ!`
        },
        alert_summary: {
          en: `Sentinel-2 satellite imagery indicates +44.4% biomass surge with +101% arrival spike. Prices projected to crash from ₹22 to ₹10.5/kg.`,
          hi: `सेंटिनल-2 उपग्रह डेटा 44.4% बायोमास वृद्धि और 101% आवक उछाल दर्शा रहा है। भाव ₹22 से ₹10.5/किग्रा गिरने का अनुमान।`,
          mr: `उपग्रह डेटा ४४.४% बायोमास वाढ दर्शवतो. दर ₹२२ वरून ₹१०.५/किलो पर्यंत घसरण्याचा अंदाज.`,
          kn: `ಉಪಗ್ರಹ ಡೇಟಾವು 44.4% ಬೆಳೆ ಹೆಚ್ಚಳವನ್ನು ತೋರಿಸುತ್ತದೆ. ಬೆಲೆಗಳು ₹22 ರಿಂದ ₹10.5/ಕೆಜಿಗೆ ಕುಸಿಯಬಹುದು.`
        },
        expected_crash_window_days: isRed ? 5 : 9,
        projected_price_crash_pct: isRed ? 52.3 : 24.5,
        current_mandi_price_rs_kg: 22.0,
        projected_crash_price_rs_kg: 10.5,
        ndvi_current: 0.78,
        ndvi_5yr_avg: 0.54,
        ndvi_surge_pct: 44.4,
        arrival_anomaly_pct: 101.1,
        satellite_tile_url: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80',
        historical_series: history,
        generated_at: new Date().toISOString()
      };
    }
  },

  async solveRouteOptimization(params: {
    cropId: string;
    regionId: string;
    harvestQuantityKg: number;
    dieselPrice: number;
    holdingDays: number;
    qualityGrade: string;
    futurePriceMarkup: number;
  }): Promise<RouteOptimizationResponse> {
    try {
      const res = await fetch(`${API_BASE}/optimization/solve-routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop_id: params.cropId,
          region_id: params.regionId,
          harvest_quantity_kg: params.harvestQuantityKg,
          diesel_price_per_litre: params.dieselPrice,
          holding_duration_days: params.holdingDays,
          quality_grade: params.qualityGrade,
          expected_future_price_markup_pct: params.futurePriceMarkup,
        }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const qty = params.harvestQuantityKg;
      const mandiRev = qty * 22 * 0.96;
      const mandiNet = mandiRev - (28 * (params.dieselPrice / 3.8) + mandiRev * 0.035);
      
      const coldRev = qty * (22 * (1 + params.futurePriceMarkup / 100)) * (1 - 0.0004 * params.holdingDays);
      const coldNet = coldRev - (36 * (params.dieselPrice / 3.8) + qty * 0.14 * params.holdingDays + qty * 0.35);

      const procRev = qty * 0.94 * 21.0;
      const procNet = procRev - (31 * (params.dieselPrice / 3.8) + qty * 0.20);

      const isColdBest = coldNet >= procNet && coldNet >= mandiNet;
      const bestNet = Math.max(coldNet, procNet, mandiNet);
      const lift = bestNet - mandiNet;

      return {
        id: 'opt-mock-1',
        crop_id: params.cropId,
        crop_name: 'Tomato',
        region_name: 'Nashik Horticultural Cluster',
        harvest_quantity_kg: qty,
        optimal_choice: isColdBest ? 'COLD_STORAGE' : 'PROCESSING_PLANT',
        optimal_title: isColdBest ? `Cold Storage Arbitrage (${params.holdingDays} Days Hold)` : 'Contract Processing Plant Buyout',
        max_net_profit_rs: Math.round(bestNet),
        baseline_mandi_profit_rs: Math.round(mandiNet),
        profit_lift_rs: Math.round(lift),
        profit_lift_pct: +(lift / mandiNet * 100).toFixed(1),
        options: [
          {
            option_type: 'MANDI',
            title: 'Fresh Mandi Distress Sale',
            location_name: 'Pimpalgaon Baswant APMC Mandi',
            city: 'Pimpalgaon Baswant',
            distance_km: 28,
            destination_lat: 20.1712,
            destination_lng: 73.9856,
            gross_revenue_rs: Math.round(mandiRev),
            transit_fuel_cost_rs: Math.round(28 * (params.dieselPrice / 3.8)),
            spoilage_loss_rs: Math.round(qty * 0.04 * 22),
            storage_fee_rs: 0,
            handling_and_commission_rs: Math.round(mandiRev * 0.035),
            net_profit_rs: Math.round(mandiNet),
            net_realization_per_kg: +(mandiNet / qty).toFixed(2),
            risk_level: 'HIGH',
            execution_time_hours: 4.0,
            is_recommended: false,
            recommendation_reason: {
              en: 'Immediate cash, but severe glut discount and commission loss.',
              hi: 'तत्काल नकद, लेकिन भाव गिरने और मंडी कमीशन का नुकसान।',
              mr: 'तातडीने पैसे मिळतील, पण कमी दर व आडतीचे नुकसान.',
              kn: 'ತಕ್ಷಣದ ನಗದು ಸಿಗುತ್ತದೆ, ಆದರೆ ಕಮಿಷನ್ ನಷ್ಟ.'
            },
            per_kg_breakdown: {
              gross_price: 22.0,
              fuel_cost: +(28 * (params.dieselPrice / 3.8) / qty).toFixed(2),
              spoilage_loss: 0.88,
              storage_fee: 0,
              handling_fee: 0.77,
              net_realization: +(mandiNet / qty).toFixed(2)
            }
          },
          {
            option_type: 'COLD_STORAGE',
            title: `Cold Storage Arbitrage (${params.holdingDays} Days Hold)`,
            location_name: 'Sahyadri CA Cold Storage Terminal',
            city: 'Mohadi, Dindori',
            distance_km: 36,
            destination_lat: 20.1980,
            destination_lng: 73.8340,
            gross_revenue_rs: Math.round(coldRev),
            transit_fuel_cost_rs: Math.round(36 * (params.dieselPrice / 3.8)),
            spoilage_loss_rs: Math.round(qty * (0.0004 * params.holdingDays + 0.008) * 31.9),
            storage_fee_rs: Math.round(qty * 0.14 * params.holdingDays),
            handling_and_commission_rs: Math.round(qty * 0.35),
            net_profit_rs: Math.round(coldNet),
            net_realization_per_kg: +(coldNet / qty).toFixed(2),
            risk_level: 'LOW',
            execution_time_hours: 3.5,
            is_recommended: isColdBest,
            recommendation_reason: {
              en: `Holding for ${params.holdingDays} days avoids glut crash and yields highest net realization.`,
              hi: `${params.holdingDays} दिन कोल्ड स्टोरेज में रखने पर सर्वोत्तम शुद्ध मुनाफा।`,
              mr: `${params.holdingDays} दिवस साठवणूक केल्यास सर्वाधिक नफा मिळेल.`,
              kn: `${params.holdingDays} ದಿನಗಳ ಕಾಲ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್‌ನಲ್ಲಿಟ್ಟು ಮಾರಾಟ ಮಾಡಿದರೆ ಅಧಿಕ ಲಾಭ.`
            },
            per_kg_breakdown: {
              gross_price: +(22 * (1 + params.futurePriceMarkup / 100)).toFixed(2),
              fuel_cost: +(36 * (params.dieselPrice / 3.8) / qty).toFixed(2),
              spoilage_loss: 0.45,
              storage_fee: +(0.14 * params.holdingDays).toFixed(2),
              handling_fee: 0.35,
              net_realization: +(coldNet / qty).toFixed(2)
            }
          },
          {
            option_type: 'PROCESSING_PLANT',
            title: 'Contract Processing Plant Buyout',
            location_name: 'Kisan Kraft Puree Mega Unit',
            city: 'Ambad MIDC Industrial Park',
            distance_km: 31,
            destination_lat: 19.9530,
            destination_lng: 73.7420,
            gross_revenue_rs: Math.round(procRev),
            transit_fuel_cost_rs: Math.round(31 * (params.dieselPrice / 3.8)),
            spoilage_loss_rs: Math.round(qty * 0.06 * 21.0),
            storage_fee_rs: 0,
            handling_and_commission_rs: Math.round(qty * 0.20),
            net_profit_rs: Math.round(procNet),
            net_realization_per_kg: +(procNet / qty).toFixed(2),
            risk_level: 'LOW',
            execution_time_hours: 2.5,
            is_recommended: !isColdBest,
            recommendation_reason: {
              en: 'Zero price volatility. Guaranteed buyout contract at fixed price.',
              hi: 'निश्चित अनुबंध दर पर जोखिम मुक्त पूर्ण खरीद।',
              mr: 'किंमत घसरणीची जोखीम नाही, हमीभावाने खरेदी.',
              kn: 'ಖಚಿತ ಒಪ್ಪಂದ ಬೆಲೆಯಲ್ಲಿ ಸುರಕ್ಷಿತ ಮಾರಾಟ.'
            },
            per_kg_breakdown: {
              gross_price: 21.0,
              fuel_cost: +(31 * (params.dieselPrice / 3.8) / qty).toFixed(2),
              spoilage_loss: 1.26,
              storage_fee: 0,
              handling_fee: 0.20,
              net_realization: +(procNet / qty).toFixed(2)
            }
          }
        ],
        math_breakdown: {
          title: 'Mathematical Formulation & Theorems',
          opportunity_cost_formula: 'ΔProfit = Max(Π_Cold, Π_Proc) - Π_Mandi',
          fresh_mandi_formula: 'Π_Mandi = Q · (1 - δ_fresh) · P_mandi - (Fuel + C_apmc)',
          cold_storage_formula: 'Π_Cold = Q · (1 - t·δ_cold) · P_future - (Fuel + Storage + Handling)',
          processing_formula: 'Π_Proc = Q · Y_proc · P_contract - (Fuel + Handling)',
          opportunity_gain_rs: Math.round(lift),
          break_even_future_price_rs_kg: 24.8,
          break_even_holding_days: 14,
          step_by_step_explanation: [
            `1. Baseline Mandi Return: Selling ${qty.toLocaleString()} kg gives ₹${Math.round(mandiNet).toLocaleString()}.`,
            `2. Cold Storage Arbitrage: Yields ₹${Math.round(coldNet).toLocaleString()} after ₹${Math.round(qty * 0.14 * params.holdingDays).toLocaleString()} storage fee over ${params.holdingDays} days.`,
            `3. Processing Buyout: Guarantees ₹${Math.round(procNet).toLocaleString()} with zero market risk.`,
            `4. Optimum Choice: ${isColdBest ? 'Cold Storage' : 'Processing Plant'} provides ₹${Math.round(lift).toLocaleString()} extra profit (+${+(lift / mandiNet * 100).toFixed(1)}%).`
          ]
        },
        origin_geo: { lat: 20.0059, lng: 73.7898 },
        generated_at: new Date().toISOString()
      };
    }
  },

  async getFreightPool(cropId: string, regionId: string, quantityKg: number): Promise<FreightPoolResponse> {
    try {
      const res = await fetch(`${API_BASE}/logistics/freight-pool`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop_id: cropId, region_id: regionId, user_quantity_kg: quantityKg }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        region_id: regionId,
        region_name: 'Nashik Horticultural Cluster',
        crop_id: cropId,
        crop_name: 'Tomato',
        active_clusters: [
          {
            cluster_id: 'cluster-ashok-9t',
            cluster_name: 'Nashik Heavy Consolidated Express (Ashok Leyland 9T)',
            vehicle_type: 'Ashok Leyland 9-Ton Multi-Axle',
            max_capacity_kg: 9000,
            pooled_quantity_kg: Math.min(quantityKg + 5200, 9000),
            capacity_utilized_pct: +((Math.min(quantityKg + 5200, 9000) / 9000) * 100).toFixed(1),
            total_farmers_count: 4,
            solo_trip_cost_per_farmer_rs: 2450.0,
            pooled_cost_per_farmer_rs: 1350.0,
            savings_per_farmer_rs: 1100.0,
            savings_pct: 44.9,
            co2_saved_kg: 42.5,
            destination_name: 'Sahyadri CA Cold Storage Terminal',
            destination_type: 'COLD_STORAGE',
            departure_time_window: 'Today, 06:30 PM (Evening Departure)',
            pickup_route: ['Your Farm', 'Pimpalgaon Baswant', 'Ozar Village', 'Dindori Khurd'],
            members: [
              { farmer_id: 'usr-1', farmer_name: 'You (Ramesh Patil)', village: 'Your Farm', phone_masked: '+91 98920 ••••', quantity_kg: quantityKg, distance_to_user_km: 0, lat: 20.0059, lng: 73.7898, is_current_user: true },
              { farmer_id: 'f-1', farmer_name: 'Dnyaneshwar Shinde', village: 'Pimpalgaon Baswant', phone_masked: '+91 98231 ••••', quantity_kg: 2400, distance_to_user_km: 5.2, lat: 20.05, lng: 73.82, is_current_user: false },
              { farmer_id: 'f-2', farmer_name: 'Suresh Gholap', village: 'Ozar Village', phone_masked: '+91 94222 ••••', quantity_kg: 1800, distance_to_user_km: 8.4, lat: 19.98, lng: 73.84, is_current_user: false },
              { farmer_id: 'f-3', farmer_name: 'Anandrao Kadam', village: 'Dindori Khurd', phone_masked: '+91 97654 ••••', quantity_kg: 1000, distance_to_user_km: 11.1, lat: 20.07, lng: 73.76, is_current_user: false },
            ]
          },
          {
            cluster_id: 'cluster-eicher-4t',
            cluster_name: 'Nashik Rapid Dispatch (Eicher 14ft 4.5T)',
            vehicle_type: 'Eicher Pro 14ft (4.5 Ton)',
            max_capacity_kg: 4500,
            pooled_quantity_kg: Math.min(quantityKg + 1500, 4500),
            capacity_utilized_pct: +((Math.min(quantityKg + 1500, 4500) / 4500) * 100).toFixed(1),
            total_farmers_count: 2,
            solo_trip_cost_per_farmer_rs: 2450.0,
            pooled_cost_per_farmer_rs: 1650.0,
            savings_per_farmer_rs: 800.0,
            savings_pct: 32.7,
            co2_saved_kg: 22.0,
            destination_name: 'Sahyadri CA Cold Storage Terminal',
            destination_type: 'COLD_STORAGE',
            departure_time_window: 'Tomorrow, 05:00 AM (Morning Slot)',
            pickup_route: ['Your Farm', 'Vani Road'],
            members: [
              { farmer_id: 'usr-1', farmer_name: 'You (Ramesh Patil)', village: 'Your Farm', phone_masked: '+91 98920 ••••', quantity_kg: quantityKg, distance_to_user_km: 0, lat: 20.0059, lng: 73.7898, is_current_user: true },
              { farmer_id: 'f-4', farmer_name: 'Balasaheb Jadhav', village: 'Vani Road', phone_masked: '+91 98908 ••••', quantity_kg: 1500, distance_to_user_km: 6.8, lat: 19.95, lng: 73.74, is_current_user: false },
            ]
          }
        ],
        recommended_cluster_id: 'cluster-ashok-9t',
        summary_message: {
          en: 'Found 2 shared transport clusters saving up to 45% on diesel.',
          hi: '2 साझा वाहन क्लस्टर उपलब्ध हैं, जिससे 45% तक डीजल भाड़ा बचेगा।',
          mr: '२ एकत्रित वाहतूक गट उपलब्ध, ज्यामुळे ४५% पर्यंत भाडे बचत होईल.',
          kn: '2 ಹಂಚಿಕೆಯ ಸಾರಿಗೆ ಕ್ಲಸ್ಟರ್‌ಗಳು ಲಭ್ಯವಿದ್ದು, 45% ವೆಚ್ಚ ಉಳಿತಾಯವಾಗಲಿದೆ.'
        }
      };
    }
  },

  async generateAdvisory(params: {
    cropId: string;
    regionId: string;
    farmerName: string;
    quantityKg: number;
    language: SupportedLanguage;
  }): Promise<AdvisoryResponse> {
    try {
      const res = await fetch(`${API_BASE}/advisory/generate-whatsapp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop_id: params.cropId,
          region_id: params.regionId,
          farmer_name: params.farmerName,
          quantity_kg: params.quantityKg,
          language: params.language,
        }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const isHi = params.language === 'hi';
      const isMr = params.language === 'mr';
      const isKn = params.language === 'kn';

      const raw = isHi
        ? `*कृषि दृष्टि (Agri-Drishti) - किसान सलाह*\n\nनमस्ते ${params.farmerName} जी 🙏\nफसल: टमाटर (${(params.quantityKg / 1000).toFixed(1)} टन)\n\n🚨 *चेतावनी:* अगले 4-6 दिनों में भारी आवक से मंडी भाव ₹22 से ₹10.5/किग्रा गिरने का अनुमान है।\n\n👉 *सलाह:* सह्याद्री कोल्ड स्टोरेज में रखें।\n💰 अनुमानित शुद्ध लाभ: ₹1,32,200\n📈 अतिरिक्त लाभ: +₹31,500\n🚚 साझा वाहन बचत: ₹1,100`
        : isMr
        ? `*कृषी दृष्टी (Agri-Drishti) - शेतकरी सल्ला*\n\nनमस्कार ${params.farmerName} जी 🙏\nपीक: टोमॅटो (${(params.quantityKg / 1000).toFixed(1)} टन)\n\n🚨 *इशारा:* पुढील ४-६ दिवसांत दर ₹२२ वरून ₹१०.५/किलो पर्यंत घसरण्याची शक्यता.\n\n👉 *शिफारस:* सह्याद्री कोल्ड स्टोरेजमध्ये साठवा.\n💰 निव्वळ नफा: ₹१,३२,२००\n📈 जास्तीचा फायदा: +₹३१,५००`
        : isKn
        ? `*ಕೃಷಿ ದೃಷ್ಟಿ (Agri-Drishti) - ರೈತರ ಸಲಹೆ*\n\nನಮಸ್ಕಾರ ${params.farmerName} ಅವರೇ 🙏\nಬೆಳೆ: ಟೊಮ್ಯಾಟೊ\n\n🚨 *ಎಚ್ಚರಿಕೆ:* ಬೆಲೆ ₹22 ರಿಂದ ₹10.5/ಕೆಜಿಗೆ ಕುಸಿಯಬಹುದು.\n👉 *ಶಿಫಾರಸು:* ಸಹ್ಯಾದ್ರಿ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್‌ಗೆ ಕಳುಹಿಸಿ.\n💰 ನಿವ್ವಳ ಲಾಭ: ₹1,32,200`
        : `*Agri-Drishti (कृषि दृष्टि) - Farmer Intelligence Advisory*\n\nHello ${params.farmerName} 🙏\nCrop: Tomato (${(params.quantityKg / 1000).toFixed(1)} MT)\n\n🚨 *Alert:* Prices forecasted to crash from ₹22 to ₹10.5/kg in 4-6 days.\n\n👉 *Recommendation:* Route to Sahyadri CA Cold Storage.\n💰 Estimated Net Profit: ₹1,32,200\n📈 Profit Uplift vs Mandi: +₹31,500\n🚚 Shared Logistics Savings: ₹1,100`;

      return {
        id: 'adv-mock-1',
        language: params.language,
        language_name: isHi ? 'हिंदी (Hindi)' : isMr ? 'मराठी (Marathi)' : isKn ? 'ಕನ್ನಡ (Kannada)' : 'English (EN)',
        farmer_name: params.farmerName,
        crop_name: 'Tomato',
        region_name: 'Nashik Horticultural Cluster',
        urgency_level: 'RED_ALERT',
        traffic_light: 'RED',
        headline: isHi ? '🚨 भारी आवक चेतावनी: भाव गिरने का अनुमान!' : '🚨 Harvest Glut Alert: Price crash forecasted!',
        whatsapp_message_raw: raw,
        whatsapp_message_formatted: raw.replace(/\n/g, '<br/>'),
        audio_script: `Hello ${params.farmerName}, welcome to Agri-Drishti. In your area, a harvest glut is predicted for Tomato. Please route your ${(params.quantityKg / 1000).toFixed(1)} metric tonnes to Sahyadri CA Cold Storage to secure maximum net profit.`,
        recommended_action: 'Sahyadri CA Cold Storage & Ripening Terminal',
        estimated_profit_rs: 132200,
        profit_gain_vs_mandi_rs: 31500,
        pooled_freight_applied: true,
        direct_share_link: `https://api.whatsapp.com/send?text=${encodeURIComponent(raw)}`,
        key_points: [
          'Mandi prices forecasted to drop from ₹22 to ₹10.5/kg.',
          'Cold storage arbitrage yields +₹31,500 net gain over distress selling.',
          'Shared transport logistics saves ₹1,100 in diesel freight.'
        ],
        generated_at: new Date().toISOString()
      };
    }
  }
};
