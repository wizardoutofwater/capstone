const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max) + 1;
    };

    for (let i = 0; i < 100; i++) {
      let title = faker.hacker.noun();
      let note = faker.hacker.phrase();
      let snippet = faker.lorem.paragraph(5);
      let user_id = getRandomInt(5);
      let language_id = getRandomInt(14);
      console.log(user_id);

      await queryInterface.bulkInsert(
        "snippets",
        [
          {
            title: title,
            note: note,
            snippet: snippet,
            user_id: user_id,
            language_id: language_id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("snippets", null, {});
  },
};
