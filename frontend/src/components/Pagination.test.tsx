/**
 * frontend/tests/unit/Pagination.test.tsx
 * TDD — Unit tests para Pagination
 *
 * Cubre:
 *  - Renderizado de página actual y total
 *  - Botón Prev deshabilitado en página 1
 *  - Botón Next deshabilitado en última página
 *  - Callbacks onPrev y onNext se llaman correctamente
 *  - Cálculo correcto de páginas
 */
import { describe, it, vi, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../../src/components/Pagination"; 

// ── Helpers | Props ───────────────────────────────────────────
function renderPagination(overrides = {}) {
  const defaultProps = {
    offset: 0,
    limit: 10, 
    total: 579, 
    onPrev: vi.fn(), 
    onNext: vi.fn(),
  }; 
  return render(<Pagination {...defaultProps} {...overrides} />)
}

// ═══════════════════════════════════════
// SUITE 1 — Renderizado básico: páginas
// ═══════════════════════════════════════

describe("Pagination - Renderización", () => {

  it("Show Prev Button", () => {
    renderPagination(); 
    expect(screen.getByText("Prev")).toBeTruthy(); 
  });

  it("Show the Current Page", () => {
    renderPagination({ offset:0, limit:10 }); 
    expect(screen.getByText("1")).toBeTruthy(); 
  }); 

  it("Show the correct Total Pages", () => {
    renderPagination({ offset: 0, limit: 10, total: 579 }); 
    expect(screen.getByText("20")).toBeTruthy(); 
  }); 

   it("Show Total Pages", () => {
    renderPagination({ total: 579 }); 
    expect(screen.getByText(/579 movies/)).toBeTruthy(); 
  });

  it("Show Next Button", () => {
    renderPagination();
    expect(screen.getByText("Next")).toBeTruthy(); 
  }); 

}); 

 
// ═══════════════════════════════════════
// — Callbacks - Buttons (Prev & Next) -
// ═══════════════════════════════════════

describe("Pagination - Callback", () => {
  
  it("What If call the Prev Button - Callback", () => {
    const onPrev = vi.fn(); 
    renderPagination( { offset: 10, onPrev} ); 
    fireEvent.click(screen.getByText("Prev")); 
    expect(onPrev).toHaveBeenCalledTimes(1);
  }); 

  it("What if disabled to the Button - callback", () => {
    const onPrev = vi.fn();
    renderPagination( { offset: 0, onPrev} ); 
    fireEvent.click(screen.getByText("Prev")); 
    expect(onPrev).toHaveBeenCalled(); 
  }); 

  it("What if call the Next Button", () => {
    const onNext = vi.fn(); 
    renderPagination( {offset: 0, onNext} ); 
    fireEvent.click(screen.getByText("Next")); 
    expect(onNext).toHaveBeenCalledTimes(1); 
  }); 

  it("what if disabled the Next Button", () => {
    const onNext = vi.fn(); 
    renderPagination( {offset:576, limit: 10, total: 579, onNext} ); 
    fireEvent.click(screen.getByText("Next")); 
    expect(onNext).not.toHaveBeenCalled(); 
  }); 
}); 

// ═══════════════════════════════════════
// — Cálculo de páginas - 
// ═══════════════════════════════════════
describe("Pagination & Total - Calculate tot he Pages", () => {

  it("Page 1 when offset = 0", () => {
    renderPagination({ offset: 0, limit: 10 }); 
    expect(screen.getByText("1")).toBeTruthy(); 
  }); 

  it("What if will page 2 & offset = 10 ", () => {
    renderPagination({offset: 10, limit: 10, total: 579 }); 
    expect(screen.getByText("2")).toBeTruthy(); 
  }); 

  it("What if will offset= 50 & it's more that limit", () => {
    renderPagination({offset: 50, limit: 10, total: 579}); 
    expect(screen.getByText("5")).toBeTruthy(); 
  }); 

  it("What if will return the exact number", () => {
    renderPagination({offset:0, limit: 10, total:100}); 
    expect(screen.getByText("10")).toBeTruthy(); 
  });

  it("What if will round the pages ", () => {
    renderPagination({offset: 0, limit: 10, total: 11}); 
    expect(screen.getByText("2")).toBeTruthy(); 
  }); 

  it("What if total it's minor that Limit", () => {
    renderPagination({offset: 0, limit: 10, total: 5}); 
    expect(screen.getByText("1")).toBeTruthy(); 
  }); 

}); 