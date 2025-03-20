'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate() {}
  }
  Participant.init(
    {
      userId: DataTypes.INTEGER,
      promotionId: DataTypes.INTEGER,
      isParticipated: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Participant',
    }
  );
  return Participant;
};
