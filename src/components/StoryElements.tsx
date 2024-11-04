import React from 'react';
import { Camera, FileText, User, Mic } from 'lucide-react';
import { StoryContent } from '../types';

interface StoryElementsProps {
  onStorySelect: (story: StoryContent) => void;
  isPlaying: boolean;
}

const StoryElements: React.FC<StoryElementsProps> = ({ onStorySelect, isPlaying }) => {
  const stories: StoryContent[] = [
    {
      id: 1,
      type: 'photos',
      title: 'Visual Archive',
      icon: Camera,
      content: {
        title: 'Behind the Prism',
        images: [
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
          'https://images.unsplash.com/photo-1516223725307-6f76b9182f7c'
        ],
        description: 'Explore the iconic visual journey of Dark Side of the Moon...'
      }
    },
    {
      id: 2,
      type: 'lyrics',
      title: 'Lyrics & Notes',
      icon: FileText,
      content: {
        title: 'Money - Lyrics & Meaning',
        text: 'Money, get away\nGet a good job with more pay...',
        notes: 'A satirical take on greed and capitalism...'
      }
    },
    {
      id: 3,
      type: 'artist',
      title: 'Artist Story',
      icon: User,
      content: {
        title: 'Pink Floyd',
        text: 'Formed in London in 1965...',
        highlights: ['Released in 1973', '45+ million copies sold', 'Grammy Hall of Fame']
      }
    },
    {
      id: 4,
      type: 'recording',
      title: 'Studio Journey',
      icon: Mic,
      content: {
        title: 'The Making Of',
        text: 'Recorded at Abbey Road Studios...',
        facts: ['8-track recording', 'Innovative use of synthesizers', 'Revolutionary mixing techniques']
      }
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full">
        {stories.map((story, index) => {
          const angle = (index * 360) / stories.length;
          const radius = '60%';
          const Icon = story.icon;
          
          return (
            <button
              key={story.id}
              onClick={() => onStorySelect(story)}
              className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 
                p-4 bg-black/80 rounded-full hover:bg-amber-400 hover:text-black
                transition-all duration-500 backdrop-blur-sm
                ${isPlaying ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(-50%, -50%) 
                  rotate(${angle}deg) 
                  translateY(-${radius}) 
                  rotate(-${angle}deg)`
              }}
            >
              <Icon size={24} />
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm whitespace-nowrap">
                {story.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StoryElements;