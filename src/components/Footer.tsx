import Link from 'next/link';
import { Github, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HN</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">HN Scout</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover the most engaging stories from Hacker News with intelligent quality scoring 
              and a clean, distraction-free reading experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Navigation
            </h4>
            <nav className="space-y-2">
              <Link 
                href="/" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/reading-list" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Reading List
              </Link>
              <Link 
                href="/?sortBy=timeAgo&sortOrder=asc" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Latest Stories
              </Link>
              <Link 
                href="/about" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Legal & External Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Legal & Resources
            </h4>
            <div className="space-y-2">
              <Link 
                href="/privacy" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <a 
                href="https://github.com/hnscout/hnscout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://hn.algolia.com/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                <span>Hacker News API</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
