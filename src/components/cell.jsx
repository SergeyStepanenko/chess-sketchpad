import React, { Component } from 'react';

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

		// e.stopPropagation();
		handleUpdateCell({id, variant: UPDATE_VARIANT_ADD});
	}

	handleDrag = () => {
		if (this.state.hide) return;

		this.setState({hide: true});
	}

	handleDragStart = (event) => {
		const {
			handleCellDrag,
			handleUpdateCell,
			handleDragStart,
			id,
			figureId,
		} = this.props;

	// console.log(figures);
		handleDragStart(event);
	}

	handleDragEnd = () => {
		const {
			id,
			figureId,
			handleUpdateCell,
		} = this.props;

		handleUpdateCell({id, variant: UPDATE_VARIANT_REMOVE, figureId})
		this.setState({hide: false});
	}

	render() {
		const {
			id,
			empty,
			figureId,
			white,
			handleUpdateCell,
			src,
			handleMouseOver,
			handleDragStart,
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
		)
	}
}

export default Cell;
