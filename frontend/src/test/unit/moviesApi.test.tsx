/**
 * frontend/tests/unit/moviesApi.test.ts
 * TDD — Unit tests para el cliente HTTP
 *
 * Mockea fetch — no llama al backend real.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { moviesAPI } from "../../../src/api/moviesApi";


// === Mocks Data Test ====================================
const MOCK_RESPONSE = {
  count:  2,
  total:  579,
  limit:  10,
  offset: 0,
  data: [
    {
      movie_title:    "The Lion King",
      release_date:   "15/06/1994",
      genre:          "Adventure",
      rating:         "G",
      total_gross:    422780140,
      adjusted_gross: 761640898,
    },
    {
      movie_title:    "Aladdin",
      release_date:   "11/11/1992",
      genre:          "Comedy",
      rating:         "G",
      total_gross:    217350219,
      adjusted_gross: 441969178,
    },
  ],
};


// === Tests ====================================