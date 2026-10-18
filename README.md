# Agri-Drishti (कृषि दृष्टि)
### Geospatial Supply Chain Optimization & Harvest Glut Prevention Engine

Agri-Drishti is a predictive and prescriptive platform designed for Indian smallholder farmers and FPOs (Farmer Producer Organizations) to prevent post-harvest distress sales during harvest gluts.

---

## 🚀 Key Modules & Capabilities

1. **🛰️ Early Harvest Glut Radar**
   - Correlates **ESA Copernicus Sentinel-2 MSI** satellite NDVI biomass anomaly telemetry with **Agmarknet Mandi** arrival spikes.
   - Calculates 0-100 Glut Risk Scores with dynamic traffic light alerts (RED / AMBER / GREEN).
   - Generates 30-day dual-axis time-series historical correlation charts.

2. **⚡ 3-Way Agri-Logistics Decision Engine**
   - Solves multi-objective optimization matrix comparing:
     - **Option A:** Direct APMC Mandi Distress Sale (High glut discount & spoilage risk).
     - **Option B:** Controlled Atmosphere Cold Storage Arbitrage (Break-even holding model).
     - **Option C:** Food Processing Unit Buyout (Guaranteed buyout contract with zero price risk).
   - Real-time Scenario Simulator for Harvest Size, Holding Days, Diesel Rates, and Future Recovery Markups.

3. **🚚 Geospatial Freight Pooling & Route Clustering**
   - Uses Haversine spherical distance routing to cluster nearby smallholder farmers (15–35 km radius).
   - Consolidates small lots into 1.5-Ton (Tata Ace), 4.5-Ton (Eicher Pro), or 9-Ton (Ashok Leyland) carriers.
   - Saves 35%–50% in transport diesel costs and calculates CO₂ carbon footprint reduction.

4. **📲 Multilingual WhatsApp & Voice Advisory Dispatcher**
   - Generates formatted WhatsApp advisories with emojis, actionable advice, and profit uplift metrics.
   - Built-in IVR Audio Voice Note simulation in **Hindi (हिंदी)**, **Marathi (मराठी)**, **Kannada (ಕನ್ನಡ)**, and **English (EN)**.
   - Direct 1-click WhatsApp share link (`https://api.whatsapp.com/send?text=...`).

---

## 🛠️ Project Structure

```
SIH/
├── backend/
│   ├── models.py             # Pydantic data schemas (Crops, Regions, Predictions, Optimization, Freight)
│   ├── db.py                 # Async Mongo connection + in-memory seed dataset fallback
│   ├── engine.py             # Unified ML Glut Engine, 3-Way Route Optimizer & Haversine Clustering
│   ├── seed.py               # Benchmark seed data for Indian hubs (Nashik, Kolar, Lasalgaon, Agra, Indore)
│   ├── server.py             # FastAPI REST Server & CORS routes
│   └── requirements.txt      # Python dependencies
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Header, crop & region selector, language switch, live ticker
│   │   ├── MarketSentimentCard.tsx # Glut risk meter, NDVI anomaly badge, price/arrival charts
│   │   ├── DecisionEngineCard.tsx # 3-way decision matrix with scenario sliders
│   │   ├── FreightPoolerCard.tsx  # Shared transport truck pooling & savings calculator
│   │   ├── SupplyChainMap.tsx     # High-performance interactive supply chain route visualizer
│   │   └── Modals.tsx             # WhatsApp dispatch simulation & Formula breakdown
│   ├── types.ts              # TypeScript interface definitions matching backend
│   ├── api.ts                # API client with auto-fallback to local mock data
│   ├── index.css             # Glassmorphic Tailwind styling
│   ├── App.tsx               # Main Dashboard application
│   └── main.tsx              # React entry point
├── package.json              # Frontend dependencies
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

---

## ⚡ How to Run

### 1. Backend (FastAPI)
```bash
pip install -r backend/requirements.txt
python backend/server.py
# Or with uvicorn:
uvicorn backend.server:app --reload --port 8000
```
API Documentation will be live at: `http://localhost:8000/docs`

### 2. Frontend (Vite + React)
```bash
npm install
npm run dev
```
Dashboard will be available at: `http://localhost:3000`
