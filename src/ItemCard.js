import React from "react";
import "./App.css";

function ItemCard({ item, addToCart }) {
  return (
    <div className="item-card">
      <p className="discount-tag">{item.discount}%off</p>
      <div
        className="img-item"
        style={{
          width: 120,
          height: 108,
          backgroundImage: `url(${item.img_url})`
        }}
      ></div>
      <div className="item-detail">
        <span>
          <p className="item-name">{item.name}</p>
          <strike className="strike">
            <p className="item-price">{item.price}</p>
          </strike>
          <p>{item.price * (1 - item.discount / 100)}</p>
        </span>
        <span className="add-item">
          <button onClick={() => addToCart(item.id)}>Add to cart</button>
        </span>
      </div>
    </div>
  );
}
export default ItemCard;
