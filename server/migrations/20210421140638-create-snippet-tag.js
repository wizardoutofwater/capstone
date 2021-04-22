"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Snippet_Tags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      snippet_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Snippets",
          key: "id",
        },
      },
      tag_Id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tags",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Snippet_Tags");
  },
};
