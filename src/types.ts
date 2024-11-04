import { LucideIcon } from 'lucide-react';

interface PhotoContent {
  title: string;
  images: string[];
  description: string;
}

interface LyricsContent {
  title: string;
  text: string;
  notes: string;
}

interface ArtistContent {
  title: string;
  text: string;
  highlights: string[];
}

interface RecordingContent {
  title: string;
  text: string;
  facts: string[];
}

export interface StoryContent {
  id: number;
  type: 'photos' | 'lyrics' | 'artist' | 'recording';
  title: string;
  icon: LucideIcon;
  content: PhotoContent | LyricsContent | ArtistContent | RecordingContent;
}