"""
schemas | Disney movies
contract api - openapi | pydantic + POO 
"""
from pydantic import BaseModel, field, field_validator
from typing import Optional

# ====================================================== # 
# Base Model (Pydantic & POO) | Campos Compartidos
# ====================================================== #
class MovieBase(BaseModel):
  movie_title: str = field(..., description="Title of the movie", example=["The Lion King"])
  release_date: str = field(..., description="Date of the movie premier (DD/MM/YYYY)", example=["15/06/1994"])
  genre: str = field(..., description="Genre of the movie", example=["Adventure"])
  rating: str = field(..., description="MPAA Clasification", example=["G", "PG", "pg-13", "R"])
  total_gross: int = field(..., ge=0, description="Total gross movie in USD")
  adjusted_gross: int = field(..., ge=0, description="Adjusted gross movie for Inflation in USD")
