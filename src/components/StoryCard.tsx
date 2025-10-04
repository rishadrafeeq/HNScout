import Link from 'next/link';
import { ExternalLink, MessageCircle, Clock, User, ArrowUp } from 'lucide-react';
import { ProcessedStory } from '@/types/hn';
import { QualityScoreBadge } from '@/components/ui/QualityScoreBadge';

interface StoryCardProps {
  story: ProcessedStory;
  index?: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  return (
    <article className="bg-white border border-white rounded-lg p-3 sm:p-4 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer shadow-sm">
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
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{story.points} points</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <Link 
                href={`/item/${story.objectID}`}
                className="hover:text-orange-600 transition-colors cursor-pointer"
              >
                {story.num_comments} comments
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{story.timeAgo}</span>
              <span className="sm:hidden">{story.timeAgo.split(' ')[0]}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 self-start sm:self-auto">
          <QualityScoreBadge score={story.qualityScore} />
        </div>
      </div>
    </article>
  );
}
