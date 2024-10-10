import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BuyButton = ({ productId, price, color, title, img, model }) => {
  const [userCart, setUserCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserCart() {
      setToken(localStorage.getItem("token"));
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      }
      if (!userId || !token) return; // Ensure user is authenticated

      try {
        const response = await fetch(
          `http://localhost:3000/cart/find/${userId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const cart = await response.json();
          setUserCart(cart);
        } else if (response.status === 404) {
          setUserCart(null); // Cart not found, initialize new cart later
        }
      } catch (error) {
        console.error("Error fetching user's cart:", error);
      }
    }

    fetchUserCart();
  }, [token, userId]);

  async function handleBuyProduct() {
    const newProduct = {
      productsId: productId, // Adjust to match your schema
      quantity: 1,
      price: price,
      color: color,
      title: title,
      img: img,
      model: model,
    };

    async function fetchCart(cart) {
      try {
        const response = await fetch(
          `http://localhost:3000/cart/${userCart._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
            body: JSON.stringify(cart),
          }
        );

        if (response.ok) {
          const updatedCartData = await response.json();
          setUserCart(updatedCartData);
          console.log("Cart updated successfully", updatedCartData, userCart);
          navigate("/");
        } else {
          const errorData = await response.json();
          console.error("Failed to update cart", response.status, errorData);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }

    if (userCart) {
      // Check if the product is already in the cart
      const productInCartIndex = userCart.products.findIndex(
        (product) => product.productsId === productId && product.color === color
      );

      if (productInCartIndex !== -1) {
        // If the product is already in the cart, update its quantity
        const updatedCart = {
          ...userCart,
          products: userCart.products.map((product, index) =>
            index === productInCartIndex
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  price: product.price + price,
                }
              : product
          ),
        };
        fetchCart(updatedCart);
      } else {
        // Add the new product to the cart
        const updateCart = {
          ...userCart,
          products: [...userCart.products, newProduct],
        };

        fetchCart(updateCart);
      }
    } else {
      // Create a new cart if it doesn't exist
      const newCart = {
        userId: userId,
        products: [newProduct],
      };

      try {
        const response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
          body: JSON.stringify(newCart),
        });

        if (response.ok) {
          const createdCart = await response.json();
          setUserCart(createdCart); // Update userCart immediately after creation
          console.log("Cart created successfully", createdCart);
          navigate("/");
        } else {
          console.error("Failed to create cart");
        }
      } catch (error) {
        console.error("Error creating cart:", error);
      }
    }
  }

  return (
    <button onClick={handleBuyProduct} disabled={!color}>
      Buy Now
    </button>
  );
};

BuyButton.propTypes = {
  productId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default BuyButton;
