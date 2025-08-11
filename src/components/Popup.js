import "../myStyles/Popup.css";
import { toast } from "react-toastify";

export default function Popup(props) {
  if (props.Popupopen !== 1) return null;

  /************** shows total amount & items ******************/
  let totalAmount = 0;
  let totalItems = 0;

  props.selecteditems.forEach((val) => {
    if (val.addedtocart === 1 && val.orderedq > 0) {
      totalAmount += val.price * val.orderedq;
      totalItems += val.orderedq;
    }
  });

  /************** clear cart ******************/
  function clearCart() {
    if (props.selecteditems.length === 0) {
      toast.info("Cart is already empty!");
      return;
    }

    const cleared = props.products.map((val) => ({
      ...val,
      orderedq: 0,
      addedtocart: 0,
    }));

    props.updateProducts(cleared);
    toast.info("Cart cleared!");
    props.Popupclose();
  }

  /************** place order ******************/
  function placeOrder() {
    if (props.selecteditems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Order placed successfully!");
    clearCart();
  }

  return (
    <div className="mypopup">
      <div className="showpop">
        <button className="close-btn" onClick={props.Popupclose}>×</button>
        <h2>Cart Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {props.selecteditems.map((val) => {
              if (val.addedtocart === 1) {
                return (
                  <tr key={val.heading}>
                    <td>{val.heading}</td>
                    <td>Rs. {val.price}</td>
                    <td>
                      <button onClick={() => props.popupincrement(val)}>+</button>
                      {val.orderedq}
                      <button onClick={() => props.popupdecrement(val)}>-</button>
                    </td>
                    <td>Rs. {val.price * val.orderedq}</td>
                    <td>
                      <button onClick={() => props.removeFromCart(val)}>🗑️</button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>

        <h3>Total Items: {totalItems}</h3>
        <h3>Total Amount: ₹{totalAmount}</h3>

        <div className="cart-actions">
          <button className="btn-clear" onClick={clearCart}>Clear Cart</button>
          <button className="btn-order" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
