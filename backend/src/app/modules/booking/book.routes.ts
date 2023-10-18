import express from 'express';
import { BookingController } from './book.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(BookingValidation.bookingZodSchema),
  BookingController.addToBooking
);
router.get('/', BookingController.getAllBookings);
router.get('/:id', BookingController.getSingleBooking);

router.patch('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

export const BookingRoutes = router;
