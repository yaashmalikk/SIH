"""
Agri-Drishti (कृषि दृष्टि) - Seed Database
Comprehensive benchmark dataset covering prominent Indian agricultural hubs:
- Maharashtra (Nashik Tomato/Onion belt, Lasalgaon APMC, Sahyadri FPO)
- Karnataka (Kolar-Chikkaballapur mega market)
- Uttar Pradesh (Agra-Farrukhabad potato belt)
- Madhya Pradesh (Indore-Malwa soybean & wheat hub)
- Andhra Pradesh (Guntur chilli yard)
"""

CROPS_SEED = [
    {
        "id": "tomato",
        "name": "Tomato",
        "hindi_name": "टमाटर",
        "marathi_name": "टोमॅटो",
        "kannada_name": "ಟೊಮ್ಯಾಟೊ",
        "category": "Horticulture / Highly Perishable",
        "default_shelf_life_days": 4,
        "default_price_per_kg": 24.0,
        "default_spoilage_rate_fresh": 4.5,
        "default_spoilage_rate_cold": 0.05,
        "storage_cost_per_kg_day": 0.14,
        "processing_yield_pct": 0.94,
        "processing_contract_price_kg": 21.5,
        "icon_name": "Cherry"
    },
    {
        "id": "onion",
        "name": "Onion",
        "hindi_name": "प्याज",
        "marathi_name": "कांदा",
        "kannada_name": "ಈರುಳ್ಳಿ",
        "category": "Alliums / Semi-Perishable",
        "default_shelf_life_days": 21,
        "default_price_per_kg": 18.0,
        "default_spoilage_rate_fresh": 1.2,
        "default_spoilage_rate_cold": 0.02,
        "storage_cost_per_kg_day": 0.08,
        "processing_yield_pct": 0.90,
        "processing_contract_price_kg": 16.5,
        "icon_name": "Sparkles"
    },
    {
        "id": "potato",
        "name": "Potato",
        "hindi_name": "आलू",
        "marathi_name": "बटाटा",
        "kannada_name": "ಆಲೂಗಡ್ಡೆ",
        "category": "Tubers / Storable",
        "default_shelf_life_days": 45,
        "default_price_per_kg": 15.0,
        "default_spoilage_rate_fresh": 0.8,
        "default_spoilage_rate_cold": 0.015,
        "storage_cost_per_kg_day": 0.07,
        "processing_yield_pct": 0.96,
        "processing_contract_price_kg": 17.0,
        "icon_name": "Layers"
    },
    {
        "id": "green_chilli",
        "name": "Green Chilli",
        "hindi_name": "हरी मिर्च",
        "marathi_name": "हिरवी मिरची",
        "kannada_name": "ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ",
        "category": "Spices / Perishable",
        "default_shelf_life_days": 7,
        "default_price_per_kg": 42.0,
        "default_spoilage_rate_fresh": 3.0,
        "default_spoilage_rate_cold": 0.04,
        "storage_cost_per_kg_day": 0.20,
        "processing_yield_pct": 0.88,
        "processing_contract_price_kg": 39.0,
        "icon_name": "Flame"
    },
    {
        "id": "soybean",
        "name": "Soybean",
        "hindi_name": "सोयाबीन",
        "marathi_name": "सोयाबीन",
        "kannada_name": "ಸೋಯಾಬೀನ್",
        "category": "Oilseeds / Commercial",
        "default_shelf_life_days": 180,
        "default_price_per_kg": 46.0,
        "default_spoilage_rate_fresh": 0.2,
        "default_spoilage_rate_cold": 0.005,
        "storage_cost_per_kg_day": 0.05,
        "processing_yield_pct": 0.98,
        "processing_contract_price_kg": 47.5,
        "icon_name": "Package"
    },
    {
        "id": "wheat",
        "name": "Wheat",
        "hindi_name": "गेहूं",
        "marathi_name": "गहू",
        "kannada_name": "ಗೋಧಿ",
        "category": "Cereals / Grain",
        "default_shelf_life_days": 365,
        "default_price_per_kg": 23.5,
        "default_spoilage_rate_fresh": 0.1,
        "default_spoilage_rate_cold": 0.002,
        "storage_cost_per_kg_day": 0.03,
        "processing_yield_pct": 0.99,
        "processing_contract_price_kg": 25.0,
        "icon_name": "Wheat"
    }
]

