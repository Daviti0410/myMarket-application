const router = require ('express').Router();

const StatisticController = require('../controller/statisticcontroller')

router.get('/', StatisticController.getSumGroupedByYearAndMonth);

module.exports = router;