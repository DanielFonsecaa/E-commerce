import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./cartButton.css";
function CartButton() {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const fetchCart = async () => {
    if (!userId || !token) {
      console.error("User ID or token is not available.");
      return; // Exit if userId or token is not set
    }

    try {
      const response = await fetch(
        `http://localhost:3000/cart/find/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCart(data); // Store the cart data
      } else {
        console.error("Error fetching cart:", data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      try {
        const decodedToken = jwtDecode(tokenFromStorage);
        console.log("Decoded token:", decodedToken);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []); // Run this effect once on component mount

  // Fetch the cart whenever userId or token changes
  useEffect(() => {
    fetchCart();
  }, [userId, token]);

  return (
    <div>
      <h1>User Cart</h1>
      {cart ? (
        <div className="cart-div">
          {cart.products.map((product) => (
            <div key={product._id} className="productCart-div">
              <h3 className="productCart-title">
                {product.title} {product.model}
              </h3>
              <p className="productCart-quantity">
                Quantity: {product.quantity}
              </p>
              <p className="productCart-price">Price: ${product.price}</p>
              <p className="productCart-color">Color: ${product.color}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nothing on the cart</p>
      )}
    </div>
  );
}

export default CartButton;
