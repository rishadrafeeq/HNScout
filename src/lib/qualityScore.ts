import { HNStory, HNComment, ProcessedStory, ProcessedComment } from '@/types/hn';
import { formatDistanceToNow } from 'date-fns';

export type SortField = 'timeAgo' | 'points' | 'comments';
export type SortOrder = 'asc' | 'desc';

/**
 * Calculate quality score based on points, comments, and recency
 * Formula: (points * 0.4) + (comments * 0.3) + (recency * 0.3)
 * 
 * Recency score uses exponential decay with half-life of 24 hours
 * Comments are weighted with logarithmic scaling to prevent spam
 */
export function calculateQualityScore(story: HNStory): number {
  const now = Date.now();
  const storyTime = story.created_at_i * 1000;
  const ageInHours = (now - storyTime) / (1000 * 60 * 60);
  
  // Points component (0-40% of score)
  const pointsScore = Math.min(story.points * 0.4, 40);
  
  // Comments component (0-30% of score) with log scaling
  const commentsScore = Math.min(Math.log10(Math.max(story.num_comments, 1) + 1) * 10, 30);
  
  // Recency component (0-30% of score) with exponential decay
  // Half-life of 24 hours, so after 24 hours, recency score is halved
  const halfLifeHours = 24;
  const recencyScore = Math.max(0, 30 * Math.pow(0.5, ageInHours / halfLifeHours));
  
  const totalScore = pointsScore + commentsScore + recencyScore;
  
  // Round to 2 decimal places for display
  return Math.round(totalScore * 100) / 100;
}

/**
 * Extract domain from URL
 */
export function extractDomain(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return undefined;
  }
}

/**
 * Process a story with quality score and additional metadata
 */
export function processStory(story: HNStory): ProcessedStory {
  return {
    ...story,
    qualityScore: calculateQualityScore(story),
    domain: extractDomain(story.url),
    timeAgo: formatDistanceToNow(new Date(story.created_at_i * 1000), { addSuffix: true }),
  };
}

/**
 * Process a comment with time formatting
 */
export function processComment(comment: HNComment): ProcessedComment {
  return {
    ...comment,
    timeAgo: formatDistanceToNow(new Date(comment.created_at_i * 1000), { addSuffix: true }),
  };
}

/**
 * Sort stories by quality score in descending order
 */
export function sortStoriesByQuality(stories: HNStory[]): ProcessedStory[] {
  return stories
    .map(processStory)
    .sort((a, b) => b.qualityScore - a.qualityScore);
}

/**
 * Sort processed stories by specified field and order
 */
export function sortStoriesByField(
  stories: ProcessedStory[], 
  sortBy: SortField, 
  sortOrder: SortOrder
): ProcessedStory[] {
  return [...stories].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'points':
        comparison = a.points - b.points;
        break;
      case 'comments':
        comparison = a.num_comments - b.num_comments;
        break;
      case 'timeAgo':
        // For timeAgo, we sort by creation time (newer first by default)
        comparison = b.created_at_i - a.created_at_i;
        break;
      default:
        comparison = 0;
    }
    
    // Apply sort order
    return sortOrder === 'desc' ? -comparison : comparison;
  });
}

/**
 * Get quality score color class based on score value
 */
export function getQualityScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
  if (score >= 60) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (score >= 20) return 'bg-orange-100 text-orange-800 border-orange-200';
  return 'bg-gray-100 text-gray-800 border-gray-200';
}

/**
 * Get quality score label based on score value
 */
export function getQualityScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Very Good';
  if (score >= 40) return 'Good';
  if (score >= 20) return 'Fair';
  return 'Poor';
}
