"""
main.py | Disney Movies API
FastAPI + OpenAPI Contract
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes.movies import router as movies_router
#from app.services.data_product_workflow import load_data


# ─────────────────────────────────────────
# Metadata OpenAPI
# ─────────────────────────────────────────
app = FastAPI(
    title="Disney Movies API",
    description="""
## 🎬 Disney Movies API
 
API REST para consultar y analizar el dataset de películas Disney (1937–2016).
 
### Endpoints disponibles
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/movies` | Lista paginada de películas |
| GET | `/movies/search` | Filtrar por género y/o rating |
| GET | `/movies/stats` | Estadísticas del dataset |
| GET | `/movies/{title}` | Buscar por título |
 
### Notas
- Los datos provienen de `disney_movies_2_cleaned.csv`
- La paginación usa `limit` y `offset`
- Ratings disponibles: `G`, `PG`, `PG-13`, `R`, `Not Rated`
""",
    version="0.1.0",
    contact={
        "name": "Disney Movies API",
        "url": "http://localhost:5000/docs",
    },
    license_info={
        "name": "MIT",
    },
    openapi_tags=[
        {
            "name": "Movies",
            "description": "Operaciones sobre el dataset de películas Disney.",
        },
        {
            "name": "Health",
            "description": "Estado del servidor.",
        },
    ],
)

# ─────────────────────────────────────────
# CORS — para conectar con el Frontend | Plus Middlewares
# - 5000 PORT [py] | Docker
# ─────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
# ─────────────────────────────────────────
# Routers
# ─────────────────────────────────────────
app.include_router(movies_router)


# ─────────────────────────────────────────
# === Endpoints API's ===
# ─────────────────────────────────────────
# = Debugging | para ver las rutas registradas
#print([route.path for route in app.routes])

@app.get("/")
def root():
  return {
        "status": "ok",
        "message": "Disney Movies API running",
        "docs": "/docs",
        "openapi": "/openapi.json",
    }