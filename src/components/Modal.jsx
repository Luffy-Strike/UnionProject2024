import { Modal, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getDogDataById } from "../utils/getDogData";

const ModalComponent = ({ id, breed, open, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDogDataById(id);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return (() => {
      console.log('unsub');
    })
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        {console.log(data)}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
