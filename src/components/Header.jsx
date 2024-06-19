// components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <button>Кошки</button>
        </Link>
        <Link to="/dogs">
          <button>Собаки</button>
        </Link>
        <button onClick={handleOpenModal}>Избранные</button>
        <Search></Search>
      </nav>
      <FavoritesModal open={isModalOpen} onClose={handleCloseModal} favorites={favorites} data={data} />
    </header>
  );
};

export default Header;
