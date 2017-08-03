import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { UPDATE_CELL_ADD, UPDATE_CELL_REMOVE } from '../constants/constants';

class Cell extends Component {
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
		} = this.props;

		if (!onDrag) {
			return;
		}

		handleDragEnd();
		handleUpdateCell({variant: UPDATE_CELL_ADD, id, activeFigure});

		if ((activeFigure === 'kingB' &&  this.props.figures.kingB.quantity === 1) || (activeFigure === 'kingW' && this.props.figures.kingW.quantity === 1)) {
			removeKing(activeFigure);
		}

		this.handleRestoreKing();
	}

	handleRestoreKing = () => {
		setTimeout(() => {
			const { restoreKing, cells } = this.props;
			const arr = [];
			Object.keys(cells).map(id => (cells[id].figureId !== null) ? arr.push(cells[id].figureId) : '');

			if (this.props.figures.kingB.quantity === 0 && arr.indexOf('kingB') === -1) {
				restoreKing('kingB');
			}
			if (this.props.figures.kingW.quantity === 0 && arr.indexOf('kingW') === -1) {
				restoreKing('kingW');
			}
		}, 0);
	}

	handleDrag = () => {
		if (this.state.hide) return;

		this.setState({hide: true});
	}

	handleDragStart = (e) => {
		const { handleDragStart } = this.props;

		handleDragStart(e);
	}

	handleDragEnd = (e) => {
		const { handleUpdateCell, id } = this.props;

		this.handleRestoreKing();
		handleUpdateCell({variant: UPDATE_CELL_REMOVE, id, e});
		this.setState({hide: false});
	}

	render() {
		const {
			id,
			empty,
			figureId,
			white,
			figures,
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
						onDragStart={this.handleDragStart}
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

export default Cell;
