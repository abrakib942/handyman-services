import express from 'express';
import { ServiceController } from './service.controller';

const router = express.Router();

router.post('/create-service', ServiceController.createService);
router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getAService);

router.patch('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;
