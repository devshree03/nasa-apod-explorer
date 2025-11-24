from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from cachetools import TTLCache
from httpx import AsyncClient
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from typing import List

# Load environment variables from .env file
load_dotenv()
NASA_API_KEY = os.getenv("NASA_API_KEY")
NASA_API_URL = "https://api.nasa.gov/planetary/apod"

# Cache to store API responses with max size and 6-hour expiry
cache = TTLCache(maxsize=50, ttl=6 * 60 * 60)  # 6 hours in seconds

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "[translate:NASA APOD Explorer API is running!]"}  # Root endpoint for test

async def fetch_apod(date: str = None):
    params = {"api_key": NASA_API_KEY}
    if date:
        params["date"] = date
    async with AsyncClient() as client:
        resp = await client.get(NASA_API_URL, params=params)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        return resp.json()

@app.get("/apod/today")
async def apod_today():
    key = "today"
    if key in cache:
        return cache[key]
    data = await fetch_apod()
    cache[key] = data
    return data

@app.get("/apod/date/{date}")
async def apod_by_date(date: str):
    """
    Get APOD for a specific date (YYYY-MM-DD)
    """
    # Validate date format
    try:
        datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
    key = f"date:{date}"
    if key in cache:
        return cache[key]
    data = await fetch_apod(date)
    cache[key] = data
    return data

@app.get("/apod/recent")
async def apod_recent(days: int = Query(7, ge=1, le=30)):
    """
    Get APODs for recent days, default last 7 days, max 30 days
    """
    results: List = []
    for i in range(days):
        d = (datetime.utcnow() - timedelta(days=i)).strftime("%Y-%m-%d")
        key = f"date:{d}"
        if key in cache:
            data = cache[key]
        else:
            data = await fetch_apod(d)
            cache[key] = data
        results.append(data)
    return results
