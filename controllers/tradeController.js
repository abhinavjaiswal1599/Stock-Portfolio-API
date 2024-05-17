// const tradeService = require('../services/tradeService');
const tradeService=require('../services/tradeService')
 
const getPortfolio = async (req, res) => {
    try {
        const portfolio = await tradeService.getPortfolio();
        res.json({ success: true, data: portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getHoldings = async (req, res) => {
    try {
        const holdings = await tradeService.getHoldings();
        res.json({ success: true, data: holdings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCumulativeReturns = async (req, res) => {
    try {
        const returns = await tradeService.getCumulativeReturns();
        res.json({ success: true, data: returns });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addTrade = async (req, res) => {
    try {
        const trade = await tradeService.addTrade(req.body);
        res.json({ success: true, data: trade });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateTrade = async (req, res) => {
    try {
        const trade = await tradeService.updateTrade(req.params.id, req.body);
        res.json({ success: true, data: trade });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeTrade = async (req, res) => {
    try {
        const trade = await tradeService.removeTrade(req.params.id);
        res.json({ success: true, data: trade });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


    module.exports={getPortfolio,getHoldings,getCumulativeReturns,addTrade,updateTrade,removeTrade}