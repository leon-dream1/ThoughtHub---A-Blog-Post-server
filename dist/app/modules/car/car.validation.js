"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidationSchema = void 0;
const zod_1 = require("zod");
exports.carValidationSchema = zod_1.z.object({
    brand: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number(),
    price: zod_1.z.number().min(0),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
    description: zod_1.z.string(),
    quantity: zod_1.z.number().min(0),
    inStock: zod_1.z.boolean(),
});
