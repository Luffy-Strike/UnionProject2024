import { useEffect, useState } from "react";
import { getDogData } from "../utils/getDogData";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Card, Box, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const Dogs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // Хранит избранные собаки

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDogData();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "20px",
          alignItems: "center",
        }}
      >
        {data &&
          data.slice(0, 8).map((dog, index) => (
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
              <h2>{dog.breeds[0].name}</h2>
              <Box sx={{ maxWidth: "300px" }}>
                <img src={dog.url} alt="A cute dog" className="card_img" />
              </Box>
              <Modal id={dog.id} type="dog"></Modal>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default Dogs;
