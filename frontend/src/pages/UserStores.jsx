import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import API from '../api/api';
import StoreCard from '../components/StoreCard';
import { Search, Inbox } from 'lucide-react';

/**
 * Renders the page for users to view and search for stores.
 * Features debounced searching, loading/error states, and a responsive grid layout.
 */
export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // A memoized function to fetch stores from the API
  const fetchStores = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get('/stores', { params: { q: searchQuery } });
      setStores(res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch stores.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect hook to handle debounced searching
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStores(query);
    }, 300); // 300ms delay after user stops typing
    
    // Cleanup function to cancel the timeout if the component unmounts or query changes
    return () => clearTimeout(handler);
  }, [query, fetchStores]);

  // Callback for when a user rates a store, triggering a data refresh
  const handleRatingUpdated = () => {
    toast.success('Store list refreshed!');
    fetchStores(query); // Re-fetch with the current query
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Available Stores</h1>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or address..."
            className="pl-10 pr-4 py-2 border rounded-lg w-72"
          />
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading stores...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      
      {!loading && !error && stores.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <Inbox size={48} className="mx-auto text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold">No Stores Found</h3>
          <p className="mt-1 text-gray-500">{query ? `No results for "${query}". Try a different search.` : "There are no stores to display right now."}</p>
        </div>
      )}

      {!loading && !error && stores.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {stores.map((s) => (
            <StoreCard key={s.id} store={s} onRatingUpdated={handleRatingUpdated} />
          ))}
        </div>
      )}
    </div>
  );
}

