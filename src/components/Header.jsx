import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/cats">
          <button className="btn-header">
            Кошки
          </button>
        </Link>
        <Link to="/dogs">
          <button className="btn-header">
            Собаки
          </button>
        </Link>
      </nav>
    </header>
  )
};

export default Header;