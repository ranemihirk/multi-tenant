"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user", [
      {
        name: "Super Admin",
        email: "super-admin@ranemihirk.com",
        password:
          "$2b$10$nyuwJSrGfzYMYllazHlUzOepDNKeHvtWm9lmG2tEpnWasgJYU/rmi",
        number: "1234567890",
        role: "super_admin",
        organizationId: null,
        approved: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
