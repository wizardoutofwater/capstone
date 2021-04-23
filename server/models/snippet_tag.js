"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Snippet_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Snippet_Tag.belongsTo(models.Snippet, {
        foreignKey: "snippet_id",
      });
      models.Snippet_Tag.belongsTo(models.Tag, {
        foreignKey: "tag_id",
      });
    }
  }
  Snippet_Tag.init(
    {
      snippet_Id: DataTypes.INTEGER,
      tag_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "snippet_tag",
    }
  );
  return Snippet_Tag;
};
