import { useState, useEffect } from "react";

const BuyButton = (productId) => {
  const [userCart, setUserCart] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUserCart() {
      try {
        const response = await fetch(`/cart`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with real token
          },
        });
        if (response.ok) {
          const cart = await response.json();
          setUserCart(cart);
        } else if (response.status === 404) {
          setUserCart(null);
        }
      } catch (error) {
        console.error("Error fetching user's cart:", error);
      }
    }

    fetchUserCart();
  }, [token]);

  async function handleBuyProduct() {
    const newProduct = {
      productId: productId,
      quantity: 1,
    };

    // Check if user already has a cart
    if (userCart) {
      // If the user already has a cart, update the cart (PUT request)
      const updatedCart = {
        ...userCart,
        products: [...userCart.products, newProduct], // Add new product to cart
      };

      try {
        const response = await fetch(`/api/carts/${userCart._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCart),
        });

        if (response.ok) {
          const updatedCartData = await response.json();
          setUserCart(updatedCartData); // Update local state
          console.log("Cart updated successfully", updatedCartData);
        } else {
          console.error("Failed to update cart");
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      // If no cart exists, create a new cart (POST request)
      const newCart = {
        products: [newProduct], // Add the product to the cart
      };

      try {
        const response = await fetch("/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCart),
        });

        if (response.ok) {
          const createdCart = await response.json();
          setUserCart(createdCart); // Update local state
          console.log("Cart created successfully", createdCart);
        } else {
          console.error("Failed to create cart");
        }
      } catch (error) {
        console.error("Error creating cart:", error);
      }
    }
  }

  return <button onClick={handleBuyProduct}>Buy Now</button>;
};

export default BuyButton;
