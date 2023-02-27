import React, { PureComponent } from "react";
//helpers
import { getTitle, getSubTitle, getPrice } from "../../utility";
//redux
import {connect} from 'react-redux'
//actions
import { upCartItemByOne, minusCartItemByOne } from "../../actions/cartAction";
//imgs
import prevBtn from '../../icons/prevBtn.png';
import nextBtn from '../../icons/nextBtn.png';

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
          <div className="cart-page-item-gallery">
            <div className="cart-page-item-gallery__qty-btns">
              <button
                className="cart-page-item-gallery__qty-btns__add"
                onClick={() => {
                  upCartItemByOne(item)
                }
                }
              >
                +
              </button>
              {!cartItems[index].qty ? (
                0
              ) : (
                <p>{cartItems[index].qty}</p>
              )}
              <button
                className="cart-page-item-gallery__qty-btns__take-away"
                onClick={() => {
                  minusCartItemByOne(item);
                }}
              >
                -
              </button>
            </div>
            <div className="cart-page-item-gallery__img-wrapper">
              <img id="0" src={item.gallery[0]} alt={`${item.name}`} />
              <div className="cart-page-item-gallery__img-wrapper__btns-wrapper">
                <button
                  onClick={(e) => {
                    this.setPrevGalleryImg(e, item);
                  }}
                  className="cart-page-item-gallery__img-wrapper__btns-wrapper__img__prev-btn "
                >
                  {" "}
                  <img
                    className="btn-icon icon"
                    alt="previuse"
                    src={prevBtn}
                  />{" "}
                </button>
                <button
                  onClick={(e) => {
                    this.setNextGalleryImg(e, item);
                  }}
                  className="cart-page-item-gallery__img-wrapper__btns-wrapper__img__next-btn"
                >
                  {" "}
                  <img
                    className="btn-icon icon"
                    alt="next"
                    src={nextBtn}
                  />{" "}
                </button>
              </div>
            </div>
          </div>
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