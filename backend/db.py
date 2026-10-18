"""
Agri-Drishti (कृषि दृष्टि) - Database Layer
Handles MongoDB connections with automatic resilient in-memory fallback
initialized with Indian agri seed data for seamless zero-config startup.
"""

import os
import logging
from typing import Dict, Any, List, Optional
from pathlib import Path
from dotenv import load_dotenv
from backend.seed import CROPS_SEED, REGIONS_SEED, CROP_REGION_BASELINES

load_dotenv(Path(__file__).parent / ".env")

logger = logging.getLogger("agri_drishti.db")

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "agri_drishti")

# In-Memory Cache/Fallback Store
class InMemoryCollection:
    def __init__(self, initial_docs: Optional[List[Dict[str, Any]]] = None):
        self._docs = [dict(d) for d in (initial_docs or [])]

    async def find(self, query: Optional[Dict[str, Any]] = None):
        class Cursor:
            def __init__(self, docs):
                self._docs = docs
            async def to_list(self, length: int = 100):
                return self._docs[:length]
        
        filtered = self._filter(query)
        return Cursor(filtered)

    async def find_one(self, query: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        filtered = self._filter(query)
        return dict(filtered[0]) if filtered else None

    async def insert_one(self, doc: Dict[str, Any]) -> Any:
        self._docs.append(dict(doc))
        class Result:
            inserted_id = doc.get("id", "doc-1")
        return Result()

    async def create_indexes(self, *args, **kwargs):
        pass

    def _filter(self, query: Optional[Dict[str, Any]]) -> List[Dict[str, Any]]:
        if not query:
            return list(self._docs)
        res = []
        for d in self._docs:
            match = True
            for k, v in query.items():
                if d.get(k) != v:
                    match = False
                    break
            if match:
                res.append(d)
        return res


class DatabaseManager:
    def __init__(self):
        self.crops = InMemoryCollection(CROPS_SEED)
        self.regions = InMemoryCollection(REGIONS_SEED)
        self.predictions = InMemoryCollection()
        self.optimization_runs = InMemoryCollection()
        self.advisories = InMemoryCollection()
        self.status_checks = InMemoryCollection()
        self._mongo_client = None
        self._is_mongo_connected = False

    async def connect(self):
        try:
            from motor.motor_asyncio import AsyncIOMotorClient
            client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=1500)
            # Test ping
            await client.admin.command('ping')
            self._mongo_client = client
            mongo_db = client[DB_NAME]
            self.crops = mongo_db.crops
            self.regions = mongo_db.regions
            self.predictions = mongo_db.predictions
            self.optimization_runs = mongo_db.optimization_runs
            self.advisories = mongo_db.advisories
            self.status_checks = mongo_db.status_checks
            self._is_mongo_connected = True
            logger.info("Connected to MongoDB at %s", MONGO_URL)
        except Exception as e:
            logger.warning("MongoDB not active (%s). Operating with fast in-memory agri store.", str(e))
            self._is_mongo_connected = False

    async def close(self):
        if self._mongo_client:
            self._mongo_client.close()


db = DatabaseManager()

async def ensure_indexes():
    await db.connect()
