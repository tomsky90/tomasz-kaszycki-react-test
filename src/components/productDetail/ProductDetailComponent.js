import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//icons
import cartIcon from "../../icons/Empty Cart white.png";
//redux
import { addToCart } from "../../actions/cartAction";
import { showMessage, hideMessage } from "../../actions/messageAction";
//helper function
import { getPrice } from '../../utility.js';

class ProductDetailComponent extends PureComponent {

  //check if product has attributes if so select default and push to cart
  validateProduct = (item) => {
    const itemCopy = { ...item };
    if (itemCopy.attributes.length === 0) {
      this.props.addToCart(itemCopy);
    } else {
      const refacoredAttributes = [];
      const attributes = itemCopy.attributes;
      attributes.forEach((element) => {
        element = {
          type: element.type,
          selectedValue: element.items[0].value,
          element: element.id,
          items: element.items,
        };
        refacoredAttributes.push(element);
      });
      itemCopy.attributes = refacoredAttributes;
      this.props.addToCart(itemCopy);
      this.props.showMessage(`${itemCopy.name} added to cart!`);
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  };

  render() {
    const { item, symbol } = this.props;
    const { name} = this.props.products.category;
    return (
      <div className="product-detail-component">
        <Link to={`/${name}/${item.id}`}>
          <div className="product-detail-component__img-wrapper">
            {!item.inStock && (
              <div className="product-detail-component__out-of-stock-img-cover">
                <p>OUT OF STOCK</p>
              </div>
            )}
            <img src={item.gallery[0]} alt="" />
          </div>

          <div
            className={
              item.inStock
                ? "product-detail-component__text-container"
                : "product-detail-component__text-container out-of-stock"
            }
          >
            <p>{item.name}</p>
            <p className="product-detail-component__price-container">
              {symbol} {getPrice(item.prices, symbol)}
            </p>
          </div>
        </Link>
        {this.props.item.inStock && (
          <div className="product-detail-component__img-wrapper__cart-icon"
            onClick={() => { this.validateProduct(item) }}
          >
            <img src={cartIcon} alt="" />
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    symbol: state.currencies.selectedCurrency.symbol,
    products: state.products.items,
    cart: state,
  }),
  {
    addToCart,
    showMessage,
    hideMessage,
  }
)(ProductDetailComponent);