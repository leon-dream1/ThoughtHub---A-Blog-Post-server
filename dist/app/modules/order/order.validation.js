"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
exports.OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    car: zod_1.z.string().min(1, 'Car ID is required'),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: zod_1.z.number().positive('Total price must be a positive number'),
});
