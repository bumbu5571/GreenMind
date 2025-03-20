'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    static associate({ Company, User, Participant }) {
      this.belongsTo(Company, { foreignKey: 'companyId' });
      this.belongsToMany(User, {
        through: Participant,
        foreignKey: 'promotionId',
      });
      // this.hasMany(Participant, {
      //   foreignKey: "promotionId",
      //   as: "participants",
      // });
    }
  }
  Promotion.init(
    {
      companyId: DataTypes.INTEGER,
      category: DataTypes.STRING,
      score: DataTypes.INTEGER,
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
      dateEnd: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Promotion',
    }
  );
  return Promotion;
};
