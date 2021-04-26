"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snippet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      models.snippet.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      models.snippet.belongsTo(models.language, {
        foreignKey: "language_id",
      });
      models.snippet.belongsToMany(models.tag, {
        through: "snippet_tag",
        foreignKey: "snippet_id",
      });
    }
  }
  snippet.init(
    {
      title: DataTypes.STRING,
      note: DataTypes.TEXT,
      snippet: DataTypes.TEXT,
      language_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "snippet",
    }
  );
  return snippet;
};
