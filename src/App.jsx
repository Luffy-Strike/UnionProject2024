import Header from "./components/Header";
import RouterWrapper from "./RouterWrapper";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { getBreeds as getCatBreeds } from "./utils/getCatData";
import { getBreeds as getDogBreeds } from "./utils/getDogData";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const BreedsContext = createContext({});

function App() {
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const dogData = await getDogBreeds();
        const catData = await getCatBreeds();
        const allBreeds = { 'dogs': [...dogData], 'cats': [...catData]};
        setBreeds(allBreeds);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (breeds.length === 0) {
      fetchBreeds();
    }
  }, [breeds]);

  return (
    <BreedsContext.Provider value={breeds}>
      <BrowserRouter>
        <RouterWrapper />
      </BrowserRouter>
    </BreedsContext.Provider>
  );
}

export default App;
