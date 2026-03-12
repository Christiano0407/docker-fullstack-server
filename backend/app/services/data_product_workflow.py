import csv
from pathlib import Path
from itertools import islice
# df = pd.read_csv(DATA_PATH)

# __file__ = /app/app/services/data_product_workflow.py
# .parent        → /app/app/services
# .parent.parent → /app/app
# .parent x3     → /app  ← WORKDIR donde está /data/
# = "Data, por el momento no está en otro container" = #

BASE_DIR = Path(__file__).resolve().parent.parent.parent 
DATA_PATH = BASE_DIR / "data" / "disney_movies_2_cleaned.csv"# Up Two Levels #

def _parse_row(row: dict) -> dict:
  """
   - Obtener datos ya Tipados [Pydantic]
   - Normaliza una fila del CSV al esquema Pydantic.
   - Mapea los nombres de columna del CSV a snake_case.
  """
  return {
    "movie_title": row.get("MovieTitle", "").strip(),
    "release_date": row.get("ReleaseDate", "").strip(), 
    "genre": row.get("Genre", "").strip(), 
    "rating": row.get("Rating", "").strip(), 
    "total_gross": int(row.get("TotalGross", 0) or 0), 
    "adjusted_gross": int(row.get("AdjustedGross", 0) or 0),
  }

def _load_all_rows() -> list[dict]:
  """ 
   Cargar Todas las filas (Datos) del CSV. Base para el resto de funciones (Obtener datos)
  """
  if not DATA_PATH.exists():
    raise FileNotFoundError(f"CSV (Data) not found: {DATA_PATH}")
  
  with open(DATA_PATH, new_line="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    return [_parse_row(row) for row in reader]


# ─────────────────────────────────────────
# Funciones públicas del servicio
# ─────────────────────────────────────────

# With Limits #
def load_data(limit: int = 10):
  """
    Load Limit Market Data From CSV with a configurable row list.
  """

  if not DATA_PATH.exists():
    raise FileNotFoundError(f"CSV not Fount: {DATA_PATH}")

  with open(DATA_PATH, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    # Return Only the "Limit" rows
    rows = list(islice(reader, limit))

  return rows

# Paginated Limited #
def get_data_paginated(limit: int=15, offset: int=0) -> tuple[list[dict], int]:
  """
    Carga películas con paginación.
    Returns: (rows, total_count)
  """
  all_rows = _load_all_rows()
  total = len(all_rows)
  paginated = all_rows[offset: offset + limit]
  return paginated, total 

# Get Movies for Title #
def get_movies_by_title(title:str) -> dict | None:
  """Busca una película por título exacto | Search - case-insensitive."""
  all_rows = _load_all_rows()
  title_lower = title.lower()
  for row in all_rows:
    if row["movie_title"].lower() == title_lower:
      return row
  return None

# = Search = #
def search_movies():
  pass

# = Stats | Statics (Estadísticas) = #
def get_stats():
  pass