"""
schemas | Disney movies
contract api - openapi | pydantic [Tipar los Datos] + POO 
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional

# ====================================================== # 
# Base Model (Pydantic & POO) | Campos Compartidos
# ====================================================== #
class MovieBase(BaseModel):
  movie_title: str = Field(..., description="Title of the movie", example=["The Lion King"])
  release_date: str = Field(..., description="Date of the movie premier (DD/MM/YYYY)", example=["15/06/1994"])
  genre: str = Field(..., description="Genre of the movie", example=["Adventure"])
  rating: str = Field(..., description="MPAA Clasification", example=["G", "PG", "pg-13", "R"])
  total_gross: int = Field(..., ge=0, description="Total gross movie in USD")
  adjusted_gross: int = Field(..., ge=0, description="Adjusted gross movie for Inflation in USD")

# ======================================================== #
# Response Model — lo que devuelve la API | POO [Herencia]
# ======================================================== #

class MovieResponse(MovieBase):
  """ Model Response to Movie Individual """
  model_config = {
    "json_schema_extra":{
      "example": {
        "movie_title": "The Lion King", 
        "release_date": "15/06/1994", 
        "genre": "Adventure", 
        "rating": "G", 
        "total_gross": 422780140,
        "adjusted_gross": 761640898
      }
    }
  }

@field_validator("total_gross", "adjusted_gross", mode="before")
@classmethod
def parse_gross(cls, v):
  if isinstance(v, str):
    return int(v.replace(",", "")).strip()
  return v

# ======================================================== #
# Paginated List Response | Response Paginated (Page - Pagination) Movies
# ======================================================== #

class MovieListResponse(BaseModel): 
  """Paginated (Pagination) Response Of Movies List"""

  count: int = Field(..., description="Number of movies on this response")
  total: Optional[int] = Field(None, description="Movie Total in the Dataset (DB)")
  limit: int = Field(..., description="Limit in the request of the movies")
  offset: int = Field(0, description="Offset of Pagination")
  data: list[MovieResponse]

  model_config = {
    "json_schema_extra":{
      "example": {
        "count": 2, 
        "total": 579, 
        "limit": 2, 
        "offset": 0, 
        "data": [
          {
            "movie_title": "Snow White and the Seven Dwarfs", 
            "release_date": "21/12/1937", 
            "genre": "Musical", 
            "rating": "G", 
            "total_gross": 184925485,
            "adjusted_gross": 5228953251,
          }, 
          {
            "movie_title": "Pinocchio", 
            "release_date": "09/02/1940", 
            "genre": "Adventure", 
            "rating": "G", 
            "total_gross": 84300000,
            "adjusted_gross": 2188229052,
          }
        ],
      }
    }
  }

# ======================================================== #
# Stats Response | Statistics | Search Movies System
# ======================================================== #
class GenreStatsResponse(BaseModel):
  """Statics to Genre | Model Search"""
  genre: str
  count: int = Field(..., description="Number of Movies with this Genre.")
  total_gross: int = Field(..., description="Total Gross (Money) for Genre.")
  average_gross: float = Field(..., "Total Average (Promedio) for Movie")

class StatsStaticsResponse(BaseModel):
  """General Response to Movie Statics"""
  total_movies: int
  genres: list[GenreStatsResponse]
  top_gross: MovieResponse = Field(..., description="Movies with many gros (Mayor recaudación)")
  most_recent: MovieResponse = Field(..., description="Movies most recent in the Dataset (DB)")

# ======================================================== #
# [ERROR] Response Movies | HTTP Code
# ======================================================== #
class ErrorResponse(BaseModel):
  """Modelo estándar de error."""

  detail: str = Field(..., description="Descripción del error")
  code: int = Field(..., description="Código HTTP")

  model_config = {
      "json_schema_extra": {
          "example": {"detail": "CSV not found at path /app/data/disney_movies_2_cleaned.csv", "code": 404}
      }
  }