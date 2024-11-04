import React from 'react';
import { X } from 'lucide-react';
import { StoryContent } from '../types';

interface ContentModalProps {
  content: StoryContent;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{content.content.title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:text-amber-400 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {content.type === 'photos' && (
              <div className="grid grid-cols-2 gap-4">
                {content.content.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Archive photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
                <p className="col-span-2 text-zinc-300">
                  {content.content.description}
                </p>
              </div>
            )}

            {content.type === 'lyrics' && (
              <div className="space-y-4">
                <pre className="whitespace-pre-line font-mono text-amber-400">
                  {content.content.text}
                </pre>
                <p className="text-zinc-300">{content.content.notes}</p>
              </div>
            )}

            {content.type === 'artist' && (
              <div className="space-y-4">
                <p className="text-zinc-300">{content.content.text}</p>
                <div className="grid grid-cols-3 gap-4">
                  {content.content.highlights.map((highlight, index) => (
                    <div 
                      key={index}
                      className="bg-zinc-800 p-4 rounded-lg text-center"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.type === 'recording' && (
              <div className="space-y-4">
                <p className="text-zinc-300">{content.content.text}</p>
                <ul className="list-disc list-inside space-y-2">
                  {content.content.facts.map((fact, index) => (
                    <li key={index} className="text-amber-400">
                      <span className="text-zinc-300">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;