REGIONS_SEED = [
    {
        "id": "nashik-tomato",
        "name": "Nashik Horticultural Cluster",
        "state": "Maharashtra",
        "district": "Nashik (Pimpalgaon-Niphad Belt)",
        "lat": 20.0059,
        "lng": 73.7898,
        "primary_crop_ids": ["tomato", "onion"],
        "fpo_name": "Sahyadri Farmers Producer Co-op Ltd.",
        "active_farmer_count": 1420,
        "total_planted_hectares": 12450.0,
        "destinations": [
            {
                "id": "nashik-mandi",
                "name": "Pimpalgaon Baswant APMC Mandi",
                "type": "MANDI",
                "state": "Maharashtra",
                "city": "Pimpalgaon Baswant",
                "lat": 20.1712,
                "lng": 73.9856,
                "base_price_or_rate": 22.0,
                "capacity_tonnes": 1200.0,
                "current_occupancy_pct": 92.0,
                "quality_acceptance": ["Grade A", "Grade B", "Grade C"],
                "distance_km": 28.0
            },
            {
                "id": "sahyadri-cold",
                "name": "Sahyadri CA Cold Storage & Ripening Terminal",
                "type": "COLD_STORAGE",
                "state": "Maharashtra",
                "city": "Mohadi, Dindori",
                "lat": 20.1980,
                "lng": 73.8340,
                "base_price_or_rate": 0.14,
                "capacity_tonnes": 4500.0,
                "current_occupancy_pct": 54.0,
                "quality_acceptance": ["Grade A", "Grade B"],
                "distance_km": 36.0
            },
            {
                "id": "nashik-pulping",
                "name": "Kisan Kraft Puree & Aseptic Tomato Pulping Unit",
                "type": "PROCESSING_PLANT",
                "state": "Maharashtra",
                "city": "Ambad MIDC Industrial Park",
                "lat": 19.9530,
                "lng": 73.7420,
                "base_price_or_rate": 21.0,
                "capacity_tonnes": 2800.0,
                "current_occupancy_pct": 40.0,
                "quality_acceptance": ["Grade A", "Grade B", "Grade C (Pulpable)"],
                "processing_type": "Tomato Puree, Paste & Aseptic Bags",
                "distance_km": 31.0
            }
        ]
    },
    {
        "id": "kolar-tomato",
        "name": "Kolar-Chikkaballapur Tomato Belt",
        "state": "Karnataka",
        "district": "Kolar & Srinivaspur",
        "lat": 13.1367,
        "lng": 78.1291,
        "primary_crop_ids": ["tomato", "green_chilli"],
        "fpo_name": "Kolar Gold Horticultural Farmers Federation",
        "active_farmer_count": 2150,
        "total_planted_hectares": 18200.0,
        "destinations": [
            {
                "id": "kolar-mandi",
                "name": "Kolar APMC Yard (Asia's 2nd Largest Tomato Market)",
                "type": "MANDI",
                "state": "Karnataka",
                "city": "Kolar Town",
                "lat": 13.1410,
                "lng": 78.1340,
                "base_price_or_rate": 25.0,
                "capacity_tonnes": 2500.0,
                "current_occupancy_pct": 96.0,
                "quality_acceptance": ["Grade A", "Grade B"],
                "distance_km": 16.0
            },
            {
                "id": "bengaluru-cold",
                "name": "Hosakote Integrated Agri-Logistics Cold Hub",
                "type": "COLD_STORAGE",
                "state": "Karnataka",
                "city": "Hosakote Expressway",
                "lat": 13.0720,
                "lng": 77.7980,
                "base_price_or_rate": 0.15,
                "capacity_tonnes": 6000.0,
                "current_occupancy_pct": 48.0,
                "quality_acceptance": ["Grade A", "Grade B"],
                "distance_km": 42.0
            },
            {
                "id": "kolar-foodpark",
                "name": "Dabur & Godrej Agrovet Food Processing Center",
                "type": "PROCESSING_PLANT",
                "state": "Karnataka",
                "city": "Narasapura Industrial Area",
                "lat": 13.1650,
                "lng": 77.9820,
                "base_price_or_rate": 23.0,
                "capacity_tonnes": 3200.0,
                "current_occupancy_pct": 42.0,
                "quality_acceptance": ["Grade A", "Grade B", "Pulpable"],
                "processing_type": "Ketchup, Canning & Dehydrated Flakes",
                "distance_km": 28.0
            }
        ]
    },
    {
        "id": "lasalgaon-onion",
        "name": "Lasalgaon Onion Capital Hub",
        "state": "Maharashtra",
        "district": "Nashik (Niphad, Yeola, Chandwad)",
        "lat": 20.1472,
        "lng": 74.2256,
        "primary_crop_ids": ["onion", "tomato"],
        "fpo_name": "Maharashtra State Onion Growers Cooperative",
        "active_farmer_count": 3100,
        "total_planted_hectares": 28400.0,
        "destinations": [
            {
                "id": "lasalgaon-mandi",
                "name": "Lasalgaon APMC (India's Largest Onion Market)",
                "type": "MANDI",
                "state": "Maharashtra",
                "city": "Lasalgaon",
                "lat": 20.1490,
                "lng": 74.2280,
                "base_price_or_rate": 19.5,
                "capacity_tonnes": 4500.0,
                "current_occupancy_pct": 89.0,
                "quality_acceptance": ["All Grades"],
                "distance_km": 12.0
            },
            {
                "id": "niphad-cold",
                "name": "Niphad Solar-Powered Ventilated Onion Chawl",
                "type": "COLD_STORAGE",
                "state": "Maharashtra",
                "city": "Niphad",
                "lat": 20.0880,
                "lng": 74.1120,
                "base_price_or_rate": 0.08,
                "capacity_tonnes": 12000.0,
                "current_occupancy_pct": 38.0,
                "quality_acceptance": ["Grade A", "Grade B"],
                "distance_km": 24.0
            },
            {
                "id": "jain-dehydration",
                "name": "Jain Farm Fresh Onion Dehydration Plant",
                "type": "PROCESSING_PLANT",
                "state": "Maharashtra",
                "city": "Jalgaon Road Food Park",
                "lat": 20.3540,
                "lng": 74.4560,
                "base_price_or_rate": 18.2,
                "capacity_tonnes": 5000.0,
                "current_occupancy_pct": 52.0,
                "quality_acceptance": ["White & Red Onions"],
                "processing_type": "Dehydrated Onion Flakes & Powder",
                "distance_km": 48.0
            }
        ]
    },
    {
        "id": "agra-potato",
        "name": "Agra-Farrukhabad Potato Belt",
        "state": "Uttar Pradesh",
        "district": "Agra & Hathras",
        "lat": 27.1767,
        "lng": 78.0081,
        "primary_crop_ids": ["potato", "wheat"],
        "fpo_name": "Braj Agri Producer Company Ltd.",
        "active_farmer_count": 2890,
        "total_planted_hectares": 34100.0,
        "destinations": [
            {
                "id": "agra-mandi",
                "name": "Khandari Agra APMC Mandi",
                "type": "MANDI",
                "state": "Uttar Pradesh",
                "city": "Agra",
                "lat": 27.2010,
                "lng": 78.0120,
                "base_price_or_rate": 14.5,
                "capacity_tonnes": 3800.0,
                "current_occupancy_pct": 94.0,
                "quality_acceptance": ["All Grades"],
                "distance_km": 22.0
            },
            {
                "id": "agra-mega-cold",
                "name": "Yamuna Expressway Agri Mega Cold Hub",
                "type": "COLD_STORAGE",
                "state": "Uttar Pradesh",
                "city": "Hathras Highway",
                "lat": 27.3100,
                "lng": 78.0850,
                "base_price_or_rate": 0.07,
                "capacity_tonnes": 25000.0,
                "current_occupancy_pct": 45.0,
                "quality_acceptance": ["Grade A", "Grade B", "Sugar-Free Tuber"],
                "distance_km": 38.0
            },
            {
                "id": "pepsico-chips",
                "name": "PepsiCo / Lay's Potato Processing Plant",
                "type": "PROCESSING_PLANT",
                "state": "Uttar Pradesh",
                "city": "Kosi Kalan Industrial Area",
                "lat": 27.7850,
                "lng": 77.4420,
                "base_price_or_rate": 17.5,
                "capacity_tonnes": 8000.0,
                "current_occupancy_pct": 60.0,
                "quality_acceptance": ["Atlantic & Chipsona Varieties"],
                "processing_type": "Crisps, French Fries & Starch",
                "distance_km": 68.0
            }
        ]
    },
    {
        "id": "indore-soybean",
        "name": "Malwa Plateau Soybean Hub",
        "state": "Madhya Pradesh",
        "district": "Indore & Ujjain",
        "lat": 22.7196,
        "lng": 75.8577,
        "primary_crop_ids": ["soybean", "wheat"],
        "fpo_name": "Malwa Nimar Kisan Producer Union",
        "active_farmer_count": 2400,
        "total_planted_hectares": 22000.0,
        "destinations": [
            {
                "id": "indore-mandi",
                "name": "Choithram Indore Mandi",
                "type": "MANDI",
                "state": "Madhya Pradesh",
                "city": "Indore",
                "lat": 22.6850,
                "lng": 75.8340,
                "base_price_or_rate": 45.0,
                "capacity_tonnes": 3000.0,
                "current_occupancy_pct": 82.0,
                "quality_acceptance": ["All Grades"],
                "distance_km": 18.0
            },
            {
                "id": "indore-silo",
                "name": "Adani Agri Silos & Grain Storage Hub",
                "type": "COLD_STORAGE",
                "state": "Madhya Pradesh",
                "city": "Dewas Road",
                "lat": 22.8200,
                "lng": 75.9500,
                "base_price_or_rate": 0.05,
                "capacity_tonnes": 20000.0,
                "current_occupancy_pct": 40.0,
                "quality_acceptance": ["Grade A", "Grade B"],
                "distance_km": 30.0
            },
            {
                "id": "indore-oil",
                "name": "Ruchi Soya / Patanjali Solvent Extraction Plant",
                "type": "PROCESSING_PLANT",
                "state": "Madhya Pradesh",
                "city": "Pithampur SEZ",
                "lat": 22.6100,
                "lng": 75.6800,
                "base_price_or_rate": 48.0,
                "capacity_tonnes": 6500.0,
                "current_occupancy_pct": 50.0,
                "quality_acceptance": ["Grade A", "High Oil Content"],
                "processing_type": "Refined Oil & Soya Chunks (DOC)",
                "distance_km": 35.0
            }
        ]
    }
]

