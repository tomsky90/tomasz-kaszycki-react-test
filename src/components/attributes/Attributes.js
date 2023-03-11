import React, { PureComponent } from "react";

class Attributes extends PureComponent {
  render() {
    const { attr } = this.props;
    return (
      <div key={attr.element} className="cart-page__attribute">
        <p>{attr.element}:</p>
        <div className="cart-page__attribute__description__attributes-wrapper">
          {attr.type === "text" &&
            attr.items &&
            attr.items.map((item) => (
              <div
                key={item.value}
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
                key={item.value}
                style={{ backgroundColor: `${item.value}` }}
                className={`cart-page__attribute__description__attribute--swatch attribute${
                  attr.selectedValue === item.value ? " active" : ""
                }`}
              ></div>
            ))}
        </div>
      </div>
    );
  }
}

export default Attributes;
