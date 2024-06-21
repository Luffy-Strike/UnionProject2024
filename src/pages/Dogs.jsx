import React, { useContext } from 'react';
import { Box } from "@mui/material";
import { Context } from '../App';
import PetCard from '../components/PetCard';

const Cats = () => {
  const { breeds, searchResults } = useContext(Context);
  
  // Проверяем, что breeds и breeds.dogs определены, иначе используем пустой массив
  const dogs = breeds && breeds.dogs ? breeds.dogs : [];
  
  // Проверяем, что searchResults определены и не пустые, иначе используем dogs
  const dataToShow = searchResults && searchResults.length ? searchResults : dogs;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "20px",
        alignItems: "center",
      }}
    >
      {dataToShow.map((dog, index) => (
        <PetCard key={index} pet={dog} id={index} />
      ))}
    </Box>
  );
};

export default Cats;
