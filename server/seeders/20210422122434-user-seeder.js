const faker = require("faker");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 5; i++) {
      let email = faker.internet.email();
      let userName = faker.internet.userName();
      let password = faker.internet.password();
      await queryInterface.bulkInsert(
        "users",
        [
          {
            email: email,
            userName: userName,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
