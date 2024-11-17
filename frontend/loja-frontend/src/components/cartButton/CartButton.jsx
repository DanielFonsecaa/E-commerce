import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./cartButton.css";
function CartButton() {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [country, setCountry] = useState(null);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "India",
    "Japan",
    "Brazil",
    "China",
    "South Africa",
  ];

  const handleSelectCountry = (e) => {
    setCountry(e.target.value);
  };
  const fetchCart = async () => {
    if (!userId || !token) {
      console.error("User ID or token is not available.");
      return;
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
        setCart(data);
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
  }, []);
  useEffect(() => {
    fetchCart();
  }, [userId, token]);

  const distinctProductCount = cart?.products?.length || 0;

  return (
    <div className="relative mt-10 ml-20 mr-10">
      <h1 className="capitalize text-3xl font-bold">shopping bag</h1>
      <p>
        <span className="font-bold pt-2">{distinctProductCount} items</span> in
        your bag
      </p>
      {cart ? (
        <div className="mt-4">
          <div className="p-6 bg-gray-200 rounded-lg shadow-2xl max-w-5xl">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/2 text-start pb-3">Product</th>
                  <th className="w-1/4 pb-3">Price</th>
                  <th className="w-1/4 pb-3">Quantity</th>
                  <th className="w-1/4 pb-3">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr key={product._id}>
                    <td className="w-1/2">
                      <div className="flex items-center">
                        <img
                          src={product.img}
                          alt={product.title}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <p>
                            {product.title} {product.model}
                          </p>
                          <p className="text-gray-600">
                            Color: {product.color}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="w-1/4 text-center">${product.price}</td>
                    <td className="w-1/4 text-center">{product.quantity}</td>
                    <td className="w-1/4 text-center">
                      ${product.price * product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="max-w-60 absolute right-12 top-0 bg-gray-200 p-5">
            <div className="">
              <h2 className="font-bold text-xl pb-3">Calculated shipping</h2>
              <label htmlFor="country" className="pb-3">
                <select
                  name="country"
                  id=""
                  onChange={handleSelectCountry}
                  value={country}
                  className="rounded-t-lg px-5 py-2 bg-black text-white w-full mb-3"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>
              <button className="block p-3 bg-black text-white rounded-lg w-full ">
                Update
              </button>
            </div>

            <div className="mt-5">
              <h2>Coupon code</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Architecto dolores iure minima quae cupiditate ut!
              </p>
              <input
                type="text"
                name="coupon"
                id=""
                className="outline-none p-2 w-3/4"
              />
              <button className="block p-3 bg-black text-white rounded-lg w-full ">
                Claim
              </button>
            </div>

            <div>
              <h2>Cart total</h2>
              <ul>
                <li>Subtotal: $1,000</li>
                <li>Shipping: $100</li>
                <li>Coupon discount: -$200</li>
                <li>Total: $900</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Nothing on the cart</p>
      )}
    </div>
  );
}

export default CartButton;
