import { TextField, Autocomplete } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Context } from "../App";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const { breeds, setSearchResults } = useContext(Context);
  const breedsNames = Object.values(breeds).flat().map(({ name, id }) => ({ name, id }));

  useEffect(() => {
    if (query) {
      const filtered = Object.values(breeds).flat().filter((breed) =>
        breed.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [query, breeds, setSearchResults]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Autocomplete
        freeSolo
        options={breedsNames.map(({ name }) => name)}
        onInputChange={(event, newValue) => setQuery(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search breed"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
        sx={{ backgroundColor: "white", borderRadius: "8px" }}
      />
    </form>
  );
};

export default SearchInput;
