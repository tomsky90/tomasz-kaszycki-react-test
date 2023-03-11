import React, { Component } from "react";
import { fetchProduct } from "../actions/productActions";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartAction";
import { showMessage, hideMessage } from "../actions/messageAction";
import { getTitle, getSubTitle } from "../utility";
//componnents
import Gallery from "../components/gallery/Gallery";
import Spinner from "../components/spinner/Spinner";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAttributes: {},
      error: "false",
    };
  }

  //fetch item data
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    this.setDefaultAttribute()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.product?.attributes !== undefined &&
      this.props.product?.attributes !==
        prevProps.product?.attributes
    ) {
      if (
        this.props.product.attributes !==
        prevProps.product?.attributes
      ) {
        this.setDefaultAttribute();
      }
    }
  }

  setDefaultAttribute = () => {
    const refacoredAttributes = {};
    let elementId = "";
    this.props.product?.attributes.forEach((element) => {
      elementId = element.id;
      refacoredAttributes[elementId] = {
        type: element.type,
        selectedValue: null,
        element: element.id,
      };
    });
    this.setState({
      defaultAttributes: refacoredAttributes,
    });
  };

  // get right amount for selected currency
  filteredPrice = () => {
    const price = this.props?.product?.prices.filter(
      (price) =>
        price.currency.symbol === this.props.currencies.selectedCurrency.symbol
    );
    return price[0].amount;
  };

  selectAttribute = (id, value) => {
    const selectAttributes = { ...this.state.defaultAttributes };
    selectAttributes[id].selectedValue = value;
    this.setState({
      defaultAttributes: selectAttributes,
    });
    
  };

  validateProduct = (item) => {
    const itemCopy = { ...item };
    //if product has no attributes add it to cart
    if (itemCopy.attributes.length === 0) {
      this.props.addToCart(itemCopy);
    } else {
      //check if all attriubutes are selected
      let isSelected = true;

      for (const value in this.state.defaultAttributes) {
        if (this.state.defaultAttributes[value].selectedValue === null) {
          isSelected = false;
          this.setState({
            error: true,
          });
        }
      }
      if (isSelected) {
        this.setState({
          error: false,
        });
        const refacoredAttributes = [];
        const attributes = itemCopy.attributes;
        attributes.forEach((element) => {
          element = {
            type: element.type,
            selectedValue:
              this.state.defaultAttributes[element.id].selectedValue,
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
    }
  };

  render() {
    if (!this.props?.product) {
      return <Spinner />;
    }
    return (
      <div className="product-page__page-wrapper">
        <Gallery gallery={this.props.product.gallery} />
        <div className="product-page__description-wrapper">
          <h1 className="product-page__description-wrapper__title">
            {this.props.product.name && getTitle(this.props.product.name)}
          </h1>
          <p className="product-page__description-wrapper__sub-title">
            {this.props.product.name && getSubTitle(this.props.product.name)}
          </p>

          {this.props.product.attributes &&
            this.props.product.attributes.map((attribute) => (
              <div
                key={attribute.id}
                className="product-page__description-wrapper__attributes"
              >
                <p className="product-page__description-wrapper__attribute-title">
                  {attribute.name.toUpperCase()}:
                </p>
                <div className="product-page__description-wrapper__attributes-wrapper">
                  {attribute.type === "text" &&
                    attribute?.items &&
                    attribute?.items.map((item) => (
                      <div
                        onClick={() => {
                          this.selectAttribute(attribute.id, item.value);
                        }}
                        key={item.id}
                        className={`product-page__description-wrapper__attribute--text attribute${
                          this.state.defaultAttributes[attribute.id]
                            ?.selectedValue === item.value
                            ? " active"
                            : ""
                        }`}
                      >
                        {item.value}
                      </div>
                    ))}
                  {attribute.type === "swatch" &&
                    attribute?.items &&
                    attribute?.items.map((item) => (
                      <div
                        onClick={() => {
                          this.selectAttribute(attribute.id, item.value);
                        }}
                        key={item.id}
                        style={{ backgroundColor: `${item.value}` }}
                        className={`product-page__description-wrapper__attribute--swatch attribute${
                          this.state.defaultAttributes[attribute.id]
                            ?.selectedValue === item.value
                            ? " active"
                            : ""
                        }`}
                      ></div>
                    ))}
                </div>
              </div>
            ))}
          <div className="product-page__description-wrapper__price-wrapper">
            <p className="product-page__description-wrapper__attribute-title">
              PRICE:
            </p>
            <p className="product-page__description-wrapper__attribute-title__price">
              <span>{this.props.currencies.selectedCurrency.symbol} </span>
              {this.props.product.prices && this.filteredPrice()}
            </p>
          </div>
          <div>
            {this.state.error === true && (
              <p className="error-message">Please select all options</p>
            )}
            {this.props.product.inStock && (
              <button
                onClick={() => {
                  this.validateProduct(this.props.product);
                }}
                className="product-page__description-wrapper__add-to-cart-btn"
              >
                ADD TO CART
              </button>
            )}
            {!this.props.product.inStock && (
              <h4 className="product-page__description-wrapper__out-of-stock">
                We are sorry! Item currently out of Stock.
              </h4>
            )}
          </div>

          <div className="product-page__description-wrapper__product-description">
            {parse(`${this.props?.product?.description}`)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    product: state?.products?.item?.product,
    currencies: state.currencies,
    cart: state,
    message: state,
  }),
  {
    fetchProduct,
    addToCart,
    showMessage,
    hideMessage,
  }
)(ProductPage);
