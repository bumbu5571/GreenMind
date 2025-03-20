'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      'Companies',
      [
        {
          name: 'Apple',
          email: 'apple@gmail.com',
          password: await bcrypt.hash('12345', 10),
          isCompany: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Zori',
          email: 'zori@rumbler.ru',
          password: await bcrypt.hash('12345', 10),
          isCompany: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Стрела',
          email: 'strela@mail.ru',
          password: await bcrypt.hash('12345', 10),
          isCompany: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Модуль',
          email: 'module@mail.ru',
          password: await bcrypt.hash('12345', 10),
          isCompany: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Honor',
          email: 'honor@gmail.com',
          password: await bcrypt.hash('12345', 10),
          isCompany: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    Example: await queryInterface.bulkDelete('Companies', null, {});
  },
};
