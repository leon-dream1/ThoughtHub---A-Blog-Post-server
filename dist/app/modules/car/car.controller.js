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
exports.carController = void 0;
const car_service_1 = require("./car.service");
const car_validation_1 = require("./car.validation");
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        console.log(carData);
        const validateCarData = car_validation_1.carValidationSchema.parse(carData);
        // if validate save to Db
        const result = yield car_service_1.carServices.saveCarInDB(validateCarData);
        res.status(200).json({
            message: 'Car created successfully',
            success: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getAllCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield car_service_1.carServices.getAllCarFromDB();
        res.status(200).json({
            message: 'Cars retrieved successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getASingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield car_service_1.carServices.getASingleCarFromDB(carId);
        res.status(200).json({
            message: 'Car retrieved successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const updateASingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, quantity } = req.body;
        console.log(req.body);
        const { carId } = req.params;
        const { updatedCarInfo } = yield car_service_1.carServices.updateACarDataInDB(carId, price, quantity);
        res.status(200).json({
            message: 'Car updated successfully',
            status: true,
            data: updatedCarInfo,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const deleteASingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const { deletedCarInfo } = yield car_service_1.carServices.deleteACarFromDB(carId);
        res.status(200).json({
            message: 'Car deleted successfully',
            status: true,
            data: deletedCarInfo === null && {},
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: error.message || 'something went wrong',
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
exports.carController = {
    createCar,
    getAllCar,
    getASingleCar,
    updateASingleCar,
    deleteASingleCar,
};
