/**
 * src/components/Top5Grid.tsx
 * 5 top-grossing films strip for the Home page
 */

import { useState, useEffect } from "react";
import { moviesAPI, type Movie } from "../api/moviesApi";
import { usePoster } from "../hooks/usePoster";
import type { Page } from "../App"; 

interface Props {
  onNavigate: { p: Page } => void; 
}; 