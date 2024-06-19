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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#262626",
  boxShadow: 80000,
  height: 800,
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

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
        <Box sx={{ ...style }}>
          {data ? (
            <>
              <img
                src={getImageUrl()}
                alt={data.name}
                height="300"
                style={{ display: 'block', margin: '0 auto' }}
                weight="600"
              />
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                {data.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  sx={getButtonStyle('breed')}
                  onClick={() => handleButtonClick('breed')}
                >
                  Breed
                </Button>
                <Button
                  variant="contained"
                  sx={getButtonStyle('size')}
                  onClick={() => handleButtonClick('size')}
                >
                  Size
                </Button>
                <Button
                  variant="contained"
                  sx={getButtonStyle('personality')}
                  onClick={() => handleButtonClick('personality')}
                >
                  Personality
                </Button>
                <Button
                  variant="contained"
                  sx={getButtonStyle('care')}
                  onClick={() => handleButtonClick('care')}
                >
                  Care
                </Button>
              </Box>
              {activeButton === 'breed' && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        Weight:
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
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        Temperament:
                      </Typography>
                      <Box sx={{ fontWeight: "normal" }}>
                        <Typography>{data.temperament}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        Origin:
                      </Typography>
                      <Typography>{data.origin}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "block", justifyContent: "start" }}>
                      <Typography
                        variant="h6"
                        component="h5"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        Life Span:
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
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Size:
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
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Child Friendly:
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
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Adaptality:
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
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Social Needs:
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
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Stranger Friendly:
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
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Grooming:
        </Typography>
        <Typography>{data.grooming === 1 ? 'Low' : data.grooming === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Health Issues:
        </Typography>
        <Typography>{data.health_issues === 1 ? 'Low' : data.health_issues === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Shedding Level:
        </Typography>
        <Typography>{data.shedding_level === 1 ? 'Low' : data.shedding_level === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ display: "block", justifyContent: "start" }}>
        <Typography
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Energy Level:
        </Typography>
        <Typography>{data.energy_level === 1 ? 'Low' : data.energy_level === 2 ? 'Moderate' : 'High'}</Typography>
      </Box>
    </Grid>
  </Grid>
)}
              <Button
                variant="contained"
                color="primary"
                href={getWikipediaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: "#fff",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  marginTop: "20px",
                }}
              >
                Learn more on Wikipedia
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
