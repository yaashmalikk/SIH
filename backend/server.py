"""
Agri-Drishti (कृषि दृष्टि) - Main FastAPI Server
Unified REST API for Geospatial Supply Chain Optimization & Harvest Glut Prevention.
"""

import os
import sys
import logging
from pathlib import Path

# Add project root to sys.path so 'backend' package imports work cleanly
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from contextlib import asynccontextmanager
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid

from fastapi import FastAPI, APIRouter, HTTPException, Query
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.db import db, ensure_indexes
from backend.models import (
    Crop,
    RegionHub,
    DestinationNode,
    GlutPredictionRequest,
    GlutPredictionResponse,
    RouteOptimizationRequest,
    RouteOptimizationResponse,
    FreightPoolRequest,
    FreightPoolResponse,
    AdvisoryRequest,
    AdvisoryResponse,
    MarketTickerItem,
    MultilingualText,
)
from backend.engine import (
    predict_price_crash,
    run_3way_decision_optimization,
    cluster_farmers_for_freight_pooling,
    generate_multilingual_whatsapp_advisory,
)
from backend.seed import CROP_REGION_BASELINES

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("agri_drishti.server")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ensure_indexes()
    yield
    await db.close()


app = FastAPI(
    title="Agri-Drishti API (कृषि दृष्टि)",
    description="Geospatial Supply Chain Optimization & Harvest Glut Prevention Engine",
    version="2.0.0",
    lifespan=lifespan
)

api = APIRouter(prefix="/api")


# --- Base Health & Info ---
@api.get("/")
async def root():
    return {
        "app": "Agri-Drishti (कृषि दृष्टि)",
        "status": "online",
        "version": "2.0.0",
        "description": "Geospatial Supply Chain Optimization & Glut Intelligence Engine",
        "satellite_source": "Copernicus Sentinel-2 (ESA) Level-2A",
        "market_stream": "Agmarknet Ministry of Agriculture & Farmers Welfare"
    }


# --- Crops & Regions ---
@api.get("/crops", response_model=List[Crop])
async def list_crops():
    docs = await db.crops.find()
    res = await docs.to_list(100)
    return [Crop(**d) for d in res]


@api.get("/crops/{crop_id}", response_model=Crop)
async def get_crop(crop_id: str):
    doc = await db.crops.find_one({"id": crop_id})
    if not doc:
        raise HTTPException(status_code=404, detail=f"Crop '{crop_id}' not found")
    return Crop(**doc)


@api.get("/regions", response_model=List[RegionHub])
async def list_regions():
    docs = await db.regions.find()
    res = await docs.to_list(100)
    return [RegionHub(**d) for d in res]


@api.get("/regions/{region_id}", response_model=RegionHub)
async def get_region(region_id: str):
    doc = await db.regions.find_one({"id": region_id})
    if not doc:
        raise HTTPException(status_code=404, detail=f"Region '{region_id}' not found")
    return RegionHub(**doc)


# --- Live Market Ticker ---
@api.get("/ticker", response_model=List[MarketTickerItem])
async def get_market_ticker():
    return [
        MarketTickerItem(crop_id="tomato", crop_name="Tomato (Pimpalgaon)", current_price=22.0, price_change_pct=-18.4, status="CRASH_RISK"),
        MarketTickerItem(crop_id="onion", crop_name="Onion (Lasalgaon)", current_price=19.5, price_change_pct=-4.2, status="STABLE"),
        MarketTickerItem(crop_id="potato", crop_name="Potato (Agra Mandi)", current_price=14.5, price_change_pct=-2.1, status="MODERATE"),
        MarketTickerItem(crop_id="green_chilli", crop_name="Green Chilli (Guntur)", current_price=42.0, price_change_pct=+6.5, status="HEALTHY"),
        MarketTickerItem(crop_id="soybean", crop_name="Soybean (Choithram Indore)", current_price=46.0, price_change_pct=+1.8, status="STABLE")
    ]


