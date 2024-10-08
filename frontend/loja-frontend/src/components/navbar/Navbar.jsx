import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
const Navbar = () => {
  return (
    <div>
      <nav className="nav-div p-3">
        <ul className="nav-list">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">
            <FontAwesomeIcon icon={faCircleUser} className="size-7" />
          </Link>
          <FontAwesomeIcon icon={faCartShopping} className="p-1 size-6" />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
