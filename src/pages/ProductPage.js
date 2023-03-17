import React, { Component } from "react";
import { fetchProduct } from "../actions/productActions";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartAction";
import { showMessage, hideMessage } from "../actions/messageAction";
//componnents
import Gallery from "../components/gallery/Gallery";
import Spinner from "../components/spinner/Spinner";
import ProductPageItem from "../components/productPageItem/ProductPageItem";
//HOC
import withParams from "../HOC/WithParams";

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
    this.props.fetchProduct(this.props.params.id);
    this.setDefaultAttribute();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.attributes !== undefined &&
      this.props.attributes !== prevProps.attributes
    ) {
      if (this.props.attributes !== prevProps.attributes) {
        this.setDefaultAttribute();
      }
    }
  }

  setDefaultAttribute = () => {
    const refacoredAttributes = {};
    this.props.product?.attributes.forEach((element) => {
      refacoredAttributes[element.id] = {
        type: element.type,
        selectedValue: null,
        element: element.id,
      };
    });
    this.setState({
      defaultAttributes: refacoredAttributes,
    });
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
        <ProductPageItem
          product={this.props.product}
          defaultAttributes={this.state.defaultAttributes}
          selectAttribute={this.selectAttribute}
          currencies={this.props.currencies}
          error={this.state.error}
          validateProduct={this.validateProduct}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    attributes: state?.products?.item?.product?.attributes,
    product: state?.products?.item?.product,
    currencies: state.currencies,
    message: state,
  }),
  {
    fetchProduct,
    addToCart,
    showMessage,
    hideMessage,
  }
)(withParams(ProductPage));
