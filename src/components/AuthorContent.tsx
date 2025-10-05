'use client';

import { useState, useEffect } from 'react';
import { hnApi } from '@/lib/api';
import { HNStory, HNComment } from '@/types/hn';
import { processStories, ProcessedStory } from '@/lib/qualityScore';
import { StoryCard } from './StoryCard';
import { ErrorState } from './ErrorState';
import { StoryListSkeleton } from './ui/Skeleton';
import { Pagination } from './Pagination';
import { generatePaginationData } from '@/lib/pagination';
import { FileText, MessageSquare, Clock, ArrowUp, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AuthorContentProps {
  username: string;
  type: 'submissions' | 'comments';
}

interface CommentCardProps {
  comment: HNComment;
}

function CommentCard({ comment }: CommentCardProps) {
  const timeAgo = formatDistanceToNow(new Date(comment.created_at_i * 1000), { addSuffix: true });
  
  // Strip HTML tags for preview
  const getTextPreview = (html: string, maxLength: number = 200) => {
    if (!html) return 'No content available';
    const text = html.replace(/<[^>]*>/g, '').trim();
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
          <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{comment.points} points</span>
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          <span className="hidden sm:inline">{timeAgo}</span>
          <span className="sm:hidden">{timeAgo.split(' ')[0]}</span>
        </div>
        <a
          href={`https://news.ycombinator.com/item?id=${comment.parent_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div 
          className="text-gray-700 leading-relaxed text-xs sm:text-sm"
          dangerouslySetInnerHTML={{ 
            __html: getTextPreview(comment.comment_text || '', 300) 
          }}
        />
      </div>
    </div>
  );
}

export function AuthorContent({ username, type }: AuthorContentProps) {
  const [content, setContent] = useState<ProcessedStory[] | HNComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  const fetchContent = async (page: number = 0) => {
    try {
      setIsLoading(true);
      setError(null);

      if (type === 'submissions') {
        const response = await hnApi.getAuthorSubmissions(username, page, 20);
        const processedStories = processStories(response.hits);
        setContent(processedStories);
        setTotalPages(Math.ceil(response.nbHits / 20));
        setTotalHits(response.nbHits);
      } else {
        const response = await hnApi.getAuthorComments(username, page, 20);
        setContent(response.hits.filter((hit): hit is HNComment => 
          hit._tags.includes('comment')
        ));
        setTotalPages(Math.ceil(response.nbHits / 20));
        setTotalHits(response.nbHits);
      }
    } catch (err) {
      console.error(`Error fetching author ${type}:`, err);
      setError(`Failed to load ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(currentPage);
  }, [username, type, currentPage]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          {type === 'submissions' ? (
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          ) : (
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          )}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {type === 'submissions' ? 'Submissions' : 'Comments'} ({totalHits.toLocaleString()})
          </h3>
        </div>
        <StoryListSkeleton count={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          {type === 'submissions' ? (
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          ) : (
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          )}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {type === 'submissions' ? 'Submissions' : 'Comments'}
          </h3>
        </div>
        <ErrorState
          title={`Failed to load ${type}`}
          message="We encountered an error while fetching the content. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {type === 'submissions' ? (
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
        ) : (
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        )}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {type === 'submissions' ? 'Submissions' : 'Comments'} ({totalHits.toLocaleString()})
        </h3>
      </div>

      {content.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            {type === 'submissions' ? (
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
            ) : (
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
            )}
          </div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No {type} found
          </h4>
          <p className="text-sm sm:text-base text-gray-500">
            This author hasn't made any {type === 'submissions' ? 'submissions' : 'comments'} yet.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {type === 'submissions' ? (
              (content as ProcessedStory[]).map((story, index) => (
                <StoryCard key={story.objectID} story={story} index={index} />
              ))
            ) : (
              (content as HNComment[]).map((comment) => (
                <CommentCard key={comment.objectID} comment={comment} />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <Pagination 
              pagination={generatePaginationData(currentPage, totalPages)}
              basePath={`/author/${encodeURIComponent(username)}/${type}`}
            />
          )}
        </>
      )}
    </div>
  );
}
