


let language_array = [
  "language-markup",
  "language-css",
  "language-clike",
  "language-javascript",
  "language-aspnet",
  "language-bash",
  "language-c",
  "language-csharp",
  "language-cpp",
  "language-git",
  "language-java",
  "language-jsx",
  "language-python",
  "language-php",
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < language_array.length; i++) {
      await queryInterface.bulkInsert(
        "languages",
        [
          {
            language: language_array[i],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("languages", null, {});
  },
};
