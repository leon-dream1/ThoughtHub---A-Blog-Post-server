"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const car_model_1 = require("../car/car.model");
const order_model_1 = require("./order.model");
const orderCarInDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCarId = data.car;
    const carExist = yield car_model_1.carModel.findOne({ _id: orderCarId });
    if (!carExist) {
        throw new Error('Car is not Found');
    }
    if (carExist.quantity < data.quantity) {
        throw new Error('Insufficient stock available');
    }
    const result = yield order_model_1.orderModel.create(data);
    if (result) {
        // decrement quantity after order a car
        yield car_model_1.carModel.updateOne({ _id: result.car }, {
            $inc: {
                quantity: -result.quantity,
            },
            $set: {
                inStock: carExist.quantity - data.quantity === 0 ? false : true,
            },
        });
    }
    return result;
});
const calculateRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ['$quantity', '$totalPrice'] } },
            },
        },
    ]);
    return result[0];
});
exports.orderService = {
    orderCarInDB,
    calculateRevenueFromDB,
};
