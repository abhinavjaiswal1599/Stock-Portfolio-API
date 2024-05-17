const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Stock', StockSchema);
