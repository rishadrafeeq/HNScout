'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // For now, we'll search within the current page
      // In a full implementation, this would call the API with search terms
      router.push(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center space-x-1 sm:space-x-2">
        <div className="relative">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <div
            className="pl-7 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 border border-white rounded-lg w-32 sm:w-48 md:w-64 text-xs sm:text-sm bg-gray-100 text-gray-500"
          >
            Search...
          </div>
        </div>
        <div
          className="bg-gray-400 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm inline-flex items-center"
        >
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">Go</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-1 sm:space-x-2">
      <div className="relative">
        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-7 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 border border-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-32 sm:w-48 md:w-64 text-xs sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-orange-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs sm:text-sm"
      >
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden">Go</span>
      </button>
    </form>
  );
}
