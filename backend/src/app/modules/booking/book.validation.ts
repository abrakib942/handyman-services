import { z } from 'zod';

const bookingZodSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'date is required',
    }),
    userId: z.string({
      required_error: 'user is required',
    }),
    workTypeId: z.string({
      required_error: 'workType is required',
    }),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  }),
});

export const BookingValidation = { bookingZodSchema };
