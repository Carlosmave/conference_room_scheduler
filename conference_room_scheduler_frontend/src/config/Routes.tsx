import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';

export const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
