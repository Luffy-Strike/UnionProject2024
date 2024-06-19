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
  height: 600,
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
                    Bred for:
                  </Typography>
                  <Typography>
                    {data.breeds && data.breeds[0].bred_for}
                  </Typography>
                </Box>
                <Box sx={{ display: "block", justifyContent: "start" }}>
                  <Typography
                    variant="h6"
                    component="h5"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Group:
                  </Typography>
                  <Typography>
                    {data.breeds && data.breeds[0].breed_group}
                  </Typography>
                </Box>
                <Box sx={{ display: "block", justifyContent: "start" }}>
                  <Typography
                    variant="h6"
                    component="h5"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Life span:
                  </Typography>
                  <Typography>
                    {data.breeds && data.breeds[0].life_span}
                  </Typography>
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
                      Imperial: {data.breeds && data.breeds[0].weight.imperial}
                    </Typography>
                    <Typography>
                      Metric: {data.breeds && data.breeds[0].weight.metric}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "block", justifyContent: "start" }}>
                  <Typography
                    variant="h6"
                    component="h5"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Temperament:
                  </Typography>
                  <Box sx={{ fontWeight: "normal" }}>
                    <Typography>
                      {data.breeds && data.breeds[0].temperament}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {data.breeds && (
                <Link
                  href={data.breeds[0].wikipedia_url}
                  target="_blank"
                  rel="noopener"
                  variant="h6"
                  component="h5"
                  sx={{ color: "white" }}
                >
                  Learn more
                </Link>
              )}
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