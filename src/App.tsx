// import { Route, Routes } from 'react-router-dom';
import { GetRoutes } from '@routes/index';
import { CustomHeader } from '@components/CustomHeader';
import { CustomFooter } from '@components/CustomFooter';
import { Box, CircularProgress, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { useEffect, useState } from 'react';
import { checkIsAuth, isEmpty } from '@utils/helpers';
import { checkUserLogin } from '@store/modules/userSlice';
import { Status } from '@configs/type';
import './index.css';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [initState, setInitState] = useState(true);
  const { userName, userEmail, userToken, status } = useSelector(
    (state: RootState) => state.user,
  );
  const storageToken =
    localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

  useEffect(() => {
    if (storageToken && !checkIsAuth(userName, userEmail, userToken!)) {
      dispatch(checkUserLogin(storageToken));
    }
  }, []);

  useEffect(() => {
    if (
      isEmpty(storageToken) ||
      (initState && status !== Status.Idle && userToken)
    ) {
      setInitState(false);
    }
  }, [userToken, status]);

  return initState ? (
    <Box
      height='80vh'
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <CircularProgress size='10rem' />
    </Box>
  ) : (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        paddingBottom: '80px',
      }}>
      <CustomHeader />
      {!initState && <GetRoutes />}
      <CustomFooter />
    </Container>
  );
};

export default App;
