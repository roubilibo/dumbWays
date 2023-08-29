'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_project.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    author: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    html: DataTypes.BOOLEAN,
    css: DataTypes.BOOLEAN,
    js: DataTypes.BOOLEAN,
    njs: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    posted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tb_project',
    timestamps: true,
    createdAt: true,
    updatedAt: 'updateTimestamp'
  });
  return tb_project;
};