import express from 'express';
import { WorkTypeController } from './workType.controller';

const router = express.Router();

router.post('/create', WorkTypeController.createWorkType);
router.get('/', WorkTypeController.getAllTypes);
router.get('/:id', WorkTypeController.getAType);
router.get('/:serviceId', WorkTypeController.getTypesByServiceId);

router.patch('/:id', WorkTypeController.updateType);
router.delete('/:id', WorkTypeController.deleteType);

export const WorkTypeRoutes = router;
