import { Route, Routes } from 'react-router-dom';
import { routes } from './router/routes';

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={<route.element />} key={route.path} />
      ))}
    </Routes>
  );
}

export default App;
