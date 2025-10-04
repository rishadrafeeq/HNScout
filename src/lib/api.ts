import { HNStory, HNSearchResponse, HNItemResponse, HNComment, HNAuthor, HNAuthorResponse } from '@/types/hn';

const BASE_URL = 'https://hn.algolia.com/api/v1';

export class HNAlgoliaAPI {
  private static instance: HNAlgoliaAPI;
  
  public static getInstance(): HNAlgoliaAPI {
    if (!HNAlgoliaAPI.instance) {
      HNAlgoliaAPI.instance = new HNAlgoliaAPI();
    }
    return HNAlgoliaAPI.instance;
  }

  /**
   * Search for stories with advanced filtering options
   */
  async searchStories(
    query: string = '',
    page: number = 0,
    hitsPerPage: number = 20,
    options: {
      tags?: string[];
      numericFilters?: string[];
      sortByDate?: boolean;
      author?: string;
      dateRange?: { from?: number; to?: number };
      minPoints?: number;
      minComments?: number;
    } = {}
  ): Promise<HNSearchResponse> {
    const params = new URLSearchParams({
      query,
      hitsPerPage: hitsPerPage.toString(),
      page: page.toString(),
    });

    // Add tags filter
    if (options.tags && options.tags.length > 0) {
      params.append('tags', options.tags.join(','));
    } else {
      params.append('tags', 'story'); // Default to stories only
    }

    // Add author filter
    if (options.author) {
      params.append('tags', `author_${options.author}`);
    }

    // Add numeric filters
    const numericFilters: string[] = [];
    
    if (options.minPoints) {
      numericFilters.push(`points>=${options.minPoints}`);
    }
    
    if (options.minComments) {
      numericFilters.push(`num_comments>=${options.minComments}`);
    }
    
    if (options.dateRange?.from) {
      numericFilters.push(`created_at_i>=${options.dateRange.from}`);
    }
    
    if (options.dateRange?.to) {
      numericFilters.push(`created_at_i<=${options.dateRange.to}`);
    }

    if (numericFilters.length > 0) {
      params.append('numericFilters', numericFilters.join(','));
    }

    // Choose endpoint based on sort preference
    const endpoint = options.sortByDate ? '/search_by_date' : '/search';
    
    const response = await fetch(`${BASE_URL}${endpoint}?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Search for comments with advanced filtering
   */
  async searchComments(
    query: string = '',
    page: number = 0,
    hitsPerPage: number = 20,
    options: {
      author?: string;
      storyId?: string;
      dateRange?: { from?: number; to?: number };
      minPoints?: number;
    } = {}
  ): Promise<HNSearchResponse> {
    const params = new URLSearchParams({
      query,
      tags: 'comment',
      hitsPerPage: hitsPerPage.toString(),
      page: page.toString(),
    });

    // Add author filter
    if (options.author) {
      params.append('tags', `author_${options.author}`);
    }

    // Add story filter
    if (options.storyId) {
      params.append('tags', `story_${options.storyId}`);
    }

    // Add numeric filters
    const numericFilters: string[] = [];
    
    if (options.minPoints) {
      numericFilters.push(`points>=${options.minPoints}`);
    }
    
    if (options.dateRange?.from) {
      numericFilters.push(`created_at_i>=${options.dateRange.from}`);
    }
    
    if (options.dateRange?.to) {
      numericFilters.push(`created_at_i<=${options.dateRange.to}`);
    }

    if (numericFilters.length > 0) {
      params.append('numericFilters', numericFilters.join(','));
    }

    const response = await fetch(`${BASE_URL}/search_by_date?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Search for front page stories
   */
  async searchFrontPageStories(
    query: string = '',
    page: number = 0,
    hitsPerPage: number = 20
  ): Promise<HNSearchResponse> {
    const params = new URLSearchParams({
      query,
      tags: 'front_page',
      hitsPerPage: hitsPerPage.toString(),
      page: page.toString(),
    });

    const response = await fetch(`${BASE_URL}/search?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch front page stories: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Search for stories by URL
   */
  async searchByUrl(
    url: string,
    page: number = 0,
    hitsPerPage: number = 20
  ): Promise<HNSearchResponse> {
    const params = new URLSearchParams({
      query: url,
      tags: 'story',
      restrictSearchableAttributes: 'url',
      hitsPerPage: hitsPerPage.toString(),
      page: page.toString(),
    });

    const response = await fetch(`${BASE_URL}/search?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to search by URL: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a specific item by ID
   */
  async getItem(objectID: string): Promise<HNStory | null> {
    const params = new URLSearchParams({
      query: '',
      tags: `story_${objectID}`,
      hitsPerPage: '1',
    });

    const response = await fetch(`${BASE_URL}/search?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch item: ${response.status} ${response.statusText}`);
    }

    const data: HNSearchResponse = await response.json();
    return data.hits.length > 0 ? data.hits[0] : null;
  }

  /**
   * Get comments for a specific story
   */
  async getStoryComments(storyId: string, limit: number = 5): Promise<HNComment[]> {
    const params = new URLSearchParams({
      query: '',
      tags: `comment,story_${storyId}`,
      hitsPerPage: limit.toString(),
      page: '0',
    });

    const response = await fetch(`${BASE_URL}/search?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`);
    }

    const data: HNItemResponse = await response.json();
    return data.hits.filter((hit): hit is HNComment => 
      hit._tags.includes('comment')
    );
  }

  /**
   * Get the latest stories (front page)
   */
  async getLatestStories(
    page: number = 0,
    hitsPerPage: number = 20
  ): Promise<HNSearchResponse> {
    return this.searchStories('', page, hitsPerPage);
  }

  /**
   * Get author details by username
   */
  async getAuthorDetails(username: string): Promise<HNAuthor | null> {
    try {
      const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
      
      const response = await fetch(url, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Author not found
        }
        throw new Error(`Failed to fetch author details: ${response.statusText}`);
      }

      const author: HNAuthor = await response.json();
      return author;
    } catch (error) {
      console.error('Error fetching author details:', error);
      throw error;
    }
  }

  /**
   * Get author submissions
   */
  async getAuthorSubmissions(username: string, page: number = 0, hitsPerPage: number = 20): Promise<HNSearchResponse> {
    try {
      const url = `${BASE_URL}/search?query=author_${encodeURIComponent(username)}&tags=story&page=${page}&hitsPerPage=${hitsPerPage}`;
      
      const response = await fetch(url, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch author submissions: ${response.statusText}`);
      }

      const data: HNSearchResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching author submissions:', error);
      throw error;
    }
  }

  /**
   * Get author comments
   */
  async getAuthorComments(username: string, page: number = 0, hitsPerPage: number = 20): Promise<HNSearchResponse> {
    try {
      const url = `${BASE_URL}/search?query=author_${encodeURIComponent(username)}&tags=comment&page=${page}&hitsPerPage=${hitsPerPage}`;
      
      const response = await fetch(url, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch author comments: ${response.statusText}`);
      }

      const data: HNSearchResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching author comments:', error);
      throw error;
    }
  }
}

export const hnApi = HNAlgoliaAPI.getInstance();
