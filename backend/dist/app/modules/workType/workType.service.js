"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkTypeService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createWorkType = (typeData) => {
    const result = prisma_1.default.workType.create({
        data: typeData,
        include: {
            cart: true,
            booking: true,
            reviews: true,
            service: true,
        },
    });
    return result;
};
const getAllTypes = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title'];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
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
    const whereConditions = andConditons.length > 0 ? { AND: andConditons } : {};
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
    const result = yield prisma_1.default.workType.findMany({
        include: {
            cart: true,
            booking: true,
            reviews: true,
            service: true,
        },
        where: whereConditions,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.workType.count({
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
});
const getAType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.workType.findUnique({
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
});
const updateType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.workType.update({
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
});
const deleteType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.workType.delete({
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
});
const getTypesByServiceId = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.workType.findMany({
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
});
exports.WorkTypeService = {
    createWorkType,
    getAllTypes,
    getAType,
    updateType,
    deleteType,
    getTypesByServiceId,
};
