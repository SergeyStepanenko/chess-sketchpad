import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	UPDATE_VARIANT_ADD,
	UPDATE_VARIANT_REMOVE,
} from '../constants/constants.js';

import state from '../assets/source.js';

class Cell extends Component {
	state = {
		hide: false,
	}

	handleMouseOver = (event) => {
		event.dataTransfer.dropEffect = null;
		event.preventDefault();

		const {
			onDrag,
			handleUpdateCell,
			id,
		} = this.props;

		if (!onDrag) {
			return;
		}

		handleUpdateCell({id, variant: UPDATE_VARIANT_ADD});
	}

	handleDrag = () => {
		if (this.state.hide) return;

		this.setState({hide: true});
	}

	handleDragStart = (event) => {
		const {
			handleDragStart,
		} = this.props;

		handleDragStart(event);
	}

	handleDragEnd = () => {
		const {
			id,
			figureId,
			handleUpdateCell,
		} = this.props;

		handleUpdateCell({id, variant: UPDATE_VARIANT_REMOVE, figureId});
		this.setState({hide: false});
	}

	render() {
		const {
			id,
			empty,
			figureId,
			white,
		} = this.props;
		return (
			<div
				id={id}
				className={(white) ? 'white' : 'black'}
				onDrop={this.handleMouseOver}
				onDragOver={(event) =>  event.preventDefault()}
				onDragEnter={(event) =>  event.preventDefault()}
				>
				{ !empty && (
					<img
						onDragStart={this.handleDragStart}
						onDrag={this.handleDrag}
						onDragEnd={this.handleDragEnd}
						className='chessFigure'
						src={state.figures[figureId].imageSrc}
						id={figureId}
						style={{visibility: this.state.hide ? 'hidden' : 'visible'}}
						/>
				) }
			</div>
		);
	}
}

Cell.propTypes = {
	handleCellDrag: PropTypes.func.isRequired,
	handleUpdateCell: PropTypes.func.isRequired,
	handleDragStart: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	figureId: PropTypes.string,
	onDrag: PropTypes.bool.isRequired,
	empty: PropTypes.bool.isRequired,
	white: PropTypes.bool.isRequired,
};


export default Cell;
