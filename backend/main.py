from datetime import datetime
from typing import Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn


# Models
class HealthResponse(BaseModel):
    status: str


class FeatureFlagsResponse(BaseModel):
    passengerRouteMap: bool
    driverRouteMapPreview: bool
    showSettings: bool


class Coordinates(BaseModel):
    lat: float
    lng: float


class Ride(BaseModel):
    id: str
    role: str
    origin: str = Field(alias="from")
    destination: str = Field(alias="to")
    when: datetime
    coordinates: Coordinates = Field(alias="coords")

    model_config = {"populate_by_name": True}


class RidesResponse(BaseModel):
    rides: list[Ride]


# In-memory data
FEATURE_FLAGS = FeatureFlagsResponse(
    passengerRouteMap=True,
    driverRouteMapPreview=False,
    showSettings=True,
)

RIDES = [
    Ride(
        id="r1",
        role="passenger",
        origin="Kyiv",
        destination="Fastiv",
        when=datetime.fromisoformat("2025-09-27T08:30:00+03:00"),
        coordinates=Coordinates(lat=50.4501, lng=30.5234),
    ),
    Ride(
        id="r2",
        role="driver",
        origin="Kyiv",
        destination="Lviv",
        when=datetime.fromisoformat("2025-09-27T12:15:00+03:00"),
        coordinates=Coordinates(lat=49.8397, lng=24.0297),
    ),
    Ride(
        id="r3",
        role="passenger",
        origin="Odesa",
        destination="Mykolaiv",
        when=datetime.fromisoformat("2025-09-27T14:00:00+03:00"),
        coordinates=Coordinates(lat=46.4825, lng=30.7233),
    ),
    Ride(
        id="r4",
        role="driver",
        origin="Dnipro",
        destination="Zaporizhzhia",
        when=datetime.fromisoformat("2025-09-27T16:45:00+03:00"),
        coordinates=Coordinates(lat=48.4647, lng=35.0462),
    ),
]


# App
app = FastAPI(
    title="RideSafe CarSharing API",
    version="1.0.0",
    description="A clean, simple CarSharing API implementation",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Endpoints
@app.get("/api/health", response_model=HealthResponse)
async def get_health() -> HealthResponse:
    """Return the API health status."""
    return HealthResponse(status="ok")


@app.get("/api/flags", response_model=FeatureFlagsResponse)
async def get_feature_flags() -> FeatureFlagsResponse:
    """Return the current feature flags configuration."""
    return FEATURE_FLAGS


@app.get("/api/rides", response_model=RidesResponse)
async def get_rides(
    role: Optional[str] = Query(
        default=None, description="Filter rides by role (passenger or driver)"
    ),
) -> RidesResponse:
    """Return rides filtered by role when provided."""
    if role:
        filtered_rides = [ride for ride in RIDES if ride.role == role]
        return RidesResponse(rides=filtered_rides)
    return RidesResponse(rides=RIDES)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
    )