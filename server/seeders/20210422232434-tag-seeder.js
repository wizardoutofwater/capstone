const faker = require("faker");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 30; i++) {
      await queryInterface.bulkInsert(
        "tags",
        [
          {
            tag: faker.random.word(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
