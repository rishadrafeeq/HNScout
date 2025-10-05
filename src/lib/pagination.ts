/**
 * Generate pagination data for the UI
 */
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
  pageNumbers: number[];
  startPage: number;
  endPage: number;
}

export function generatePaginationData(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): PaginationData {
  const hasNextPage = currentPage < totalPages - 1;
  const hasPreviousPage = currentPage > 0;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const previousPage = hasPreviousPage ? currentPage - 1 : null;

  // Calculate visible page range
  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    pageNumbers,
    startPage,
    endPage,
  };
}

/**
 * Validate page number and return valid page
 */
export function validatePageNumber(page: string | string[] | undefined, totalPages: number): number {
  const pageNum = Array.isArray(page) ? parseInt(page[0], 10) : parseInt(page || '1', 10);
  
  // Convert 1-based URL page to 0-based internal page
  const internalPage = pageNum - 1;
  
  if (isNaN(internalPage) || internalPage < 0) return 0;
  if (internalPage >= totalPages) return Math.max(0, totalPages - 1);
  
  return internalPage;
}
