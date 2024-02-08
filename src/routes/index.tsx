import { Login } from '@containers/Login';
import { Main } from '@containers/Main';
import { RootState } from '@store/index';
import { checkIsAuth } from '@utils/helpers';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

export const PAGE_PATHS = {
  BASE: '/',
  FEATURES: '/features',
  ABOUT: 'https://github.com/a5512167086',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
};

export const GetRoutes = () => {
  const { userName, userEmail, userToken } = useSelector(
    (state: RootState) => state.user,
  );

  const isAuth = checkIsAuth(userName, userEmail, userToken!);

  const routes = useRoutes([
    {
      path: PAGE_PATHS.BASE,
      element: <Main />,
    },
    {
      path: PAGE_PATHS.LOGIN,
      element: isAuth ? <Navigate to={PAGE_PATHS.BASE} replace /> : <Login />,
    },
    {
      path: PAGE_PATHS.REGISTER,
      element: isAuth ? <Navigate to={PAGE_PATHS.BASE} replace /> : <Login />,
    },
  ]);

  return routes;
};
