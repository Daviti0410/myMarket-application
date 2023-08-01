const { Model, DataTypes} = require('sequelize');

class ProductType extends Model {
  static init(connection){
    super.init({
     title:{
      type: DataTypes.STRING(50),
      allowNull: false,
     },
    },
    {
      sequelize:connection,
      tableName:'productTypes'
    }
    )
  }
};
module.exports = ProductType;