"""
Router (Rutas) | movies.py
Endpoints con Contrato OpenAPI
"""
from fastapi import APIRouter, Query, HTTPException, Path
from app.schemas.movie import (
  MovieBase, 
  MovieResponse,
  MovieListResponse, 
  StatsStaticsResponse, 
  ErrorResponse
)
from app.services.data_product_workflow import ( 
  get_data_paginated,
  get_movies_by_title
)

router = APIRouter(
  prefix="/movies", 
  tags=["Movies"]
)

# ─────────────────────────────────────────
# GET /movies
# Lista paginada de películas
# ─────────────────────────────────────────
@router.get(
  "/", 
  response={
    200: {"description": "List Of Movies"},
    500: {"model": ErrorResponse, "description": "Error Into To The Server"}
  }, 
  summary="List Of Movies", 
  description="Return all list of movies Disney. Dataset Disney movies",
)
def list_movies(
  limit: int = Query(default=10, ge=1, le=100, description="Number the Movies per Page (Paginated - max. 100)"),
  offset: int = Query(default=0, ge=0, description="Number to Register to skip(Omitir)")
):
  try:
    rows, total = get_data_paginated(limit=limit, offset=offset)
    return MovieListResponse(
      count=len(rows), 
      total=total, 
      limit=limit, 
      offset=offset, 
      data=rows
    )
  except FileNotFoundError as e:
    raise HTTPException(status_code=500, detail=str(e))
  

# ─────────────────────────────────────────
# GET /movies/{title}
# Búsqueda por título exacto | Router
# ─────────────────────────────────────────
@router.get(
  "/{title}", 
  response_model=MovieResponse, 
  response={
    200: {"description": "Movie successfully"}, 
    404: {"model": ErrorResponse, "description": "Movie not Founded"},
    500: {"model": ErrorResponse, "description=": "Error Server"},
  }, 
  summary="Get Movies for Title", 
  description="Search Movies for Title & Get Movies"
)
def get_by_title(
  title: str = Path(..., description="Title for movie", example=["The Lion King"])
):
  try:
    movie = get_movies_by_title(title)
    if not movie:
      raise HTTPException(status_code=404, detail=f"Movie `{title}` not found.")
    return movie
  except HTTPException:
    raise 
  except FileNotFoundError as e:
    raise HTTPException(status_code=500, detail=str(e))
  
# ─────────────────────────────────────────
# GET /movies/search
# Búsqueda por género y/o rating
# ─────────────────────────────────────────
@router.get(
  "/search", 
  response_model=MovieListResponse, 
  response={
    200: {"description": "Movie successfully | Result for Search"}, 
    404: {"model": ErrorResponse, "description": "Movie not Founded"},
    500: {"model": ErrorResponse, "description=": "Intern Error Server"},
  },
  summary="Search Movie", 
  description="Filter movies for genre and clasification MPAA(G, PG, PG-13, R)",
)
def search(
  genre: str | None = Query(default=None, description="Filter by Genre (ex:Adventure, Comedy)"), 
  rating: str | None = Query(default=None, description="Filter by rating MPAA(G, PG, PG-13, R)" ),
  limit: int = Query(default=10, ge=1, le=100),
  offset: int = Query(default=0, ge=0)
):
  try: 
    rows, total = search_movies(genre=genre, rating=rating, limit=limit, offset=offset)
    if not rows:
      raise HTTPException(status_code=404, detail="Not movies found with the given filters")
    return MovieListResponse(
      count=len(rows),
      total=total,
      limit = limit,
      offset = offset,
      data = rows
    )
  except HTTPException: 
    raise
  except FileNotFoundError as e: 
    raise HTTPException(status_code=500, detail=(e))



# ─────────────────────────────────────────
# GET /movies/stats
# Estadísticas del dataset
# ─────────────────────────────────────────