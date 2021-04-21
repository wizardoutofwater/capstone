'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Snippet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Snippet.init({
    title: DataTypes.STRING,
    note: DataTypes.TEXT,
    snippet: DataTypes.TEXT,
    language_Id: DataTypes.INTEGER,
    user_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Snippet',
  });
  return Snippet;
};