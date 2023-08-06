const { Model, DataTypes} = require('sequelize');

class Product extends Model {
  static init(connection){
    super.init({
     title:{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
     description:{
      type: DataTypes.STRING(100),
      allowNull: false,
     },
     price:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     soldAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
    {
      sequelize:connection,
      timestamps: true,
      tableName:'products'
    }
    )
  }
};
module.exports = Product;