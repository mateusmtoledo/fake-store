function Card({ item, addToCart }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <button type="button" onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default Card;
