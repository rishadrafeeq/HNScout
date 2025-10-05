import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, MessageCircle, Clock, User, ArrowUp, ArrowLeft } from 'lucide-react';
import { hnApi } from '@/lib/api';
import { processStory, processComment } from '@/lib/qualityScore';
import { QualityScoreBadge } from '@/components/ui/QualityScoreBadge';
import { StoryListSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ErrorState';
import { Suspense } from 'react';

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;

  try {
    const [story, comments] = await Promise.all([
      hnApi.getItem(id),
      hnApi.getStoryComments(id, 5)
    ]);

    if (!story) {
      notFound();
    }

    const processedStory = processStory(story);
    const processedComments = comments.map(processComment);

    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
        <div className="mb-4 sm:mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back to Stories
          </Link>
        </div>

        <article className="bg-white rounded-lg border border-white p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
              {story.title}
            </h1>
            <div className="self-start sm:self-auto">
              <QualityScoreBadge score={processedStory.qualityScore} />
            </div>
          </div>

          {story.url && (
            <div className="mb-3 sm:mb-4">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {processedStory.domain || 'View Original'}
              </a>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
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
              <span>{story.num_comments} comments</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{processedStory.timeAgo || 'Unknown'}</span>
              <span className="sm:hidden">{processedStory.timeAgo ? processedStory.timeAgo.split(' ')[0] : 'Unknown'}</span>
            </div>
          </div>

          <div className="border-t border-white pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
            <Link
              href={`/author/${encodeURIComponent(story.author)}`}
              className="inline-flex items-center justify-center bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <User className="w-4 h-4 mr-2" />
              About Author
            </Link>
            <a
              href={`https://news.ycombinator.com/item?id=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Hacker News
            </a>
          </div>
        </article>

        {processedComments.length > 0 && (
          <section className="bg-white rounded-lg border border-white p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Latest Comments ({processedComments.length})
            </h2>
            
            <Suspense fallback={<StoryListSkeleton count={3} />}>
              <div className="space-y-4">
                {processedComments.map((comment) => (
                  <div key={comment.objectID} className="border-l-4 border-white pl-3 sm:pl-4">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{comment.timeAgo || 'Unknown'}</span>
                      <span className="sm:hidden">{comment.timeAgo ? comment.timeAgo.split(' ')[0] : 'Unknown'}</span>
                      {comment.points > 0 && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="text-xs sm:text-sm">{comment.points} points</span>
                        </>
                      )}
                    </div>
                    <div 
                      className="text-gray-700 prose prose-sm max-w-none text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: comment.comment_text }}
                    />
                  </div>
                ))}
              </div>
            </Suspense>

            {story.num_comments > 5 && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white">
                <a
                  href={`https://news.ycombinator.com/item?id=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View all {story.num_comments} comments on Hacker News →
                </a>
              </div>
            )}
          </section>
        )}
      </div>
    );
  } catch {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
        <ErrorState
          title="Failed to load story"
          message="We encountered an error while fetching the story. Please try again later."
        />
      </div>
    );
  }
}

// Disable static generation for dynamic content
export const dynamic = 'force-dynamic';
