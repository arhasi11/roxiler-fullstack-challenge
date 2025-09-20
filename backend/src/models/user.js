import bcrypt from 'bcryptjs';

/**
 * Defines the User model for the database.
 * This model includes hooks for automatically hashing passwords and a method
 * for validating them, ensuring high security.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - A reference to the Sequelize DataTypes.
 * @returns {import('sequelize').ModelCtor} The initialized User model.
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: {
          args: [20, 60],
          msg: "Name must be between 20 and 60 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This field stores the hashed password, not the raw password."
    },
    role: {
      type: DataTypes.ENUM('admin', 'owner', 'user'),
      allowNull: false,
      defaultValue: 'user'
    },
    address: {
      type: DataTypes.STRING(400)
    }
  }, {
    tableName: 'Users',
    timestamps: true,
    defaultScope: {
      // By default, NEVER return the password field in queries.
      attributes: { exclude: ['password'] }
    },
    scopes: {
      // A scope to specifically include the password when needed (e.g., during login).
      withPassword: {
        attributes: { include: ['password'] }
      }
    },
    hooks: {
      // Use a 'beforeCreate' hook to automatically hash the password before saving a new user.
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  /**
   * Instance method to compare a candidate password with the user's hashed password.
   * @param {string} candidatePassword - The plain-text password to validate.
   * @returns {Promise<boolean>} - True if the password is a match.
   */
  User.prototype.isValidPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};