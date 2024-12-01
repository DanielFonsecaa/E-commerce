import { useState } from "react";
const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !desc || !img || !brand || !model || !color || price <= 0) {
      setMessage("All fields are required and price must be greater than 0.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          img: img,
          brand: brand,
          model: model,
          color: color.split("-").map((c) => c.trim()),
          price: parseFloat(price),
          quantity: quantity,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      console.log("Product created successfully");
      setMessage("Product created successfully");
    } catch (err) {
      console.log("Product created failed", err.message);
      setMessage(
        "Product creation failed. Please check your connection and try again."
      );
    }
  };

  return (
    <div>
      <div className="flex gap-3 justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-3 w-1/4 m-5 bg-gray-400 rounded-lg shadow-2xl shadow-black"
        >
          <div className="flex flex-col px-3">
            <h1 className="text-center text-xl">Add a product</h1>
            <label htmlFor="title" className="pl-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-2 bg-gray-200 rounded-lg "
            />
          </div>

          <div className="flex flex-col px-3">
            <label htmlFor="desc" className="pl-1">
              Description
            </label>
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="p-2 bg-gray-200 rounded-lg"
            />
          </div>

          <div className="flex flex-col px-3">
            <label htmlFor="img" className="pl-1">
              Image
            </label>
            <input
              type="text"
              name="img"
              id="img"
              placeholder="Image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="p-2 bg-gray-200 rounded-lg"
            />
          </div>

          <div className="flex flex-col px-3">
            <label htmlFor="brand" className="pl-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="p-2 bg-gray-200 rounded-lg"
            />
          </div>

          <div className="flex flex-col px-3">
            <label htmlFor="model" className="pl-1">
              Model
            </label>
            <input
              type="text"
              name="model"
              id="model"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="p-2 bg-gray-200 rounded-lg"
            />
          </div>

          <div className="flex flex-col px-3">
            <label htmlFor="color" className="pl-1">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="e.g., black, white"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="p-2 bg-gray-200 rounded-lg"
            />
          </div>

          <div className="flex gap-10 justify-center">
            <div className="flex flex-col w-1/4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 bg-gray-200 rounded-lg"
              />
            </div>

            <div className="flex flex-col w-1/4">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 bg-gray-200 rounded-lg"
              />
            </div>
          </div>

          <button type="submit">Add Product</button>
        </form>
        <div className="w-1/2 m-5 p-3 bg-yellow-400">
          <h1 className="text-center text-xl">Preview</h1>
        </div>
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default AddProduct;
