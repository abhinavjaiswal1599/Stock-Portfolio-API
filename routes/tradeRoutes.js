const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.get('/portfolio', tradeController.getPortfolio);
router.get('/holdings', tradeController.getHoldings);
router.get('/returns', tradeController.getCumulativeReturns);
router.post('/addTrade', tradeController.addTrade);
router.post('/updateTrade/:id', tradeController.updateTrade);
router.post('/removeTrade/:id', tradeController.removeTrade);

module.exports = router;
