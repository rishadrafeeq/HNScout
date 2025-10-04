import Link from 'next/link';
import { ExternalLink, MessageCircle, Clock, ArrowUp } from 'lucide-react';
import { ProcessedStory } from '@/types/hn';
import { QualityScoreBadge } from '@/components/ui/QualityScoreBadge';

interface StoryCardProps {
  story: ProcessedStory;
  index?: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  return (
    <article className={`border rounded-lg p-4 bg-white ${
      index === 0 ? 'border-[#ff6600]' : 'border-[#dcdcdc]'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[#333333] leading-tight mb-2">
            {story.url ? (
              <Link 
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff6600] transition-colors"
              >
                {story.title}
              </Link>
            ) : (
              <Link 
                href={`/item/${story.objectID}`}
                className="hover:text-[#ff6600] transition-colors"
              >
                {story.title}
              </Link>
            )}
          </h2>
          
          <div className="flex items-center gap-4 text-sm text-[#666666] mb-2">
            <div className="flex items-center gap-1">
              <ArrowUp className="w-4 h-4" />
              <span>{story.points}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <Link 
                href={`/item/${story.objectID}`}
                className="hover:text-[#ff6600] transition-colors"
              >
                {story.num_comments}
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{story.timeAgo}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#999999]">by {story.author}</span>
            {story.url && (
              <div className="flex items-center gap-1">
                <ExternalLink className="w-4 h-4 text-[#ff6600]" />
                <span className="text-sm text-[#ff6600]">
                  {story.domain || 'Unknown domain'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <QualityScoreBadge score={story.qualityScore} />
        </div>
      </div>
    </article>
  );
}
