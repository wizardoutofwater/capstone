"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max) + 1;
    };

    for (let i = 0; i < 100; i++) {
      let tag_id = getRandomInt(29) + 1;
      let snippet_id = getRandomInt(99) + 1;

      console.log(tag_id);
      console.log(snippet_id);

      await queryInterface.bulkInsert(
        "snippet_tags",
        [
          {
            snippet_id: snippet_id,
            tag_id: tag_id,
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
