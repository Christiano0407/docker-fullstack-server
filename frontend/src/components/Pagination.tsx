/**
 * = src/components/Pagination.tsx =
 * - Return 2 Pagination [Items / Páginas] -
 */
 
interface Props {
  offset: number; 
  limit: number; 
  total: number; 
  onPrev: () => void; 
  onNext: () => void; 
}

export default function Pagination({offset, limit, total, onPrev, onNext}: Props) {
  const currentPage = Math.floor(offset / limit) + 1; 
  const totalPages = Math.ceil(total / limit); 
  
  return (
    <div id="idPagination" className="pagination">
      <button
        className="page-btn"
        onClick={onPrev}
        disabled={offset === 0}
      >Prev</button>
      
      <p className="page-info">
        {currentPage}
        <span className="page-separation">/</span>
        {totalPages}
        <span className="page-total"> - {total} movies</span>
      </p>

      <button
        className="page-btn"
        onClick={onNext}
        disabled={ offset + limit >= total}
      >Next</button>
    </div>
  )
}