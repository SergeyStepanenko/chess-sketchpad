import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
		);
	}
}

Figure.propTypes = {
	imageSrc: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	handleDragStart: PropTypes.func.isRequired,
};

export default Figure;
