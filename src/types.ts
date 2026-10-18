export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'kn';

export interface MultilingualText {
  en: string;
  hi: string;
  mr: string;
  kn: string;
}

export interface DestinationNode {
  id: string;
  name: string;
  type: 'MANDI' | 'COLD_STORAGE' | 'PROCESSING_PLANT';
  state: string;
  city: string;
  lat: float;
  lng: float;
  base_price_or_rate: number;
  capacity_tonnes: number;
  current_occupancy_pct: number;
  quality_acceptance: string[];
  processing_type?: string;
  distance_km: number;
}

type float = number;

export interface Crop {
  id: string;
  name: string;
  hindi_name: string;
  marathi_name: string;
  kannada_name: string;
  category: string;
  default_shelf_life_days: number;
  default_price_per_kg: number;
  default_spoilage_rate_fresh: number;
  default_spoilage_rate_cold: number;
  storage_cost_per_kg_day: number;
  processing_yield_pct: number;
  processing_contract_price_kg: number;
  icon_name: string;
}

export interface RegionHub {
  id: string;
  name: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  primary_crop_ids: string[];
  fpo_name: string;
  active_farmer_count: number;
  total_planted_hectares: number;
  destinations: DestinationNode[];
}

export interface HistoricalPoint {
  date: string;
  ndvi: number;
  arrivals_tonnes: number;
  price_rs_kg: number;
  crash_probability: number;
  anomaly_flag: boolean;
}

export interface GlutPredictionResponse {
  id: string;
  crop_id: string;
  crop_name: string;
  region_id: string;
  region_name: string;
  state: string;
  risk_score: number;
  traffic_light: 'RED' | 'AMBER' | 'GREEN';
  alert_headline: MultilingualText;
  alert_summary: MultilingualText;
  expected_crash_window_days: number;
  projected_price_crash_pct: number;
  current_mandi_price_rs_kg: number;
  projected_crash_price_rs_kg: number;
  ndvi_current: number;
  ndvi_5yr_avg: number;
  ndvi_surge_pct: number;
  arrival_anomaly_pct: number;
  satellite_tile_url: string;
  historical_series: HistoricalPoint[];
  model_metrics?: Record<string, any>;
  generated_at: string;
}

export interface DecisionOption {
  option_type: 'MANDI' | 'COLD_STORAGE' | 'PROCESSING_PLANT';
  title: string;
  location_name: string;
  city: string;
  distance_km: number;
  destination_lat: number;
  destination_lng: number;
  gross_revenue_rs: number;
  transit_fuel_cost_rs: number;
  spoilage_loss_rs: number;
  storage_fee_rs: number;
  handling_and_commission_rs: number;
  net_profit_rs: number;
  net_realization_per_kg: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  execution_time_hours: number;
  is_recommended: boolean;
  recommendation_reason: MultilingualText;
  per_kg_breakdown: {
    gross_price: number;
    fuel_cost: number;
    spoilage_loss: number;
    storage_fee: number;
    handling_fee: number;
    net_realization: number;
  };
}

export interface MathFormulaBreakdown {
  title: string;
  opportunity_cost_formula: string;
  fresh_mandi_formula: string;
  cold_storage_formula: string;
  processing_formula: string;
  opportunity_gain_rs: number;
  break_even_future_price_rs_kg: number;
  break_even_holding_days: number;
  step_by_step_explanation: string[];
}

export interface RouteOptimizationResponse {
  id: string;
  crop_id: string;
  crop_name: string;
  region_name: string;
  harvest_quantity_kg: number;
  optimal_choice: 'MANDI' | 'COLD_STORAGE' | 'PROCESSING_PLANT';
  optimal_title: string;
  max_net_profit_rs: number;
  baseline_mandi_profit_rs: number;
  profit_lift_rs: number;
  profit_lift_pct: number;
  math_breakdown: MathFormulaBreakdown;
  options: DecisionOption[];
  origin_geo: { lat: number; lng: number };
  generated_at: string;
}

export interface FarmerClusterMember {
  farmer_id: string;
  farmer_name: string;
  village: string;
  phone_masked: string;
  quantity_kg: number;
  distance_to_user_km: number;
  lat: number;
  lng: number;
  is_current_user: boolean;
}

export interface FreightPoolCluster {
  cluster_id: string;
  cluster_name: string;
  vehicle_type: string;
  max_capacity_kg: number;
  pooled_quantity_kg: number;
  capacity_utilized_pct: number;
  total_farmers_count: number;
  solo_trip_cost_per_farmer_rs: number;
  pooled_cost_per_farmer_rs: number;
  savings_per_farmer_rs: number;
  savings_pct: number;
  co2_saved_kg: number;
  destination_name: string;
  destination_type: string;
  departure_time_window: string;
  pickup_route: string[];
  members: FarmerClusterMember[];
}

export interface FreightPoolResponse {
  region_id: string;
  region_name: string;
  crop_id: string;
  crop_name: string;
  active_clusters: FreightPoolCluster[];
  recommended_cluster_id: string;
  summary_message: MultilingualText;
}

export interface AdvisoryResponse {
  id: string;
  language: string;
  language_name: string;
  farmer_name: string;
  crop_name: string;
  region_name: string;
  urgency_level: string;
  traffic_light: 'RED' | 'AMBER' | 'GREEN';
  headline: string;
  whatsapp_message_raw: string;
  whatsapp_message_formatted: string;
  audio_script: string;
  recommended_action: string;
  estimated_profit_rs: number;
  profit_gain_vs_mandi_rs: number;
  pooled_freight_applied: boolean;
  direct_share_link: string;
  key_points: string[];
  generated_at: string;
}

export interface MarketTickerItem {
  crop_id: string;
  crop_name: string;
  current_price: number;
  price_change_pct: number;
  status: string;
}
