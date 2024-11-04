import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

interface VinylPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

const VinylPlayer: React.FC<VinylPlayerProps> = ({ isPlaying, onPlayPause }) => {
  const vinylRef = useRef<HTMLDivElement>(null);
  const { currentTime, duration } = useAudio();

  useEffect(() => {
    if (vinylRef.current) {
      vinylRef.current.style.animation = isPlaying ? 'spin 2s linear infinite' : 'none';
    }
  }, [isPlaying]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative aspect-square">
        {/* Vinyl Base */}
        <div className="absolute inset-0 bg-black rounded-full shadow-2xl">
          <div 
            ref={vinylRef}
            className="absolute inset-2 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full"
            style={{
              backgroundImage: `repeating-radial-gradient(
                circle at 50% 50%,
                transparent 0,
                transparent 5px,
                rgba(255, 255, 255, 0.1) 5px,
                rgba(255, 255, 255, 0.1) 6px
              )`
            }}
          >
            {/* Label */}
            <div className="absolute inset-1/4 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center">
              <div className="text-black text-center">
                <h2 className="text-xl font-bold">Dark Side of the Moon</h2>
                <p className="text-sm">Pink Floyd</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <button className="p-2 hover:text-amber-400 transition-colors">
            <SkipBack size={24} />
          </button>
          <button 
            onClick={onPlayPause}
            className="p-4 bg-amber-400 rounded-full hover:bg-amber-300 transition-colors text-black"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button className="p-2 hover:text-amber-400 transition-colors">
            <SkipForward size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md flex items-center gap-4">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <div className="flex-1 h-1 bg-zinc-700 rounded-full">
            <div 
              className="h-full bg-amber-400 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-sm">{formatTime(duration)}</span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Volume2 size={20} />
          <input 
            type="range"
            min="0"
            max="100"
            className="w-24 h-1 bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400"
          />
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default VinylPlayer;