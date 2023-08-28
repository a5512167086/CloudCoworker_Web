// import { Route, Routes } from 'react-router-dom';
import { GetRoutes } from '@routes/index';
import { CustomHeader } from '@components/CustomHeader';

const App = () => (
  <div>
    <CustomHeader />
    <GetRoutes />
  </div>
);

export default App;
