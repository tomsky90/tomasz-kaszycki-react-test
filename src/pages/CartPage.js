import React, { Component } from "react";
//redux
import { connect } from "react-redux";
import { upCartItemByOne, minusCartItemByOne } from "../actions/cartAction";
//helpers
import { getTitle, getSubTitle, getPrice} from "../utility";
//imgs
import prevBtn from '../icons/prevBtn.png';
import nextBtn from '../icons/nextBtn.png';
//components
import Spinner from "../components/spinner/Spinner";



class CartPage extends Component {
  constructor(props) {
    super(props)
  }

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
           {cartItems.map((item,index) => (
            <div className="cart-page__cart-item" key={`${item.id}${index}`}>
              <div className="cart-page__cart-item__description">
                <p className="cart-page__cart-item__description__title">{getTitle(item.name)}</p>
                <p className="cart-page__cart-item__description__sub-title">{getSubTitle(item.name)}</p>
                <p className="cart-page__cart-item__description__price">
                  <span>{selectedCurrency.symbol}</span>{" "}
                  {getPrice(item.prices, selectedCurrency?.symbol)}
                </p>
                {item.attributes.map((attr) => (
                  <div key={attr.element} className="cart-page__attribute">
                    <p>{attr.element}:</p>
                    <div className="cart-page__attribute__description__attributes-wrapper">
                      {attr.type === "text" &&
                        attr.items &&
                        attr.items.map((item) => (
                          <div
                            key={item.id}
                            className={`cart-page__attribute__description__attribute--text attribute${
                              attr.selectedValue === item.value ? " active" : ""
                            }`}
                          >
                            {item.value}
                          </div>
                        ))}
                      {attr.type === "swatch" &&
                        attr.items &&
                        attr.items.map((item) => (
                          <div
                            key={item.id}
                            style={{ backgroundColor: `${item.value}` }}
                            className={`cart-page__attribute__description__attribute--swatch attribute${
                              attr.selectedValue === item.value ? " active" : ""
                            }`}
                          >
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-page-item-gallery">
                <div className="cart-page-item-gallery__qty-btns">
                    <button className="cart-page-item-gallery__qty-btns__add" onClick={() => {this.props.upCartItemByOne(item)}}>+</button>
                    {!this.props.cart.cart.cartItems[index].qty ? 0 : <p>{this.props.cart.cart.cartItems[index].qty}</p>}
                    <button className="cart-page-item-gallery__qty-btns__take-away" onClick={() =>{this.props.minusCartItemByOne(item)}}>-</button>
                </div>
                <div className="cart-page-item-gallery__img-wrapper">
                    <img id="0" src={item.gallery[0]} alt={`${item.name}`}/>
                    <div className="cart-page-item-gallery__img-wrapper__btns-wrapper">
                      <button onClick={(e)=> {this.setPrevGalleryImg(e, item)}} className="cart-page-item-gallery__img-wrapper__btns-wrapper__img__prev-btn " > <img className="btn-icon icon" alt="previuse" src={prevBtn}/> </button>
                      <button onClick={(e)=> {this.setNextGalleryImg(e, item)}} className="cart-page-item-gallery__img-wrapper__btns-wrapper__img__next-btn"> <img className="btn-icon icon" alt="next" src={nextBtn}/> </button>
                    </div>
                </div>
              </div>
            </div>
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
  