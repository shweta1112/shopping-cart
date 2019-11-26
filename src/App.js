import React from "react";
import "./App.css";
import Home from "./Home";
import Cart from "./Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = { cartItems: {}, itemList: [] };
  addToCart = id => {
    const cartItems = { ...this.state.cartItems };
    cartItems[id] = (cartItems[id] || 0) + 1;
    this.setState({ cartItems });
  };
  removeFromCart = id => {
    const cartItems = { ...this.state.cartItems };
    const numberOfItems = cartItems[id];
    if (numberOfItems === 1) {
      delete cartItems[id];
    } else if (numberOfItems > 1) {
      cartItems[id] = numberOfItems - 1;
    }
    this.setState({ cartItems });
  };

  componentDidMount() {
    fetch(`https://api.myjson.com/bins/qhnfp`)
      .then(response => response.json())
      .then(list =>
        this.setState({
          itemList: list.map(item => {
            item.img_url = "https://source.unsplash.com/random/500x500";
            return item;
          })
        })
      );
  }
  render() {
    const { removeFromCart, addToCart } = this;
    const { itemList, cartItems } = this.state;
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/cart"
              render={() => (
                <Cart
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  list={itemList}
                  cartItems={cartItems}
                />
              )}
            />
            <Route
              path="/"
              render={() => (
                <Home
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  list={itemList}
                  cartItems={cartItems}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
