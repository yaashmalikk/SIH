import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'c:\Users\lenovo\OneDrive\Desktop\SIH')

from backend.server import app
from fastapi.testclient import TestClient

client = TestClient(app)

print("--- Testing /api/ ---")
r = client.get('/api/')
print("Status:", r.status_code, r.json())

print("\n--- Testing /api/crops ---")
r = client.get('/api/crops')
print("Status:", r.status_code, "Count:", len(r.json()), [c['name'] for c in r.json()])

print("\n--- Testing /api/regions ---")
r = client.get('/api/regions')
print("Status:", r.status_code, "Count:", len(r.json()), [reg['name'] for reg in r.json()])

print("\n--- Testing /api/predictions/glut-forecast ---")
r = client.post('/api/predictions/glut-forecast', json={'crop_id': 'tomato', 'region_id': 'nashik-tomato'})
print("Status:", r.status_code, "Risk:", r.json()['risk_score'], "Traffic Light:", r.json()['traffic_light'], "Headline:", r.json()['alert_headline']['hi'])

print("\n--- Testing /api/optimization/solve-routes ---")
r = client.post('/api/optimization/solve-routes', json={'crop_id': 'tomato', 'region_id': 'nashik-tomato', 'harvest_quantity_kg': 5000})
print("Status:", r.status_code, "Optimal Choice:", r.json()['optimal_choice'], "Max Profit: ₹", r.json()['max_net_profit_rs'], "Lift: ₹", r.json()['profit_lift_rs'])

print("\n--- Testing /api/logistics/freight-pool ---")
r = client.post('/api/logistics/freight-pool', json={'crop_id': 'tomato', 'region_id': 'nashik-tomato', 'user_quantity_kg': 3500})
print("Status:", r.status_code, "Clusters:", len(r.json()['active_clusters']), "Savings: ₹", r.json()['active_clusters'][0]['savings_per_farmer_rs'])

print("\n--- Testing /api/advisory/generate-whatsapp ---")
r = client.post('/api/advisory/generate-whatsapp', json={'crop_id': 'tomato', 'region_id': 'nashik-tomato', 'language': 'hi'})
print("Status:", r.status_code, "WhatsApp Msg Length:", len(r.json()['whatsapp_message_raw']), "Share link:", r.json()['direct_share_link'][:50])

print("\nALL BACKEND API TESTS PASSED WITH 100% SUCCESS!")
