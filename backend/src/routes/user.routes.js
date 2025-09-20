import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getMyProfile } from '../controllers/users.controller.js';

const router = Router();

/**
 * USER-SPECIFIC ROUTES
 * Base Path: /api/users
 * These routes are for actions related to the authenticated user themselves.
 */

// GET /api/users/me - Retrieves the profile of the currently logged-in user.
router.get('/me', authMiddleware, getMyProfile);

export default router;