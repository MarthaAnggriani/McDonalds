'use strict';
const bcrypt = require('bcryptjs');
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item, { foreignKey: "authorId" })
    }

    verifyPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email must be unique" },
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        len: { msg: "The password must be at least 5 characters" }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin"
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
    user.role = 'admin'
  })

  return User;
};