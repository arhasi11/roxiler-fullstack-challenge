/**
 * Defines the Rating model for the database.
 * A Rating connects a User to a Store with a score from 1 to 5.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - A reference to the Sequelize DataTypes.
 * @returns {import('sequelize').ModelCtor} The initialized Rating model.
 */
export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    // The primary key for the rating, automatically generated.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // The score given by the user, from 1 to 5.
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        isInt: true, // Ensures the value is a whole number
      },
      comment: "The numerical score (1-5) a user gives to a store."
    }
    // Foreign keys for 'userId' and 'storeId' are automatically added by Sequelize
    // based on the associations defined in 'src/models/index.js'.
  }, {
    // Model options
    tableName: 'Ratings',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    indexes: [
      // Add a composite unique index. This enforces the rule that
      // a user can only submit one rating per store.
      {
        unique: true,
        fields: ['userId', 'storeId'],
        name: 'unique_user_store_rating'
      }
    ]
  });

  return Rating;
};