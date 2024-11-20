import { useEffect, useState } from "react";
import BuyButton from "../../components/buyButton/BuyButton.jsx";
import { jwtDecode } from "jwt-decode";
function Product() {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({}); // Track colors for each product
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);

  const handleColorChange = (productId, event) => {
    const color = event.target.value;
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color, // Set the color for the specific product ID
    }));
  };

  const fetchUserCartAgain = async () => {
    if (!userId || !token) return; // Ensure user is authenticated
    console.log("fetchUserCartAgain ------------------");
    try {
      await fetch(`http://localhost:3000/cart/find/${userId}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching user's cart:", error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Set user ID if token is valid
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
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
    fetchUserCartAgain();
    fetchData();
  }, [token, userId]);

  return (
    <div className="h-screen">
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h1 className="product-title">
              {product.title} {product.model}
            </h1>
            <h1 className="product-price"> ${product.price}</h1>
            <img src={product.img} alt="imgCase" />
            <select
              name=""
              id={product._id}
              onChange={(event) => handleColorChange(product._id, event)} // Pass product ID
              value={selectedColors[product._id] || ""} // Set the selected value
            >
              <option value="" disabled>
                Select color
              </option>
              {product.color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <h1 className="product-desc">{product.desc}</h1>
            <BuyButton
              productId={product._id}
              color={selectedColors[product._id] || ""} // Use the color for the specific product
              price={product.price}
              model={product.model}
              title={product.title}
              img={product.img}
              onCartUpdated={fetchUserCartAgain}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
