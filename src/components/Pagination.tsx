import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationData } from '@/lib/pagination';

interface PaginationProps {
  pagination: PaginationData;
  basePath: string;
}

export function Pagination({ pagination, basePath }: PaginationProps) {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    pageNumbers,
    startPage,
    endPage,
  } = pagination;

  if (totalPages <= 1) return null;

  const getPageHref = (page: number) => {
    return page === 0 ? basePath : `${basePath}/${page + 1}`;
  };

  return (
    <nav className="flex items-center justify-center space-x-1 mt-8" aria-label="Pagination">
      {/* First page */}
      {startPage > 0 && (
        <>
          <Link
            href={getPageHref(0)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Link>
        </>
      )}

      {/* Previous page */}
      {hasPreviousPage && (
        <Link
          href={getPageHref(previousPage!)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="ml-1">Previous</span>
        </Link>
      )}

      {/* Page numbers */}
      {pageNumbers.map((pageNum) => {
        const isCurrentPage = pageNum === currentPage;
        return (
          <Link
            key={pageNum}
            href={getPageHref(pageNum)}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium border transition-colors ${
              isCurrentPage
                ? 'text-blue-600 bg-blue-50 border-blue-300'
                : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            }`}
            aria-label={`Go to page ${pageNum + 1}`}
            aria-current={isCurrentPage ? 'page' : undefined}
          >
            {pageNum + 1}
          </Link>
        );
      })}

      {/* Next page */}
      {hasNextPage && (
        <Link
          href={getPageHref(nextPage!)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Go to next page"
        >
          <span className="mr-1">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}

      {/* Last page */}
      {endPage < totalPages - 1 && (
        <Link
          href={getPageHref(totalPages - 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Go to last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
}
