'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: "ProductId"
      })
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field!`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field!`
        },
        isUrl: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0,
        notEmpty: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};