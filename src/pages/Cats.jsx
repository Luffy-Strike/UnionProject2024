import React, { useContext } from 'react';
import { Box } from "@mui/material";
import { Context } from '../App';
import PetCard from '../components/PetCard';

const Cats = () => {
  const { breeds, searchResults } = useContext(Context);
  
  // Проверяем, что breeds и breeds.cats определены, иначе используем пустой массив
  const cats = breeds && breeds.cats ? breeds.cats : [];
  
  // Проверяем, что searchResults определены и не пустые, иначе используем cats
  const dataToShow = searchResults && searchResults.length ? searchResults : cats;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "20px",
        alignItems: "center",
      }}
    >
      {dataToShow.map((cat, index) => (
        <PetCard key={index} pet={cat} id={index} />
      ))}
    </Box>
  );
};

export default Cats;
