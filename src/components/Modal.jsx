import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useState } from "react";
import { getDogDataById } from "../utils/getDogData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  height: 600,
  color: "#000",
};

const ModalComponent = ({ id }) => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async () => {
    setOpen(true);
    try {
      const result = await getDogDataById(id);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>More...</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          {data ? (
            <>
              <Typography id="modal-modal-title" sx={{
              color: "#000",
            }}>{data.breeds[0].name}</Typography>
            <Typography>Bred for: {data.breeds[0].bred_for}</Typography>
            <Typography>Group: {data.breeds[0].breed_group}</Typography>
            <Typography>Life span: {data.breeds[0].life_span}</Typography>
            <Box>Height
              <Typography>
                Imperial: {data.breeds[0].height.imperial}
              </Typography>
              <Typography>
                Metric: {data.breeds[0].height.metric}
              </Typography>
            </Box>
            <Box>Weight
              <Typography>
                Imperial: {data.breeds[0].weight.imperial}
              </Typography>
              <Typography>
                Metric: {data.breeds[0].weight.metric}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Temperament: {data.breeds[0].temperament}
              </Typography>
            </Box>
            <Link href={data.breeds[0].wikipedia_url}>
              Link
            </Link>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
          {console.log(data)}
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
