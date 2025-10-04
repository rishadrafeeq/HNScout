'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Filter } from 'lucide-react';

export type SortField = 'timeAgo' | 'points' | 'comments';
export type SortOrder = 'asc' | 'desc';

function FilterDropdownContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get current filter values from URL params
  const currentSortBy = (searchParams.get('sortBy') as SortField) || 'points';
  const currentSortOrder = (searchParams.get('sortOrder') as SortOrder) || 'desc';

  const handleFilterChange = (sortBy: SortField, sortOrder: SortOrder) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    
    // Remove search params if we're changing sort (to avoid confusion)
    if (params.has('search')) {
      params.delete('search');
    }
    
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  const getSortLabel = (field: SortField) => {
    switch (field) {
      case 'timeAgo': return 'Time';
      case 'points': return 'Points';
      case 'comments': return 'Comments';
      default: return 'Points';
    }
  };

  const getOrderLabel = (order: SortOrder) => {
    return order === 'asc' ? 'Ascending' : 'Descending';
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative">
        <button
          className="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white rounded-lg hover:bg-gray-50 transition-colors"
          disabled
        >
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-[300]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-white rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-w-0"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
        <span className="hidden sm:inline">Sort by {getSortLabel(currentSortBy)}</span>
        <span className="sm:hidden text-xs">Sort</span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 sm:w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[200] max-w-[calc(100vw-1rem)] sm:max-w-none">
            <div className="p-4 sm:p-4">
              <h3 className="text-base sm:text-sm font-semibold text-gray-900 mb-4 sm:mb-3">Sort Stories</h3>
              
              {/* Sort by field */}
              <div className="mb-5 sm:mb-4">
                <label className="block text-base sm:text-xs font-medium text-gray-700 mb-3 sm:mb-2">
                  Sort by
                </label>
                <div className="space-y-2">
                  {(['points', 'comments', 'timeAgo'] as SortField[]).map((field) => (
                    <button
                      key={field}
                      onClick={() => handleFilterChange(field, currentSortOrder)}
                      className={`w-full text-left px-4 py-4 sm:py-2 text-base sm:text-sm rounded-md transition-colors ${
                        currentSortBy === field
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                      }`}
                    >
                      {getSortLabel(field)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort order */}
              <div>
                <label className="block text-base sm:text-xs font-medium text-gray-700 mb-3 sm:mb-2">
                  Order
                </label>
                <div className="space-y-2">
                  {(['desc', 'asc'] as SortOrder[]).map((order) => (
                    <button
                      key={order}
                      onClick={() => handleFilterChange(currentSortBy, order)}
                      className={`w-full text-left px-4 py-4 sm:py-2 text-base sm:text-sm rounded-md transition-colors ${
                        currentSortOrder === order
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                      }`}
                    >
                      {getOrderLabel(order)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current selection summary */}
              <div className="mt-5 sm:mt-4 pt-4 sm:pt-3 border-t border-gray-200">
                <p className="text-sm sm:text-xs text-gray-500 leading-relaxed">
                  Currently sorting by <span className="font-medium text-gray-700">{getSortLabel(currentSortBy)}</span> in <span className="font-medium text-gray-700">{getOrderLabel(currentSortOrder)}</span> order
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function FilterDropdown() {
  return (
    <Suspense fallback={
      <div className="relative">
        <button
          className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white rounded-lg hover:bg-gray-50 transition-colors min-w-0"
          disabled
        >
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="hidden sm:inline">Filter</span>
          <span className="sm:hidden text-xs">Sort</span>
        </button>
      </div>
    }>
      <FilterDropdownContent />
    </Suspense>
  );
}
