import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  onRate, 
  size = 20,
  readonly = false 
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
          } ${!readonly && onRate ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => !readonly && onRate?.(star)}
        />
      ))}
    </div>
  );
};