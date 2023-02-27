import React, { Component } from "react";
//redux
import { connect } from "react-redux";
import { upCartItemByOne, minusCartItemByOne } from "../actions/cartAction";
//helpers
import { getPrice} from "../utility";
//components
import CartItem from '../components/Cart Item/CartItem';
import Spinner from "../components/spinner/Spinner";



class CartPage extends Component {
 

  setPrevGalleryImg(event, item) {
    //get img id
    let index =  event.target.parentNode.parentNode.parentNode.firstChild.getAttribute('id');
    if( index < 1) {
      return
    } else {
      index--
      event.target.parentNode.parentNode.parentNode.firstChild.setAttribute("src", `${item.gallery[index]}`);
      event.target.parentNode.parentNode.parentNode.firstChild.setAttribute("id", index);
    }
  }

  setNextGalleryImg(event, item) {
    //get img id
    let index =  event.target.parentNode.parentNode.parentNode.firstChild.getAttribute('id');
    if( item.gallery.length -1 <= index) {
      return
    } else {
      index++
      event.target.parentNode.parentNode.parentNode.firstChild.setAttribute("src", `${item.gallery[index]}`);
      event.target.parentNode.parentNode.parentNode.firstChild.setAttribute("id", index);
    }
  }


  totalItemsInCart = () => {
    let total = null;
    this.props.cart.cart.cartItems.forEach((element) => {
      total += element.qty;
    });
    return total;
  };

  calculateTax = () => {
    let price = null;
    const tax = 21;
    this.props.cart.cart.cartItems.forEach(item => {
      price += getPrice(item.prices, this.props.currencies.selectedCurrency.symbol) * item.qty;
    })
    const taxValue = tax / 100 * price;
    return taxValue.toFixed(2)
  }

  calculateTotalPrice = () => {
    let price = null;
    const tax = 21;
    this.props.cart.cart.cartItems.forEach(item => {
      price += getPrice(item.prices, this.props.currencies.selectedCurrency.symbol) * item.qty;
    })
    const taxValue = tax / 100 * price;
    const totalPrice = price + taxValue
    return totalPrice.toFixed(2)
  }
  

  render() {

    const { cartItems } = this.props.cart.cart;
    const { selectedCurrency } = this.props.currencies;

    if(!cartItems) {
      return(
        <Spinner/>
      )
    }
    return(
        <div className="cart-page">
           <h1>CART</h1>
           {cartItems.map((item, index) => ( 
            <CartItem
              key={`${item.id}${index}`} 
              item={item} 
              index={index}
              cartItems={cartItems}
              selectedCurrency={selectedCurrency}
              upCartItemByOne={upCartItemByOne}
              minusCartItemByOne={minusCartItemByOne}
             />
          ))}
          {this.totalItemsInCart() > 0 ? (
            <div className="cart-page__cart-summary">
              <div className="cart-page__cart-summary__item-wrapper">
                <p className="cart-page__cart-summary__tax-price">Tax 21%: </p> <p className="cart-page__cart-summary__bold-font">{this.calculateTax()}</p>
              </div>
              <div className="cart-page__cart-summary__item-wrapper">
                <p className="cart-page__cart-summary__cart-qty">Quantity: </p> <p className="cart-page__cart-summary__bold-font">{this.totalItemsInCart()}</p>
              </div>
              <div className="cart-page__cart-summary__item-wrapper">
                <p className="cart-page__cart-summary__total-price">Total: </p> <p className="cart-page__cart-summary__bold-font">{this.calculateTotalPrice()}</p>
              </div>
              <button>ORDER</button>
          </div>
          ) : <p>Cart is Empty</p>}
          
          
        </div>
    )
  }
}


export default connect(
    (state) => ({ cart: state, currencies: state.currencies }),
    {
      upCartItemByOne,
      minusCartItemByOne
    }
  )(CartPage);
  