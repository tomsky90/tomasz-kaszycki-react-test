import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
//helpers
import { getPrice } from "../../utility";

class BagPageSummary extends PureComponent {
  calculateTotalPrice = () => {
    let price = null;
    const tax = 21;
    this.props.cartItems.forEach((item) => {
      price +=
        getPrice(item.prices, this.props.selectedCurrency.symbol) * item.qty;
    });
    const taxValue = (tax / 100) * price;
    const totalPrice = price + taxValue;

    return totalPrice.toFixed(2);
  };

  render() {
    const { selectedCurrency } = this.props;
    return (
      <div className="bag-page__bag-wrapper__summary">
        <div className="bag-page__bag-wrapper__summary__price">
          <p>Total</p>
          <p>
            <span>{selectedCurrency.symbol}</span> {this.calculateTotalPrice()}
          </p>
        </div>
        <div className="bag-page__bag-wrapper__summary__btns ">
          <Link
            to="/cart"
            className="button"
            onClick={() => {
              this.props.toggleBagPageActive();
            }}
          >
            <button className="view-btn">VIEW BAG</button>
          </Link>
          <button className="checkout-btn button">CHECKOUT</button>
        </div>
      </div>
    );
  }
}

export default BagPageSummary;
