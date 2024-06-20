import React from 'react';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { getDogDataById } from "../utils/getDogData";
import { getCatDataById } from "../utils/getCatData";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiIconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#262626",
  boxShadow: 80000,
  height: 850,
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const mapping = {
  cat: (id) => getCatDataById(id),
  dog: (id) => getDogDataById(id),
};

const ModalComponent = ({ id, type }) => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('breed');
  const [favorites, setFavorites] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const result = await mapping[type](id).then((d) => {
            console.log(d);
            return d;
          });
          setData(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [open]);

  const getImageUrl = () => {
    if (!data) {
      return '';
    }
    if (location.pathname === '/cats') {
      return `https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg`;
    } else if (location.pathname === '/dogs') {
      return `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`;
    } else {
      return '';
    }
  };

  const getWikipediaUrl = () => {
    if (!data) {
      return '';
    }
    if (location.pathname === '/cats') {
      return `https://en.wikipedia.org/wiki/${data.name}`;
    } else if (location.pathname === '/dogs') {
      return `https://en.wikipedia.org/wiki/${data.name}`;
    } else {
      return '';
    }
  };
  const [favoriteItems, setFavoriteItems] = useState([]);

const handleLikeClick = (id) => {
  if (favoriteItems.includes(id)) {
    setFavoriteItems(favoriteItems.filter((favId) => favId !== id));
  } else {
    setFavoriteItems([...favoriteItems, id]);
  }
};

  const handleButtonClick = (newValue) => {
    setActiveButton(newValue);
  };
  const handleFavoriteClick = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  

  const getButtonStyle = (buttonName) => {
    return {
      backgroundColor: activeButton === buttonName ? '#fff' : '#262626',
      color: activeButton === buttonName ? '#000' : '#fff',
      '&:hover': {
        backgroundColor: activeButton === buttonName ? '#f5f5f5' : '#333',
      },
    };
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#fff",
          color: "black",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        onClick={handleOpen}
      >
        Additionally
      </Button>
      
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>

  <Box sx={{ ...style, paddingTop: "65px"}}>
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={{
        position: 'absolute',
        right: '10px',
        top: '10px',
        color: '#fff',
      }}
    >
      <CloseIcon />
    </IconButton>
    {data ? (
      <>
          <img
              src={getImageUrl()}
               alt={data.name}
              height="300"
            width="470" // Добавьте фиксированную ширину
         style={{
            display: 'block',
            margin: '0 auto',
            borderRadius: '10px',
            objectFit: 'cover', // Добавьте это свойство
            
  }}
/>

        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            
            marginBottom: "8px",
             marginTop: "2px",
             fontFamily: "'Roboto', sans-serif",
          }}
        >
          {data.name}
          <IconButton
    aria-label="add to favorites"
    onClick={() => handleFavoriteClick(data.id)}
    sx={{
      ml: 1,
      color: favorites.includes(data.id) ? "red" : "white",
    }}
  >
    {favorites.includes(data.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
  </IconButton>
        </Typography>
        <Tabs
          value={activeButton}
          onChange={(event, newValue) => handleButtonClick(newValue)}
          sx={{
            marginBottom: "20px",
            '& .MuiTabs-root': {
              flexWrap: 'wrap',
            },
            '& .MuiTab-root': {
              color: 'white',
              minWidth: '140px',
              flexGrow: 1,
              borderRadius: '10px 10px 0 0',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                color: '#262626',
                backgroundColor: '#f5f5f5',
              },
              '&.Mui-selected': {
                color: '#262626',
                backgroundColor: '#fff',
                '& .MuiTab-wrapper': {
                  border: 'none',
                },
              },
              '& .MuiTab-wrapper': {
                border: 'none',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#fd7500e8',
              height: '3px',
              boxShadow: '0px 4px px rgba(0, 0, 0, 0.5)',
            },
          }}
          centered
        >
          <Tab label="Breed" value="breed" />
          <Tab label="Size" value="size" />
          <Tab label="Personality" value="personality" />
          <Tab label="Care" value="care" />
        </Tabs>
{activeButton === 'breed' && (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Breed Information</Typography>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', borderColor: '#f3ce65', my: 2 }} />
    <Typography variant="body1">{data.breed_information}</Typography>
  </Box>
)}

{activeButton === 'size' && (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Size Information</Typography>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', borderColor: '#f3ce65', my: 2 }} />
    <Typography variant="body1">{data.size_information}</Typography>
  </Box>
)}

{activeButton === 'personality' && (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Personality Information</Typography>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', borderColor: '#f3ce65', my: 2 }} />
    <Typography variant="body1">{data.personality_information}</Typography>
  </Box>
)}

{activeButton === 'care' && (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Care Information</Typography>
    <Box sx={{ borderBottom: 1, borderColor: 'divider', borderColor: '#f3ce65', my: 2 }} />
    <Typography variant="body1">{data.care_information}</Typography>
  </Box>
)}





              {activeButton === 'breed' && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                      >
                        Weight
                      </Typography>
                      <Box sx={{ fontWeight: "normal" }}>
                        <Typography>
                          Imperial: {data.weight.imperial}
                        </Typography>
                        <Typography>
                          Metric: {data.weight.metric}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                      >
                        Temperament
                      </Typography>
                      <Box sx={{ fontWeight: "normal" }}>
                        <Typography>{data.temperament}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
      <Box sx={{ borderBottom: '1px solid #eeff65' }} /> {/* Добавлена линия */}
    </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                      >
                        Origin
                      </Typography>
                      <Typography>{data.origin}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                      >
                        Life Span
                      </Typography>
                      <Typography>{data.life_span}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
              {activeButton === 'size' && (
                <Box
                  sx={{
                    display: "block",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <Box sx={{ display: "block", justifyContent: "start" }}>
                    <Typography
                      variant="h6"
                      component="h5"
                      sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                    >
                      Size
                    </Typography>
                    <Box sx={{ fontWeight: "normal" }}>
                    <Typography>
                          Imperial: {data.weight.imperial}
                        </Typography>
                        <Typography>
                          Metric: {data.weight.metric}
                        </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
{activeButton === 'personality' && (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Child Friendly
        </Typography>
        <Typography>
          {data.child_friendly <= 2 ? 'No' : 'Yes'}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Adaptality
        </Typography>
        <Typography>
          {data.adaptability === 1 && 'Not adaptality at all'}
          {data.adaptability === 2 && 'Not very  adaptality'}
          {data.adaptability=== 3 && 'Neutral'}
          {data.adaptability=== 4 && 'Adaptality'}
          {data.adaptability === 5 && 'Very  Adaptality'}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Box sx={{ borderBottom: '1px solid #f3ce65' }} /> {/* Добавлена линия */}
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Social Needs
        </Typography>
        <Typography>
          {data.social_needs === 1 && 'Very low'}
          {data.social_needs === 2 && 'Low'}
          {data.social_needs === 3 && 'Moderate'}
          {data.social_needs === 4 && 'High'}
          {data.social_needs === 5 && 'Very high'}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Stranger Friendly
        </Typography>
        <Typography>
          {data.stranger_friendly === 1 && 'Not friendly at all'}
          {data.stranger_friendly === 2 && 'Not very friendly'}
          {data.stranger_friendly === 3 && 'Neutral'}
          {data.stranger_friendly === 4 && 'Friendly'}
          {data.stranger_friendly === 5 && 'Very friendly'}
        </Typography>
      </Box>
    </Grid>
  </Grid>
)}

              {activeButton === 'care' && (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Grooming
        </Typography>
        <Typography>{data.grooming === 1 ? 'Low' : data.grooming === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Health Issues
        </Typography>
        <Typography>{data.health_issues === 1 ? 'Low' : data.health_issues === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Box sx={{ borderBottom: '1px solid #f3ce65' }} /> {/* Добавлена линия */}
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Shedding Level
        </Typography>
        <Typography>{data.shedding_level === 1 ? 'Low' : data.shedding_level === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          Energy Level
        </Typography>
        <Typography>{data.energy_level === 1 ? 'Low' : data.energy_level === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
  </Grid>
)}
<Box sx={{ mt: 3 }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
    Learn more
  </Typography>
</Box>
<Button
  variant="contained"
  color="primary"
  href={getWikipediaUrl()}
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    backgroundColor: "transparent",
    color: "white",
    boxShadow: "none", // Удалите тень у кнопки
    "&:hover": {
      backgroundColor: "white",
      color: "#000",
       // Это изменит цвет текста на черный при наведении
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", // Добавьте тень при наведении
      ".MuiButton-endIcon": { // Измените цвет иконки при наведении
        color: "#fd7500e8",
        fontWeight: "bold",
      },
    },
    marginTop: "5px",
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 12px',
    textTransform: 'none',
    paddingLeft: 0, // Это удалит левое отступление от текста
    paddingRight: 0,
    fontSize: '1.2rem', // Увеличьте значение fontSize в соответствии с вашими потребностями
    fontWeight: '300', // Сделайте шрифт более тонким (300 - это обычное легкое значение шрифта)
  }}
  endIcon={<ArrowForwardIosIcon />}
>
  On Wikipedia
</Button>

            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
        
      </Modal>
    </>
  );
};

export default ModalComponent;
