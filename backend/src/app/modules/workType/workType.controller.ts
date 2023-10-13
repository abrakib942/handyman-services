import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { WorkTypeService } from './workType.service';

const createWorkType = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkTypeService.createWorkType(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WorkType created successfully',
    data: result,
  });
});
const getAllTypes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'service',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await WorkTypeService.getAllTypes(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WorkTypes retrieved successfully',
    data: result,
  });
});
const getAType = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkTypeService.getAType(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'type retrieved successfully',
    data: result,
  });
});

const updateType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WorkTypeService.updateType(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'type updated successfully',
    data: result,
  });
});

const deleteType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await WorkTypeService.deleteType(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'type deleted successfully',
    data: result,
  });
});

const getTypesByServiceId = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const result = await WorkTypeService.getTypesByServiceId(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'types retrieved successfully',
    data: result,
  });
});

export const WorkTypeController = {
  createWorkType,
  getAllTypes,
  getAType,
  updateType,
  deleteType,
  getTypesByServiceId,
};
