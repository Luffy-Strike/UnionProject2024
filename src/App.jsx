import Header from "./components/Header";
import RouterWrapper from "./RouterWrapper";
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  )
}

export default App
