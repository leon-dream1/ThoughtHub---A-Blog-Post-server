"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/User/user.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const blog_route_1 = require("./app/modules/Blog/blog.route");
const app = (0, express_1.default)();
//parser
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// root api
app.get('/', (req, res) => {
    res.send('Hello from Blog server!!!!!');
});
app.use('/api/auth', user_route_1.userRoutes);
app.use('/api/blogs', blog_route_1.blogRoutes);
app.use('/api/admin', blog_route_1.blogRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
