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

""" def load_data():
  rows = []

  with open(DATA_PATH, newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
      rows.append(row)

  return rows """

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

