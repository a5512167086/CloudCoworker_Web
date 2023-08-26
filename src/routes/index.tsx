import { Login } from '@containers/Login';

export const PAGE_PATHS = {
  BASE: '/',
  FEATURES: '/features',
  PRICING: '/pricing',
  ABOUT: '/about',
  LOGIN: '/login',
};

export const router = [
  {
    id: 'login',
    path: '/login',
    element: <Login />,
    auth: false,
  },
];
