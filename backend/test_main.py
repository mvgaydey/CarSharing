import pytest
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_endpoint():
    """Test health check endpoint returns ok status."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_feature_flags_endpoint():
    """Test feature flags endpoint returns correct flags."""
    response = client.get("/api/flags")
    assert response.status_code == 200
    data = response.json()
    assert "passengerRouteMap" in data
    assert "driverRouteMapPreview" in data
    assert isinstance(data["passengerRouteMap"], bool)
    assert isinstance(data["driverRouteMapPreview"], bool)


def test_rides_endpoint_all():
    """Test rides endpoint returns all rides when no role specified."""
    response = client.get("/api/rides")
    assert response.status_code == 200
    data = response.json()
    assert "rides" in data
    assert len(data["rides"]) == 4

    # Check structure of first ride
    ride = data["rides"][0]
    assert "id" in ride
    assert "role" in ride
    assert "from" in ride
    assert "to" in ride
    assert "when" in ride
    assert "coords" in ride
    assert "lat" in ride["coords"]
    assert "lng" in ride["coords"]


def test_rides_endpoint_filter_passenger():
    """Test rides endpoint filters by passenger role."""
    response = client.get("/api/rides?role=passenger")
    assert response.status_code == 200
    data = response.json()
    assert "rides" in data
    rides = data["rides"]
    assert len(rides) == 2
    assert all(ride["role"] == "passenger" for ride in rides)


def test_rides_endpoint_filter_driver():
    """Test rides endpoint filters by driver role."""
    response = client.get("/api/rides?role=driver")
    assert response.status_code == 200
    data = response.json()
    assert "rides" in data
    rides = data["rides"]
    assert len(rides) == 2
    assert all(ride["role"] == "driver" for ride in rides)


def test_rides_endpoint_invalid_role():
    """Test rides endpoint with invalid role returns empty list."""
    response = client.get("/api/rides?role=invalid")
    assert response.status_code == 200
    data = response.json()
    assert data["rides"] == []


def test_cors_headers():
    """Test CORS headers are present in response."""
    response = client.get("/api/health", headers={"Origin": "http://localhost:5173"})
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers