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
exports.orderController = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const orderCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carInfo = req.body;
        const validateCarInfo = order_validation_1.OrderValidationSchema.parse(carInfo);
        // if validate save to Db
        const result = yield order_service_1.orderService.orderCarInDB(validateCarInfo);
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const calculateTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get total revenue
        const { totalRevenue } = yield order_service_1.orderService.calculateRevenueFromDB();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
exports.orderController = {
    orderCar,
    calculateTotalRevenue,
};
