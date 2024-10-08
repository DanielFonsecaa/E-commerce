import "./Home.css";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import BuyButton from "../../components/buyButton/BuyButton.jsx";

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
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h1 className="product-title">
              {product.title} {product.model}
            </h1>
            <h1 className="product-price"> ${product.price}</h1>
            <img src={product.img} alt="imgCase" />
            <select name="" id={product._id}>
              <option value="">Select color</option>
              {product.color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <h1 className="product-desc">{product.desc}</h1>
            <BuyButton productId={product._id} />
          </div>
        ))}
      </div>

      <Outlet />
      <h3>Footer</h3>
    </div>
  );
}

export default Home;
//{
//  "_id": "66f7f71924e49a658ef5728f",
//  "title": "sansung ",
//  "desc": "test",
//  "img": "test",
//  "brand": "sansung",
//  "model": "s24",
//  "color": [
//    "white",
//    "black"
//  ],
//  "price": 15,
//  "createdAt": "2024-09-28T12:31:21.509Z",
//  "updatedAt": "2024-09-28T12:31:21.509Z",
//  "__v": 0
//},
//
