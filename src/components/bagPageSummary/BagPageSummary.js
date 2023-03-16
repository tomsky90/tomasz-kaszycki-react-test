import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
//helpers
import { calculateTotalPrice } from "../../utility";

class BagPageSummary extends PureComponent {

  render() {
    const { selectedCurrency } = this.props;
    return (
      <div className="bag-page__bag-wrapper__summary">
        <div className="bag-page__bag-wrapper__summary__price">
          <p>Total</p>
          <p>
            <span>{selectedCurrency.symbol}</span> {calculateTotalPrice(this.props.cartItems, this.props.selectedCurrency.symbol)}
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
