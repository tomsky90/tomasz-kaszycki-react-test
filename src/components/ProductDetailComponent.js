import React,{ Component } from "react";
//icons
import cartIcon from '../icons/Empty Cart.png'

class ProductDetailComponent extends Component {
    constructor(props) {
        super(props);
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
                    <p className="product-detail-component__price-container">{this.props.item?.prices?.[0]?.currency?.symbol}{this.props.item?.prices?.[0].amount}</p>

                </div>
                {console.log(this.props.item)}
            </div>
        )
    }
}

export default ProductDetailComponent