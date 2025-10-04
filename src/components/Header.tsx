import Link from 'next/link';
import { Search, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-orange-500" />
              <h1 className="text-xl font-bold text-gray-900">HN Scout</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Latest Stories
              </Link>
              <Link 
                href="/1" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse Pages
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <Search className="w-4 h-4" />
              <span>Powered by Hacker News API</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
