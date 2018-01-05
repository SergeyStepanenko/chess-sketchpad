import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Figure extends Component {
	render() {
		const {
			imageSrc,
			id,
			handleDragStart,
			handleDragEnd,
			quantity,
		} = this.props;

		const figureImg = quantity !== 0 ? (
			<img
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				id={id}
				className='chessFigureSmall'
				src={imageSrc}
			/>
		) : null;

		return (
			<div className='figure-block'>
				{figureImg}
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
