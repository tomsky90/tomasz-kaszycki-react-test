import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
//helpers
import { calculateTotalPrice } from "../../utility";

class BagPageSummary extends PureComponent {

  render() {
    const { symbol } = this.props.selectedCurrency;
    const { cartItems } = this.props;
    return (
      <div className="bag-page__bag-wrapper__summary">
        <div className="bag-page__bag-wrapper__summary__price">
          <p>Total</p>
          <p>
            <span>{symbol}</span> {calculateTotalPrice(cartItems, symbol)}
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
