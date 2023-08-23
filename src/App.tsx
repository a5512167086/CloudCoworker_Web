import { Route, Routes } from 'react-router-dom';
import { router } from '@routes/index';

const App = () => (
  <div>
    <Routes>
      {router.map(({ id, path, element }) => (
        <Route id={id} key={id} path={path} element={element} />
      ))}
    </Routes>
  </div>
);

export default App;
