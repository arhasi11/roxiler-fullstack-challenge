import app from './app.js';
import db from './models/index.js';

const PORT = process.env.PORT || 4000;

/**
 * Starts the Express server and connects to the database.
 */
const startServer = async () => {
  try {
    // Authenticate the database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    // In development, you might want to sync the database schema.
    // Use { alter: true } to avoid dropping tables.
    // In production, this should be handled by a dedicated migration system.
    if (process.env.NODE_ENV !== 'production') {
      await db.sequelize.sync({ alter: true });
      console.log('🔄 Database synced with models.');
    }

    // Start listening for incoming requests
    app.listen(PORT, () => {
      console.log(`🚀 Server is running and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start the server:', error);
    process.exit(1); // Exit the process if the server fails to start
  }
};

startServer();