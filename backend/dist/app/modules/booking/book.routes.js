"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(book_validation_1.BookingValidation.bookingZodSchema), book_controller_1.BookingController.addToBooking);
router.get('/', book_controller_1.BookingController.getAllBookings);
router.get('/:id', book_controller_1.BookingController.getSingleBooking);
router.patch('/:id', book_controller_1.BookingController.updateBooking);
router.delete('/:id', book_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