# Baseline indicators for each Crop & Region pair
CROP_REGION_BASELINES = {
    ("tomato", "nashik-tomato"): {
        "current_ndvi": 0.78,
        "baseline_ndvi": 0.54,
        "current_arrivals": 1850.0,
        "baseline_arrivals": 920.0,
        "current_price": 22.0,
        "satellite_tile": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80"
    },
    ("tomato", "kolar-tomato"): {
        "current_ndvi": 0.74,
        "baseline_ndvi": 0.58,
        "current_arrivals": 2400.0,
        "baseline_arrivals": 1400.0,
        "current_price": 25.0,
        "satellite_tile": "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=600&q=80"
    },
    ("onion", "lasalgaon-onion"): {
        "current_ndvi": 0.62,
        "baseline_ndvi": 0.48,
        "current_arrivals": 4200.0,
        "baseline_arrivals": 2100.0,
        "current_price": 19.5,
        "satellite_tile": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80"
    },
    ("potato", "agra-potato"): {
        "current_ndvi": 0.71,
        "baseline_ndvi": 0.52,
        "current_arrivals": 3800.0,
        "baseline_arrivals": 2300.0,
        "current_price": 14.5,
        "satellite_tile": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
    },
    ("green_chilli", "kolar-tomato"): {
        "current_ndvi": 0.69,
        "baseline_ndvi": 0.50,
        "current_arrivals": 850.0,
        "baseline_arrivals": 450.0,
        "current_price": 42.0,
        "satellite_tile": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80"
    },
    ("soybean", "indore-soybean"): {
        "current_ndvi": 0.65,
        "baseline_ndvi": 0.56,
        "current_arrivals": 2900.0,
        "baseline_arrivals": 2500.0,
        "current_price": 46.0,
        "satellite_tile": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
    }
}
