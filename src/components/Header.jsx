import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/cats">
          <button>
            Кошки
          </button>
        </Link>
        <Link to="/dogs">
          <button>
          Собаки
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;