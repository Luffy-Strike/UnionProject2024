import { TextField } from "@mui/material";
import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form>
      <TextField label="search" sx={{ backgroundColor: "white", borderRadius: "8px" }} onChange={handleChange} value={query}></TextField>
      {console.log(query)}
      <button type="submit" onSubmit={handleSubmit}>Search</button>
    </form>
  );
};

export default SearchInput;
