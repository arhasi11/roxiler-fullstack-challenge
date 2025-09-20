import React, { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import API from '../api/api';
import { Users, Store, Star, ArrowUp, ArrowDown, Search } from 'lucide-react';

// A simple, reusable component for the statistic cards
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value ?? '...'}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for filtering
  const [userFilter, setUserFilter] = useState('');
  const [storeFilter, setStoreFilter] = useState('');

  // State for sorting
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  // Fetch all necessary data on component mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const toastId = toast.loading('Fetching dashboard data...');
      try {
        // Fetch all data concurrently for better performance
        const [statsRes, usersRes, storesRes] = await Promise.all([
          API.get('/admin/dashboard'),
          API.get('/admin/users'),
          API.get('/admin/stores')
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setStores(storesRes.data);
        toast.success('Data loaded successfully!', { id: toastId });
      } catch (error) {
        toast.error('Failed to fetch dashboard data.', { id: toastId });
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Memoized filtering and sorting for users
  const filteredAndSortedUsers = useMemo(() => {
    let sortedUsers = [...users];
    if (sortConfig.key) {
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortedUsers.filter(user =>
      user.name.toLowerCase().includes(userFilter.toLowerCase()) ||
      user.email.toLowerCase().includes(userFilter.toLowerCase())
    );
  }, [users, userFilter, sortConfig]);

  // Request a new sort configuration
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // A helper component for table headers that support sorting
  const SortableHeader = ({ columnKey, title }) => (
    <th className="p-3 text-left cursor-pointer" onClick={() => requestSort(columnKey)}>
      <div className="flex items-center gap-2">
        {title}
        {sortConfig.key === columnKey && (sortConfig.direction === 'ascending' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
      </div>
    </th>
  );

  if (loading) {
    return <div className="p-6 text-center">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats?.totalUsers} icon={<Users className="text-white" />} color="bg-blue-500" />
        <StatCard title="Total Stores" value={stats?.totalStores} icon={<Store className="text-white" />} color="bg-green-500" />
        <StatCard title="Total Ratings" value={stats?.totalRatings} icon={<Star className="text-white" />} color="bg-yellow-500" />
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Users</h3>
            <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border rounded-md w-64"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                />
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <SortableHeader columnKey="name" title="Name" />
                        <SortableHeader columnKey="email" title="Email" />
                        <SortableHeader columnKey="role" title="Role" />
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedUsers.map((user) => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3 capitalize">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
       {/* You can add a similar filtered and sorted table for Stores here */}
    </div>
  );
}