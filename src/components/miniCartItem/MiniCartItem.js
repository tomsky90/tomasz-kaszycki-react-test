import React, { PureComponent } from "react";
//components
import Attributes from "../attributes/Attributes";
//helpers
import { getTitle, getSubTitle, getPrice } from "../../utility";

class MiniCartItem extends PureComponent {
  render() {
    const { item, index, selectedCurrency } = this.props;
    return (
      <div className="cart-item">
        <div className="cart-item__description">
          <p>{getTitle(item.name)}</p>
          <p>{getSubTitle(item.name)}</p>
          <p className="cart-item price">
            <span>{selectedCurrency?.symbol}</span>{" "}
            {getPrice(item.prices, selectedCurrency?.symbol)}
          </p>
          {item.attributes.map((attr) => (
            <Attributes key={attr.element} attr={attr} className="bag-page" />
          ))}
        </div>
        <div className="item__gallery">
          <div className="item__qty-btns">
            <button
              className="item__qty-btns__add"
              onClick={() => {
                this.props.upCartItemByOne(item);
              }}
            >
              +
            </button>
            {!this.props.cartItems[index].qty
              ? 0
              : this.props.cartItems[index].qty}
            <button
              className="item__qty-btns__take-away"
              onClick={() => {
                this.props.minusCartItemByOne(item);
              }}
            >
              -
            </button>
          </div>
          <div className="item__img-wrapper">
            <img src={item.gallery[0]} alt={`${item.name}`} />
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCartItem;
