'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'alamat', // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'latitude',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'longitude',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
