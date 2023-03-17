import React, { PureComponent } from "react";
//imgs
import prevBtn from "../../icons/prevBtn.png";
import nextBtn from "../../icons/nextBtn.png";

class Slider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  setPrevGalleryImg(item) {
    if (this.state.index === 0) {
      this.setState({
        index: item.gallery.length - 1,
        sliderImg: this.props.item.gallery[this.state.index],
      });
    } else {
      this.setState({
        index: this.state.index - 1,
        sliderImg: this.props.item.gallery[this.state.index],
      });
    }
  }

  setNextGalleryImg(item) {
    if (item.gallery.length - 1 <= this.state.index) {
      this.setState({
        index: 0,
        sliderImg: this.props.item.gallery[this.state.index],
      });
    } else {
      this.setState({
        index: this.state.index + 1,
        sliderImg: this.props.item.gallery[this.state.index],
      });
    }
  }
  render() {
    const { item, cartItems, index, upCartItemByOne, minusCartItemByOne } =
      this.props;
    return (
      <div className="cart-page-item-gallery">
        <div className="cart-page-item-gallery__qty-btns">
          <button
            className="cart-page-item-gallery__qty-btns__add"
            onClick={() => {
              upCartItemByOne(item);
            }}
          >
            +
          </button>
          {!cartItems[index].qty ? 0 : <p>{cartItems[index].qty}</p>}
          <button
            className="cart-page-item-gallery__qty-btns__take-away"
            onClick={() => {
              minusCartItemByOne(item);
            }}
          >
            -
          </button>
        </div>
        <div className="cart-page-item-gallery__img-wrapper">
          <img src={item.gallery[this.state.index]} alt={`${item.name}`} />
          <div className="cart-page-item-gallery__img-wrapper__btns-wrapper">
            <button
              className="cart-page-item-gallery__img-wrapper__btns-wrapper__img__prev-btn "
              onClick={() => {
                this.setPrevGalleryImg(item);
              }}
            >
              <img className="btn-icon icon" alt="previuse" src={prevBtn} />
            </button>
            <button
              className="cart-page-item-gallery__img-wrapper__btns-wrapper__img__next-btn"
              onClick={() => {
                this.setNextGalleryImg(item);
              }}
            >
              <img className="btn-icon icon" alt="next" src={nextBtn} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
