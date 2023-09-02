import { Login } from '@containers/Login';
import { useRoutes } from 'react-router-dom';

export const PAGE_PATHS = {
  BASE: '/',
  FEATURES: '/features',
  ABOUT: 'https://github.com/a5512167086',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};

export const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: PAGE_PATHS.LOGIN,
      element: <Login />,
    },
    {
      path: PAGE_PATHS.REGISTER,
      element: <Login />,
    },
  ]);

  return routes;
};
