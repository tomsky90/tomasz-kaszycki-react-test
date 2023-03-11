import React, { PureComponent } from "react";

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgBig: "",
    };
  }
  componentDidMount() {
    this.setState({
      imgBig: this.props.gallery[0],
    });
  }

  setImgBig = (img) => {
    this.setState({
      imgBig: img,
    });
  };

  render() {
    return (
      <div className="product-page gallery-wrapper">
        <div className="gallery-wrapper__thumbnails">
          {this.props.gallery.map((img) => (
            <div
              className="gallery-wrapper__thumbnails__img-wrapper"
              key={img}
              onClick={() => {
                this.setImgBig(img);
              }}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
        <div className="gallery-wrapper__big-img-wrapper">
          <img src={this.state.imgBig} alt="" />
        </div>
      </div>
    );
  }
}

export default Gallery;
