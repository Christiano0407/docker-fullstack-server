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


# ═══════════════════════════════════════
# SUITE 2 — GET /api/v1/movies/search
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 3 — GET /api/v1/movies/stats
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 4 — GET /api/v1/movies/{title}
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 5 — Health check
# ═══════════════════════════════════════