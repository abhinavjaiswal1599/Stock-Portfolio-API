const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
    type: { type: String, required: true, enum: ['BUY', 'SELL'] },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Trade', TradeSchema);
