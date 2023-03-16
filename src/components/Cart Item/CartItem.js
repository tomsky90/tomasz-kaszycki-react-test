import React, { PureComponent } from "react";
//helpers
import { getTitle, getSubTitle, getPrice } from "../../utility";
//redux
import { connect } from "react-redux";
//actions
import { upCartItemByOne, minusCartItemByOne } from "../../actions/cartAction";
//components
import Slider from "../Cart slider/CartSlider";
import Attributes from "../attributes/Attributes";

class CartItem extends PureComponent {
  render() {
    const {
      item,
      index,
      cartItems,
      symbol,
      upCartItemByOne,
      minusCartItemByOne,
    } = this.props;
    return (
      <>
        <div className="cart-page__cart-item">
          <div className="cart-page__cart-item__description">
            <p className="cart-page__cart-item__description__title">
              {getTitle(item.name)}
            </p>
            <p className="cart-page__cart-item__description__sub-title">
              {getSubTitle(item.name)}
            </p>
            <p className="cart-page__cart-item__description__price">
              <span>{symbol}</span>{" "}
              {getPrice(item.prices, symbol)}
            </p>
            {item.attributes.map((attr) => (
              <Attributes key={attr.element} attr={attr} className='cart-page'/>
            ))}
          </div>
          <Slider
            item={item}
            cartItems={cartItems}
            index={index}
            upCartItemByOne={upCartItemByOne}
            minusCartItemByOne={minusCartItemByOne}
          />
        </div>
      </>
    );
  }
}

export default connect((state) => ({ cart: state }), {
  upCartItemByOne,
  minusCartItemByOne,
})(CartItem);
