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
exports.blogServices = void 0;
const user_model_1 = require("../User/user.model");
const blog_model_1 = require("./blog.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const copyQueryObj = Object.assign({}, query);
    // search by field title or content
    let searchTerm = '';
    if (copyQueryObj === null || copyQueryObj === void 0 ? void 0 : copyQueryObj.search) {
        searchTerm = copyQueryObj === null || copyQueryObj === void 0 ? void 0 : copyQueryObj.search;
    }
    const searchableFields = ['title', 'content'];
    const searchQuery = blog_model_1.Blog.find({
        $or: searchableFields.map((searchItem) => ({
            [searchItem]: { $regex: searchTerm, $options: 'i' },
        })),
    });
    // filter by author
    if (copyQueryObj.filter) {
        // convert "filter" param into author field
        copyQueryObj.author = new mongoose_1.default.Types.ObjectId(copyQueryObj === null || copyQueryObj === void 0 ? void 0 : copyQueryObj.filter);
        delete copyQueryObj.filter;
    }
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((field) => delete copyQueryObj[field]);
    const filterQuery = searchQuery.find(copyQueryObj);
    // sortby
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    const sortQuery = yield filterQuery
        .sort({ [sortBy]: sortOrder })
        .populate('author', 'name email -_id');
    return sortQuery;
});
const createBlogIntoDB = (userData, blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userData === null || userData === void 0 ? void 0 : userData.email });
    const blogDataWithAuthor = Object.assign(Object.assign({}, blogData), { author: user === null || user === void 0 ? void 0 : user._id });
    const result = yield blog_model_1.Blog.create(blogDataWithAuthor);
    return result;
});
const updateBlogIntoDB = (user, blogId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(blogId);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Blog not found');
    }
    const tokenUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!(isBlogExists === null || isBlogExists === void 0 ? void 0 : isBlogExists.author.equals(tokenUser === null || tokenUser === void 0 ? void 0 : tokenUser._id))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized !');
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(blogId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBlogFromDB = (user, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(blogId);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Blog not found');
    }
    const tokenUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!(isBlogExists === null || isBlogExists === void 0 ? void 0 : isBlogExists.author.equals(tokenUser === null || tokenUser === void 0 ? void 0 : tokenUser._id))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized !');
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(blogId);
    return result;
});
// admin work
const deleteBlogFromDByAdmin = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(blogId);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Blog not found');
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(blogId);
    return result;
});
const blockUserFromDbByAdmin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findById(userId);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        isBlocked: true,
    }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    deleteBlogFromDByAdmin,
    blockUserFromDbByAdmin,
    getAllBlogFromDB,
};
