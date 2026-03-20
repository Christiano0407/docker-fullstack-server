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

  def test_search_nonexistent_genre_404(self, client):
        response = client.get("/api/v1/movies/search?genre=SciFi")
        assert response.status_code == 404

  def test_search_no_filter_all(self, client): 
    """ Return Total search """
    body = client.get("api/v1/movies/search").json()
    assert body["total"] == len(MOCK_ROWS)

  def test_search_total_reflects_filtered_count(self, client):
        body = client.get("/api/v1/movies/search?rating=R").json()
        """ Solo 1 película R en MOCK_ROWS """
        assert body["total"] == 1
 
  def test_search_pagination_with_filter(self, client):
      """ 2 Adventure en MOCK_ROWS pero limit=1 """
      body = client.get("/api/v1/movies/search?genre=Adventure&limit=1").json()
      assert len(body["data"]) == 1
      assert body["total"] == 2

  def test_search_response_structure(self, client):
      """ Agregar elementos que complementen la respuesta  """
      body = client.get("/api/v1/movies/search?genre=Adventure").json()
      assert "count" in body
      assert "total" in body
      assert "data" in body

  
# ═══════════════════════════════════════
# SUITE 3 — GET /api/v1/movies/stats
# ═══════════════════════════════════════
class TestStatsStaticEndpoints:

  def test_stats_endpoint_status_200(self, client):
    """ Retorna el HTTP Status para el Endpoint | Exitoso"""
    response = client.get("/api/v1/movies/stats")
    assert response.status_code == 200

  def test_response_has_required_keys(self, client):
    """ Retornar todas las 'palabras clave' (datos), dentro de el endpoint"""
    body = client.get("/api/v1/movies/stats").json()
    assert "total_movies" in body
    assert "genres" in body
    assert "top_grossing" in body
    assert "most_recent" in body

  def test_stats_required_total_movies(self, client): 
    body = client.get("api/v1/movies/stats").json()
    assert body["total_movies"] == len(MOCK_ROWS)

  def test_stats_required_top_gross(self, client):
    """ 
      - Retornar la película con la mayor ganancia 
      - 'The Lion King', es la que tiene la mayor ganancia
    """
    body = client.get("api/v1/movies/stats").json()
    assert body["top_grossing"]["movie_title"] == "The Lion King"

  def test_stats_recent_movies(self, client):
    """ 
      - Retornar las películas más recientes 
      - '-1', recorre todo el MOCK 
    """
    body = client.get("api/v1/movies/stats").json()
    assert body["most_recent"]["movie_title"] == MOCK_ROWS[-1]["movie_title"]

  def test_stats_validate_genre(self, client):
    """ 
      - Validar que el Género, esté dentro de Stats 
      - Retornar el género con mayor relevancia
    """
    body = client.get("api/v1/movies/stats").json()
    assert isinstance(body["genres"], list)

  def test_stats_genres_structure(self, client):
    """ Retornar la estructura de Género"""
    body = client.get("api/v1/movies/stats").json()
    for genre in body["genres"]:
      assert "genre" in genre
      assert "count" in genre
      assert "total_gross_sum" in genre
      assert "avg_gross" in genre

  def test_stats_iteration_count_genres(self, client):
    body = client.get("api/v1/movies/stats").json()
    genre = next(m for m in body["genres"] if m["genre"] == "Adventure")
    assert genre["count"] == 2

  def test_stats_iteration_top_gross(self, client):
    body = client.get("api/v1/movies/stats").json()
    data_top_gross = body["top_grossing"]
    data_expected = { "movie_title", "release_date", "genre", "rating", "total_gross", "adjusted_gross" }
    assert data_expected.issubset(data_top_gross.keys())



# ═══════════════════════════════════════
# SUITE 4 — GET /api/v1/movies/{title}
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 5 — Health check
# ═══════════════════════════════════════