# --- 1. Glut Prediction Endpoint ---
@api.post("/predictions/glut-forecast", response_model=GlutPredictionResponse)
async def get_glut_forecast(payload: GlutPredictionRequest):
    crop_doc = await db.crops.find_one({"id": payload.crop_id}) or await db.crops.find_one({"id": "tomato"})
    region_doc = await db.regions.find_one({"id": payload.region_id}) or await db.regions.find_one({"id": "nashik-tomato"})
    
    crop_id = crop_doc["id"]
    region_id = region_doc["id"]
    
    baseline = CROP_REGION_BASELINES.get(
        (crop_id, region_id),
        {
            "current_ndvi": 0.76,
            "baseline_ndvi": 0.55,
            "current_arrivals": 2000.0,
            "baseline_arrivals": 1000.0,
            "current_price": crop_doc.get("default_price_per_kg", 22.0),
            "satellite_tile": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80"
        }
    )

    perishability = 0.95 if crop_id in ["tomato", "green_chilli"] else (0.60 if crop_id == "onion" else 0.40)
    
    res = predict_price_crash(
        crop_name=crop_doc["name"],
        current_ndvi=baseline["current_ndvi"],
        baseline_ndvi=baseline["baseline_ndvi"],
        current_mandi_price=baseline["current_price"],
        current_arrival_tonnes=baseline["current_arrivals"],
        baseline_arrival_tonnes=baseline["baseline_arrivals"],
        perishability_factor=perishability
    )

    response_obj = GlutPredictionResponse(
        crop_id=crop_id,
        crop_name=crop_doc["name"],
        region_id=region_id,
        region_name=region_doc["name"],
        state=region_doc["state"],
        risk_score=res["risk_score"],
        traffic_light=res["traffic_light"],
        alert_headline=MultilingualText(**res["alert_headline"]),
        alert_summary=MultilingualText(**res["alert_summary"]),
        expected_crash_window_days=res["expected_crash_window_days"],
        projected_price_crash_pct=res["projected_price_crash_pct"],
        current_mandi_price_rs_kg=baseline["current_price"],
        projected_crash_price_rs_kg=res["projected_crash_price_rs_kg"],
        ndvi_current=baseline["current_ndvi"],
        ndvi_5yr_avg=baseline["baseline_ndvi"],
        ndvi_surge_pct=res["ndvi_surge_pct"],
        arrival_anomaly_pct=res["arrival_anomaly_pct"],
        satellite_tile_url=baseline["satellite_tile"],
        historical_series=res["historical_series"],
        model_metrics=res["model_metrics"]
    )

    await db.predictions.insert_one(response_obj.model_dump())
    return response_obj


# --- 2. 3-Way Route Optimization Endpoint ---
@api.post("/optimization/solve-routes", response_model=RouteOptimizationResponse)
async def solve_route_optimization(payload: RouteOptimizationRequest):
    crop_doc = await db.crops.find_one({"id": payload.crop_id}) or await db.crops.find_one({"id": "tomato"})
    region_doc = await db.regions.find_one({"id": payload.region_id}) or await db.regions.find_one({"id": "nashik-tomato"})
    
    baseline = CROP_REGION_BASELINES.get(
        (crop_doc["id"], region_doc["id"]),
        {"current_price": crop_doc.get("default_price_per_kg", 22.0)}
    )

    opt_result = run_3way_decision_optimization(
        crop_name=crop_doc["name"],
        harvest_quantity_kg=payload.harvest_quantity_kg,
        current_mandi_price_rs_kg=baseline.get("current_price", crop_doc["default_price_per_kg"]),
        destinations=region_doc.get("destinations", []),
        diesel_price_per_litre=payload.diesel_price_per_litre,
        truck_fuel_efficiency_km_per_l=payload.truck_fuel_efficiency_km_per_l,
        holding_duration_days=payload.holding_duration_days,
        quality_grade=payload.quality_grade,
        expected_future_price_markup_pct=payload.expected_future_price_markup_pct,
        fresh_spoilage_rate_pct=crop_doc.get("default_spoilage_rate_fresh", 4.0),
        cold_spoilage_rate_daily_pct=crop_doc.get("default_spoilage_rate_cold", 0.05),
        storage_cost_per_kg_day=crop_doc.get("storage_cost_per_kg_day", 0.14),
        processing_yield_pct=crop_doc.get("processing_yield_pct", 0.94),
        processing_contract_price_kg=crop_doc.get("processing_contract_price_kg", 21.0)
    )

    response_obj = RouteOptimizationResponse(
        crop_id=crop_doc["id"],
        crop_name=crop_doc["name"],
        region_name=region_doc["name"],
        harvest_quantity_kg=payload.harvest_quantity_kg,
        optimal_choice=opt_result["optimal_choice"],
        optimal_title=opt_result["optimal_title"],
        max_net_profit_rs=opt_result["max_net_profit_rs"],
        baseline_mandi_profit_rs=opt_result["baseline_mandi_profit_rs"],
        profit_lift_rs=opt_result["profit_lift_rs"],
        profit_lift_pct=opt_result["profit_lift_pct"],
        math_breakdown=opt_result["math_breakdown"],
        options=opt_result["options"],
        origin_geo={"lat": region_doc.get("lat", 20.0), "lng": region_doc.get("lng", 74.0)}
    )

    await db.optimization_runs.insert_one(response_obj.model_dump())
    return response_obj


