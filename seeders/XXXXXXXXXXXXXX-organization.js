'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('organization', [
      {
        name: 'Mihir Rane',
        slug: 'rane',
        logo: ''
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organization', null, {});
  }
};
