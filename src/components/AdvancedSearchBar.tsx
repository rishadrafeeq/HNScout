'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Calendar, User, TrendingUp, MessageCircle, X } from 'lucide-react';

interface SearchFilters {
  query: string;
  contentType: 'all' | 'stories' | 'comments' | 'polls' | 'ask_hn' | 'show_hn';
  sortBy: 'relevance' | 'date' | 'points' | 'comments';
  author?: string;
  minPoints?: number;
  minComments?: number;
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export function AdvancedSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('search') || '',
    contentType: (searchParams.get('type') as any) || 'stories',
    sortBy: (searchParams.get('sortBy') as any) || 'relevance',
    author: searchParams.get('author') || '',
    minPoints: searchParams.get('minPoints') ? parseInt(searchParams.get('minPoints')!) : undefined,
    minComments: searchParams.get('minComments') ? parseInt(searchParams.get('minComments')!) : undefined,
    dateRange: {
      from: searchParams.get('dateFrom') || '',
      to: searchParams.get('dateTo') || '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if any filters have been modified from their initial state
  const hasModifiedFilters = filters.author || filters.minPoints || filters.minComments || 
    filters.dateRange?.from || filters.dateRange?.to || 
    filters.contentType !== 'stories' || filters.sortBy !== 'relevance';

  // Close filters when clicking outside, but only if no filters are selected
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        // Only close if no filters have been modified from their initial state
        if (!hasModifiedFilters) {
          setShowFilters(false);
        }
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters, hasModifiedFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filters.query.trim()) return;

    const params = new URLSearchParams();
    
    if (filters.query.trim()) {
      params.set('search', filters.query.trim());
    }
    
    if (filters.contentType !== 'stories') {
      params.set('type', filters.contentType);
    }
    
    if (filters.sortBy !== 'relevance') {
      params.set('sortBy', filters.sortBy);
    }
    
    if (filters.author) {
      params.set('author', filters.author);
    }
    
    if (filters.minPoints) {
      params.set('minPoints', filters.minPoints.toString());
    }
    
    if (filters.minComments) {
      params.set('minComments', filters.minComments.toString());
    }
    
    if (filters.dateRange?.from) {
      params.set('dateFrom', filters.dateRange.from);
    }
    
    if (filters.dateRange?.to) {
      params.set('dateTo', filters.dateRange.to);
    }

    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      contentType: 'stories',
      sortBy: 'relevance',
      author: '',
      minPoints: undefined,
      minComments: undefined,
      dateRange: { from: '', to: '' },
    });
    router.push('/');
  };

  const hasActiveFilters = filters.author || filters.minPoints || filters.minComments || 
    filters.dateRange?.from || filters.dateRange?.to || filters.contentType !== 'stories' || 
    filters.sortBy !== 'relevance';

  if (!isMounted) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="w-20 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="pl-7 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-32 sm:w-48 md:w-64 text-xs sm:text-sm text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">Go</span>
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-colors text-xs sm:text-sm ${
            showFilters || hasActiveFilters
              ? 'bg-orange-100 border-orange-300 text-orange-700'
              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </form>

      {/* Advanced Filters Dropdown */}
      {showFilters && (
        <div ref={filterRef} className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-3 sm:p-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Type
                </label>
                <select
                  value={filters.contentType}
                  onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                >
                  <option value="stories">Stories</option>
                  <option value="comments">Comments</option>
                  <option value="polls">Polls</option>
                  <option value="ask_hn">Ask HN</option>
                  <option value="show_hn">Show HN</option>
                  <option value="all">All Content</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date (Newest First)</option>
                  <option value="points">Points (Highest First)</option>
                  <option value="comments">Comments (Most First)</option>
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={filters.author}
                  onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                />
              </div>

              {/* Min Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Min Points
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPoints || ''}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    minPoints: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                />
              </div>

              {/* Min Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  Min Comments
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minComments || ''}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    minComments: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date Range
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="date"
                    placeholder="From"
                    value={filters.dateRange?.from || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, from: e.target.value }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                  />
                  <input
                    type="date"
                    placeholder="To"
                    value={filters.dateRange?.to || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, to: e.target.value }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-black"
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-gray-200 space-y-2 sm:space-y-0">
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All Filters
              </button>
              <div className="text-sm text-gray-500">
                {hasActiveFilters && 'Active filters applied'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
