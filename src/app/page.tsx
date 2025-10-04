import { hnApi } from '@/lib/api';
import { sortStoriesByQuality } from '@/lib/qualityScore';
import { generatePaginationData } from '@/lib/pagination';
import { StoryCard } from '@/components/StoryCard';
import { Pagination } from '@/components/Pagination';
import { StoryListSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ErrorState';
import { Suspense } from 'react';

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search } = await searchParams;
  
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
          {search ? `Search Results for "${search}"` : (
            <>
              Latest <span className="text-orange-600">Hacker News</span> Stories
            </>
          )}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          {search 
            ? `Searching through Hacker News stories for "${search}"`
            : 'Discover the most engaging stories from Hacker News, ranked by our intelligent quality score that considers points, comments, and recency.'
          }
        </p>
      </div>

      <Suspense fallback={<StoryListSkeleton count={20} />}>
        <LatestStoriesList search={search} />
      </Suspense>
    </div>
  );
}

async function LatestStoriesList({ search }: { search?: string }) {
  try {
    let response;
    let totalPages;
    
    if (search) {
      // Search functionality
      response = await hnApi.searchStories(search, 0, 20);
      totalPages = Math.ceil(response.nbHits / 20);
    } else {
      // Get total count for pagination
      const totalResponse = await hnApi.getLatestStories(0, 100);
      totalPages = Math.ceil(totalResponse.nbHits / 20);
      
      // Get first page stories
      response = await hnApi.getLatestStories(0, 20);
    }
    
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
        
        {!search && <Pagination pagination={pagination} basePath="" />}
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