import { ProcessedStory, SavedStory, ReadingList } from '@/types/hn';

const READING_LIST_KEY = 'hn-scout-reading-list';
const MAX_SAVED_STORIES = 100; // Limit to prevent localStorage bloat

export function getReadingList(): ReadingList {
  if (typeof window === 'undefined') {
    return { stories: [], lastUpdated: 0 };
  }

  try {
    const stored = localStorage.getItem(READING_LIST_KEY);
    if (!stored) {
      return { stories: [], lastUpdated: 0 };
    }

    const parsed = JSON.parse(stored) as ReadingList;
    return {
      stories: parsed.stories || [],
      lastUpdated: parsed.lastUpdated || 0,
    };
  } catch (error) {
    console.error('Error reading reading list from localStorage:', error);
    return { stories: [], lastUpdated: 0 };
  }
}

export function saveToReadingList(story: ProcessedStory): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const readingList = getReadingList();
    
    // Check if story is already saved
    const existingIndex = readingList.stories.findIndex(
      (savedStory) => savedStory.objectID === story.objectID
    );

    if (existingIndex !== -1) {
      // Update the existing story with current data
      readingList.stories[existingIndex] = {
        ...story,
        savedAt: Date.now(),
      };
    } else {
      // Add new story
      const savedStory: SavedStory = {
        ...story,
        savedAt: Date.now(),
      };

      readingList.stories.unshift(savedStory); // Add to beginning (most recent first)

      // Limit the number of saved stories
      if (readingList.stories.length > MAX_SAVED_STORIES) {
        readingList.stories = readingList.stories.slice(0, MAX_SAVED_STORIES);
      }
    }

    readingList.lastUpdated = Date.now();

    localStorage.setItem(READING_LIST_KEY, JSON.stringify(readingList));
    return true;
  } catch (error) {
    console.error('Error saving to reading list:', error);
    return false;
  }
}

export function removeFromReadingList(objectID: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const readingList = getReadingList();
    readingList.stories = readingList.stories.filter(
      (story) => story.objectID !== objectID
    );
    readingList.lastUpdated = Date.now();

    localStorage.setItem(READING_LIST_KEY, JSON.stringify(readingList));
    return true;
  } catch (error) {
    console.error('Error removing from reading list:', error);
    return false;
  }
}

export function isStorySaved(objectID: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const readingList = getReadingList();
  return readingList.stories.some((story) => story.objectID === objectID);
}

export function getSavedStoriesCount(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const readingList = getReadingList();
  return readingList.stories.length;
}

export function clearReadingList(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const emptyList: ReadingList = { stories: [], lastUpdated: Date.now() };
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(emptyList));
    return true;
  } catch (error) {
    console.error('Error clearing reading list:', error);
    return false;
  }
}
