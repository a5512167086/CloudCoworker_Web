import { Login } from '@containers/Login';

export const router = [
  {
    id: 'login',
    path: '/login',
    element: <Login />,
    auth: false,
  },
];
