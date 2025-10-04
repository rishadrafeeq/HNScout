export interface HNStory {
  objectID: string;
  title: string;
  url?: string;
  author: string;
  points: number;
  num_comments: number;
  created_at: string;
  created_at_i: number;
  story_id?: number;
  story_title?: string;
  story_url?: string;
  parent_id?: number;
  comment_text?: string;
  _tags: string[];
}

export interface HNComment {
  objectID: string;
  author: string;
  comment_text: string;
  created_at: string;
  created_at_i: number;
  parent_id: number;
  story_id: number;
  points: number;
  _tags: string[];
}

export interface HNSearchResponse {
  hits: HNStory[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}

export interface HNItemResponse {
  hits: (HNStory | HNComment)[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}

export interface ProcessedStory extends HNStory {
  qualityScore: number;
  domain?: string;
  timeAgo: string;
}

export interface ProcessedComment extends HNComment {
  timeAgo: string;
}

export interface SavedStory extends ProcessedStory {
  savedAt: number;
}

export interface ReadingList {
  stories: SavedStory[];
  lastUpdated: number;
}

export interface HNAuthor {
  username: string;
  about?: string;
  created_at: string;
  created_at_i: number;
  karma: number;
  submission_count?: number;
  comment_count?: number;
  avg?: number;
  delay?: number;
}

export interface HNAuthorResponse {
  hits: HNAuthor[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}
