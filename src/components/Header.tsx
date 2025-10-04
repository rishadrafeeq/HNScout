import Link from 'next/link';
import { Zap } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';

export function Header() {
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
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Latest Stories
              </Link>
              <span className="text-gray-400 text-sm">
                Browse pages below ↓
              </span>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FilterDropdown />
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
