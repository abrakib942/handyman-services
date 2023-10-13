import express from 'express';

const router = express.Router();

router.post('/create-service');
router.get('/');
router.get('/:id');

router.patch('/:id');
router.delete('/:id');

export const ServiceRoutes = router;
