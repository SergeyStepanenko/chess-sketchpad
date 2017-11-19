import React, { Component } from 'react';

import Buttons from './components/buttons.jsx';
import Cell from './components/cell.jsx';
import Figure from './components/figure.jsx';
import LeftIndexes from './components/left-indexes.jsx';
import TopIndexes from './components/top-indexes.jsx';
import STATE from './assets/source.js';
import '../styles/index.scss';

import {
	UPDATE_VARIANT_ADD,
	UPDATE_VARIANT_REMOVE,
} from './constants/constants.js';

export default class App extends Component {
	constructor() {
		super();

		this.state = STATE;
	}

	resetState = () => {
		this.setState({
			cells: {
				...STATE.cells
			},
			figures: {
				...STATE.figures
			}
		});
	}

	updateStateFromFirebase = (state) => {
		this.setState({
			cells: {
				...state.cells
			},
			figures: {
				...state.figures
			}
		});
	}

	handleDragStart = (e) => {
		this.setState({
			onDrag: true,
			activeFigure: e.target.id,
		});
	}

	handleCellDrag = (id) => {
		this.setState({
			onDrag: true,
			activeFigure: id,
		});
	}

	handleDragEnd = () => {
		this.setState({
			onDrag: false,
			activeFigure: null,
		});
	}

	restoreKing = () => {
		const obj = this.state.cells;
		const arr = [];

		for (const x in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, x)) {
				arr.push(obj[x].figureId);
			}
		}

		if (arr.indexOf('kingB') == -1) {
			this.setState({
				figures: {
					...this.state.figures,
					kingB: {
						id: 'kingB',
						imageSrc: this.state.figures.kingB.imageSrc,
						quantity: 1,
					},
				},
			});
		}

		if (arr.indexOf('kingW') == -1) {
			this.setState({
				figures: {
					...this.state.figures,
					kingW: {
						id: 'kingW',
						imageSrc: this.state.figures.kingW.imageSrc,
						quantity: 1,
					},
				},
			});
		}
	}

	handleUpdateCell = ({id, variant, figureId}) => {
		const {
			cells,
			activeFigure,
		} = this.state;

		const cell = cells[id];

		switch (variant) {
		case UPDATE_VARIANT_ADD: {
			this.setState({
				cells: {
					...cells,
					[id]: {
						...cell,
						figureId: activeFigure,
						empty: false,
					},
				},
				onDrag: false,
				activeFigure: null,
			}, () => {
				this.restoreKing();
			});

			return;
		}

		case UPDATE_VARIANT_REMOVE: {
			this.setState({
				cells: {
					...cells,
					[id]: {
						...cell,
						figureId: null,
						empty: true,
					},
				},
				activeFigure: figureId,
			}, () => {
				this.restoreKing();
			});

			return;
		}
		}
	}

	render() {
		const {
			figureIds,
			figures,
			cellIds,
			cells,
			onDrag,
		} = this.state;

		return (
			<div
				className="container-wrapper"
				>
				<div className='figures-container'>
					<div className='chess-figures'
						>
						{ figureIds.map((figureId, index) =>
							<Figure
								{...figures[figureId]}
								key={index}
								id={figureId}
								quantity={figures[figureId].quantity}
								handleDragStart={this.handleDragStart}
								imageSrc={figures[figureId].imageSrc}/>)
						}
					</div>
				</div>
				<div className='board-container'>
					<LeftIndexes/>
						<div className="board"
							onDragEnd={this.handleDragEnd}
							onDragOver={this.handleDragOver}
							>
							{ cellIds.map((cellId, index) => {
								return (
									<Cell
										key={index}
										onDrag={onDrag}
										activeFigure={this.state.activeFigure}
										handleDragStart={this.handleDragStart}
										handleUpdateCell={this.handleUpdateCell}
										handleCellDrag={this.handleCellDrag}
										figures={this.state.figures}
										{...cells[cellId]}
									/>
								);
							}) }
						</div>
					<TopIndexes />
				</div>
				<Buttons
					updateState={this.updateStateFromFirebase}
					resetState={this.resetState}
					state={this.state}
				/>
			</div>
		);
	}
}
