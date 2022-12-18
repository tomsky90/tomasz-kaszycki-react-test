import React, { Component } from "react";

class AttributesComponent extends Component {
    constructor(props) {
        super(props)
    
    }

    componentDidMount() {}
    

    
    

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.email != undefined && this.props.email !== prevProps.email) {
    //       // Do what you want with email
    //     }
    //   }

    render() {
        return(
            <div>
                  {this.props.props.products?.item?.product?.attributes !== undefined && this.props.props.products?.item?.product?.attributes.map(attribute => (
                        <div key={attribute.id} className="product-page__description-wrapper__attributes">
                            <p className="product-page__description-wrapper__attribute-title">
                                {attribute.name.toUpperCase()}:
                            </p>
                            <div className="product-page__description-wrapper__attributes-wrapper">
                                 {attribute.type === 'text' && attribute?.items && attribute?.items.map((item) => (
                                  <div 
                                    onClick={() => {this.selectAttribute(attribute.id, attribute.type, item.value)}} 
                                    key={item.id} 
                                    // className={this.state.attributes.id.id === attribute.id && this.state.attributes.id.type === attribute.type && this.state.attributes.id.value === item.value ? 'product-page__description-wrapper__attribute--text active' : 'product-page__description-wrapper__attribute--text'}
                                    >
                                    
                                    {/* {console.log(this.state.attributes.id)} */}
                                    {/* {console.log(attribute.id)} */}
                                      {item.value}
                                 </div>
                                 ))}
                                {attribute.type === 'swatch' && attribute?.items && attribute?.items.map(item => (
                                    <div onClick={() => {this.selectAttribute(attribute.type, item.value)}} key={item.id} style={{backgroundColor: `${item.value}`}} className="product-page__description-wrapper__attribute--swatch">
                                    </div>
                                    
                                 ))}
                            </div>
                        
                        </div>
                    ))}
            </div>
        )
    }
}

export default AttributesComponent