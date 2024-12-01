import "./Home.css";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
function Home() {
  return (
    <div className="flex flex-col m-0 min-h-screen">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="h-full">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
