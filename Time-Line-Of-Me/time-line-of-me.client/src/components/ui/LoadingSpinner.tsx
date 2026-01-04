import React from 'react';
import { BookOpen } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-24 h-32 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-500 rounded-lg animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={48} className="text-ivory" />
          </div>
        </div>
        <p className="font-serif text-2xl text-ivory animate-pulse">Loading your library...</p>
      </div>
    </div>
  );
};