import { lazy } from 'react';

const routes = {
  dashboard: {
    path: '/',
    component: lazy(() => import('../pages/Dashboard')),
    name: 'Dashboard',
  },
};

export default routes;
