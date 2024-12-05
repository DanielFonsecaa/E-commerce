import { useEffect, useState } from "react";
import BuyButton from "../../components/buyButton/BuyButton.jsx";
import { jwtDecode } from "jwt-decode";

import AddProduct from "../../components/AddProduct.jsx";

function Product() {
  const api = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [selectedColors, setSelectedColors] = useState({}); // Track colors for each product
  const [token, setToken] = useState(null);
  const [adminStatus, setAdminStatus] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleColorChange = (productId, event) => {
    const color = event.target.value;
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color, // Set the color for the specific product ID
    }));
  };

  const toggleForm = async () => {
    if (adminStatus === true) {
      setIsFormOpen(!isFormOpen);
      return;
    }
    console.log("not admin");
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.isAdmin) setAdminStatus(true);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    fetchProducts(currentPage, limit);
  }, [token, currentPage]);

  const fetchProducts = async (page, limit) => {
    try {
      const response = await fetch(
        `${api}/products?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const productsFiltered = (name) => {
    const filteredProducts = products.filter((product) => {
      console.log(`Checking: ${product.brand}`);
      product.brand.toLowerCase().includes(name.toLowerCase());
    });
    console.log(filteredProducts);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log("current page:", currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log("current page:", currentPage);
    }
  };

  return (
    <div className="h-screen bg-gray-300">
      <div className="">
        <button onClick={toggleForm}> Add product</button>

        <div className={` ${isFormOpen ? "block" : "hidden"} `}>
          <AddProduct />
        </div>
      </div>

      <div className="flex justify-evenly gap-5 p-4">
        <div className="flex flex-col flex-1 p-10 bg-gray-500 max-w-96">
          <label>Search</label>
          <input type="text" placeholder="Search" />

          <h1 className="text-2xl pt-5">Order</h1>
          <ul>
            <li>price lower</li>
            <li>price higher</li>
            <li>A-Z</li>
            <li>Z-A</li>
          </ul>

          <h1 className="text-2xl pt-5">brand</h1>
          <ul>
            {["oppo", "samsung", "tcl", "apple"].map((brand) => (
              <li key={brand} onClick={() => productsFiltered(brand)}>
                {brand}
              </li>
            ))}
          </ul>

          <h1 className="text-2xl pt-5">material</h1>
          <ul>
            <li>gel</li>
            <li>silicone</li>
            <li>acrilic</li>
            <li>hibrid</li>
          </ul>

          <h1 className="text-2xl pt-5">features</h1>
          <ul>
            <li>shookprof</li>
            <li>water-resistant</li>
            <li>magsafe</li>
            <li>ring</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div
            className={`grid grid-cols-5 place-items-center gap-12 ${
              isFormOpen ? "hidden" : "block"
            }`}
          >
            {products.map((product) => (
              <div key={product._id} className=" bg-white max-w-48 p-4">
                <img src={product.img} alt="imgCase" />
                <h1 className="text-xl capitalize font-bold">
                  {product.brand} {product.model}
                </h1>

                <h1 className="flex">
                  <span className="pt-[2px]">$</span>
                  <span className="text-3xl text-red-600">{product.price}</span>
                </h1>

                <select
                  name=""
                  id={product._id}
                  onChange={(event) => handleColorChange(product._id, event)}
                  value={selectedColors[product._id] || ""}
                  className="w-full bg-white rounded-lg"
                >
                  <option value="" disabled className="bg-gray-500">
                    Select color
                  </option>
                  {product.color.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>

                <BuyButton
                  productId={product._id}
                  color={selectedColors[product._id] || ""}
                  price={product.price}
                  model={product.model}
                  title={product.title}
                  img={product.img}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className=""
            >
              <svg
                fill="#000000"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 330 330"
              >
                <path
                  id="XMLID_92_"
                  d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
	l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
	C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
                />
              </svg>
            </button>

            <span className="p-1 px-3">
              {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className=""
            >
              <svg
                fill="#000000"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 330 330"
              >
                <path
                  d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
