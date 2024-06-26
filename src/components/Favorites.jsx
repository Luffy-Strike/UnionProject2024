// components/FavoritesModal.js
import React, {useContext} from 'react';
import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Context } from '../App';

const FavoritesModal = ({ open, onClose, data }) => {
  const {favorites} = useContext(Context);




  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="favorites-modal-title"
      aria-describedby="favorites-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px', 
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id="favorites-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
            Избранные
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="favorites-modal-description" sx={{ mt: 2 }}>
          {favorites?.length > 0 ? (
            <>{favorites.map(favorite => (
              <Box key={favorite.id} sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: 'black' }}>{favorite.name}</Typography>
              </Box>))} </>)
           : (
            <Typography variant="body2" sx={{ color: 'black' }}>Нет избранных</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default FavoritesModal;
