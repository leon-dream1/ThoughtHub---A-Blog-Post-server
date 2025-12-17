"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModel = exports.carSchema = void 0;
const mongoose_1 = require("mongoose");
//create a Schema
exports.carSchema = new mongoose_1.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
        type: String,
        enum: {
            values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
            message: '{VALUE} is not a valid Car category',
        },
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
// create a Model
exports.carModel = (0, mongoose_1.model)('Car', exports.carSchema);
