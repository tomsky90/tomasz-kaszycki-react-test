import React,{ Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
//icons
import cartIcon from '../../icons/Empty Cart white.png';
//redux
import { addToCart } from "../../actions/cartAction";
//utilitys
import { showMessage } from "../../utility";


class ProductDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            price: '',
            
        }
    }

    componentDidMount() {
        this.filteredPrice()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currencies.selectedCurrency.symbol !== this.props.currencies.selectedCurrency.symbol) {
            this.filteredPrice()
        }
    }

    
    // get right amount for selected currency
    filteredPrice = () => {
        const price = this.props.item?.prices?.filter(price => price.currency.symbol === this.props.currencies.selectedCurrency.symbol)
        this.setState({
            price: price[0].amount
        })
    }

    //check if product has attributes if so select default and push to cart
    validateProduct = (item) => {
        const itemCopy = {...item}
        if(itemCopy.attributes.length === 0) {
            this.props.addToCart(itemCopy)
            showMessage(`${item.name} added to cart!`)
        } else {
            const refacoredAttributes = [];
            const attributes =  itemCopy.attributes;
            attributes.forEach(element => {
                element =  {
                    type: element.type,
                    selectedValue: element.items[0].value,
                    element: element.id,
                    items: element.items
                };
                refacoredAttributes.push(element)
            
               });
               itemCopy.attributes = refacoredAttributes
               this.props.addToCart(itemCopy)
               showMessage(`${item.name} added to cart!`)
        }
        
    }
    render() {
        return (
            <div className="product-detail-component">
                <Link to={`/${this.props.products?.items?.category?.name}/${this.props.item.id}`}>
                <div className="product-detail-component__img-wrapper">
                    {!this.props.item.inStock && <div className="product-detail-component__out-of-stock-img-cover" style={{color: '#8D8F9A'}}><p>OUT OF STOCK</p></div>}
                    
                    <img src={this.props.item?.gallery[0]} alt=''/>
                    
                   
                </div>
                
                <div className= {this.props.item.inStock ? 'product-detail-component__text-container' : 'product-detail-component__text-container out-of-stock'}>
                    <p>{this.props.item.name}</p> 
                    <p className="product-detail-component__price-container">
                        {this.props.currencies.selectedCurrency.symbol} {this.state.price}
                    </p>

                </div>
                </Link>
                { this.props.item.inStock &&<div onClick={() => {this.validateProduct(this.props.item)}} className="product-detail-component__img-wrapper__cart-icon">
                        <img src={cartIcon} alt=''/>
                    </div>} 
                
            </div>
        )
    }
}

export default connect(
    (state) => ({ currencies: state.currencies, products: state.products, cart: state}),
    {
        addToCart
    }
  )(ProductDetailComponent);
