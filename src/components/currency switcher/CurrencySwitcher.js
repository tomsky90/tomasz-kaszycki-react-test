import React, { PureComponent } from "react";
//imgs
import cartIcon from "../../icons/Empty Cart.png";
import currencyArrow from "../../icons/Vector.png";
//components
import BagPage from "../../pages/Bag";

class CurrencySwitcher extends PureComponent {
  totalItemsInCart = () => {
    let total = null;
    this.props.cart.cartItems.forEach((element) => {
      total += element.qty;
    });
    return total;
  };

  render() {
    return (
      <div className="header__cart-icon-currency-switcher-wrapper">
        <div className="header__currency-switcher-container">
          <div className="currency-switcher__select-bar">
            <div
              className="currency-switcher__icon"
              ref={this.props.currencySwitcherRef}
              onClick={() => {
                this.props.toggleOptionsActive();
              }}
            >
              <span>{this.props.currencies?.selectedCurrency?.symbol}</span>
              <img
                className={
                  this.props.isOptionsActive
                    ? "currenccy-switcher__arrow active"
                    : "currenccy-switcher__arrow"
                }
                src={currencyArrow}
                alt=""
              />
            </div>
            <div className="header__cart-icon-container">
              <div
                onClick={() => {
                  this.props.toggleBagPageActive();
                }}
                ref={this.props.cartBtnRef}
              >
                {this.props.cart.cartItems.length > 0 && (
                  <div className="header__cart-icon-container__items-in-cart">
                    {this.totalItemsInCart()}
                  </div>
                )}
                <img src={cartIcon} alt="cart icon" />
              </div>
              {this.props.isBagPageActive && (
                <BagPage
                  cartBtnRef={this.props.cartBtnRef}
                  hideBagePage={this.props.closeBagPage}
                  isBagPageActive={this.props.isBagPageActive}
                />
              )}
            </div>
          </div>
          <div
            className={
              this.props.isOptionsActive
                ? "currency-switcher__options-wrapper active"
                : "currency-switcher__options-wrapper"
            }
          >
            {this.props.currencies.currencies.currencies !== undefined
              ? this.props.currencies.currencies.currencies.map((currency) => (
                  <div
                    onClick={() => {
                      this.props.setSelectedCurrency(currency);
                      this.props.toggleOptionsActive();
                    }}
                    key={currency.label}
                    className="option"
                  >
                    <span>{currency.symbol}</span>
                    <span>{currency.label}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencySwitcher;
