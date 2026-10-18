"""
Agri-Drishti (कृषि दृष्टि) - Data Models
Pydantic schemas for Crops, Regions, Glut Predictions, Route Optimization, Freight Pooling, and Farmer Advisories.
"""

from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from pydantic import BaseModel, Field


class MultilingualText(BaseModel):
    en: str
    hi: str
    mr: str
    kn: str


class DestinationNode(BaseModel):
    id: str
    name: str
    type: str  # MANDI | COLD_STORAGE | PROCESSING_PLANT
    state: str
    city: str
    lat: float
    lng: float
    base_price_or_rate: float  # ₹/kg Mandi price | ₹/kg/day Storage | ₹/kg Processing buyout
    capacity_tonnes: float
    current_occupancy_pct: float
    quality_acceptance: List[str] = Field(default_factory=lambda: ["Grade A", "Grade B"])
    processing_type: Optional[str] = None
    distance_km: float = 25.0


class Crop(BaseModel):
    id: str
    name: str
    hindi_name: str
    marathi_name: str
    kannada_name: str
    category: str
    default_shelf_life_days: int
    default_price_per_kg: float
    default_spoilage_rate_fresh: float  # Daily decay % in transit/ambient
    default_spoilage_rate_cold: float   # Daily decay % in cold storage
    storage_cost_per_kg_day: float     # in ₹
    processing_yield_pct: float         # 0.90 to 0.98
    processing_contract_price_kg: float # in ₹
    icon_name: str = "Sprout"


class RegionHub(BaseModel):
    id: str
    name: str
    state: str
    district: str
    lat: float
    lng: float
    primary_crop_ids: List[str]
    fpo_name: str
    active_farmer_count: int
    total_planted_hectares: float
    destinations: List[DestinationNode]


class HistoricalPoint(BaseModel):
    date: str
    ndvi: float
    arrivals_tonnes: float
    price_rs_kg: float
    crash_probability: float
    anomaly_flag: bool = False


class GlutPredictionRequest(BaseModel):
    crop_id: str
    region_id: str
    harvest_quantity_kg: Optional[float] = 5000.0
    forecast_days_ahead: Optional[int] = 14


class GlutPredictionResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    crop_id: str
    crop_name: str
    region_id: str
    region_name: str
    state: str
    risk_score: int  # 0 to 100
    traffic_light: str  # RED | AMBER | GREEN
    alert_headline: MultilingualText
    alert_summary: MultilingualText
    expected_crash_window_days: int
    projected_price_crash_pct: float
    current_mandi_price_rs_kg: float
    projected_crash_price_rs_kg: float
    ndvi_current: float
    ndvi_5yr_avg: float
    ndvi_surge_pct: float
    arrival_anomaly_pct: float
    satellite_tile_url: str
    historical_series: List[HistoricalPoint]
    model_metrics: Dict[str, Any] = Field(default_factory=dict)
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class DecisionOption(BaseModel):
    option_type: str  # MANDI | COLD_STORAGE | PROCESSING_PLANT
    title: str
    location_name: str
    city: str
    distance_km: float
    destination_lat: float
    destination_lng: float
    gross_revenue_rs: float
    transit_fuel_cost_rs: float
    spoilage_loss_rs: float
    storage_fee_rs: float
    handling_and_commission_rs: float
    net_profit_rs: float
    net_realization_per_kg: float
    risk_level: str  # LOW | MEDIUM | HIGH
    execution_time_hours: float
    is_recommended: bool
    recommendation_reason: MultilingualText
    per_kg_breakdown: Dict[str, float]


class MathFormulaBreakdown(BaseModel):
    title: str
    opportunity_cost_formula: str
    fresh_mandi_formula: str
    cold_storage_formula: str
    processing_formula: str
    opportunity_gain_rs: float
    break_even_future_price_rs_kg: float
    break_even_holding_days: int
    step_by_step_explanation: List[str]


class RouteOptimizationRequest(BaseModel):
    crop_id: str
    region_id: str
    harvest_quantity_kg: float = 5000.0
    diesel_price_per_litre: float = 92.0
    truck_fuel_efficiency_km_per_l: float = 3.8
    holding_duration_days: int = 30
    quality_grade: str = "A"  # A, B, C
    expected_future_price_markup_pct: float = 45.0


class RouteOptimizationResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    crop_id: str
    crop_name: str
    region_name: str
    harvest_quantity_kg: float
    optimal_choice: str  # MANDI | COLD_STORAGE | PROCESSING_PLANT
    optimal_title: str
    max_net_profit_rs: float
    baseline_mandi_profit_rs: float
    profit_lift_rs: float
    profit_lift_pct: float
    math_breakdown: MathFormulaBreakdown
    options: List[DecisionOption]
    origin_geo: Dict[str, float]
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class FarmerClusterMember(BaseModel):
    farmer_id: str
    farmer_name: str
    village: str
    phone_masked: str
    quantity_kg: float
    distance_to_user_km: float
    lat: float
    lng: float
    is_current_user: bool = False


class FreightPoolCluster(BaseModel):
    cluster_id: str
    cluster_name: str
    vehicle_type: str
    max_capacity_kg: float
    pooled_quantity_kg: float
    capacity_utilized_pct: float
    total_farmers_count: int
    solo_trip_cost_per_farmer_rs: float
    pooled_cost_per_farmer_rs: float
    savings_per_farmer_rs: float
    savings_pct: float
    co2_saved_kg: float
    destination_name: str
    destination_type: str
    departure_time_window: str
    pickup_route: List[str]
    members: List[FarmerClusterMember]


class FreightPoolRequest(BaseModel):
    crop_id: str
    region_id: str
    user_farmer_name: Optional[str] = "Ramesh Patil"
    user_quantity_kg: float = 3500.0
    user_lat: Optional[float] = None
    user_lng: Optional[float] = None
    max_search_radius_km: float = 30.0


class FreightPoolResponse(BaseModel):
    region_id: str
    region_name: str
    crop_id: str
    crop_name: str
    active_clusters: List[FreightPoolCluster]
    recommended_cluster_id: str
    summary_message: MultilingualText


class AdvisoryRequest(BaseModel):
    crop_id: str
    region_id: str
    farmer_name: str = "Ramesh Patil"
    quantity_kg: float = 5000.0
    language: str = "hi"  # hi | mr | kn | en
    selected_strategy: Optional[str] = "AUTO_OPTIMAL"
    cluster_id: Optional[str] = None


class AdvisoryResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    language: str
    language_name: str
    farmer_name: str
    crop_name: str
    region_name: str
    urgency_level: str  # RED_ALERT | CAUTION | OPPORTUNITY
    traffic_light: str
    headline: str
    whatsapp_message_raw: str
    whatsapp_message_formatted: str
    audio_script: str
    recommended_action: str
    estimated_profit_rs: float
    profit_gain_vs_mandi_rs: float
    pooled_freight_applied: bool
    direct_share_link: str
    key_points: List[str]
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class MarketTickerItem(BaseModel):
    crop_id: str
    crop_name: str
    current_price: float
    price_change_pct: float
    status: str
