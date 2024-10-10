import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      console.log("token", decode);
      setUsername(decode.name);
      console.log("username", username);
    }
  }, [username]);
  return (
    <div>
      <nav className="nav-div p-3">
        <ul className="nav-list">
          <Link to="/">Home</Link>
          {username ? (
            <Link to="/profile">
              <p>{username}</p>
            </Link>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faCircleUser} className="size-7" />
            </Link>
          )}
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="p-1 size-6" />
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
