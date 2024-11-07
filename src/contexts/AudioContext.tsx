import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  currentTime: number;
  duration: number;
  isPlaying: boolean;  // Add isPlaying to the interface
  togglePlayPause: () => void;  // Add control function
}

const AudioContext = createContext<AudioContextType>({
  currentTime: 0,
  duration: 280,
  isPlaying: false,
  togglePlayPause: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);  // Add isPlaying state
  const duration = 280; // Fixed duration for MVP

  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying) {  // Only start interval if isPlaying is true
      interval = setInterval(() => {
        setCurrentTime(time => {
          const nextTime = time + 1;
          if (nextTime >= duration) {
            setIsPlaying(false);  // Stop playing when reaching the end
            return 0;
          }
          return nextTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);  // Add isPlaying to dependency array

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
      <AudioContext.Provider value={{
        currentTime,
        duration,
        isPlaying,
        togglePlayPause
      }}>
        {children}
      </AudioContext.Provider>
  );
};