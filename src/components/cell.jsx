import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UPDATE_CELL_ADD, UPDATE_CELL_REMOVE } from '../constants/constants';

export default class Cell extends Component {
	state = {
		hide: false,
	}

	handleDrop = (e) => {
		e.dataTransfer.dropEffect = null;
		e.preventDefault();
		const {
			onDrag,
			handleDragEnd,
			removeKing,
			id,
			activeFigure,
			handleUpdateCell,
			figures
		} = this.props;

		if (!onDrag) return;

		handleUpdateCell({variant: UPDATE_CELL_ADD, id, activeFigure});

		if ((activeFigure === 'kingB' &&  figures.kingB.quantity === 1) ||
			(activeFigure === 'kingW' && figures.kingW.quantity === 1)) {
			removeKing(activeFigure);
			handleDragEnd();
		}

		this.checkKing();
	}

	handleDrag = () => {
		if (this.state.hide) return;

		this.setState({hide: true});
	}

	handleDragEnd = (e) => {
		const { handleUpdateCell, id, handleDragEnd } = this.props;

		this.checkKing();
		handleUpdateCell({variant: UPDATE_CELL_REMOVE, id, e});

		this.setState({hide: false});
		handleDragEnd();
	}

	checkKing = () => {
		setTimeout(() => {
			const { restoreKing, cells, figures } = this.props;
			const kings = [];

			Object.keys(cells).map(id => {
				let figure = cells[id].figureId;
				figure === 'kingB' || figure === 'kingW' ? kings.push(cells[id].figureId) : '';
			});

			if (figures.kingB.quantity === 0 && kings.indexOf('kingB') === -1) restoreKing('kingB');
			if (figures.kingW.quantity === 0 && kings.indexOf('kingW') === -1) restoreKing('kingW');
		}, 0);
	}

	render() {
		const {
			id,
			empty,
			figureId,
			white,
			figures,
			handleDragStart,
		} = this.props;

		return (
			<div
				id={id}
				className={(white) ? 'white' : 'black'}
				onDrop={this.handleDrop}
				onDragOver={(event) => event.preventDefault()}
				onDragEnter={(event) => event.preventDefault()}
				>
				{ !empty && (
					<img
						// onDragStart={this.handleDragStart}
						onDragStart={(e) => handleDragStart(e)}
						onDrag={this.handleDrag}
						onDragEnd={this.handleDragEnd}
						className='chessFigure'
						src={figures[figureId].imageSrc}
						id={figureId}
						style={{visibility: this.state.hide ? 'hidden' : 'visible'}}
					/>
				) }
			</div>
		);
	}
}

Cell.propTypes = {
	handleCellDrag: PropTypes.func,
	handleUpdateCell: PropTypes.func,
	handleDragStart: PropTypes.func,
	removeKing: PropTypes.func,
	restoreKing: PropTypes.func,
	id: PropTypes.string,
	activeFigure: PropTypes.string,
	figureId: PropTypes.string,
	figures: PropTypes.object,
	cells: PropTypes.object,
	onDrag: PropTypes.bool,
	empty: PropTypes.bool,
	white: PropTypes.bool,
	handleDragEnd: PropTypes.func,
};
