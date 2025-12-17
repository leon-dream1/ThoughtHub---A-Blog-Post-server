"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const Auth_1 = __importDefault(require("../../utils/Auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.get('/', blog_controller_1.blogControllers.getAllBlog);
router.post('/', (0, Auth_1.default)(user_constant_1.Role.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidationSchema.createBlogValidationSchema), blog_controller_1.blogControllers.createBlog);
router.patch('/:blogId', (0, Auth_1.default)(user_constant_1.Role.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidationSchema.updateBlogValidationSchema), blog_controller_1.blogControllers.updateBlog);
router.delete('/:blogId', (0, Auth_1.default)(user_constant_1.Role.user), blog_controller_1.blogControllers.deleteBlog);
// delete by admin
router.delete('/blogs/:blogId', (0, Auth_1.default)(user_constant_1.Role.admin), blog_controller_1.blogControllers.deleteBlogByAdmin);
router.patch('/users/:userId/block', (0, Auth_1.default)(user_constant_1.Role.admin), blog_controller_1.blogControllers.blockUserByAdmin);
exports.blogRoutes = router;
