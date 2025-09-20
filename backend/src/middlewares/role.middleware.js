/**
 * Creates a middleware function to authorize users based on their roles.
 * This middleware must be used AFTER an authentication middleware has attached
 * the user object to the request.
 *
 * @param {string|string[]} roles - A single role string or an array of roles permitted to access the route.
 * @returns {Function} An Express middleware function.
 *
 * @example
 * // Protect a route for admins only:
 * router.get('/admin/dashboard', authMiddleware, roleMiddleware('admin'), getDashboard);
 *
 * // Protect a route for admins or owners:
 * router.post('/stores', authMiddleware, roleMiddleware(['admin', 'owner']), createStore);
 */
export const roleMiddleware = (roles = []) => {
  // Ensure the 'roles' parameter is always an array for consistent logic
  const requiredRoles = typeof roles === 'string' ? [roles] : roles;

  return (req, res, next) => {
    // A user object must be attached to the request by a preceding auth middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required. Please log in.' });
    }

    // If the requiredRoles array is empty, it means any authenticated user is allowed
    if (requiredRoles.length === 0) {
      return next();
    }

    // Check if the authenticated user's role is included in the list of required roles
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden. You do not have sufficient permissions to access this resource.' });
    }

    // If the user has the required role, proceed to the next handler
    next();
  };
};