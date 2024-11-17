<div className="">
          {cart.products.map((product) => (
            <div key={product._id} className="">
              <h3 className="">
                {product.title} {product.model}
              </h3>
              <p className="">Quantity: {product.quantity}</p>
              <p className="">
                <span>Price:</span> ${product.price}
              </p>
              <p className="">
                <span>Color:</span> ${product.color}
              </p>
            </div>
          ))}
        </div>

<table>
          <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr key={product._id}>
                <td>{product.title} {product.model}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
</table>