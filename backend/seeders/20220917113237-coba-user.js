'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [{
        name: 'Abdul Aziz',
        phone: '085123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Dimas Suraji',
        phone: '081987654321',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  queryInterface.bulkDelete('People', { 
    //   where: {
    //   id: req.params.id
    // }}, {});
  }
};
