import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    if (token) {
      const decode = jwtDecode(token);
      setUsername(decode.name);
    }
  }, [username]);
  return (
    <div className="sticky top-0 z-30">
      <nav className="flex p-3 justify-between items-center bg-black text-white shadow-md w-full ">
        <Link to="/" className="pl-3">
          <img src="src/assets/logo.png" alt="logo image" width={250} />
        </Link>

        <div className="hidden lg:flex justify-evenly items-center w-1/2 text-xl capitalize">
          <Link
            to="/"
            className="hover:text-yellow-400 size-7 active:text-gray-500 w-fit"
          >
            <p className="w-fit">Home</p>
          </Link>
          <hr className="w-8 rotate-90 " />
          {username ? (
            <Link
              to="/profile"
              className="hover:text-yellow-400 size-7 active:text-gray-500"
            >
              <p>{username}</p>
            </Link>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="hover:text-yellow-400 size-7 active:text-gray-500"
              />
            </Link>
          )}
          <hr className="w-8 rotate-90 " />

          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="hover:text-yellow-500 p-1 size-6 active:text-gray-500"
            />
          </Link>
        </div>

        <div
          className="flex cursor-pointer items-center pr-3 z-30 lg:hidden"
          onClick={toggleMenu}
        >
          <span
            className={`mr-2 tracking-widest text-2xl font-semibold ${
              isMenuOpen ? "text-black" : "text-white"
            }`}
          >
            MENU
          </span>
          <div>
            <span
              className={`relative block h-1 w-7 m-1  transition-all duration-700 ${
                isMenuOpen ? "translate-y-2 rotate-45 bg-black" : "bg-white"
              }`}
            ></span>
            <span
              className={`relative block h-1 w-7 m-1 bg-white transition-all duration-700 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`relative block h-1 w-7 m-1 transition-all duration-700 ${
                isMenuOpen ? "-translate-y-2 -rotate-45 bg-black" : "bg-white"
              }`}
            ></span>
          </div>
        </div>

        <ul
          className={`fixed top-0 right-0 h-full w-full bg-white text-black z-10 flex flex-col items-center gap-6 justify-center transition-transform duration-500 transform origin-top-right ${
            isMenuOpen
              ? "translate-x-0 translate-y-0 scale-100" // Fully visible
              : "translate-x-full -translate-y-full scale-0" // Hidden state
          }`}
        >
          <li className="hover:text-black">
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-3xl hover:text-yellow-400 size-7 active:text-gray-500"
            >
              <p>Home</p>
            </Link>
          </li>
          <li className="hover:text-black">
            {username ? (
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="text-3xl hover:text-yellow-400 size-7 active:text-gray-500"
              >
                <p>{username}</p>
              </Link>
            ) : (
              <Link to="/login" onClick={toggleMenu}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-3xl hover:text-yellow-400 size-12 active:text-gray-500"
                />
              </Link>
            )}
          </li>
          <li className="hover:text-black">
            <Link to="/cart" onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-3xl size-12 pr-2 hover:text-yellow-500 p-1  active:text-gray-500"
              />
            </Link>
          </li>
          <span className="font-thin absolute bottom-5">
            © 2024 E-commerce by Daniel
          </span>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
