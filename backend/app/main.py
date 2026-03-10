"""
main.py | Disney Movies API
FastAPI + OpenAPI Contract
"""

from fastapi import FastAPI
from app.services.data_product_workflow import load_data

app = FastAPI()

# = Debugging | para ver las rutas registradas
print([route.path for route in app.routes])

@app.get("/")
def root():
  return{"message": "FastAPI running..."}

@app.get("/data")
def get_data(limit: int = 10):
  """
    API Endpoints | Return Data 
  """
  data = load_data(limit)
  return {
    "Count": len(data), 
    "Data": data
  }