import "./Home.css";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar.jsx";
function Home() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <h3>Footer</h3>
    </div>
  );
}

export default Home;
