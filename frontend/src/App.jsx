import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import all page and component dependencies
import Login from './pages/Login';
import Signup from './pages-_signup.jsx';
import AdminDashboard from './pages/AdminDashboard';
import UserStores from './pages/UserStores';
import OwnerDashboard from './pages/OwnerDashboard';
import ChangePassword from './pages/ChangePassword';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * The main application component that orchestrates the entire frontend.
 * It sets up the global layout, routing, and toast notifications.
 */
export default function App() {
  const location = useLocation();

  // Define routes where the Navbar should not be displayed.
  const noNavbarRoutes = ['/login', '/signup'];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Conditionally render the Navbar based on the current route */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="flex-1 bg-gray-100">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* --- Protected Routes --- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stores"
            element={
              <ProtectedRoute roles={['user', 'admin', 'owner']}>
                <UserStores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner"
            element={
              <ProtectedRoute roles={['owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              // This route is accessible to any logged-in user, so no roles are specified.
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* --- Default Redirect Logic --- */}
          {/* Redirect any unknown path to the main '/stores' page */}
          <Route path="*" element={<Navigate to="/stores" />} />
        </Routes>
      </main>

      {/* Global toast notification container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}