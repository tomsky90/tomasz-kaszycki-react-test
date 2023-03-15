import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { upCartItemByOne, minusCartItemByOne } from "../actions/cartAction";
//components
import MiniCartItem from "../components/miniCartItem/MiniCartItem";
import BagPageSummary from "../components/bagPageSummary/BagPageSummary";

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
    const sum = this.props.cartItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.qty,0);
    return sum;
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
            <MiniCartItem
              key={`${item.id}${index}`}
              item={item}
              index={index}
              selectedCurrency={selectedCurrency}
              cartItems={cartItems}
              upCartItemByOne={this.props.upCartItemByOne}
              minusCartItemByOne={this.props.minusCartItemByOne}
            />
          ))}
          <BagPageSummary
            selectedCurrency={selectedCurrency}
            calculateTotalPrice={this.calculateTotalPrice}
            cartItems={cartItems}
            toggleBagPageActive={this.props.toggleBagPageActive}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cart: state,
    currencies: state.currencies,
    cartItems: state.cart.cartItems,
  }),
  {
    upCartItemByOne,
    minusCartItemByOne,
  }
)(BagPage);
