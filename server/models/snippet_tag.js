"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snippet_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.snippet_tag.belongsTo(models.snippet, {
        foreignKey: "snippet_id",
      });
      models.snippet_tag.belongsTo(models.tag, {
        foreignKey: "tag_id",
      });
    }
  }
  snippet_tag.init(
    {
      snippet_Id: DataTypes.INTEGER,
      tag_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "snippet_tag",
    }
  );
  return snippet_tag;
};
