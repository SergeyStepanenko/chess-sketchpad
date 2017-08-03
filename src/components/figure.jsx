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
			handleDragEnd,
			quantity,
		} = this.props;

		return (
			<div className='figure-block'>
				{
					(quantity !== 0) && (
						<img
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
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
	id: PropTypes.string,
	handleDragStart: PropTypes.func,
	handleDragEnd: PropTypes.func,
	quantity: PropTypes.number,
};

export default Figure;
