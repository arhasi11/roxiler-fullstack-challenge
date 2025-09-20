import { Router } from 'express';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import storeRoutes from './store.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

/**
 * API Root Router
 * Mounts all feature-specific routers onto their respective base paths.
 * This file is the single entry point for all API routes.
 * Base Path: /api
 */

// Mount the routers for each feature
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/stores', storeRoutes);
router.use('/users', userRoutes); // Using plural '/users' is a standard RESTful convention

// Add a simple health check endpoint to verify that the API is running.
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

export default router;