import { TextField } from "@mui/material";
import { useState, useEffect } from "react";


const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');

  const searchHandlers = () => {

  };

  

  return (
    <form>
      <TextField label="search" sx={{ backgroundColor: "white", borderRadius: "8px" }}></TextField>
    </form>
  );
};

export default SearchInput;
