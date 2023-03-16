import React, { Component } from "react";
//redux
import { connect } from "react-redux";
//helpers
import { totalItemsInCart, calculateTotalPrice } from "../utility";
//components
import CartItem from "../components/Cart Item/CartItem";
import Spinner from "../components/spinner/Spinner";

class CartPage extends Component {
  calculateTax = () => {
    const tax = 21;
    const price = calculateTotalPrice(this.props.cartItems, this.props.symbol);
    const taxValue = (tax / 100) * price;
    return taxValue.toFixed(2);
  };

  render() {
    const { cartItems, symbol } = this.props;

    if (!cartItems) {
      return <Spinner />;
    }
    return (
      <div className="cart-page">
        <h1>CART</h1>
        {cartItems.map((item, index) => (
          <CartItem
            key={`${item.id}${index}`}
            item={item}
            index={index}
            cartItems={cartItems}
            symbol={symbol}
          />
        ))}
        {totalItemsInCart(cartItems) > 0 ? (
          <div className="cart-page__cart-summary">
            <div className="cart-page__cart-summary__item-wrapper">
              <p className="cart-page__cart-summary__tax-price">Tax 21%: </p>{" "}
              <p className="cart-page__cart-summary__bold-font">
                {symbol} {this.calculateTax()}
              </p>
            </div>
            <div className="cart-page__cart-summary__item-wrapper">
              <p className="cart-page__cart-summary__cart-qty">Quantity: </p>{" "}
              <p className="cart-page__cart-summary__bold-font">
                {totalItemsInCart(cartItems)}
              </p>
            </div>
            <div className="cart-page__cart-summary__item-wrapper">
              <p className="cart-page__cart-summary__total-price">Total: </p>{" "}
              <p className="cart-page__cart-summary__bold-font">
                {symbol} {calculateTotalPrice(cartItems, symbol)}
              </p>
            </div>
            <button>ORDER</button>
          </div>
        ) : (
          <p>Cart is Empty</p>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    symbol: state.currencies.selectedCurrency.symbol,
    cartItems: state.cart.cartItems,
  }),
  {}
)(CartPage);
