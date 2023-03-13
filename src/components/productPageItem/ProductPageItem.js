import React, { PureComponent } from 'react';
//helpers
import { getTitle, getSubTitle, getPrice } from "../../utility";
//html parser
import parse from "html-react-parser";
//components
import ProductPageAttributes from "../productPageAttributes/ProductPageAttributes";

class ProductPageItem extends PureComponent {

  render() {
    const { attributes, name, prices, description } = this.props.product;
    const { symbol } = this.props.currencies.selectedCurrency;
    const { product, error } = this.props
    return(
      <div className="product-page__description-wrapper">
          <h1 className="product-page__description-wrapper__title">
            {name && getTitle(name)}
          </h1>
          <p className="product-page__description-wrapper__sub-title">
            {name && getSubTitle(name)}
          </p>
          <ProductPageAttributes 
            attributes={attributes}
            defaultAttributes={this.props.defaultAttributes}
            selectAttribute={this.props.selectAttribute}
          />
          <div className="product-page__description-wrapper__price-wrapper">
            <p className="product-page__description-wrapper__attribute-title">
              PRICE:
            </p>
            <p className="product-page__description-wrapper__attribute-title__price">
              <span>{symbol} </span>
              {getPrice(prices, symbol)}
            </p>
          </div>
          <div>
            {error === true && (
              <p className="error-message">Please select all options</p>
            )}
            {product.inStock && (
              <button
                onClick={() => {
                  this.props.validateProduct(product);
                }}
                className="product-page__description-wrapper__add-to-cart-btn"
              >
                ADD TO CART
              </button>
            )}
            {!product.inStock && (
              <h4 className="product-page__description-wrapper__out-of-stock">
                We are sorry! Item currently out of Stock.
              </h4>
            )}
          </div>

          <div className="product-page__description-wrapper__product-description">
            {parse(`${description}`)}
          </div>
        </div>
    )
  }
}

export default ProductPageItem;