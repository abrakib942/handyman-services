/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const createService = async (serviceData: Service): Promise<Service> => {
  // const existingService = await prisma.service.findFirst({
  //   where: {
  //     title: serviceData.title,
  //   },
  // });

  // if (existingService) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'Service with this title already exists.'
  //   );
  // }

  const result = prisma.service.create({
    data: serviceData,
  });

  return result;
};

const getAllServices = async (filters: any, options: IPaginationOptions) => {
  const searchableFields = ['title'];

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, title } = filters;
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  if (title) {
    whereConditions.title = title;
  }

  const result = await prisma.service.findMany({
    include: {
      workTypes: true,
      booking: true,
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.service.count({
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

const getAService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteService = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ServiceService = {
  createService,
  getAllServices,
  getAService,
  updateService,
  deleteService,
};
