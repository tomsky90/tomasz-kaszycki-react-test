import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { getCurrencies } from "../../actions/currencyAction";
import { connect } from "react-redux";
import { setSelectedCurrency } from "../../actions/currencyAction";
//imgs
import logoIcon from "../../icons/a-logo.png";
//components & pages
import CurrencySwitcher from "../currency switcher/CurrencySwitcher";

class Header extends PureComponent {
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
        <CurrencySwitcher
          isOptionsActive={this.state.isOptionsActive}
          isBagPageActive={this.state.isBagPageActive}
          currencies={this.props.currencies}
          products={this.props.products}
          cart={this.props.cart}
          toggleOptionsActive={this.toggleOptionsActive}
          toggleBagPageActive={this.toggleBagPageActive}
          cartBtnRef={this.cartBtnRef}
          currencySwitcherRef={this.currencySwitcherRef}
          setSelectedCurrency={this.props.setSelectedCurrency}
          closeBagPage={this.closeBagPage}
        />
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
