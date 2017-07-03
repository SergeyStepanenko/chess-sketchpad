import React, { Component } from 'react';
import App from '../app.jsx';

class Figure extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      imageSrc,
      id,
      handleDragStart,
    } = this.props;

    return (
      <div className='figure-container'>
        <img onDragStart={handleDragStart} onDragEnd={this.dragEnd} id={id} className='chessFigureSmall' src={imageSrc}></img>
      </div>
  )}
}

export default Figure;
