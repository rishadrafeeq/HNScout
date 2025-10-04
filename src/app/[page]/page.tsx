import { notFound } from 'next/navigation';
import { hnApi } from '@/lib/api';
import { sortStoriesByQuality } from '@/lib/qualityScore';
import { generatePaginationData, validatePageNumber } from '@/lib/pagination';
import { StoryCard } from '@/components/StoryCard';
import { Pagination } from '@/components/Pagination';
import { StoryListSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ErrorState';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function PaginatedPage({ params }: PageProps) {
  const { page } = await params;
  
  try {
    const response = await hnApi.getLatestStories(0, 100); // Get a smaller number to calculate total pages
    const totalPages = Math.ceil(response.nbHits / 20);
    const currentPage = validatePageNumber(page, totalPages);
    
    // Fetch the actual page data
    const pageResponse = await hnApi.getLatestStories(currentPage, 20);
    
    if (pageResponse.hits.length === 0) {
      notFound();
    }

    const pagination = generatePaginationData(currentPage, totalPages);
    const processedStories = sortStoriesByQuality(pageResponse.hits);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hacker News Stories - Page {currentPage + 1}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through {response.nbHits.toLocaleString()} stories, ranked by quality score.
          </p>
        </div>

        <Suspense fallback={<StoryListSkeleton count={20} />}>
          <div className="space-y-4">
            {processedStories.map((story, index) => (
              <StoryCard 
                key={story.objectID} 
                story={story} 
                index={index + (currentPage * 20)} 
              />
            ))}
          </div>
        </Suspense>

        <Pagination pagination={pagination} basePath="" />
      </div>
    );
  } catch {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <ErrorState
          title="Failed to load stories"
          message="We encountered an error while fetching the stories. Please try again later."
        />
      </div>
    );
  }
}

// Disable static generation for now due to API size limits
export const dynamic = 'force-dynamic';
