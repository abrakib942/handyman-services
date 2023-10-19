"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: 'date is required',
        }),
        userId: zod_1.z.string({
            required_error: 'user is required',
        }),
        workTypeId: zod_1.z.string({
            required_error: 'workType is required',
        }),
        status: zod_1.z.enum(['pending', 'confirmed', 'cancelled']).optional(),
    }),
});
exports.BookingValidation = { bookingZodSchema };
