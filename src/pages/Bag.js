import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { upCartItemByOne, minusCartItemByOne } from "../actions/cartAction";
import { getTitle, getSubTitle, getPrice } from "../utility";
//components
import Attributes from "../components/attributes/Attributes";

class BagPage extends PureComponent {
  constructor(props) {
    super(props);
    this.bagPageRef = React.createRef();
    this.closeBagePage = this.closeBagePage.bind(this);
  }

  componentDidMount() {
    //close bag page on click outside
    document.addEventListener("click", this.closeBagePage);
  }

  componentWillUnmount() {
    //close bag page on click outside
    document.removeEventListener("click", this.closeBagePage);
  }

  //close bag page on click outside
  closeBagePage(event) {
    if (
      this.bagPageRef &&
      !this.bagPageRef.current.contains(event.target) &&
      !this.props.cartBtnRef.current.contains(event.target)
    ) {
      this.props.hideBagePage();
    }
  }

  totalItemsInCart = () => {
    let total = null;
    this.props.cartItems.forEach((element) => {
      total += element.qty;
    });
    return total;
  };

  calculateTotalPrice = () => {
    let price = null;
    const tax = 21;
    this.props.cartItems.forEach((item) => {
      price +=
        getPrice(item.prices, this.props.currencies.selectedCurrency.symbol) *
        item.qty;
    });
    const taxValue = (tax / 100) * price;
    const totalPrice = price + taxValue;

    return totalPrice.toFixed(2);
  };

  render() {
    const { cartItems } = this.props.cart.cart;
    const { selectedCurrency } = this.props.currencies;
    return (
      <div className="bag-page">
        <div className="bag-page__bgc"></div>
        <div ref={this.bagPageRef} className="bag-page__bag-wrapper">
          <p className="bag-page__heading">
            My Bag.
            <span>
              {this.totalItemsInCart()}
              {this.totalItemsInCart() < 1
                ? "No items in the cart"
                : this.totalItemsInCart() === 1
                ? " item"
                : " items"}
            </span>
          </p>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={`${item.id}${index}`}>
              <div className="cart-item__description">
                <p>{getTitle(item.name)}</p>
                <p>{getSubTitle(item.name)}</p>
                <p className="cart-item price">
                  <span>{selectedCurrency.symbol}</span>{" "}
                  {getPrice(item.prices, selectedCurrency?.symbol)}
                </p>
                {item.attributes.map((attr) => (
                  <Attributes key={attr.element} attr={attr} className='bag-page'/>
                ))}
              </div>
              <div className="item__gallery">
                <div className="item__qty-btns">
                  <button
                    className="item__qty-btns__add"
                    onClick={() => {
                      this.props.upCartItemByOne(item);
                    }}
                  >
                    +
                  </button>
                  {!this.props.cart.cart.cartItems[index].qty
                    ? 0
                    : this.props.cart.cart.cartItems[index].qty}
                  <button
                    className="item__qty-btns__take-away"
                    onClick={() => {
                      this.props.minusCartItemByOne(item);
                    }}
                  >
                    -
                  </button>
                </div>
                <div className="item__img-wrapper">
                  <img src={item.gallery[0]} alt={`${item.name}`} />
                </div>
              </div>
            </div>
          ))}
          <div className="bag-page__bag-wrapper__summary">
            <div className="bag-page__bag-wrapper__summary__price">
              <p>Total</p>
              <p>
                <span>{selectedCurrency.symbol}</span>{" "}
                {this.calculateTotalPrice()}
              </p>
            </div>
            <div className="bag-page__bag-wrapper__summary__btns ">
              <Link
                className="button"
                onClick={() => {
                  this.props.toggleBagPageActive();
                }}
                to="cart"
              >
                <button className="view-btn">VIEW BAG</button>
              </Link>
              <button className="checkout-btn button">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ cart: state, currencies: state.currencies, cartItems: state.cart.cartItems }),
  {
    upCartItemByOne,
    minusCartItemByOne,
  }
)(BagPage);
