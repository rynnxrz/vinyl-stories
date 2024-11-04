import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  currentTime: number;
  duration: number;
}

const AudioContext = createContext<AudioContextType>({
  currentTime: 0,
  duration: 280, // Example duration: 4:40
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 280; // Fixed duration for MVP

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(time => (time + 1) % duration);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AudioContext.Provider value={{ currentTime, duration }}>
      {children}
    </AudioContext.Provider>
  );
};