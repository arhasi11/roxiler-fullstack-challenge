/**
 * Defines the Store model for the database.
 * A Store represents a location that can be owned by a User and rated by many Users.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - A reference to the Sequelize DataTypes.
 * @returns {import('sequelize').ModelCtor} The initialized Store model.
 */
export default (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    // The primary key for the store, automatically generated.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // The name of the store.
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Store name cannot be empty."
        }
      }
    },
    // Optional contact email for the store.
    email: {
      type: DataTypes.STRING(120),
      allowNull: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address."
        }
      }
    },
    // The physical address of the store.
    address: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
    // The 'ownerId' foreign key connecting to the Users table is automatically
    // added by the association defined in 'src/models/index.js'.
  }, {
    // Model options
    tableName: 'Stores',
    timestamps: true // Enable createdAt and updatedAt fields
  });

  return Store;
};