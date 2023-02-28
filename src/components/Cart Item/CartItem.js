import React, { PureComponent } from "react";
//helpers
import { getTitle, getSubTitle, getPrice } from "../../utility";
//redux
import {connect} from 'react-redux'
//actions
import { upCartItemByOne, minusCartItemByOne } from "../../actions/cartAction";
//components
import Slider from '../Cart slider/CartSlider';

class CartItem extends PureComponent {

  render() {
    const { item, index, cartItems, selectedCurrency, upCartItemByOne, minusCartItemByOne } = this.props;
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
              <span>{selectedCurrency.symbol}</span>{" "}
              {getPrice(item.prices, selectedCurrency?.symbol)}
            </p>
            {item.attributes.map((attr) => (
              <div key={attr.element} className="cart-page__attribute">
                <p>{attr.element}:</p>
                <div className="cart-page__attribute__description__attributes-wrapper">
                  {attr.type === "text" &&
                    attr.items &&
                    attr.items.map((item) => (
                      <div
                        key={item.id}
                        className={`cart-page__attribute__description__attribute--text attribute${
                          attr.selectedValue === item.value ? " active" : ""
                        }`}
                      >
                        {item.value}
                      </div>
                    ))}
                  {attr.type === "swatch" &&
                    attr.items &&
                    attr.items.map((item) => (
                      <div
                        key={item.id}
                        style={{ backgroundColor: `${item.value}` }}
                        className={`cart-page__attribute__description__attribute--swatch attribute${
                          attr.selectedValue === item.value ? " active" : ""
                        }`}
                      ></div>
                    ))}
                </div>
              </div>
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

export default connect(
  (state) => ({ cart: state }),
  {
    upCartItemByOne,
    minusCartItemByOne
  }
)(CartItem);