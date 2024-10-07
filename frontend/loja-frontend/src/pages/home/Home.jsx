import "./Home.css";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar.jsx";
import { useEffect, useState } from "react";
function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      {products.map((product) => (
        <div key={product._id}>
          <h1 className="brand">{product.brand}</h1>
          <h1 className="">{product.img}</h1>
        </div>
      ))}

      <Outlet />
      <h3>Footer</h3>
    </div>
  );
}

export default Home;
