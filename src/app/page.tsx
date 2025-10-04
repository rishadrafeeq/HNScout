import { hnApi } from '@/lib/api';
import { sortStoriesByQuality, sortStoriesByField, SortField, SortOrder } from '@/lib/qualityScore';
import { generatePaginationData } from '@/lib/pagination';
import { StoryCard } from '@/components/StoryCard';
import { Pagination } from '@/components/Pagination';
import { StoryListSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ErrorState';
import { Suspense } from 'react';

interface HomeProps {
  searchParams: Promise<{ 
    search?: string; 
    sortBy?: string; 
    sortOrder?: string;
    type?: string;
    author?: string;
    minPoints?: string;
    minComments?: string;
    dateFrom?: string;
    dateTo?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { 
    search, 
    sortBy, 
    sortOrder, 
    type, 
    author, 
    minPoints, 
    minComments, 
    dateFrom, 
    dateTo 
  } = await searchParams;
  
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
          {search ? `Search Results for "${search}"` : (
            sortBy === 'timeAgo' && sortOrder === 'asc' ? (
              <>
                Latest <span className="text-orange-600">Hacker News</span> Stories
              </>
            ) : (
              <>
                <span className="text-orange-600">Hacker News</span> Stories
              </>
            )
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
        <LatestStoriesList 
          search={search} 
          sortBy={sortBy} 
          sortOrder={sortOrder}
          type={type}
          author={author}
          minPoints={minPoints}
          minComments={minComments}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </Suspense>
    </div>
  );
}

async function LatestStoriesList({ 
  search, 
  sortBy, 
  sortOrder,
  type,
  author,
  minPoints,
  minComments,
  dateFrom,
  dateTo
}: { 
  search?: string; 
  sortBy?: string; 
  sortOrder?: string;
  type?: string;
  author?: string;
  minPoints?: string;
  minComments?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  try {
    let response;
    let totalPages;
    
    if (search) {
      // Advanced search functionality
      const searchOptions = {
        tags: type && type !== 'all' ? [type] : undefined,
        author: author,
        minPoints: minPoints ? parseInt(minPoints) : undefined,
        minComments: minComments ? parseInt(minComments) : undefined,
        sortByDate: sortBy === 'date',
        dateRange: {
          from: dateFrom ? Math.floor(new Date(dateFrom).getTime() / 1000) : undefined,
          to: dateTo ? Math.floor(new Date(dateTo).getTime() / 1000) : undefined,
        },
      };

      // Choose appropriate search method based on content type
      if (type === 'comments') {
        response = await hnApi.searchComments(search, 0, 20, searchOptions);
      } else if (type === 'front_page') {
        response = await hnApi.searchFrontPageStories(search, 0, 20);
      } else {
        response = await hnApi.searchStories(search, 0, 20, searchOptions);
      }
      
      totalPages = Math.ceil(response.nbHits / 20);
    } else {
      // Get total count for pagination
      const totalResponse = await hnApi.getLatestStories(0, 100);
      totalPages = Math.ceil(totalResponse.nbHits / 20);
      
      // Get first page stories
      response = await hnApi.getLatestStories(0, 20);
    }
    
    // Process stories and apply sorting
    let processedStories = sortStoriesByQuality(response.hits);
    
    // Apply custom sorting if specified
    if (sortBy && sortOrder) {
      const validSortBy = (['points', 'comments', 'timeAgo'] as SortField[]).includes(sortBy as SortField) 
        ? sortBy as SortField 
        : 'points';
      const validSortOrder = (['asc', 'desc'] as SortOrder[]).includes(sortOrder as SortOrder) 
        ? sortOrder as SortOrder 
        : 'desc';
      
      processedStories = sortStoriesByField(processedStories, validSortBy, validSortOrder);
    }
    
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