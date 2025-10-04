'use client';

import { useState, useEffect } from 'react';
import { SavedStory } from '@/types/hn';
import { getReadingList, removeFromReadingList, clearReadingList } from '@/lib/readingList';
import { StoryCard } from '@/components/StoryCard';
import { ErrorState } from '@/components/ErrorState';
import { BookmarkCheck, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ReadingListPage() {
  const [savedStories, setSavedStories] = useState<SavedStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const readingList = getReadingList();
    setSavedStories(readingList.stories);
    setIsLoading(false);
  }, []);

  const handleRemoveStory = (objectID: string) => {
    const success = removeFromReadingList(objectID);
    if (success) {
      setSavedStories(prev => prev.filter(story => story.objectID !== objectID));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire reading list? This action cannot be undone.')) {
      const success = clearReadingList();
      if (success) {
        setSavedStories([]);
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
            My Reading List
          </h1>
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border border-white rounded-lg p-3 sm:p-4 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
            My Reading List
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Loading your saved stories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 bg-white">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
          My Reading List
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          {savedStories.length === 0 
            ? "Your reading list is empty. Save stories by clicking the bookmark icon on any story card."
            : `You have ${savedStories.length} saved ${savedStories.length === 1 ? 'story' : 'stories'}.`
          }
        </p>
      </div>

      {savedStories.length > 0 && (
        <div className="flex justify-center mb-6">
          <button
            onClick={handleClearAll}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </button>
        </div>
      )}

      {savedStories.length === 0 ? (
        <div className="text-center py-12">
          <BookmarkCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved stories yet</h3>
          <p className="text-gray-500 mb-6">
            Start building your reading list by saving interesting stories from the main page.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Browse Stories
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {savedStories.map((story, index) => (
            <div key={story.objectID} className="relative">
              <StoryCard story={story} index={index} />
              
              {/* Saved timestamp */}
              <div className="absolute top-2 right-2 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Saved {formatDistanceToNow(new Date(story.savedAt), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
