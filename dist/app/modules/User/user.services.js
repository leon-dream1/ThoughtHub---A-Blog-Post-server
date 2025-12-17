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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const saveUserToDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const loginUserToDB = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists or not
    const isUserExists = yield user_model_1.User.findOne({ email });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials!');
    }
    // check if user blocked or not
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isBlocked) === true) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials!');
    }
    // check password is match or not
    const passwordMatched = yield bcrypt_1.default.compare(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!passwordMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials!');
    }
    // create token and send to client
    const jwtPayload = {
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.JWT_ACCESS_SECRET, {
        expiresIn: '10d',
    });
    return accessToken;
});
exports.userServices = {
    saveUserToDB,
    loginUserToDB,
};
