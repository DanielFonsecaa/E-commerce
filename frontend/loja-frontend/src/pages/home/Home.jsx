import "./Home.css";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Home;
