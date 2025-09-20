import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

/**
 * A wrapper component that protects routes from unauthorized access.
 * It checks for two conditions:
 * 1. Is the user authenticated?
 * 2. If roles are specified, does the user have one of the required roles?
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The component(s) to render if access is granted.
 * @param {string[]} [props.roles] - An optional array of roles permitted to access the route.
 * @returns {React.ReactNode} - Either the children components or a redirect.
 *
 * @example
 * // In App.jsx
 * <ProtectedRoute roles={['admin']}>
 * <AdminDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, roles }) => {
  const user = getUser();

  // Condition 1: Check if the user is logged in.
  if (!user) {
    // If not, redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  // Condition 2: Check if the user has the required role.
  // This check only runs if the 'roles' prop is provided.
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    // If the user is logged in but doesn't have the right role,
    // redirect them to a default, safe page instead of the login page.
    return <Navigate to="/stores" replace />;
  }

  // If all checks pass, render the protected component.
  return children;
};

export default ProtectedRoute;