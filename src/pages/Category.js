import React, { Component } from "react";
//redux
import { fetchProducts } from "../actions/productActions";
import { connect } from "react-redux";
//components
import ProductDetailComponent from "../components/productDetail/ProductDetailComponent";
import Spinner from "../components/spinner/Spinner";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProducts(this.props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.props.fetchProducts(this.props.match.params.name);
    }
  }

  render() {
    if(!this.props.products) {
      return (
        <Spinner/>
      )
    }
    return (
      <section className="category-page-wrapper">
        <div className="category-page-wrapper__title-wrapper">
          <h1>{this.props.match.params.name.toUpperCase()}</h1>
        </div>

        <div className="category-page-wrapper__items-wrapper">
          {this.props.products &&
            this.props.products.map((item) => (
              <ProductDetailComponent item={item} key={item.id} />
            ))}
        </div>
      </section>
    );
  }
}

export default connect(
  (state) => ({ products: state.products.items?.category?.products }),
  {
    fetchProducts,
  }
)(CategoryPage);
