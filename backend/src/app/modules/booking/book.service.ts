/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

export type ITypeFilterRequest = {
  searchTerm?: string;
  workType?: string;
  status?: string;
  service?: string;
};

const addToBooking = (bookingData: Booking): Promise<Booking> => {
  const result = prisma.booking.create({
    data: bookingData,
    include: {
      workType: true,
      user: true,
    },
  });

  return result;
};

const getAllBookings = async (filters: any, options: IPaginationOptions) => {
  const searchableFields = ['workType', 'user'];

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, workType, status, service } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  if (service) {
    whereConditions.serviceId = service;
  }

  if (workType) {
    whereConditions.workType = workType;
  }

  if (status) {
    whereConditions.status = status;
  }

  const result = await prisma.booking.findMany({
    include: {
      workType: true,
      user: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      workType: true,
      user: true,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
    include: {
      workType: true,
      user: true,
    },
  });
  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookingService = {
  addToBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
