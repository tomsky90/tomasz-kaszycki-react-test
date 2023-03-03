import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getCurrencies } from "../../actions/currencyAction";
import { connect } from "react-redux";
import { setSelectedCurrency } from "../../actions/currencyAction";
//imgs
import logoIcon from "../../icons/a-logo.png";
import cartIcon from "../../icons/Empty Cart.png";
import currencyArrow from "../../icons/Vector.png";
//components & pages
import BagPage from "../../pages/Bag";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsActive: false,
      isBagPageActive: false,
    };
    this.cartBtnRef = React.createRef();
    this.currencySwitcherRef = React.createRef();
    this.handleCloseCurrencySwitcher =
      this.handleCloseCurrencySwitcher.bind(this);
  }

  componentDidMount() {
    this.props.getCurrencies();
    document.addEventListener("click", this.handleCloseCurrencySwitcher);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleCloseCurrencySwitcher);
  }
  //close currency switcher on click outside
  handleCloseCurrencySwitcher(event) {
    if (
      this.currencySwitcherRef &&
      !this.currencySwitcherRef.current.contains(event.target)
    ) {
      this.setState({
        isOptionsActive: false,
      });
    }
  }

  toggleOptionsActive = (e) => {
    this.setState({
      isOptionsActive: !this.state.isOptionsActive,
    });
  };

  toggleBagPageActive = () => {
    this.setState({
      isBagPageActive: !this.state.isBagPageActive,
    });
  };

  closeBagPage = (e) => {
    this.setState({
      isBagPageActive: false,
    });
  };

  totalItemsInCart = () => {
    let total = null;
    this.props.cart.cartItems.forEach((element) => {
      total += element.qty;
    });
    return total;
  };

  render() {
    return (
      <header className="header">
        <nav className="header__nav">
          <NavLink to="./all">ALL</NavLink>
          <NavLink to="./clothes">CLOTHES</NavLink>
          <NavLink to="./tech">TECH</NavLink>
        </nav>

        <div className="header__logo-container">
          <NavLink to="./all">
            <img src={logoIcon} alt="logo" />
          </NavLink>
        </div>
        <div className="header__cart-icon-currency-switcher-wrapper">
          <div className="header__currency-switcher-container">
            <div className="currency-switcher__select-bar">
              <div
                ref={this.currencySwitcherRef}
                className="currency-switcher__icon"
                onClick={() => {
                  this.toggleOptionsActive();
                }}
              >
                <span>{this.props.currencies?.selectedCurrency?.symbol}</span>
                <img
                  className={
                    this.state.isOptionsActive
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
                    this.toggleBagPageActive();
                  }}
                  ref={this.cartBtnRef}
                >
                  {this.props.cart.cartItems.length > 0 && (
                    <div className="header__cart-icon-container__items-in-cart">
                      {this.totalItemsInCart()}
                    </div>
                  )}
                  <img src={cartIcon} alt="cart icon" />
                </div>
                {this.state.isBagPageActive && (
                  <BagPage
                    cartBtnRef={this.cartBtnRef}
                    hideBagePage={this.closeBagPage}
                    isBagPageActive={this.state.isBagPageActive}
                  />
                )}
              </div>
            </div>
            <div
              className={
                this.state.isOptionsActive
                  ? "currency-switcher__options-wrapper active"
                  : "currency-switcher__options-wrapper"
              }
            >
              {this.props.currencies.currencies.currencies !== undefined
                ? this.props.currencies.currencies.currencies.map(
                    (currency) => (
                      <div
                        onClick={() => {
                          this.props.setSelectedCurrency(currency);
                          this.toggleOptionsActive();
                        }}
                        key={currency.label}
                        className="option"
                      >
                        <span>{currency.symbol}</span>
                        <span>{currency.label}</span>
                      </div>
                    )
                  )
                : null}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({
    currencies: state.currencies,
    products: state.products,
    cart: state.cart,
  }),
  {
    getCurrencies,
    setSelectedCurrency,
  }
)(Header);
