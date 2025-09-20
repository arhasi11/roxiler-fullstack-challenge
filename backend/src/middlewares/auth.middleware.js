import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

/**
 * Middleware to verify JWT tokens for protected routes.
 * It checks for a 'Bearer' token in the Authorization header,
 * verifies it, and attaches the authenticated user to the request object.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and correctly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header is missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key from environment variables
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID from the token payload, excluding the password hash
    const user = await User.findByPk(decodedPayload.id, {
      attributes: { exclude: ['password'] }
    });

    // If the user doesn't exist, the token is invalid
    if (!user) {
      return res.status(401).json({ message: 'User not found. Invalid token.' });
    }

    // Attach the user object to the request and proceed
    req.user = user;
    next();

  } catch (error) {
    // Handle specific token errors for clearer feedback
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
    }
    // For any other verification error, return a generic invalid token message
    return res.status(401).json({ message: 'Invalid token. Authentication failed.' });
  }
};