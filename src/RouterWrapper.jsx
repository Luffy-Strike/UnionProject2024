import { Routes, Route, Navigate } from "react-router-dom";
import Cats from "./pages/Cats";
import Dogs from "./pages/Dogs";
import Results from "./pages/Results";

const RouterWrapper = () => {
  return (
    <Routes>
      <Route path="/cats" element={<Cats />} />
      <Route path="/dogs" element={<Dogs />} />
      <Route path="/" element={<Navigate to="/cats"/>}></Route>
    </Routes>
  );
};

export default RouterWrapper;
