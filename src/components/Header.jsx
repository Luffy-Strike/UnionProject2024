import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FavoritesModal from './Favorites';
import Search from './Search';

const Header = ({ favorites, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <nav>
        <Link to="/cats">
          <Typography component="button">Кошки</Typography>
        </Link>
        <Link to="/dogs">
          <Typography component="button">Собаки</Typography>
        </Link>
        <Typography component="button" onClick={handleOpenModal}>Избранные</Typography>
        <Search />
      </nav>
      <FavoritesModal open={isModalOpen} onClose={handleCloseModal} favorites={favorites} data={data} />
    </header>
  );
};

export default Header;
