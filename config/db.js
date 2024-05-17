const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ueyzo1.mongodb.net/portfolio`;

// mongodb+srv://jaisabhi1509:nbpYMLLbW8peWOGx@cluster0.7ueyzo1.mongodb.net/
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
