"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("./car.controller");
const router = express_1.default.Router();
router.post('/', car_controller_1.carController.createCar);
router.get('/', car_controller_1.carController.getAllCar);
router.get('/:carId', car_controller_1.carController.getASingleCar);
router.put('/:carId', car_controller_1.carController.updateASingleCar);
router.delete('/:carId', car_controller_1.carController.deleteASingleCar);
exports.carRouter = router;
