import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createService = (serviceData: Service): Promise<Service> => {
  const result = prisma.service.create({
    data: serviceData,
  });

  return result;
};

const getAllServices = async () => {
  const result = await prisma.service.findMany({
    include: {
      workTypes: true,
      booking: true,
      reviews: true,
    },
  });

  return result;
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
