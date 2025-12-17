"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userValidationSchema.userRegisterValidationSchema), user_controller_1.userControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userValidationSchema.userLoginValidationSchema), user_controller_1.userControllers.loginUser);
exports.userRoutes = router;
