import CartItem from "./CartItem";
import { Link } from "react-router-dom";

function Cart({ cartItems, updateQuantity }) {
  function calculateTotal() {
    return cartItems
        .reduce((previous, current) => previous + current.product.price * current.quantity, 0);
  }

  return (
    <div>
      <div>
        {
          cartItems
            .map((item) =>
              <CartItem
                key={item.product.id}
                item={item}
                updateQuantity={(event) => updateQuantity(item.product.id, event)}
              />)
        }
      </div>
      <div>
        <p>Order Total: ${calculateTotal().toFixed(2)}</p>
        <button>Go to checkout</button>
        <Link to="/shop">
          <button>Continue shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
