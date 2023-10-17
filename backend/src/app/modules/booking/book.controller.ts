import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './book.service';

const addToBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.addToBooking(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Booked',
    data: result,
  });
});
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'service',
    'workType',
    'status',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BookingService.getAllBookings(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getSingleBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.updateBooking(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  addToBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
