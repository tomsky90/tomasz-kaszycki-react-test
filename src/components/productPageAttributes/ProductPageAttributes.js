import React, { PureComponent } from 'react';

class ProductPageAttributes extends PureComponent {

  render() {
    return(
      <>
            {this.props.attributes.map((attribute) => (
              <div
                key={attribute.id}
                className="product-page__description-wrapper__attributes"
              >
                <p className="product-page__description-wrapper__attribute-title">
                  {attribute.name.toUpperCase()}:
                </p>
                <div className="product-page__description-wrapper__attributes-wrapper">
                  {attribute.type === "text" &&
                    attribute?.items &&
                    attribute?.items.map((item) => (
                      <div
                        onClick={() => {
                          this.props.selectAttribute(attribute.id, item.value);
                        }}
                        key={item.id}
                        className={`product-page__description-wrapper__attribute--text attribute${
                          this.props.defaultAttributes[attribute.id]
                            ?.selectedValue === item.value
                            ? " active"
                            : ""
                        }`}
                      >
                        {item.value}
                      </div>
                    ))}
                  {attribute.type === "swatch" &&
                    attribute?.items &&
                    attribute?.items.map((item) => (
                      <div
                        onClick={() => {
                          this.props.selectAttribute(attribute.id, item.value);
                        }}
                        key={item.id}
                        style={{ backgroundColor: `${item.value}` }}
                        className={`product-page__description-wrapper__attribute--swatch attribute${
                          this.props.defaultAttributes[attribute.id]
                            ?.selectedValue === item.value
                            ? " active"
                            : ""
                        }`}
                      ></div>
                    ))}
                </div>
              </div>
            ))}
      </>
    )
  }
}

export default ProductPageAttributes;