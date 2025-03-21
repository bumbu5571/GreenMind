'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      'Participants',
      [
        {
          userId: 1,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          promotionId: 2,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          promotionId: 4,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          promotionId: 6,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          promotionId: 7,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          promotionId: 14,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          promotionId: 7,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          promotionId: 6,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          promotionId: 7,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          promotionId: 14,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          promotionId: 7,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 7,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 11,
          promotionId: 14,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 11,
          promotionId: 15,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 12,
          promotionId: 2,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 12,
          promotionId: 6,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 12,
          promotionId: 9,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 13,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 14,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 15,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 16,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 17,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 18,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 19,
          promotionId: 15,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 20,
          promotionId: 14,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 21,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 22,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 23,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 23,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 24,
          promotionId: 8,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 25,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 26,
          promotionId: 6,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 27,
          promotionId: 4,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 28,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 29,
          promotionId: 2,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 30,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 31,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 32,
          promotionId: 2,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 33,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 34,
          promotionId: 4,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 35,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 36,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 36,
          promotionId: 11,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 37,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 38,
          promotionId: 4,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 39,
          promotionId: 7,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 40,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 41,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 42,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 42,
          promotionId: 8,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 42,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 43,
          promotionId: 6,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 44,
          promotionId: 4,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 44,
          promotionId: 13,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 55,
          promotionId: 15,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 55,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 46,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 47,
          promotionId: 6,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 48,
          promotionId: 7,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 49,
          promotionId: 8,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 50,
          promotionId: 9,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 51,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 51,
          promotionId: 11,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 52,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 53,
          promotionId: 13,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 54,
          promotionId: 14,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 55,
          promotionId: 15,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 56,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 56,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 57,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 58,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 59,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 60,
          promotionId: 15,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 60,
          promotionId: 14,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 61,
          promotionId: 3,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 62,
          promotionId: 1,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 62,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 63,
          promotionId: 10,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 63,
          promotionId: 12,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 65,
          promotionId: 5,
          isParticipated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    Example: await queryInterface.bulkDelete('Participants', null, {});
  },
};
