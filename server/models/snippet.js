"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Snippet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Snippet.belongsTo(models.User, {
        foreignKey: user_Id,
      });
      models.Snippet.belongsTo(models.Language, {
        foreignKey: language_Id,
      });
      models.Snippet.belongsToMany(models.Tag, {
        through: "Snippet_Tag",
        foreignKey: "snippet_Id",
      });
    }
  }
  Snippet.init(
    {
      title: DataTypes.STRING,
      note: DataTypes.TEXT,
      snippet: DataTypes.TEXT,
      language_Id: DataTypes.INTEGER,
      user_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Snippet",
    }
  );
  return Snippet;
};
