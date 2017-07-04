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
			quantity,
		} = this.props;
// console.log(id, quantity);
		return (
			<div className='figure-container'>
				{
					(quantity !== 0) && (
						<img
						onDragStart={handleDragStart}
						id={id}
						className='chessFigureSmall'
						src={imageSrc}
					/>)
				}
			</div>
		);
	}
}

Figure.propTypes = {
	imageSrc: PropTypes.string,
	id: PropTypes.string.isRequired,
	handleDragStart: PropTypes.func.isRequired,
	quantity: PropTypes.number,
};

export default Figure;
