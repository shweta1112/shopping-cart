import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  state = {};
  render() {
    const { cartItems, list, addToCart, removeFromCart } = this.props;
    const itemMap = list.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});
    const totalItems = Object.values(cartItems).reduce((x, y) => x + y, 0);
    const totalPrice = Object.keys(cartItems)
      .map(id => itemMap[id].price * cartItems[id])
      .reduce((x, y) => x + y, 0);

    const totalDiscount = Object.keys(cartItems)
      .map(
        id => itemMap[id].price * cartItems[id] * (itemMap[id].discount / 100)
      )
      .reduce((x, y) => x + y, 0);

    console.log(cartItems);
    console.log(itemMap);
    return (
      <div className="">
        <Link to="/">Item List</Link>
        <div>Order Summary</div>
        <table>
          <tr>
            <th>Item({totalItems})</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
          <tr>
            {Object.keys(cartItems).map(itemId => {
              const item = itemMap[itemId];
              const quantity = cartItems[itemId];
              return (
                <tr key={itemId}>
                  <td>Name: {item.name}</td>
                  <td>
                    <button onClick={() => removeFromCart(itemId)}>-</button>{" "}
                    {quantity}
                    <button onClick={() => addToCart(itemId)}>+</button>
                  </td>
                  <td>Price: {item.price * quantity}</td>
                </tr>
              );
            })}
          </tr>
        </table>
        <div>
          <div>Total</div>
          <p>
            <label>Items({totalItems}):</label> {totalPrice}
          </p>
          <p>
            <label>Discount:</label> {totalDiscount}{" "}
          </p>
          <p>
            <label>Order Total: </label>
            {totalPrice - totalDiscount}
          </p>
        </div>
      </div>
    );
  }
}

export default Cart;
