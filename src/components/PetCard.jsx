import { Card, Box, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext } from "react";
import { Context } from "../App";
import Modal from "./Modal";

const getImageUrl = (pet) => {
  if (!pet) {
    return '';
  }
  if (window.location.href.endsWith('/cats')) {
    return `https://cdn2.thecatapi.com/images/${pet.reference_image_id}.jpg`;
  } else if (window.location.href.endsWith('/dogs')) {
    return `https://cdn2.thedogapi.com/images/${pet.reference_image_id}.jpg`;
  } else {
    return '';
  }
};

const PetCard = ({ pet, id }) => {
  const { favorites, setFavorites } = useContext(Context);
  const type = window.location.href.endsWith("/cats") ? "cat" : "dog";
  return (
    <Card
      key={id}
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
        ":hover": {
          boxShadow: 20,
        },
      }}
    >
      <IconButton
        onClick={() => toggleFavorite(pet.id)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        {favorites.includes(pet.id) ? (
          <FavoriteOutlinedIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
      <h2>{pet.name}</h2>
      <Box sx={{ maxWidth: "300px" }}>
        {pet.image ? (
          <img
          src={getImageUrl(pet)}
          alt="A cute pet"
          className="card_img"
          style={{ borderRadius: "5px" }}
        />
        
        ) : (
          <img
          src={getImageUrl(pet)}
          alt="A cute pet"
          className="card_img"
          style={{ borderRadius: "5px" }}
        />

        )}
      </Box>
      <Modal id={pet.id} type={type}></Modal>
    </Card>
  );
};

export default PetCard;
