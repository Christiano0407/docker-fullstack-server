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
import { fireEvent, render } from "@testing-library/react";
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
// SUITE 1 — Renderizado básico
// ═══════════════════════════════════════
describe("Pagination - Renderización", () => {

  it("Show Prev Button", () => {
    const { container } = renderPagination(); 
    const prevBtn = container.querySelector("button");
    expect(prevBtn?.textContent).toBe("Prev"); 
  });

  it("Show Next Button", () => {
    const { container } = renderPagination();
    const buttons = container.querySelectorAll("button");
    expect(buttons[1].textContent).toBe("Next"); 
  }); 

  it("Show Total Movies Count", () => {
    const { container } = renderPagination(); 
    expect(container.textContent).toContain("579 movies"); 
  });

}); 

  
// ═══════════════════════════════════════
// — Callbacks - Buttons (Prev & Next) -
// ═══════════════════════════════════════

describe("Pagination - Callback", () => {
  
  it("Calls onPrev when Prev button is clicked", () => {
    const onPrev = vi.fn(); 
    const { container } = renderPagination( { offset: 10, onPrev} ); 
    fireEvent.click(container.querySelectorAll("button")[0]); 
    expect(onPrev).toHaveBeenCalledTimes(1);
  }); 

  it("Prev Button is disabled at offset 0", () => {
    const { container } = renderPagination( { offset: 0} ); 
    const prevBtn = container.querySelector("button") as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true); 
  }); 

  it("Calls onNext when Next button is clicked", () => {
    const onNext = vi.fn(); 
    const { container } = renderPagination( {offset: 0, onNext} ); 
    fireEvent.click(container.querySelectorAll("button")[1]); 
    expect(onNext).toHaveBeenCalledTimes(1); 
  }); 

  it("Next Button is disabled at last page", () => {
    const { container } = renderPagination( {offset:576, limit: 10, total: 579} ); 
    const buttons = container.querySelectorAll("button");
    expect(buttons[1].disabled).toBe(true); 
  }); 
}); 

// ═══════════════════════════════════════
// — Cálculo de páginas - 
// ═══════════════════════════════════════
describe("Pagination - Page Calculations", () => {

  it("Shows correct page info for offset=0, limit=10, total=579", () => {
    const { container } = renderPagination({ offset: 0, limit: 10, total: 579 }); 
    const text = container.textContent;
    expect(text).toContain("1");
    expect(text).toContain("/58");
  }); 

  it("Shows page 2 for offset=10, limit=10", () => {
    const { container } = renderPagination({offset: 10, limit: 10, total: 579 }); 
    expect(container.textContent).toContain("2");
  }); 

  it("Shows page 6 for offset=50, limit=10", () => {
    const { container } = renderPagination({offset: 50, limit: 10, total: 579}); 
    expect(container.textContent).toContain("6");
  }); 

  it("Shows total pages = 10 for total=100", () => {
    const { container } = renderPagination({offset:0, limit: 10, total:100}); 
    expect(container.textContent).toContain("/10");
  });

  it("Rounds up to 2 pages for total=11", () => {
    const { container } = renderPagination({offset: 0, limit: 10, total: 11}); 
    expect(container.textContent).toContain("/2");
  }); 

  it("Shows 1 page when total < limit", () => {
    const { container } = renderPagination({offset: 0, limit: 10, total: 5}); 
    expect(container.textContent).toContain("/1");
  }); 

});