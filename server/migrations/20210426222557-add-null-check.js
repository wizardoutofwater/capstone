"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("snippets", "user_id", {
      type: Sequelize.STRING,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    });

    await queryInterface.changeColumn("snippets", "language_id", {
      type: Sequelize.STRING,
      references: {
        model: "languages",
        key: "id",
      },
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
