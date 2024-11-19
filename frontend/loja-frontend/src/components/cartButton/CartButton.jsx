import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./cartButton.css";
function CartButton() {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [country, setCountry] = useState("");

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
      const response = await fetch(`http://localhost:3000/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.products);
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

  let subTotal = cart?.products?.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const shipping = 10; //change this to significant ammount
  const discount = 5; //change this to significant ammount

  const totalAmount = Math.max(subTotal + shipping - discount, 0);

  return (
    <div className="m-10 h-screen">
      {cart ? (
        <div className="mt-4 flex justify-around gap-10 flex-grow flex-col lg:flex-row">
          <div className="">
            <div className="m-5">
              <h1 className="capitalize text-3xl font-bold">shopping bag</h1>
              <p>
                <span className="font-bold pt-2">
                  {distinctProductCount} items
                </span>
                &nbsp;in your bag
              </p>
            </div>
            <div className="p-6 bg-gray-200 rounded-lg shadow-2xl max-w-6xl">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="lg:tracking-wider w-1/2 text-start pb-3">
                      Product
                    </th>
                    <th className="lg:tracking-wider w-1/4 pb-3">Price</th>
                    <th className="lg:tracking-wider w-1/4 pb-3">Quantity</th>
                    <th className="lg:tracking-wider w-1/4 pb-3">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product) => (
                    <tr key={product._id}>
                      <td className="w-1/2">
                        <div className="flex items-center flex-col lg:flex-row">
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
          </div>
          <div className="bg-gray-200 p-5 rounded-lg lg:max-w-md ">
            <div className="">
              <h2 className="font-bold text-xl pb-3 text-center">
                Calculated shipping
              </h2>
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

            <hr className=" mt-9 mx-4 border-1 border-black" />

            <div className="mt-5">
              <h2 className="font-bold text-xl pb-2 text-center">
                Coupon code
              </h2>
              <p className="leading-loose text-gray-600 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Architecto dolores iure minima quae cupiditate ut!
              </p>
              <input
                type="text"
                name="coupon"
                placeholder="Coupon"
                id=""
                className="outline-none p-2 w-full rounded-lg mt-3"
              />
              <button className="block p-3 my-5 bg-black text-white rounded-lg w-full ">
                Claim
              </button>
            </div>

            <div className="bg-amber-400 rounded-lg p-3 mt-5">
              <h2 className="font-bold text-xl pb-2 text-center">Cart total</h2>
              <ul>
                <li className="flex justify-between">
                  Subtotal: <span>${subTotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  Shipping: <span>${shipping.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  Discount: <span>${discount.toFixed(2)}</span>
                </li>
                <li className="flex justify-between font-bold text-xl">
                  Total:{" "}
                  <span className="text-2xl">${totalAmount.toFixed(2)}</span>
                </li>
              </ul>
              <button className="p-3 mt-2 bg-black text-white rounded-lg w-full ">
                Buy
              </button>
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
