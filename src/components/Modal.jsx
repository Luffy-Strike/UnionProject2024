import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { getDogDataById } from "../utils/getDogData";
import { getCatDataById } from "../utils/getCatData";

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
const getWikipediaUrl =() => {
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

}

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
                weight ="600"
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
              >{data.name}</Typography>
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
                    Temperament:
                  </Typography>
                  <Box sx={{ fontWeight: "normal" }}>
                    <Typography>{data.temperament}</Typography>
                  </Box>
                </Box>
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
              </Box>
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
                backgroundColor: "#f5f5f5",},
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