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
exports.carServices = void 0;
const car_model_1 = require("./car.model");
// save a car data
const saveCarInDB = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.carModel.create(carData);
    return result;
});
// Get all cars Data
const getAllCarFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.carModel.find({});
    return result;
});
// Get a single car data
const getASingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.carModel.findOne({ _id: id });
    return result;
});
// Update a car data
const updateACarDataInDB = (id, price, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    // get the car info will be update
    // const carInfo = await carModel.findOne({ _id: id });
    const updatedResult = yield car_model_1.carModel.updateOne({
        _id: id,
    }, {
        $set: {
            price,
            quantity,
        },
    });
    // get the updated car data
    const updatedCarInfo = yield car_model_1.carModel.findOne({ _id: id });
    return { updatedResult, updatedCarInfo };
});
// Get a single car data
const deleteACarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.carModel.deleteOne({ _id: id });
    // get the Deleted car Info
    const deletedCarInfo = yield car_model_1.carModel.findOne({ _id: id });
    return { result, deletedCarInfo };
});
exports.carServices = {
    saveCarInDB,
    getAllCarFromDB,
    getASingleCarFromDB,
    updateACarDataInDB,
    deleteACarFromDB,
};
