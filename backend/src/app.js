import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/index.js';

// Initialize the Express application
const app = express();

// --- Core Middleware Setup ---

// Enable Cross-Origin Resource Sharing for all origins
app.use(cors());

// Set various HTTP headers for security
app.use(helmet());

// Parse incoming JSON payloads (replaces the deprecated body-parser)
app.use(express.json());


// --- API Route Mounting ---

// All API routes are prefixed with /api
app.use('/api', apiRoutes);


// --- Error Handling Middleware ---

// Catch-all middleware for requests to routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({ message: `Resource not found at ${req.originalUrl}` });
});

// Global error handler. Catches any unhandled errors from other parts of the application.
app.use((error, req, res, next) => {
  console.error('Global Error Handler:', error); // Log the error for debugging
  res.status(500).json({ message: 'An internal server error occurred.' });
});

export default app;