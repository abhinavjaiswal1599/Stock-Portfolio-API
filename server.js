const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/db');

const app = express();

app.use(express.json());

const tradeRoutes = require('./routes/tradeRoutes');
app.use('/', tradeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
