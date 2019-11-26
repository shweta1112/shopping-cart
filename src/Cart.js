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
      <div>
        <Link to="/">Item List</Link>
        <div>Order Summary</div>
        <div className="item-cart">
          <table>
            <tr>
              <th></th>
              <th>Item({totalItems})</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>

            {Object.keys(cartItems).map(itemId => {
              const item = itemMap[itemId];
              const quantity = cartItems[itemId];
              return (
                <tr key={itemId}>
                  <td
                    className="img-item"
                    style={{
                      width: 40,
                      height: 40,
                      backgroundImage: `url(${item.img_url})`
                    }}
                  ></td>
                  <td> {item.name}</td>

                  <td>
                    <button onClick={() => removeFromCart(itemId)}>-</button>{" "}
                    {quantity}
                    <button onClick={() => addToCart(itemId)}>+</button>
                  </td>
                  <td>{item.price * quantity}</td>
                </tr>
              );
            })}
          </table>
          <aside className="item-price-details">
            <table className="price-table">
              <tr>
                <th>Total</th>
                <th></th>
              </tr>
              <tr>
                <td>
                  <label>Items({totalItems}):</label>
                </td>
                <td>{totalPrice}</td>
              </tr>
              <tr>
                <td>
                  <label>Discount:</label>
                </td>
                <td>{totalDiscount}</td>
              </tr>
              <tr className="order-total">
                <td>
                  <label>Order Total: </label>
                </td>
                <td>{totalPrice - totalDiscount}</td>
              </tr>
            </table>
          </aside>
        </div>
      </div>
    );
  }
}

export default Cart;
