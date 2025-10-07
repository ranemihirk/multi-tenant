"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const organizations = await queryInterface.sequelize.query(
      `SELECT id from organization WHERE slug = 'rane';`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id from role WHERE name = 'super-admin';`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("user", [
      {
        name: "Super Admin",
        email: "super-admin@ranemihirk.com",
        password:
          "$2b$10$nyuwJSrGfzYMYllazHlUzOepDNKeHvtWm9lmG2tEpnWasgJYU/rmi",
        number: "1234567890",
        tenantId: organizations[0].id,
        approved: true,
      },
    ]);

    const users = await queryInterface.sequelize.query(
      `SELECT id from user WHERE email = 'super-admin@ranemihirk.com';`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("userRoles", [
      {
        userId: users[0].id,
        roleId: roles[0].id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
    await queryInterface.bulkDelete("userRoles", null, {});
  },
};
