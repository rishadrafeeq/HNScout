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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Link>
        </div>

        <article className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {story.title}
            </h1>
            <QualityScoreBadge score={processedStory.qualityScore} />
          </div>

          {story.url && (
            <div className="mb-4">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {processedStory.domain || 'View Original'}
              </a>
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
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
              <span>{story.num_comments} comments</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{processedStory.timeAgo}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <a
              href={`https://news.ycombinator.com/item?id=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Hacker News
            </a>
          </div>
        </article>

        {processedComments.length > 0 && (
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Latest Comments ({processedComments.length})
            </h2>
            
            <Suspense fallback={<StoryListSkeleton count={3} />}>
              <div className="space-y-4">
                {processedComments.map((comment) => (
                  <div key={comment.objectID} className="border-l-4 border-gray-200 pl-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span>•</span>
                      <span>{comment.timeAgo}</span>
                      {comment.points > 0 && (
                        <>
                          <span>•</span>
                          <span>{comment.points} points</span>
                        </>
                      )}
                    </div>
                    <div 
                      className="text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: comment.comment_text }}
                    />
                  </div>
                ))}
              </div>
            </Suspense>

            {story.num_comments > 5 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={`https://news.ycombinator.com/item?id=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
