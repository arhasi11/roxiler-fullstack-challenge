import { jwtDecode } from 'jwt-decode';

/**
 * Saves the JWT token to the browser's local storage.
 * @param {string} token - The JWT token received from the API.
 */
export function saveAuthToken(token) {
  localStorage.setItem('token', token);
}

/**
 * Removes the JWT token from local storage, effectively logging the user out.
 */
export function logout() {
  localStorage.removeItem('token');
}

/**
 * Retrieves the JWT token from local storage.
 * @returns {string|null} - The token, or null if it doesn't exist.
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * Retrieves the authenticated user's data by decoding the JWT token.
 * This function is the single source of truth for user information.
 * It also automatically checks for token expiration.
 *
 * @returns {object|null} - The decoded user object (containing id, role, etc.),
 * or null if the token is missing, invalid, or expired.
 */
export function getUser() {
  const token = getToken();
  if (!token) {
    return null; // No token, no user.
  }

  try {
    // 1. Decode the token to get the payload (user data, expiration time).
    const decoded = jwtDecode(token);

    // 2. Check if the token has expired.
    const currentTime = Date.now() / 1000; // Get time in seconds
    if (decoded.exp < currentTime) {
      // Token is expired.
      logout(); // Clean up the expired token.
      return null;
    }

    // 3. If the token is valid and not expired, return the user data.
    return decoded;

  } catch (error) {
    // This will happen if the token is malformed.
    console.error("Invalid token found in storage:", error);
    logout(); // Clean up the invalid token.
    return null;
  }
}