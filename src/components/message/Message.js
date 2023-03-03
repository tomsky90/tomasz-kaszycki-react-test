import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Message extends PureComponent {
  render() {
    const { message, messageActive } = this.props.message
    return (
      <>
          <div className={messageActive ? 'message active' : 'message'}>
            <p>{message}</p>
          </div>
      </>
    );
  }
}

export default connect(
  (state) => ({
    message: state.message,
  }),
  {}
)(Message);