# --- 3. Freight Pooling Endpoint ---
@api.post("/logistics/freight-pool", response_model=FreightPoolResponse)
async def get_freight_pool(payload: FreightPoolRequest):
    crop_doc = await db.crops.find_one({"id": payload.crop_id}) or await db.crops.find_one({"id": "tomato"})
    region_doc = await db.regions.find_one({"id": payload.region_id}) or await db.regions.find_one({"id": "nashik-tomato"})
    
    user_lat = payload.user_lat if payload.user_lat is not None else region_doc.get("lat", 20.0059)
    user_lng = payload.user_lng if payload.user_lng is not None else region_doc.get("lng", 73.7898)
    
    destinations = region_doc.get("destinations", [])
    primary_dest = destinations[1] if len(destinations) > 1 else (destinations[0] if destinations else {})
    dest_name = primary_dest.get("name", f"{region_doc['name']} Agri Cold Hub")
    dest_type = primary_dest.get("type", "COLD_STORAGE")
    dest_lat = primary_dest.get("lat", user_lat + 0.12)
    dest_lng = primary_dest.get("lng", user_lng + 0.08)

    clusters_raw = cluster_farmers_for_freight_pooling(
        user_farmer_name=payload.user_farmer_name or "Ramesh Patil",
        user_quantity_kg=payload.user_quantity_kg,
        user_lat=user_lat,
        user_lng=user_lng,
        crop_name=crop_doc["name"],
        region_name=region_doc["name"],
        destination_name=dest_name,
        destination_type=dest_type,
        destination_lat=dest_lat,
        destination_lng=dest_lng
    )

    summary_msg = {
        "en": f"Found {len(clusters_raw)} shared vehicle clusters nearby saving up to 45% in transport diesel costs.",
        "hi": f"आपके पास {len(clusters_raw)} साझा वाहन क्लस्टर उपलब्ध हैं, जिससे 45% तक भाड़ा बचेगा।",
        "mr": f"जवळपास {len(clusters_raw)} एकत्रित वाहतूक गट उपलब्ध आहेत, ज्यातून ४५% पर्यंत भाडे बचत होईल.",
        "kn": f"{len(clusters_raw)} ಹಂಚಿಕೆಯ ಸಾರಿಗೆ ಕ್ಲಸ್ಟರ್‌ಗಳು ಲಭ್ಯವಿದ್ದು, 45% ವರೆಗೆ ಸಾರಿಗೆ ವೆಚ್ಚ ಉಳಿತಾಯವಾಗಲಿದೆ."
    }

    return FreightPoolResponse(
        region_id=region_doc["id"],
        region_name=region_doc["name"],
        crop_id=crop_doc["id"],
        crop_name=crop_doc["name"],
        active_clusters=clusters_raw,
        recommended_cluster_id=clusters_raw[0]["cluster_id"],
        summary_message=MultilingualText(**summary_msg)
    )


# --- 4. Farmer Advisory & WhatsApp Dispatcher ---
@api.post("/advisory/generate-whatsapp", response_model=AdvisoryResponse)
async def generate_whatsapp_advisory(payload: AdvisoryRequest):
    crop_doc = await db.crops.find_one({"id": payload.crop_id}) or await db.crops.find_one({"id": "tomato"})
    region_doc = await db.regions.find_one({"id": payload.region_id}) or await db.regions.find_one({"id": "nashik-tomato"})
    
    baseline = CROP_REGION_BASELINES.get(
        (crop_doc["id"], region_doc["id"]),
        {"current_price": crop_doc.get("default_price_per_kg", 22.0)}
    )

    destinations = region_doc.get("destinations", [])
    rec_dest = destinations[1]["name"] if len(destinations) > 1 else (destinations[0]["name"] if destinations else "Sahyadri Cold Chain")
    
    adv_dict = generate_multilingual_whatsapp_advisory(
        farmer_name=payload.farmer_name,
        crop_name=crop_doc["name"],
        region_name=region_doc["name"],
        quantity_kg=payload.quantity_kg,
        strategy=payload.selected_strategy or "AUTO_OPTIMAL",
        traffic_light="RED" if crop_doc["id"] in ["tomato", "green_chilli"] else "AMBER",
        risk_score=78 if crop_doc["id"] in ["tomato", "green_chilli"] else 54,
        current_mandi_price=baseline.get("current_price", 22.0),
        projected_crash_price=round(baseline.get("current_price", 22.0) * 0.45, 1),
        recommended_destination_name=rec_dest,
        estimated_net_profit=round(payload.quantity_kg * 26.5 - 2800.0, 2),
        profit_lift_rs=round(payload.quantity_kg * 8.5, 2),
        pooled_freight_savings_rs=1450.0,
        language=payload.language
    )

    resp = AdvisoryResponse(**adv_dict)
    await db.advisories.insert_one(resp.model_dump())
    return resp


# --- Status Checks for Health Probes ---
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

@api.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find()
    res = await docs.to_list(50)
    return [StatusCheck(**d) for d in res]


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server:app", host="0.0.0.0", port=8000, reload=True)
