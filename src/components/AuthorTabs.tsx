'use client';

import { useState } from 'react';
import { AuthorContent } from './AuthorContent';
import { FileText, MessageSquare } from 'lucide-react';

interface AuthorTabsProps {
  username: string;
}

export function AuthorTabs({ username }: AuthorTabsProps) {
  const [activeTab, setActiveTab] = useState<'submissions' | 'comments'>('submissions');

  return (
    <div className="mt-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'submissions'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Submissions
            </div>
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'comments'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comments
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <AuthorContent username={username} type={activeTab} />
    </div>
  );
}
