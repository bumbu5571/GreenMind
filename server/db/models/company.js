'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ Promotion }) {
      this.hasMany(Promotion, { foreignKey: 'companyId' });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
      isCompany: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Company',
    }
  );
  return Company;
};
