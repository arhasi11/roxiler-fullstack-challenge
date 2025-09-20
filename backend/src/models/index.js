import { Sequelize, DataTypes } from 'sequelize';
import createUserModel from './user.js';
import createStoreModel from './store.js';
import createRatingModel from './rating.js';
import * as dbConfig from '../config/config.js';

// Determine the environment and get the corresponding database configuration
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// Initialize the Sequelize instance with the correct configuration
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Create the main 'db' object which will hold all models and the connection
const db = {};

// Load our models by passing the sequelize instance and DataTypes
db.User = createUserModel(sequelize, DataTypes);
db.Store = createStoreModel(sequelize, DataTypes);
db.Rating = createRatingModel(sequelize, DataTypes);


// --- Setup Model Associations ---
// This central location makes it easy to understand the entire data structure.

// Association: User (as Owner) <> Stores
// A User can own multiple Stores. A Store belongs to one User.
db.User.hasMany(db.Store, { foreignKey: 'ownerId', as: 'ownedStores' });
db.Store.belongsTo(db.User, { foreignKey: 'ownerId', as: 'owner' });

// Association: User <> Ratings
// A User can submit many Ratings. A Rating is submitted by one User.
db.User.hasMany(db.Rating, { foreignKey: 'userId', as: 'ratings' });
db.Rating.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Association: Store <> Ratings
// A Store can have many Ratings. A Rating is for one Store.
db.Store.hasMany(db.Rating, { foreignKey: 'storeId', as: 'ratings' });
db.Rating.belongsTo(db.Store, { foreignKey: 'storeId', as: 'store' });


// Attach the sequelize instance and the Sequelize library to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;