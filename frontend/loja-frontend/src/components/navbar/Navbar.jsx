import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav className="nav-div">
        <ul className="nav-list">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
