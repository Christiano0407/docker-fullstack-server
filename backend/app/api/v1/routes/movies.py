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
  limit: int = Query(default=10, ge=1, le=100, description="Number the Movies per Page (Paginated)"),
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