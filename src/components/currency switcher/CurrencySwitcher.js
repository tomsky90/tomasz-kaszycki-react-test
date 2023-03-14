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
    const {
      currencySwitcherRef,
      toggleOptionsActive,
      isOptionsActive,
      isBagPageActive,
      cartBtnRef,
      toggleBagPageActive,
      setSelectedCurrency,
    } = this.props;
    const { currencies } = this.props.currencies.currencies;
    const { symbol } = this.props.currencies.selectedCurrency;
    const { cartItems } = this.props.cart;
    return (
      <div className="header__cart-icon-currency-switcher-wrapper">
        <div className="header__currency-switcher-container">
          <div className="currency-switcher__select-bar">
            <div
              className="currency-switcher__icon"
              ref={currencySwitcherRef}
              onClick={() => {toggleOptionsActive()}}
            >
              <span>{symbol}</span>
              <img
                className={
                  isOptionsActive
                    ? "currenccy-switcher__arrow active"
                    : "currenccy-switcher__arrow"
                }
                src={currencyArrow}
                alt=""
              />
            </div>
            <div className="header__cart-icon-container">
              <div
                onClick={() => {toggleBagPageActive()}}
                ref={cartBtnRef}
              >
                {cartItems.length > 0 && (
                  <div className="header__cart-icon-container__items-in-cart">
                    {this.totalItemsInCart()}
                  </div>
                )}
                <img src={cartIcon} alt="cart icon" />
              </div>
              {isBagPageActive && (
                <BagPage
                  cartBtnRef={this.props.cartBtnRef}
                  hideBagePage={this.props.closeBagPage}
                  isBagPageActive={isBagPageActive}
                  toggleBagPageActive={toggleBagPageActive}
                />
              )}
            </div>
          </div>
          <div
            className={
              isOptionsActive
                ? "currency-switcher__options-wrapper active"
                : "currency-switcher__options-wrapper"
            }
          >
            {currencies !== undefined
              ? currencies.map((currency) => (
                  <div
                    onClick={() => {
                      setSelectedCurrency(currency);
                      toggleOptionsActive();
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
