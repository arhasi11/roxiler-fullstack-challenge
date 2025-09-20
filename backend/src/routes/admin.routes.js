import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import * as adminController from '../controllers/admin.controller.js';
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  addressValidation,
  roleValidation
} from '../utils/validators.js';

const router = Router();

/**
 * ADMIN PROTECTED ROUTES
 * Base Path: /api/admin
 * All routes defined in this file are protected by authentication
 * and require the user to have the 'admin' role.
 */
router.use(authMiddleware, roleMiddleware('admin'));

// GET /api/admin/dashboard - Fetches dashboard summary statistics.
router.get('/dashboard', adminController.getDashboard);

// GET /api/admin/users - Retrieves a list of all users.
router.get('/users', adminController.listUsers);

// POST /api/admin/users - Creates a new user (admin, user, or owner).
router.post(
  '/users',
  // --- Validation middleware chain ---
  [
    nameValidation,
    emailValidation,
    passwordValidation,
    addressValidation,
    roleValidation
  ],
  adminController.createUser
);

// GET /api/admin/stores - Retrieves a list of all stores.
router.get('/stores', adminController.listStores);

// GET /api/admin/users/:id - Retrieves details for a specific user.
router.get('/users/:id', adminController.getUserDetails);

export default router;