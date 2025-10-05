import { hnApi } from '@/lib/api';
import { ErrorState } from '@/components/ErrorState';
import { AuthorTabs } from '@/components/AuthorTabs';
import { User, Calendar, Trophy, MessageSquare, FileText, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { notFound } from 'next/navigation';

function formatAuthorJoinDate(createdAt: string | number): string {
  try {
    let date: Date;
    
    if (typeof createdAt === 'string') {
      // Try parsing as ISO string first
      const parsed = new Date(createdAt);
      if (!isNaN(parsed.getTime())) {
        date = parsed;
      } else {
        // Try parsing as timestamp string
        const timestamp = parseInt(createdAt);
        if (isNaN(timestamp)) {
          return 'Unknown';
        }
        date = new Date(timestamp > 1000000000000 ? timestamp : timestamp * 1000);
      }
    } else {
      // Handle numeric timestamp
      date = new Date(createdAt > 1000000000000 ? createdAt : createdAt * 1000);
    }
    
    if (isNaN(date.getTime())) {
      return 'Unknown';
    }
    
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting author join date:', error);
    return 'Unknown';
  }
}

interface AuthorPageProps {
  params: Promise<{ username: string; type: string; page: string }>;
}

export const dynamic = 'force-dynamic';

export default async function AuthorTypePagePage({ params }: AuthorPageProps) {
  const { username, type, page } = await params;

  // Validate type parameter
  if (!['submissions', 'comments'].includes(type)) {
    notFound();
  }

  // Validate and parse page number
  const pageNum = parseInt(page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  try {
    const author = await hnApi.getAuthorDetails(username);

    if (!author) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
          {/* Author Header */}
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {author.username}
              </h1>
              
              {author.about && (
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: author.about }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Author Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {author.karma.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Karma</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {author.submission_count?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Submissions</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <MessageSquare className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {author.comment_count?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {formatAuthorJoinDate(author.created_at)}
              </div>
              <div className="text-sm text-gray-600">Member since</div>
            </div>
          </div>

          {/* Additional Info */}
          {(author.avg || author.delay) && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {author.avg && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Average Score</div>
                      <div className="font-medium text-gray-900">{author.avg.toFixed(1)}</div>
                    </div>
                  </div>
                )}
                
                {author.delay !== undefined && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Delay (minutes)</div>
                      <div className="font-medium text-gray-900">{author.delay}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* External Link */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-center">
              <a
                href={`https://news.ycombinator.com/user?id=${author.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                View on Hacker News
              </a>
            </div>
          </div>
        </div>

        {/* Author Content Tabs */}
        <AuthorTabs username={author.username} />
      </div>
    );
  } catch (error) {
    console.error('Error loading author details:', error);
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
        <ErrorState
          title="Failed to load author details"
          message="We encountered an error while fetching the author information. Please try again later."
        />
      </div>
    );
  }
}
