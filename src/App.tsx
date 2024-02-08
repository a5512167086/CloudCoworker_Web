// import { Route, Routes } from 'react-router-dom';
import { GetRoutes } from '@routes/index';
import { CustomHeader } from '@components/CustomHeader';
import { CustomFooter } from '@components/CustomFooter';
import { Container } from '@mui/material';

const App = () => (
  <Container
    disableGutters
    maxWidth={false}
    sx={{
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: '80px',
    }}>
    <CustomHeader />
    <GetRoutes />
    <CustomFooter />
  </Container>
);

export default App;
