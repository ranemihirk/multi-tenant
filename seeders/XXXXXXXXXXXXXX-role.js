"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("role", [
      {
        name: "super-admin",
      },
      {
        name: "owner",
      },
      {
        name: "admin",
      },
      {
        name: "producer",
      },
      {
        name: "director",
      },
      {
        name: "line-producer",
      },
      {
        name: "crew-member",
      },
      {
        name: "editor",
      },
      {
        name: "client",
      },
      {
        name: "vendor",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role", null, {});
  },
};
