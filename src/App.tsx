import React, { useState } from 'react';
import VinylPlayer from './components/VinylPlayer';
import StoryElements from './components/StoryElements';
import ContentModal from './components/ContentModal';
import { AudioProvider } from './contexts/AudioContext';
import { StoryContent } from './types';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryContent | null>(null);
  
  return (
    <AudioProvider>
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
        <header className="p-6">
          <h1 className="text-3xl font-bold tracking-tight">Vinyl Stories</h1>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="relative">
            <VinylPlayer 
              isPlaying={isPlaying} 
              onPlayPause={() => setIsPlaying(!isPlaying)} 
            />
            
            <StoryElements 
              onStorySelect={setActiveStory}
              isPlaying={isPlaying}
            />
          </div>
        </main>

        {activeStory && (
          <ContentModal 
            content={activeStory} 
            onClose={() => setActiveStory(null)} 
          />
        )}
      </div>
    </AudioProvider>
  );
}

export default App;