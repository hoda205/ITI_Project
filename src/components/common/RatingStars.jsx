import { Star } from 'lucide-react';

export default function RatingStars({ count = 5, totalStars = 5, size = 12 }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = index < count;
        return (
          <Star
            key={index}
            size={size}
            className={`text-amber-500 ${isFilled ? 'fill-amber-500' : 'fill-transparent'}`}
            strokeWidth={2}
          />
        );
      })}
    </span>
  );
}