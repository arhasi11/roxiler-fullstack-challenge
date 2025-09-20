import { body, param } from 'express-validator';

/**
 * Centralized module for all application-wide validation and sanitization rules.
 * These reusable validators ensure data integrity before requests reach controllers.
 */

// --- User & Auth Field Validators ---

export const nameValidation = body('name')
  .trim()
  .isLength({ min: 20, max: 60 })
  .withMessage('Name must be between 20 and 60 characters.');

export const emailValidation = body('email')
  .trim()
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email address.');

export const passwordValidation = body('password')
  .isLength({ min: 8, max: 16 })
  .withMessage('Password must be between 8 and 16 characters.')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter.')
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage('Password must contain at least one special character.');

export const addressValidation = body('address')
  .optional()
  .trim()
  .isLength({ max: 400 })
  .withMessage('Address cannot exceed 400 characters.');

export const roleValidation = body('role')
  .optional()
  .isIn(['admin', 'user', 'owner'])
  .withMessage('Invalid role specified. Must be admin, user, or owner.');

// --- Specific Validators for "Change Password" Flow ---

export const oldPasswordValidation = body('oldPassword')
  .exists({ checkFalsy: true })
  .withMessage('Old password is required.');

export const newPasswordValidation = body('newPassword')
  .isLength({ min: 8, max: 16 })
  .withMessage('New password must be between 8 and 16 characters.')
  .matches(/[A-Z]/)
  .withMessage('New password must contain at least one uppercase letter.')
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage('New password must contain at least one special character.');


// --- Store Field Validators ---

export const storeNameValidation = body('name')
  .trim()
  .notEmpty()
  .withMessage('Store name is required.')
  .isLength({ max: 200 })
  .withMessage('Store name cannot exceed 200 characters.');


// --- Rating Field Validators ---

export const ratingValueValidation = body('rating')
  .isInt({ min: 1, max: 5 })
  .withMessage('Rating must be an integer between 1 and 5.');


// --- URL Parameter Validators ---

export const storeIdParamValidation = param('storeId')
  .isInt()
  .withMessage('A valid numeric Store ID must be provided in the URL.');