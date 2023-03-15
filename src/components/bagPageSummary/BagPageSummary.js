import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
//helpers
import { getPrice } from "../../utility";

class BagPageSummary extends PureComponent {
  calculateTotalPrice = () => {
    const tax = 21;
    const sum = this.props.cartItems.reduce(
      (accumulator, currentValue) =>
        getPrice(currentValue.prices, this.props.selectedCurrency.symbol) *
        currentValue.qty,
      0
    );
    const taxValue = (tax / 100) * sum;
    const totalPrice = sum + taxValue;

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
