// models/Reading.js

const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['water', 'gas'],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    imagePath: {
        type: String,
        required: true,
    },
}, {timetamps: true }
);

module.exports = mongoose.model('Reading', ReadingSchema);
