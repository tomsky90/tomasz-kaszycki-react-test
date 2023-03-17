import React, { Component } from "react";
//redux
import { fetchProducts } from "../actions/productActions";
import { connect } from "react-redux";
//components
import ProductDetailComponent from "../components/productDetail/ProductDetailComponent";
import Spinner from "../components/spinner/Spinner";
//hoc
import withParams from "../HOC/WithParams";

class CategoryPage extends Component {

  componentDidMount() {
    this.props.fetchProducts(this.props.params.name);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.name !== this.props.params.name) {
      this.props.fetchProducts(this.props.params.name);
    }
  }

  render() {
    const { products } = this.props
    if(!products) {
      return (
        <Spinner/>
      )
    }
    return (
      <section className="category-page-wrapper">
        <div className="category-page-wrapper__title-wrapper">
          <h1>{this.props.params.name.toUpperCase()}</h1>
        </div>

        <div className="category-page-wrapper__items-wrapper">
          {products &&
            products.map((item) => (
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
)(withParams(CategoryPage));
