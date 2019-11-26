import React from "react";
import "./App.css";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
class Home extends React.Component {
  render() {
    const { list, cartItems, addToCart } = this.props;
    const totalItems = Object.values(cartItems).reduce((x, y) => x + y, 0);
    return (
      <div>
        <Link to="/cart">Go to cart</Link>
        <div>{totalItems} items added in Cart</div>
        <hr></hr>
        <div className="card-list">
          {list.map(item => (
            <ItemCard item={item} key={item.id} addToCart={addToCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
