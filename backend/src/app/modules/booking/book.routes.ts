import express from 'express';
import { BookingController } from './book.controller';

const router = express.Router();

router.post('/create', BookingController.addToBooking);
router.get('/', BookingController.getAllBookings);
router.get('/:id', BookingController.getSingleBooking);

router.patch('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

export const BookingRoutes = router;
