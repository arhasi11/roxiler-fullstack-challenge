import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../api/api';
import RatingControl from './RatingControl';
import { Star, MapPin } from 'lucide-react';

/**
 * A self-contained card component to display store information and handle rating submissions.
 * It manages its own state for the user's rating and calls the API directly.
 *
 * @param {object} props
 * @param {object} props.store - The store object containing all necessary data.
 * @param {function(): void} props.onRatingUpdated - A callback to notify the parent component to re-fetch all data.
 */
export default function StoreCard({ store, onRatingUpdated }) {
  // Local state to manage the user's rating for instant UI feedback.
  const [userRating, setUserRating] = useState(store.userRating);

  // Syncs local state if the store prop from the parent changes.
  useEffect(() => {
    setUserRating(store.userRating);
  }, [store.userRating]);

  /**
   * Handles saving a new rating.
   * This function is passed to the RatingControl component.
   */
  const handleRatingSave = async (newRating) => {
    const toastId = toast.loading('Submitting your rating...');
    try {
      // 1. Make the API call to the backend.
      await API.post(`/stores/${store.id}/rating`, { rating: newRating });

      // 2. Update the local state for instant UI change.
      setUserRating(newRating);
      toast.success('Rating submitted successfully!', { id: toastId });

      // 3. Notify the parent component that an update occurred.
      // The parent (UserStores page) will then re-fetch all stores
      // to get the new overall average ratings.
      if (onRatingUpdated) {
        onRatingUpdated();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit rating.', { id: toastId });
    }
  };

  // Safely parse the overall rating, which might be a string from the DB aggregation.
  const overallRating = parseFloat(store.overallRating);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-105 duration-200">
      {/* Store Info */}
      <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
        <MapPin size={14} /> {store.address || 'No address provided'}
      </p>

      {/* Overall Rating */}
      <div className="mt-4 flex items-center gap-2 text-gray-700">
        <Star className="w-5 h-5 text-yellow-400" />
        <span className="font-semibold text-lg">
          {isNaN(overallRating) ? "N/A" : overallRating.toFixed(1)}
        </span>
        <span className="text-sm text-gray-500">
          Overall Rating
        </span>
      </div>

      <hr className="my-4" />

      {/* User's Rating Section */}
      <div className="mt-auto">
        <p className="text-sm font-medium text-gray-600 mb-2">Your Rating:</p>
        <RatingControl value={userRating} onSave={handleRatingSave} />
      </div>
    </div>
  );
}