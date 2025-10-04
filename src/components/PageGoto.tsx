'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface PageGotoProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function PageGoto({ currentPage, totalPages, basePath }: PageGotoProps) {
  const [pageInput, setPageInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput, 10);
    
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage + 1) {
      const targetPage = pageNum === 1 ? basePath : `${basePath}/${pageNum}`;
      router.push(targetPage);
    }
    
    setPageInput('');
    setIsOpen(false);
  };

  const toggleGoto = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus the input when opening
      setTimeout(() => {
        const input = document.getElementById('page-goto-input');
        if (input) input.focus();
      }, 100);
    }
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isMounted) {
    return (
      <div className="relative">
        <button
          className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white hover:bg-gray-50 hover:text-gray-700 transition-colors rounded-md"
          title="Go to page"
          disabled
        >
          <span className="hidden sm:inline">Go to</span>
          <span className="sm:hidden">Go</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleGoto}
        className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-white hover:bg-gray-50 hover:text-gray-700 transition-colors rounded-md"
        title="Go to page"
      >
        <span className="hidden sm:inline">Go to</span>
        <span className="sm:hidden">Go</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 sm:right-auto sm:left-0 bg-white border border-white rounded-lg shadow-lg p-3 sm:p-4 z-10 min-w-[180px] sm:min-w-[200px]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="page-goto-input" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Go to page
              </label>
              <input
                id="page-goto-input"
                type="number"
                min="1"
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                placeholder={`1-${totalPages}`}
                className="w-full px-2 sm:px-3 py-2 border border-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current: {currentPage + 1} of {totalPages}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Go
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setPageInput('');
                }}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 border border-white rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
