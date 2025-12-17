"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const createBlogValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        content: zod_1.default.string(),
    }),
});
const updateBlogValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        content: zod_1.default.string(),
    }),
});
exports.BlogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
