from pathlib import Path
import pandas as pd
import csv

BASE_DIR = Path(__file__).resolve.parent
DATA_PATH = BASE_DIR / "../../data/disney_movies_2_cleaned.csv"

# df = pd.read_csv(DATA_PATH)

def load_data():
  rows = []

  with open(DATA_PATH, newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
      rows.append(row)

  return rows