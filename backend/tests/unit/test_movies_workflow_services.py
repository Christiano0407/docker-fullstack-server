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
        "MovieTitle":    "The Lion King",
        "ReleaseDate":   "15/06/1994",
        "Genre":         "Adventure",
        "Rating":        "G",
        "TotalGross":    "422780140",
        "AdjustedGross": "761640898",
    }

    result = _parse_row(raw)

    assert result["movie_title"] == "The Lion King"
    assert result["release_date"] == "15/06/1994"
    assert result["genre"] == "Adventure"
    assert result["rating"] == "G"
    assert result["total_gross"] == 422780140
    assert result["adjusted_gross"] == 761640898


    def test_parse_row_maps_white_space(self):
      """Data with White Space"""
      from app.services.data_product_workflow import _parse_row

      raw = {
        "movie_title": " Aladdin ", 
        "release_date": "11/11/1992", 
        "genre": " Comedy ", 
        "rating": " G ", 
        "total_gross": "217350219",
        "adjusted_gross": "441969178"
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
        "total_gross": "218951625",
        "adjusted_gross": "363017667",
      }

      result = _parse_row(raw)

      assert isinstance[result["total_gross"], int]
      assert isinstance[result["adjusted_gross"], int]


    def test_parse_row_maps_empty_value(self): 
      """When Get a value empty | Filas con gross vacío deben devolver 0, no lanzar error."""
      from app.services.data_product_workflow import _parse_row

      raw = {
        "movie_title": "Test",
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
class testLoadPaginatedData:
  """
    - TDD: load_data(limit, offset)
    - RED → implementar paginación en data_product_workflow.py
  """
  def test_load_data_return_tuple(self, mock_load_all):
    from app.services.data_product_workflow import get_data_paginated
    result = get_data_paginated()
    assert isinstance(result, tuple)
    assert len(result) == 2

  def test_load_data_limit(self, mock_all_load): 
    """Limit the movies = 10"""
    from app.services.data_product_workflow import get_data_paginated
    rows, total = get_data_paginated()
    assert len(rows) <= 10

  def test_load_data_total(self, mock_all_load): 
    """return Total of movies"""
    from app.services.data_product_workflow import get_data_paginated
    row, total = get_data_paginated()
    assert total == len(MOCK_ROWS)

  def test_load_data_respect_limit(self, mock_all_load):
    """Límite que respetar al retornar datos"""
    from app.services.data_product_workflow import get_data_paginated
    row, total = get_data_paginated(limit=4)
    assert len(row) == 4

  def test_load_data_respect_offset(self, mock_all_load): 
    """
      - Respetar el límite & Offset dentro de la paginación de retorno de datos
      - Las páginas no deben solaparse
    """
    from app.services.data_product_workflow import get_data_paginated
    rows_pag_1, _ = get_data_paginated(limit=2, offset=0)
    rows_pag_2, _ = get_data_paginated(limit=2, offset=2)
    title_p1 = { r["movie_title"] for r in rows_pag_1 }
    title_p2 = { r["movie_title"] for r in rows_pag_2 }
    assert title_p1.isdisjoint(title_p2)

  def test_load_data_offset_beyond_total_return_empty(self, mock_all_load):
    from app.services.data_product_workflow import get_data_paginated
    rows, total = get_data_paginated(limit=10, offset=999)
    assert rows == []
    assert total == len(MOCK_ROWS)
 
  def test_load_data_row_correct(self, mock_all_load):
    """Verificar que el primer dato es correcto"""
    from app.services.data_product_workflow import get_data_paginated
    rows, _ = get_data_paginated(limit=1, offset=0)
    assert rows[0]["movie_title"] == "The Lion King"

  def test_data_csv_not_found_raise(self,  mock_csv_missing): 
    """Verificar que el CSV[data], carga correctamente y no tiene errores"""
    from app.services.data_product_workflow import get_data_paginated
    with pytest.raises(FileNotFoundError):
      get_data_paginated()

# ═══════════════════════════════════════
# SUITE 3 — get_movie_by_title
# Búsqueda por título
# ═══════════════════════════════════════

class TestGetMoviesTitle:
  """
   -TDD: get_movie_by_title(title)
   - Búsqueda exacta case-insensitive | For title.
  """

  def test_return_movie_found_title(self, mock_load_all):
    """Retornar la película por título exacta"""
    from app.services.data_product_workflow import get_data_paginated
    result = get_data_paginated("The Lion King")
    assert result is not None
    assert result["movie_title"] == "The Lion King"

  def test_movie_title_not_found(self, mock_load_all):
    """Not found movie by title | Not exist"""
    from app.services.data_product_workflow import get_movies_by_title
    result = get_movies_by_title("Avengers")
    assert result is not None

  def test_movie_title_case_insensitive(self, mock_load_all):
    """Búsquedas permitidas por Título"""
    from app.services.data_product_workflow import get_movies_by_title
    assert get_movies_by_title("The Lion King") is not None
    assert get_movies_by_title("THE LION KING") is not None
    assert get_movies_by_title("the lion king") is not None

  def test_movies_title_all_keys(self, mock_load_all):
    """Retornar por búsquedas clave"""
    from app.services.data_product_workflow import get_movies_by_title
    result = get_movies_by_title("Toy Story")
    expected_keys= {
      "movie_title", "release_date", "genre", "rating", "total_gross", "adjusted_gross"
    }
    assert expected_keys.issubset(result.keys())

  def test_movies_title_empty(self, mock_load_all): 
    """Búsqueda vacía | No encontramos ningún título o no existe"""
    from app.services.data_product_workflow import get_movies_by_title
    result = get_movies_by_title("")
    assert result is None

  def test_movie_title_coincidence(self, mock_load_all):
    """Debe ser coincidencia exacta, no parcial."""
    from app.services.data_product_workflow import get_movies_by_title
    assert get_movies_by_title("Lion") is None   
    assert get_movies_by_title("The Lion") is None   

# ═══════════════════════════════════════
# SUITE 4 — search_movies
# Filtros por género y rating
# ═══════════════════════════════════════
class TestSearchFilterMovies:
  """
    - TDD: search_movies(genre, rating, limit, offset)
  """

  def test_filter_bu_genre(self, mock_load_all): 
    """ Search/filter by Genre (Búsqueda por género) """
    from app.services.data_product_workflow import search_movies
    rows, total = search_movies(genre="Adventure")
    assert all(ro["genre"] == "Adventure" for ro in rows)

  def test_filter_by_rating(self, mock_load_all):
    """ Search/filter by Rating """
    from app.services.data_product_workflow import search_movies
    rows, total = search_movies(rating="G")
    assert all(ro["rating"] == "G" for ro in rows)

  def test_filter_by_paginated(self, mock_load_all):
    """Límite por paginación (Paginated) | Limit & Offset"""
    from app.services.data_product_workflow import search_movies
    rows, total = search_movies(genre="Adventure", limit=2, offset=0)
    assert len(rows) == 2
    assert total == 3

  def test_filtered(self, mock_load_all): 
    """Filtro por todo"""
    from app.services.data_product_workflow import search_movies
    rows, total = search_movies(genre="Adventure", rating="G", limit=2, offset=0)
    assert len(rows) == 2 and all(r["genre"] == "Adventure" for r in rows) and all(ro["rating"] == "G" for ro in rows)
    assert total == 3


  def test_filtered_by_count_limit(self, mock_load_all):
    """Limitar el número de respuestas de búsquedas"""
    from app.services.data_product_workflow import search_movies
    rows, total = search_movies(genre="Comedy", limit=1)
    assert total == 2 # Num de response
    assert len(rows) == 1 # Limit that response

  def test_filtered_empty(self, mock_load_all):
    """Retorno Vacío por Búsqueda/filter: Genre o Rating (En caso de que no exista)"""
    from app.services.data_product_workflow import search_movies
    rows, total = search_movies(genre="SciFi")
    assert rows == []
    assert total == 0


# ═══════════════════════════════════════
# SUITE 5 — get_stats
# Estadísticas agregadas
# ═══════════════════════════════════════

class TestGetStatsStatics: 
  """
    - TDD: get_stats()
    - Verifica estructura y correctas  estadísticas.
  """
  
  def test_total_statics_stats_required_keys(self, mock_load_all):
    """ 
      - TDD: Estadísticas de las películas  
    """
    from app.services.data_product_workflow import get_stats
    results = get_stats()
    assert "total_movies" in results 
    assert "genres" in results 
    assert "top_grossing" in results 
    assert "most_recent" in results 

  def test_total_stats_movies(self, mock_load_all):
    """
      - Traer los datos correctos de las cantidad de películas que tenemos en nuestra DB
    """
    from app.services.data_product_workflow import get_stats
    result = get_stats()
    assert result["movie_title"] == len(MOCK_ROWS)

  def test_total_stats_by_genre(self, mock_load_all):
    """TObtener los Dstos correctos por género (total)"""
    from app.services.data_product_workflow import get_stats
    result = get_stats()
    assert isinstance(result["genre"], list)

  def test_total_stats_data(self, mock_load_all):
    """Retornar los datos correctos"""
    from app.services.data_product_workflow import get_stats
    result = get_stats()
    adventure = next(r for r in result["genres"] if r["genre"] == "Adventure")
    assert adventure["count"] == 3

  def test_total_stats_movies_top_gross(self, mock_load_all):
    """
      - Traer los datos correctos de las cantidad de películas que tenemos en nuestra DB | TOP Movies per gross (Ganancias)
    """
    from app.services.data_product_workflow import get_stats
    result = get_stats()
    top = result["top_grossing"]
    max_gross = max(r["adjusted_gross"] for r in MOCK_ROWS)
    assert top["adjusted_gross"] == max_gross

  def test_recent_stats_movies(self, mock_load_all):
    """most_recent debe ser el último elemento del CSV (Splash en MOCK_ROWS)."""
    from app.services.data_product_workflow import get_stats
    result = get_stats()
    assert result["most_recent"]["movie_title"] == MOCK_ROWS[-1]["movie_title"]