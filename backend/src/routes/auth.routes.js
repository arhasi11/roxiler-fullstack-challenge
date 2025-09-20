import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import * as authController from '../controllers/auth.controller.js';
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  addressValidation,
  oldPasswordValidation,
  newPasswordValidation
} from '../utils/validators.js';

const router = Router();

/**
 * AUTHENTICATION ROUTES
 * Base Path: /api/auth
 * Handles user registration, login, and password changes.
 */

// POST /api/auth/signup - Register a new user.
router.post(
  '/signup',
  [nameValidation, emailValidation, passwordValidation, addressValidation],
  authController.signup
);

// POST /api/auth/login - Log in an existing user.
router.post(
  '/login',
  // --- Validation for login credentials ---
  [emailValidation, passwordValidation],
  authController.login
);

// POST /api/auth/change-password - Change the password for the authenticated user.
router.post(
  '/change-password',
  authMiddleware, // This route is protected and requires a logged-in user.
  // --- Validation for changing password ---
  [oldPasswordValidation, newPasswordValidation],
  authController.changePassword
);

export default router;