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
    <article className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            {index !== undefined && (
              <span className="text-sm font-medium text-gray-500 mt-1 min-w-[2rem]">
                #{index + 1}
              </span>
            )}
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {story.url ? (
                <Link 
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {story.title}
                </Link>
              ) : (
                <Link 
                  href={`/item/${story.objectID}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {story.title}
                </Link>
              )}
            </h2>
          </div>
          
          {story.url && (
            <div className="flex items-center gap-2 mb-3">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {story.domain || 'Unknown domain'}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="w-4 h-4" />
              <span>{story.points} points</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <Link 
                href={`/item/${story.objectID}`}
                className="hover:text-blue-600 transition-colors"
              >
                {story.num_comments} comments
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{story.timeAgo}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <QualityScoreBadge score={story.qualityScore} />
        </div>
      </div>
    </article>
  );
}
