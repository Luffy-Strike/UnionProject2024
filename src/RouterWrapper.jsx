import { Routes, Route } from "react-router-dom";
import Cats from './pages/Cats';
import Dogs from './pages/Dogs';

const RouterWrapper = () => {
  return (
      <Routes>
        <Route path="/cats" element={<Cats />} />
        <Route path="/dogs" element={<Dogs />}/>
      </Routes>
  )
};

export default RouterWrapper;