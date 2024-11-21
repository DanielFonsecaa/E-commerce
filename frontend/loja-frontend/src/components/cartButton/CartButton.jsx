import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
function CartButton() {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [country, setCountry] = useState("");
  const [shippingFee, setShippingFee] = useState(0.0);

  const [coupon, setCoupon] = useState(""); //....................................................
  const [discount, setDiscount] = useState(0);

  const handleCoupon = (e) => {
    e.preventDefault();
    if (coupon === "danilindo") {
      setDiscount(subTotal / 10);
      console.log("this is the amount of the coupon", discount);
    }
  };

  const countries = [
    { name: "United States", shippingFee: 15.0 },
    { name: "Canada", shippingFee: 12.5 },
    { name: "United Kingdom", shippingFee: 20.0 },
    { name: "Australia", shippingFee: 18.75 },
    { name: "Germany", shippingFee: 16.3 },
    { name: "India", shippingFee: 10.0 },
    { name: "Japan", shippingFee: 22.0 },
    { name: "Brazil", shippingFee: 14.8 },
    { name: "China", shippingFee: 13.5 },
    { name: "South Africa", shippingFee: 17.0 },
  ];
  const handleSelectCountry = (e) => {
    const selectedCountryName = e.target.value;
    setCountry(selectedCountryName);

    const countryShipping = countries.find(
      (country) => country.name === selectedCountryName
    );
    if (countryShipping) {
      setShippingFee(countryShipping.shippingFee);
    }
  };
  const fetchCart = async () => {
    if (!userId || !token) return;

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
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId && token) {
      fetchCart();
    }
  }, [userId, token]);

  const distinctProductCount = cart?.products?.length || 0;

  let subTotal = cart?.products?.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const totalAmount = Math.max(subTotal + shippingFee - discount, 0);

  return (
    <div className="m-10 min-h-screen">
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
            <div className="flex gap-3 flex-col">
              <h2 className="font-bold text-xl pb-3 text-center">
                Calculated shipping
              </h2>
              <label htmlFor="country">
                <select
                  name="country"
                  id=""
                  onChange={handleSelectCountry}
                  value={country}
                  className="rounded-t-lg px-5 py-2 bg-black text-white w-full"
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <hr className=" mt-5 mx-4 border-1 border-black" />

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
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                id=""
                className="outline-none p-2 w-full rounded-lg mt-3"
              />
              <button
                onClick={handleCoupon}
                className="block p-3 my-5 bg-black text-white rounded-lg w-full "
              >
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
                  Shipping: <span>${shippingFee.toFixed(2)}</span>
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
