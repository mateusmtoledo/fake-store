import CartItem from "./CartItem";

function Cart({ cartItems }) {
  function calculateTotal() {
    return cartItems
        .reduce((previous, current) => previous + current.product.price * current.quantity, 0);
  }

  return (
    <div>
      <div>
        {
          cartItems.map((item) => <CartItem key={item.product.id} item={item} />)
        }
      </div>
      <div>
        <p>Order Total: ${calculateTotal().toFixed(2)}</p>
        <button>Go to checkout</button>
        <button>Continue shopping</button>
      </div>
    </div>
  );
}

export default Cart;
