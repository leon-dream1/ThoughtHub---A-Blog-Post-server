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
exports.blogControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_services_1 = require("./blog.services");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = req.body;
    const result = yield blog_services_1.blogServices.createBlogIntoDB(req.user, blogData);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
}));
const getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.getAllBlogFromDB(req.query);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Blogs fetched successfully',
        data: result.length ? result : 'No data Found',
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlogData = req.body;
    const { blogId } = req.params;
    const result = yield blog_services_1.blogServices.updateBlogIntoDB(req.user, blogId, updateBlogData);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    yield blog_services_1.blogServices.deleteBlogFromDB(req.user, blogId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
}));
// admin routes
const deleteBlogByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    yield blog_services_1.blogServices.deleteBlogFromDByAdmin(blogId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        data: null,
    });
}));
const blockUserByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    yield blog_services_1.blogServices.blockUserFromDbByAdmin(userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'User blocked successfully',
        data: null,
    });
}));
exports.blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    deleteBlogByAdmin,
    blockUserByAdmin,
    getAllBlog,
};
