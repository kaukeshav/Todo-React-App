import React, { Component } from 'react';

class AddButton extends Component {
  state = {};
  render() {
    return (
      <div className="add-button">
        <button onClick={this.props.toggleModal}>
          <span>&#43;</span>
        </button>
      </div>
    );
  }
}

export default AddButton;
