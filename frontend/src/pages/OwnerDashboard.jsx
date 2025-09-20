import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/api';
import { Star, Store, User, Inbox } from 'lucide-react';

/**
 * Renders the dashboard for users with the 'owner' role.
 * It displays a list of stores owned by the user, their average ratings,
 * and a detailed list of individual ratings submitted by users.
 */
export default function OwnerDashboard() {
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const toastId = toast.loading('Fetching your store data...');

      try {
        const res = await API.get('/stores/owner/me/ratings');
        setOwnerData(res.data);
        toast.success('Data loaded successfully!', { id: toastId });
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to fetch your data.';
        setError(errorMsg);
        toast.error(errorMsg, { id: toastId });
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show a loading state while fetching data
  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading your dashboard...</div>;
  }

  // Show an error message if the API call failed
  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Owner Dashboard</h1>

      {/* Show an empty state message if the owner has no stores */}
      {ownerData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Store size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold">No Stores Found</h3>
            <p className="mt-1 text-gray-500">You have not been assigned any stores yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ownerData.map(({ store, average, ratings }) => (
            <div key={store.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col">
              {/* Store Details */}
              <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg"><Store className="text-indigo-600" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                    <p className="text-sm text-gray-500">{store.address}</p>
                  </div>
              </div>

              {/* Average Rating */}
              <div className="my-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold text-2xl text-gray-700">
                  {average ? average.toFixed(1) : 'N/A'}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Average Rating
                </span>
              </div>

              <hr/>

              {/* Individual Ratings List */}
              <div className="mt-4 flex-1">
                <h4 className="font-semibold mb-2 text-gray-700">Recent Ratings</h4>
                {ratings.length > 0 ? (
                  <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {ratings.map((r) => (
                      <li key={r.id} className="py-2 flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            {r.user?.name || 'Anonymous User'}
                        </span>
                        <span className="font-medium flex items-center gap-1">
                            {r.rating} <Star size={14} className="text-yellow-400" />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                   <div className="text-center py-8 text-gray-500">
                       <Inbox size={32} className="mx-auto" />
                       <p className="mt-2 text-sm">No ratings submitted yet.</p>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}