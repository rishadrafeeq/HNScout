'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Bookmark, Clock, Info } from 'lucide-react';
import { AdvancedSearchBar } from './AdvancedSearchBar';
import { FilterDropdown } from './FilterDropdown';

function HeaderContent() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLatestStoriesClick = () => {
    // Navigate to home with latest stories sort (time ascending = newest first)
    router.push('/?sortBy=timeAgo&sortOrder=asc');
  };

  return (
    <header className="bg-white border-b border-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">HN Scout</h1>
            </Link>
            <nav className="hidden lg:flex items-center space-x-6">
              {isMounted ? (
                <button
                  onClick={handleLatestStoriesClick}
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span>Latest Stories</span>
                </button>
              ) : (
                <span className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Latest Stories</span>
                </span>
              )}
              <Link
                href="/reading-list"
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                <span>Reading List</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <div className="hidden sm:block">
              <FilterDropdown />
            </div>
            <AdvancedSearchBar />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-100 py-2">
          <div className="flex items-center justify-center space-x-4">
            {isMounted ? (
              <button
                onClick={handleLatestStoriesClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors text-sm"
              >
                <Clock className="w-4 h-4" />
                <span>Latest</span>
              </button>
            ) : (
              <span className="flex items-center space-x-1 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>Latest</span>
              </span>
            )}
            <Link
              href="/reading-list"
              className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors text-sm"
            >
              <Bookmark className="w-4 h-4" />
              <span>Reading List</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors text-sm"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <div className="sm:hidden">
              <FilterDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={
      <header className="bg-white border-b border-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">HN Scout</h1>
              </Link>
              <nav className="hidden lg:flex items-center space-x-6">
                <span className="text-gray-600">Latest Stories</span>
                <span className="text-gray-600">Reading List</span>
                <span className="text-gray-600">About</span>
              </nav>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              <div className="hidden sm:block w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="lg:hidden border-t border-gray-100 py-2">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-gray-600 text-sm">Latest</span>
              <span className="text-gray-600 text-sm">Reading List</span>
              <span className="text-gray-600 text-sm">About</span>
              <div className="sm:hidden w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}
