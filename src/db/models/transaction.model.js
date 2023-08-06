const { Model, DataTypes} = require('sequelize');

class Transaction extends Model {
  static init(connection){
    super.init({
     sellerId:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     buyerId:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
     amount:{
      type: DataTypes.INTEGER,
      allowNull: false,
     },
    },
    {
      sequelize:connection,
      timestamps: true,
      tableName:'transactions'
    }
    )
  }
};
module.exports = Transaction;