const Trade = require('../models/Trade');
const Stock = require('../models/Stock');
const Portfolio = require('../models/Portfolio');

class TradeService {
    async getPortfolio() {
        return await Portfolio.findOne().populate('trades');
    }

    async getHoldings() {
        const portfolio = await this.getPortfolio();
        // Logic to calculate holdings
        const holdings = {};
        portfolio.trades.forEach(trade => {
            if (!holdings[trade.stock.symbol]) {
                holdings[trade.stock.symbol] = { quantity: 0, totalPrice: 0 };
            }
            if (trade.type === 'BUY') {
                holdings[trade.stock.symbol].quantity += trade.quantity;
                holdings[trade.stock.symbol].totalPrice += trade.price * trade.quantity;
            } else if (trade.type === 'SELL') {
                holdings[trade.stock.symbol].quantity -= trade.quantity;
            }
        });

        return Object.keys(holdings).map(symbol => {
            const stock = holdings[symbol];
            return {
                symbol,
                quantity: stock.quantity,
                averagePrice: stock.quantity > 0 ? stock.totalPrice / stock.quantity : 0
            };
        });
    }

    async getCumulativeReturns() {
        const holdings = await this.getHoldings();
        let initialInvestment = 0;
        let currentValue = 0;

        holdings.forEach(stock => {
            initialInvestment += stock.quantity * stock.averagePrice;
            currentValue += stock.quantity * 100; // Assuming final price is 100
        });

        return currentValue - initialInvestment;
    }

    async addTrade(tradeData) {
        const stock = await Stock.findOne({ symbol: tradeData.stockSymbol });
        if (!stock) {
            throw new Error('Stock not found');
        }

        const trade = new Trade({
            stock: stock._id,
            type: tradeData.type,
            quantity: tradeData.quantity,
            price: tradeData.price,
            date: tradeData.date
        });

        await trade.save();

        const portfolio = await Portfolio.findOne();
        portfolio.trades.push(trade._id);
        await portfolio.save();

        return trade;
    }

    async updateTrade(tradeId, tradeData) {
        const trade = await Trade.findById(tradeId);
        if (!trade) {
            throw new Error('Trade not found');
        }

        Object.assign(trade, tradeData);
        await trade.save();

        return trade;
    }

    async removeTrade(tradeId) {
        const trade = await Trade.findById(tradeId);
        if (!trade) {
            throw new Error('Trade not found');
        }

        await trade.remove();

        const portfolio = await Portfolio.findOne();
        portfolio.trades.pull(tradeId);
        await portfolio.save();

        return trade;
    }
}

module.exports = new TradeService();
