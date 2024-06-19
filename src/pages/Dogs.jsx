// pages/Dogs.js
import React, { useContext, useEffect, useState } from 'react';
import { getDogData } from "../utils/getDogData";
import { Card, Box, IconButton } from "@mui/material";
import Modal from "../components/Modal";
import Header from "../components/Header";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { BreedsContext } from '../App';

const Dogs = () => {
  const [favorites, setFavorites] = useState([]);
  const dogs = useContext(BreedsContext).dogs;

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };


  return (
    <>
      <Header favorites={favorites} data={dogs} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "20px",
          alignItems: "center",
        }}
      >
        {dogs &&
          dogs.slice(0, 8).map((dog, index) => (
            <Card
              key={index}
              className="card_content"
              sx={{
                maxWidth: 400,
                minWidth: 250,
                flex: "1 0 150px",
                backgroundColor: "#333333",
                color: "#fff",
                boxShadow: 3,
                position: "relative",
                transition: "box-shadow 0.3s ease",
                ':hover': {
                  boxShadow: 20,
                },
              }}
            >
              <IconButton
                onClick={() => toggleFavorite(dog.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  ':hover': {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                {favorites.includes(dog.id) ? (
                  <FavoriteOutlinedIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <h2>{dog.name}</h2>
              <Box sx={{ maxWidth: "300px" }}>
                <img src={dog.image.url} alt="A cute dog" className="card_img" />
              </Box>
              <Modal id={dog.id} type="dog"></Modal>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Dogs;
