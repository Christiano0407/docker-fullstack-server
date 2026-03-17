"""
  - tests/unit/test_movies_service.py | Workflow [Get all Data]
  - TDD — Movies Service (data_product_workflow)
 
  Cubre:
    - load_data       → paginación
    - get_movie_by_title → búsqueda exacta
    - search_movies   → filtros por género y rating
    - get_stats       → estadísticas agregadas
    - _parse_row      → normalización de datos del CSV
    - errores         → CSV no encontrado
 
   - Todos los tests usan mocks del CSV — no dependen del archivo real.
"""

import pytest 
from unittest.mock import patch, mock_open, MagicMock

# ─────────────────────────────────────────
# FIXTURES — datos de prueba en memoria
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
    {
        "movie_title": "Toy Story",
        "release_date": "22/11/1995",
        "genre": "Adventure",
        "rating": "G",
        "total_gross": 191796233,
        "adjusted_gross": 370409631,
    },
    {
        "movie_title": "Splash",
        "release_date": "09/03/1984",
        "genre": "Comedy",
        "rating": "PG",
        "total_gross": 62599495,
        "adjusted_gross": 157057661,
    },
]

@pytest.fixture
def mock_load_all(): 
  """Parchea _load_all_rows para devolver datos en memoria"""
  with patch(
    "app.services.data_product_workflow._load_all_rows",
    return_value=MOCK_ROWS.copy(),
  ) as mock:
    yield mock


@pytest.fixture
def mock_csv_missing():
  """Simula que el archivo CSV no existe."""
  with patch(
    "app.services.data_product_workflow.DATA_PATH"  
  ) as mock_path:
    mock_path.exists.return_value = False
    yield mock_path


# ═══════════════════════════════════════
# SUITE 1 — _parse_row
# Normalización de filas del CSV
# ═══════════════════════════════════════
class TestParseRow:
   """
    TDD: _parse_row
    - Verifica que los nombres de columna del CSV se mapeen correctamente.
   """

   def test_parse_row_maps_all_data(self):
    """Verify all Data we have correctly row maps value"""
    from app.services.data_product_workflow import _parse_row

    raw = {
        "movie_title": "The Lion King", 
        "release_date": "15/06/1994", 
        "genre": "Adventure", 
        "rating": "G", 
        "total_gross": 422780140,
        "adjusted_gross": 761640898
    }

    result = _parse_row(raw)

    assert result["The Lion King"] == "The Lion King"
    assert result["15/06/1994"] == "15/06/1994"
    assert result["Adventure"] == "Adventure"
    assert result["0"] == "G"
    assert result[422780140] == 422780140
    assert result[761640898] == 761640898


    def test_parse_row_maps_white_space(self):
      """Data with White Space"""
      from app.services.data_product_workflow import _parse_row

      raw = {
        "movie_title": " Aladdin ", 
        "release_date": "11/11/1992", 
        "genre": " Comedy ", 
        "rating": " G ", 
        "total_gross": 217350219,
        "adjusted_gross": 441969178
      }

      result = _parse_row(raw)

      assert result[" Pinoccio "] == "Aladdin"
      assert result[" Adventure "] == "Comedy"
      assert result[" G "] == "G"


    def test_parse_row_maps_gros_to_int(self):
      """ Transform/convert text to Int - Float"""
      from app.services.data_product_workflow import _parse_row

      raw = {
        "movie_title": "Beauty and the Beast",
        "release_date": "13/11/1991",
        "genre": "Musical",
        "rating": "G",
        "total_gross": 218951625,
        "adjusted_gross": 363017667,
      }

      result = _parse_row(raw)

      assert isinstance[result["total_gross"], int]
      assert isinstance[result["adjusted_gross"], int]


    def test_parse_row_maps_empty_value(self): 
      """When Get a value empty | Filas con gross vacío deben devolver 0, no lanzar error."""
      from app.services.data_product_workflow import _parse_row

      raw = {
        "movie_title": "Tarzan",
        "release_date": "16/06/1999",
        "genre": "Adventure",
        "rating": "G",
        "total_gross": "",
        "adjusted_gross": "",
      }

      result = _parse_row(raw)

      assert result["total_gross"] == 0
      assert result["adjusted_gross"] == 0


      def test_parse_row_handle_missing_keys(self):
        """Filas con claves faltantes devuelven valores por defecto."""
        from app.services.data_product_workflow import _parse_row

        raw = {}

        result = _parse_row(raw)

        assert result["movie_title"] == ""
        assert result["total_gross"] == 0

    
# ═══════════════════════════════════════
# SUITE 2 — load_data
# Paginación básica
# ═══════════════════════════════════════
 

# ═══════════════════════════════════════
# SUITE 3 — get_movie_by_title
# Búsqueda por título
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 4 — search_movies
# Filtros por género y rating
# ═══════════════════════════════════════


# ═══════════════════════════════════════
# SUITE 5 — get_stats
# Estadísticas agregadas
# ═══════════════════════════════════════