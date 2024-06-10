import { Modal, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getDogDataById } from "../utils/getDogData";

const ModalComponent = ({ id, breed, open, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async (id) => {
      try {
        const result = await getDogDataById(id);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    return (() => {
      console.log('unsub');
    })
  }, [id]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        {/* {console.log(data)} */}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
