import React, { useEffect, useState } from 'react';
import getCatData from "../utils/getCatData";
import Modal from "../components/Modal";
import Header from "../components/Header";
import FavoritesModal from "../components/Favorites";
import { Card, Box, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const Cats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCatData();
        setData(result); // Предполагается, что данные содержат поля id, name и type: 'cat'
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (catId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(catId)
        ? prevFavorites.filter((id) => id !== catId)
        : [...prevFavorites, catId]
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
          data.slice(0, 8).map((cat, index) => (
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
                onClick={() => toggleFavorite(cat.id)}
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
                {favorites.includes(cat.id) ? (
                  <FavoriteOutlinedIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <h2>{cat.breeds[0].name}</h2>
              <Box sx={{ maxWidth: "300px" }}>
                <img src={cat.url} alt="A cute cat" className="card_img" style={{ borderRadius: '5px' }} />
              </Box>
              <Modal id={cat.id} type="cat"></Modal>
            </Card>
          ))}
      </Box>
      
      <FavoritesModal
        open={false} // Устанавливайте значение open в true, когда модальное окно открыто
        onClose={() => {}} // Обработчик закрытия модального окна
        favorites={favorites} // Массив избранных элементов
        data={data} // Данные кошек
        type="cat" // Тип животного (для фильтрации данных)
      />
    </>
  );
};

export default Cats;
