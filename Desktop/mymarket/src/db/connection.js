const { Sequelize } = require('sequelize');
const { User, Product, ProductType, Transaction } = require('./models');
const config = require('./config')


const connection = new Sequelize(
  config.name,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
  }
);


(async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

User.init(connection);
Product.init(connection);
ProductType.init(connection);
Transaction.init(connection);

User.hasMany(Product, {
  as:'products',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

Product.belongsTo(User, {
  as: 'users',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});

ProductType.hasMany(Product, {
  as: 'products',
  foreignKey: {
    name: 'productTypeId',
    allowNull: false,
  }
});

Product.belongsTo(ProductType, {
  as: 'productTypes',
  foreignKey: {
    name:'productTypeId',
    allowNull: false,
  }
});

(async () => {

  const syncPromises = [
    User.sync({ force: false }).catch((e) => console.error('User', e)),
    Product.sync({ force: false }).catch((e) => console.error('Product', e)),
    ProductType.sync({ force: false }).catch((e) => console.error('ProductType', e)),
    Transaction.sync({ force: false }).catch((e) => console.error('transaction', e)),
  ];

  await Promise.all(syncPromises);
})()

module.exports = connection;