"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkTypeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const workType_controller_1 = require("./workType.controller");
const router = express_1.default.Router();
router.post('/create', workType_controller_1.WorkTypeController.createWorkType);
router.get('/', workType_controller_1.WorkTypeController.getAllTypes);
router.get('/:id', workType_controller_1.WorkTypeController.getAType);
router.get('/:serviceId', workType_controller_1.WorkTypeController.getTypesByServiceId);
router.patch('/:id', workType_controller_1.WorkTypeController.updateType);
router.delete('/:id', workType_controller_1.WorkTypeController.deleteType);
exports.WorkTypeRoutes = router;
