import React, { Component } from "react";
import { fetchProduct } from "../actions/productActions";
import parse from 'html-react-parser';
import { connect } from "react-redux";
import { getTitle, getSubTitle } from "../utility";

class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: '',
            defaultAttributes: {},
        }
    }

    
    
     //set big img in gallery on load
     static getDerivedStateFromProps(props, state) {
        if(state.img === '' || state.img === undefined) {
            return state ={
                img: props.products.item?.product?.gallery[0],
            }
        }
        
       return null 
        
    }
 


    //fetch item data
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
        this.setDefaultAttribute()
    } 

    componentDidUpdate(prevProps) {
       
        if (this.props.products?.item?.product?.attributes !== undefined && this.props.products?.item?.product?.attributes !== prevProps.products?.item?.product?.attributes) {
            if(this.props.products?.item?.product?.attributes !== prevProps.products?.item?.product?.attributes) {
                this.setDefaultAttribute(this.props.products?.item?.product?.attributes)
            }
        }
      }

      

    setDefaultAttribute = () => {
        const refacoredAttributes = {}
        let elementId = ''
        this.props.products.item?.product?.attributes.forEach(element => {
        elementId = element.id
        refacoredAttributes[elementId] = {
            type: element.type,
            selectedValue: null,
            element: element.id
        }
    
       });

       this.setState({
        defaultAttributes: refacoredAttributes
       })
    
    }



    //set  big img in gallery on click
    setImgSrc = (e) => {
        this.setState({
            img: e.target.src,
        })
        
    }

    // get right amount for selected currency
    filteredPrice = () => {
        const price = this.props?.products?.item?.product?.prices.filter(price => price.currency.symbol === this.props.currencies.selectedCurrency.symbol)
        return price[0].amount
    }


    selectAttribute = (id, value) => {
       const selectAttributes =  {...this.state.defaultAttributes};
       selectAttributes[id].selectedValue = value;

       this.setState({
        defaultAttributes: selectAttributes
       })
    }

    

    render() {
        
        return(
            <div className="product-page__page-wrapper">
                <div className="product-page gallery-wrapper">
                    <div className="gallery-wrapper__thumbnails">
                        {this.props?.products?.item?.product.gallery.map(img => 
                            (<div key={img} onClick={(e) => {this.setImgSrc(e)}} className="gallery-wrapper__thumbnails__img-wrapper">
                                <img src={img} alt=''/>
                            </div>))}
                    </div>
                    <div className="gallery-wrapper__big-img-wrapper">
                        <img src={this.state.img} alt=""/>
                    </div>
                </div>
                <div className="product-page__description-wrapper">
                    <h1 className="product-page__description-wrapper__title">
                        {this.props?.products?.item?.product?.name && getTitle(this.props?.products?.item?.product?.name)}
                    </h1>
                    <p className="product-page__description-wrapper__sub-title">
                        {this.props?.products?.item?.product?.name && getSubTitle(this.props?.products?.item?.product?.name)}
                    </p>
                    
                    {this.props?.products?.item?.product?.attributes && this.props?.products?.item?.product?.attributes.map(attribute => (
                        <div key={attribute.id} className="product-page__description-wrapper__attributes">
                            <p className="product-page__description-wrapper__attribute-title">
                                {attribute.name.toUpperCase()}:
                            </p>
                            <div className="product-page__description-wrapper__attributes-wrapper">
                                 {attribute.type === 'text' && attribute?.items && attribute?.items.map((item) => (
                                  <div 
                                    onClick={() => {this.selectAttribute(attribute.id, item.value)}} 
                                    key={item.id} 
                                    className={`product-page__description-wrapper__attribute--text attribute${this.state.defaultAttributes[attribute.id]?.selectedValue === item.value ? ' active': ''}`}
                                    >
                                      {item.value}
                                 </div>
                                 ))}
                                {attribute.type === 'swatch' && attribute?.items && attribute?.items.map(item => (
                                    <div 
                                        onClick={() => {this.selectAttribute(attribute.id, item.value)}} key={item.id} style={{backgroundColor: `${item.value}`}} 
                                        className={`product-page__description-wrapper__attribute--swatch attribute${this.state.defaultAttributes[attribute.id]?.selectedValue === item.value ? ' active': ''}`}>
                                        
                                    </div>
                                   
                                 ))}
                            </div>
                            
                        </div>
                    ))}
                    <div className="product-page__description-wrapper__price-wrapper">
                        <p className="product-page__description-wrapper__attribute-title">PRICE:</p>
                        <p className="product-page__description-wrapper__attribute-title__price">
                            <span>{this.props.currencies.selectedCurrency.symbol} </span>
                            {this.props?.products?.item?.product?.prices && this.filteredPrice()}
                        </p>
                    </div>

                    {this.props?.products?.item?.product?.inStock && <button className="product-page__description-wrapper__add-to-cart-btn">ADD TO CART</button>}
                    {!this.props?.products?.item?.product?.inStock && <h4 className="product-page__description-wrapper__out-of-stock">We are sorry! Item currently out of Stock.</h4>}

                    <div className="product-page__description-wrapper__product-description">
                        {parse(`${this.props?.products?.item?.product?.description}`)}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({ products: state.products, currencies: state.currencies}),
    {
      fetchProduct,
    }
  )(ProductPage);