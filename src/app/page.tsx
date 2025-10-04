import { hnApi } from '@/lib/api';
import { sortStoriesByQuality } from '@/lib/qualityScore';
import { generatePaginationData } from '@/lib/pagination';
import { StoryCard } from '@/components/StoryCard';
import { Pagination } from '@/components/Pagination';
import { StoryListSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ErrorState';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<StoryListSkeleton count={20} />}>
        <LatestStoriesList />
      </Suspense>
    </div>
  );
}

async function LatestStoriesList() {
  try {
    // Get total count for pagination
    const totalResponse = await hnApi.getLatestStories(0, 100);
    const totalPages = Math.ceil(totalResponse.nbHits / 20);
    
    // Get first page stories
    const response = await hnApi.getLatestStories(0, 20);
    const processedStories = sortStoriesByQuality(response.hits);
    
    // Generate pagination data
    const pagination = generatePaginationData(0, totalPages);

    return (
      <>
        <div className="space-y-4">
          {processedStories.map((story, index) => (
            <StoryCard key={story.objectID} story={story} index={index} />
          ))}
        </div>
        
        <Pagination pagination={pagination} basePath="" />
      </>
    );
  } catch {
    return (
      <ErrorState
        title="Failed to load stories"
        message="We encountered an error while fetching the latest stories. Please try again later."
      />
    );
  }
}