import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import * as storesController from '../controllers/stores.controller.js';
import * as ratingsController from '../controllers/ratings.controller.js';
import {
  storeNameValidation,
  emailValidation, // Reusing from previous step
  addressValidation, // Reusing from previous step
  ratingValueValidation,
  storeIdParamValidation
} from '../utils/validators.js';

const router = Router();

/**
 * STORE AND RATING ROUTES
 * Base Path: /api/stores
 * Handles all interactions with stores and their associated ratings.
 */

// --- General Store Routes ---

// GET /api/stores - List all stores. Accessible to all authenticated users.
router.get('/', authMiddleware, storesController.listAllStores);

// POST /api/stores - Create a new store. Accessible only to 'admin' users.
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  [storeNameValidation, emailValidation, addressValidation], // Validation for store data
  storesController.createStore
);

// --- Rating Routes (Nested under a specific store) ---

// POST /api/stores/:storeId/rating - Submit or update a rating for the specified store.
router.post(
  '/:storeId/rating',
  authMiddleware,
  [storeIdParamValidation, ratingValueValidation], // Validate URL param and request body
  ratingsController.submitOrUpdateRating
);

// GET /api/stores/:storeId/my-rating - Get the authenticated user's rating for a specific store.
router.get(
  '/:storeId/my-rating',
  authMiddleware,
  [storeIdParamValidation], // Validate URL param
  ratingsController.getUserRatingForStore
);

// --- Owner-Specific Routes ---

// GET /api/stores/owner/me/ratings - Get details and ratings for stores owned by the authenticated user.
router.get(
  '/owner/me/ratings',
  authMiddleware,
  roleMiddleware('owner'),
  storesController.getStoreRatingsForOwner
);

export default router;