"""
  === Endpoints / Pipeline Tests ===
  - tests/integration/test_movies_endpoints.py
  - TDD — Movies Endpoints (HTTP Integration Tests)
  
  Usa TestClient de FastAPI con _load_all_rows mockeado.
  No depende del CSV real ni de la DB.
  
  Cubre:
    GET /api/v1/movies           → list
    GET /api/v1/movies/search    → search
    GET /api/v1/movies/stats     → stats
    GET /api/v1/movies/{title}   → by title
"""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

# ─────────────────────────────────────────
# MOCK DATA
# ─────────────────────────────────────────
 
MOCK_ROWS = [
    {
        "movie_title": "The Lion King",
        "release_date": "15/06/1994",
        "genre": "Adventure",
        "rating": "G",
        "total_gross": 422780140,
        "adjusted_gross": 761640898,
    },
    {
        "movie_title": "Aladdin",
        "release_date": "11/11/1992",
        "genre": "Comedy",
        "rating": "G",
        "total_gross": 217350219,
        "adjusted_gross": 441969178,
    },
    {
        "movie_title": "Beauty and the Beast",
        "release_date": "13/11/1991",
        "genre": "Musical",
        "rating": "G",
        "total_gross": 218951625,
        "adjusted_gross": 363017667,
    },
    {
        "movie_title": "Tarzan",
        "release_date": "16/06/1999",
        "genre": "Adventure",
        "rating": "G",
        "total_gross": 171091819,
        "adjusted_gross": 283900254,
    },
    {
        "movie_title": "The Color of Money",
        "release_date": "17/10/1986",
        "genre": "Drama",
        "rating": "R",
        "total_gross": 52293000,
        "adjusted_gross": 117957323,
    },
]
 

# ─────────────────────────────────────────
# FIXTURES
# ─────────────────────────────────────────

@pytest.fixture
def client():
  from app.main import app
  return TestClient(app)


@pytest.fixture(autouse=True)
def mock_csv():
  """
    - Parchea _load_all_rows en todos los tests de este módulo.
    - autouse=True → se aplica automáticamente a cada test.
  """
  with patch(
    "app.services.data_product_workflow._load_all_rows",
    return_value = MOCK_ROWS.copy(),
  ): 
    yield


# ═══════════════════════════════════════
# SUITE 1 — GET /api/v1/movies
# ═══════════════════════════════════════

class TestMoviesEndpoints:

  def test_status_200(self, client):
    """Response Status 2000/ok"""
    response = client.get("/api/v1/movies")
    assert response.status_code == 200

  def test_response_has_required_keys(self, client):
    body = client.get("/api/v1/movies").json()
    assert "count" in body
    assert "total" in body
    assert "limit" in body
    assert "offset" in body
    assert "data" in body

  def test_data_is_list(self, client):
    body = client.get("/api/v1/movies").json()
    assert isinstance(body["data"], list)

  def test_data_limit(self, client):
    """Limit of data"""
    body = client.get("/api/v1/movies").json()
    # = MOCKS (DEV) have 5 data elements. Return the five = #
    assert body["limit"] == 10
    assert body["count"] <= 10

  def test_data_total(self, client):
    body = client.get("/api/v1/movies").json()
    assert body["total"] == len(MOCK_ROWS)

  def test_row_len_data_limit(self, client):
    """Get the Limit when return Data"""
    body = client.get("/api/v1/movies?limit=2").json()
    assert len(body["data"]) == 2
    assert body["limit"] == 2

  def test_data_limit_offset(self, client):
    body_1 = client.get("/api/v1/movies?limit=2&offset=0").json()
    body_2 = client.get("/api/v1/movies?limit=2&offset=2").json()
    title_1 = { m["movie_title"] for m in body_1["data"] }
    title_2 = { m["movie_title"] for m in body_2["data"] }
    assert title_1.isdisjoint(title_2)

  def test_data_empty(self, client):
    body = client.get("/api/v1/movies?offset=999").json()
    assert body["data"] == []
    assert body["total"] == len(MOCK_ROWS)

  def test_data_fields_movies(self, client):
    """User Especifica (Específico) los Campos que necesita retornar de los datos"""
    body = client.get("/api/v1/movies?limit=1").json()
    data_1 = body["data"][0]
    data_expected = { "movie_title", "release_date", "genre", "rating", "total_gross", "adjusted_gross" }
    assert data_expected.issubset(data_1.keys())

  def test_data_limit_min_422(self, client):
    """Violated data ge=1 | Number paginated"""
    response = client.get("/api/v1/movies?limit=0")
    assert response.status_code == 422

  def test_data_limit_max_422(self, client):
    """Violated Limit Data  le=100 | Number Paginated"""
    response = client.get("/api/v1/movies?limit=101")
    assert response.status_code == 422

  def test_data_error_offset_422(self, client):
    """Violated init Offset = 0 | Number Paginated"""
    response = client.get("/api/v1/movies?offset=-1")
    assert response.status_code == 422

  def testdata_limit_offset_422(self, client):
    """Violated in Limit & Offset | Data"""
    response = client.get("/api/v1/movies?limit=101&offset=-1")
    assert response.status_code == 422


# ═══════════════════════════════════════
# SUITE 2 — GET /api/v1/movies/search
# ═══════════════════════════════════════

class TestSearchMoviesEndpoints: 

  def test_search_by_genre_200(self, client):
    """search by Genre & status 200/ok"""
    response = client.get("api/v1/movies/search?genre=Adventure")
    assert response.status_code == 200

  def test_search_by_genre_filter_correctly(self, client):
    """Search & Filter bu Genre correctly success"""
    body = client.get("api/v1/movies/search?genre=Adventure").json()
    assert all(m["genre"] == "Adventure" for m in body["data"])

  def test_search_by_rating_200(self, client):
    response = client.get("api/v1/movies/search?rating=G")
    assert response.status_code == 200    

  def test_search_by_rating_filter_correctly(self, client):
    body = client.get("api/v1/movies/search?rating=G").json()
    assert all(m["rating"] == "G" for m in body["data"])

  def test_search_both_genre_and_rating_correctly(self, client):
    body = client.get("api/v1/movies/search?genre=Adventure&rating=G").json()
    for movie in body["data"]:
      assert movie["genre"] == "Adventure"
      assert movie["rating"] == "G"

  

  
# ═══════════════════════════════════════
# SUITE 3 — GET /api/v1/movies/stats
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 4 — GET /api/v1/movies/{title}
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 5 — Health check
# ═══════════════════════════════════════