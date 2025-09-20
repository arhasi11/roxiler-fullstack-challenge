import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

/**
 * A reusable star rating component.
 * Allows users to select a rating from 1 to 5 with a visual hover effect.
 *
 * @param {object} props
 * @param {number} props.value - The initial or current rating value.
 * @param {function(number): void} props.onSave - The callback function to execute when a new rating is selected.
 */
export default function RatingControl({ value, onSave }) {
  // State for the officially selected rating
  const [rating, setRating] = useState(value || 0);
  // State for the rating currently being hovered over
  const [hoverRating, setHoverRating] = useState(0);

  // Syncs the internal state if the parent component's value changes
  useEffect(() => {
    setRating(value || 0);
  }, [value]);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (onSave) {
      onSave(newRating);
    }
  };

  const handleMouseEnter = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // The rating to display is either the one being hovered over or the one that's selected
  const displayRating = hoverRating || rating;

  return (
    <div className="flex gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          onClick={() => handleClick(n)}
          onMouseEnter={() => handleMouseEnter(n)}
          className={`w-7 h-7 cursor-pointer transition-colors duration-150 ${
            n <= displayRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}