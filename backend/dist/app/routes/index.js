"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const service_routes_1 = require("../modules/service/service.routes");
const user_routes_1 = require("../modules/user/user.routes");
const workType_routes_1 = require("../modules/workType/workType.routes");
const book_routes_1 = require("../modules/booking/book.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoute,
    },
    {
        path: '/',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/services',
        routes: service_routes_1.ServiceRoutes,
    },
    {
        path: '/workTypes',
        routes: workType_routes_1.WorkTypeRoutes,
    },
    {
        path: '/booking',
        routes: book_routes_1.BookingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
