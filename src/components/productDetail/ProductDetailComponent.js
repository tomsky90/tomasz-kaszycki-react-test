import React,{ Component } from "react";
import { connect } from "react-redux";
//icons
import cartIcon from '../../icons/Empty Cart white.png'

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
    render() {
        return (
            <div className="product-detail-component">
                <div className="product-detail-component__img-wrapper">
                    {!this.props.item.inStock && <div className="product-detail-component__out-of-stock-img-cover"><p>OUT OF STOCK</p></div>}
                    <img src={this.props.item?.gallery[0]}/>
                    { this.props.item.inStock &&<div className="product-detail-component__img-wrapper__cart-icon">
                        <img src={cartIcon}/>
                    </div>}
                </div>
                
                <div className="product-detail-component__text-container">
                    <p>{this.props.item.name}</p>
                    <p className="product-detail-component__price-container">{this.props.item?.prices?.[0]?.currency?.symbol}{this.state.price}</p>

                </div>
                
            </div>
        )
    }
}

export default connect(
    (state) => ({ currencies: state.currencies}),
    {
    }
  )(ProductDetailComponent);
