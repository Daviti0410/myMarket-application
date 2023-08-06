const { Transaction } = require('../db/models');
const { sequelize } = require('sequelize');


const getSumGroupedByYearAndMonth = async(req, res) => {
  try {
    const result = await Transaction.sum('amount', {
      group:[
        sequelize.fn('year', sequelize.col('createdAt')),
        sequelize.fn('month', sequelize.col('createdAt')),
      ],
    })
    res.json(result);
  }
  catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
}
module.exports = {
  getSumGroupedByYearAndMonth,
};