import { Route, Routes } from 'react-router-dom';
import { router } from '@routes/index';
import { CustomHeader } from '@components/CustomHeader';

const App = () => (
  <div>
    <CustomHeader />
    <Routes>
      {router.map(({ id, path, element }) => (
        <Route id={id} key={id} path={path} element={element} />
      ))}
    </Routes>
  </div>
);

export default App;
