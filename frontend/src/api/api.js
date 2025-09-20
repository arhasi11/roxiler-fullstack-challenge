import axios from 'axios';
import { getToken, logout } from '../utils/auth';

/**
 * Creates a centralized Axios instance for all API communications.
 * Includes interceptors to automatically handle authentication tokens and errors.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

/**
 * Request Interceptor:
 * Attaches the JWT token to the 'Authorization' header for every outgoing request.
 */
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response Interceptor:
 * Handles global API errors. If a 401 Unauthorized error is received,
 * it means the user's token is invalid or expired. The interceptor will
 * automatically log the user out and redirect them to the login page.
 */
API.interceptors.response.use(
  (response) => {
    // If the request was successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response?.status === 401) {
      // If so, the user's session is no longer valid.
      logout(); // Clear the invalid token from storage
      // Redirect to the login page to re-authenticate.
      // Using window.location.href ensures a full page refresh, clearing any stale state.
      window.location.href = '/login';
    }
    // For all other errors, just pass them along.
    return Promise.reject(error);
  }
);

export default API;