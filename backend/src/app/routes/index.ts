import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { WorkTypeRoutes } from '../modules/workType/workType.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoute,
  },
  {
    path: '/',
    routes: UserRoutes,
  },
  {
    path: '/services',
    routes: ServiceRoutes,
  },
  {
    path: '/workTypes',
    routes: WorkTypeRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
