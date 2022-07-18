function CartItem({ item }) {
  const { product, quantity } = item;

  return (
    <div>
      <div>
        <img src={product.image} alt={product.title}></img>
        <div>
          <h3>{product.title}</h3>
          <p>Price per unit: {product.price}</p>
        </div>
      </div>
      <div>
        <label>
          <span>Quantity:</span>
          <input type="number" min="1" max="100" value={quantity} />
        </label>
      </div>
      <div>
        <p>Total:</p>
        <p title="Total item cost">${product.price * quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
