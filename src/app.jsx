import React, { Component } from 'react';

import Cell from './components/cell.jsx';
import Figure from './components/figure.jsx';
import LeftIndexes from './components/left-indexes.jsx';
import TopIndexes from './components/top-indexes.jsx';
import state from './assets/source.js';
import '../styles/index.scss';

import {
	UPDATE_VARIANT_ADD,
	UPDATE_VARIANT_REMOVE,
} from './constants/constants.js';

export default class App extends Component {
	constructor() {
		super();

		this.state = state;
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


	handleDragEnd = (e) => {
		this.setState({
			onDrag: false,
			activeFigure: null,
		});
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
				id="container"
				>
				<div className='figures-container'>
					<div className='chess-figures'
						>
						{ figureIds.map((figureId, index) => <Figure
							{...figures[figureId]}
							key={index}
							id={figureId}
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
										handleDragStart={this.handleDragStart}
										handleUpdateCell={this.handleUpdateCell}
										handleCellDrag={this.handleCellDrag}
										{...cells[cellId]}
									/>
								);
							}) }
						</div>
					<TopIndexes />
				</div>
			</div>
		);
	}
}
