import Link from 'next/link';
import { ExternalLink, MessageCircle, Clock, User, ArrowUp } from 'lucide-react';
import { ProcessedStory } from '@/types/hn';
import { QualityScoreBadge } from '@/components/ui/QualityScoreBadge';

interface StoryCardProps {
  story: ProcessedStory;
  index?: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on external links or quality badge
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('[data-no-navigate]')) {
      return;
    }
    
    // Navigate to detail page
    window.location.href = `/item/${story.objectID}`;
  };

  return (
    <article 
      className="bg-white border border-white rounded-lg p-3 sm:p-4 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer shadow-sm"
      onClick={handleCardClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            {index !== undefined && (
              <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1 min-w-[1.5rem] sm:min-w-[2rem]">
                #{index + 1}
              </span>
            )}
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
              {story.url ? (
                <Link 
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors cursor-pointer"
                >
                  {story.title}
                </Link>
              ) : (
                <Link 
                  href={`/item/${story.objectID}`}
                  className="hover:text-orange-600 transition-colors cursor-pointer"
                >
                  {story.title}
                </Link>
              )}
            </h2>
          </div>
          
          {story.url && (
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-600">
                {story.domain || 'Unknown domain'}
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{story.points} points</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <Link 
                href={`/item/${story.objectID}`}
                className="hover:text-orange-600 transition-colors cursor-pointer truncate"
              >
                {story.num_comments} comments
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline truncate">{story.timeAgo}</span>
              <span className="sm:hidden truncate">{story.timeAgo.split(' ')[0]}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 self-start sm:self-auto" data-no-navigate>
          <QualityScoreBadge score={story.qualityScore} />
        </div>
      </div>
    </article>
  );
}
