'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowRight } from 'lucide-react';
import { PaginationData } from '@/lib/pagination';

interface PaginationProps {
  pagination: PaginationData;
  basePath: string;
}

// Inline Page Goto Component
function InlinePageGoto({ currentPage, totalPages, basePath }: { currentPage: number; totalPages: number; basePath: string }) {
  const [pageInput, setPageInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);
    
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage + 1) {
      // Convert 1-based page number to URL path
      const targetPage = pageNum === 1 ? basePath : `${basePath}/${pageNum}`;
      router.push(targetPage);
    }
    
    setPageInput('');
    setIsActive(false);
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isMounted) {
    return (
      <button
        className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white hover:bg-gray-50 hover:text-gray-700 transition-colors rounded-md"
        title="Go to page"
        disabled
      >
        <span className="hidden sm:inline">Go to</span>
        <span className="sm:hidden">Go</span>
      </button>
    );
  }

  if (isActive) {
    return (
      <form onSubmit={handleSubmit} className="inline-flex items-center space-x-1">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          placeholder={`1-${totalPages}`}
          className="w-16 sm:w-20 px-2 py-1 text-xs sm:text-sm border border-white rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black placeholder-gray-500"
          autoFocus
        />
        <button
          type="submit"
          className="inline-flex items-center px-2 py-1 text-xs sm:text-sm font-medium text-white bg-orange-600 border border-transparent rounded hover:bg-orange-700 transition-colors"
        >
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            setIsActive(false);
            setPageInput('');
          }}
          className="px-2 py-1 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 border border-white rounded hover:bg-gray-200 transition-colors"
        >
          ✕
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsActive(true)}
      className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white hover:bg-gray-50 hover:text-gray-700 transition-colors rounded-md"
      title="Go to page"
    >
      <span className="hidden sm:inline">Go to</span>
      <span className="sm:hidden">Go</span>
    </button>
  );
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
    // page is 0-based, but URLs are 1-based
    // page 0 = basePath (no page number in URL)
    // page 1 = basePath/2 (page 2 in URL)
    // page 2 = basePath/3 (page 3 in URL)
    return page === 0 ? basePath : `${basePath}/${page + 1}`;
  };

  return (
    <nav className="flex items-center justify-center space-x-1 mt-8 overflow-x-auto" aria-label="Pagination">
      {/* First page */}
      {startPage > 0 && (
        <>
          <Link
            href={getPageHref(0)}
            className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white rounded-l-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </>
      )}

      {/* Previous page */}
      {hasPreviousPage && (
        <Link
          href={getPageHref(previousPage!)}
          className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="ml-1 hidden sm:inline">Previous</span>
        </Link>
      )}

      {/* Page numbers */}
      {pageNumbers.map((pageNum) => {
        const isCurrentPage = pageNum === currentPage;
        return (
          <Link
            key={pageNum}
            href={getPageHref(pageNum)}
            className={`inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium border transition-colors ${
              isCurrentPage
                ? 'text-orange-600 bg-orange-50 border-orange-300'
                : 'text-gray-500 bg-white border-white hover:bg-gray-50 hover:text-gray-700'
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
          className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Go to next page"
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      )}

      {/* Last page */}
      {endPage < totalPages - 1 && (
        <Link
          href={getPageHref(totalPages - 1)}
          className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white rounded-r-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Go to last page"
        >
          <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      )}

      {/* Go to page */}
      <div className="ml-2 sm:ml-4 flex-shrink-0">
        <InlinePageGoto currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
      </div>
    </nav>
  );
}
