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
   * Search for stories with pagination
   */
  async searchStories(
    query: string = '',
    page: number = 0,
    hitsPerPage: number = 20
  ): Promise<HNSearchResponse> {
    const params = new URLSearchParams({
      query,
      tags: 'story',
      hitsPerPage: hitsPerPage.toString(),
      page: page.toString(),
    });

    const response = await fetch(`${BASE_URL}/search?${params}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.status} ${response.statusText}`);
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
}

export const hnApi = HNAlgoliaAPI.getInstance();
