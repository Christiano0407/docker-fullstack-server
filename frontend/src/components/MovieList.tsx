/**
 * = src/components/MovieList.tsx = 
 * - Cargar la lista de Movies - 
 */

import { useEffect, useState } from "react";
import { moviesAPI, type MovieListResponse } from "../api/moviesApi";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const LIMIT = 10; 