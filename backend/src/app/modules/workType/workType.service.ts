/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, WorkType } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

export type ITypeFilterRequest = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  service?: string;
};

const createWorkType = (typeData: WorkType): Promise<WorkType> => {
  const result = prisma.workType.create({
    data: typeData,
    include: {
      cart: true,
      booking: true,
      reviews: true,
    },
  });

  return result;
};

const getAllTypes = async (filters: any, options: IPaginationOptions) => {
  const searchableFields = ['title'];

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, service } = filters;
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

  const whereConditions: Prisma.WorkTypeWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  if (minPrice) {
    whereConditions.price = {
      gte: parseFloat(minPrice),
    };
  }

  if (maxPrice) {
    if (!whereConditions.price) {
      whereConditions.price = {};
    }
    whereConditions.price = { lte: parseFloat(maxPrice) };
  }

  if (service) {
    whereConditions.serviceId = service;
  }

  const result = await prisma.workType.findMany({
    include: {
      cart: true,
      booking: true,
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.workType.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAType = async (id: string): Promise<WorkType | null> => {
  const result = await prisma.workType.findUnique({
    where: {
      id,
    },
    include: {
      cart: true,
      booking: true,
      reviews: true,
    },
  });
  return result;
};

const updateType = async (
  id: string,
  payload: Partial<WorkType>
): Promise<WorkType> => {
  const result = await prisma.workType.update({
    where: {
      id,
    },
    data: payload,
    include: {
      cart: true,
      booking: true,
      reviews: true,
    },
  });
  return result;
};

const deleteType = async (id: string): Promise<WorkType> => {
  const result = await prisma.workType.delete({
    where: {
      id,
    },
    include: {
      cart: true,
      booking: true,
      reviews: true,
    },
  });
  return result;
};

const getTypesByServiceId = async (serviceId: string) => {
  const result = await prisma.workType.findMany({
    where: {
      serviceId: serviceId,
    },
    include: {
      cart: true,
      booking: true,
      reviews: true,
    },
  });
  return result;
};

export const WorkTypeService = {
  createWorkType,
  getAllTypes,
  getAType,
  updateType,
  deleteType,
  getTypesByServiceId,
};
