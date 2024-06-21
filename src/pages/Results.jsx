import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Context } from "../App";
import PetCard from "../components/PetCard";

const Results = () => {
  const location = useLocation();
  const { breeds } = useContext(Context);
  const [results, setResults] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const breedQuery = searchParams.get("breed");

  useEffect(() => {
    if (breedQuery) {
      const filteredResults = Object.values(breeds).flat().filter((breed) =>
        breed.name.toLowerCase().includes(breedQuery.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [breedQuery, breeds]);

  return (
    <>
      <h1>Search Results for "{breedQuery}"</h1>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "20px",
          alignItems: "center",
        }}
      >
        {results.map((pet, index) => (
          <PetCard key={index} pet={pet} id={index} />
        ))}
      </Box>
    </>
  );
};

export default Results;
