import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleDragStart, handleDragEnd, handleUpdateCell, removeKing, restoreKing } from '../actions';
import Buttons from '../components/buttons.jsx';
import Cell from '../components/cell.jsx';
import Figure from '../components/figure.jsx';
import LeftIndexes from '../components/left-indexes.jsx';
import TopIndexes from '../components/top-indexes.jsx';
import '../../styles/index.scss';

class App extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			figureIds,
			figures,
			cellIds,
			cells,
			onDrag,
			handleDragStart,
			handleDragEnd,
			handleUpdateCell,
			removeKing,
			restoreKing,
			activeFigure
		} = this.props;

		return (
			<div className="container-wrapper">
				<div className='figures-container'>
					<div className='chess-figures'>
						{ figureIds.map((figureId, index) =>
							<Figure
								{...figures[figureId]}
								key={index}
								id={figureId}
								quantity={figures[figureId].quantity}
								handleDragStart={handleDragStart}
								handleDragEnd={handleDragEnd}
								imageSrc={figures[figureId].imageSrc}
							/>) }
					</div>
				</div>
				<div className='board-container'>
					<LeftIndexes/>
						<div className="board">
							{ cellIds.map((cellId, index) => {
								return (
									<Cell
										key={index}
										onDrag={onDrag}
										removeKing={removeKing}
										restoreKing={restoreKing}
										handleDragEnd={handleDragEnd}
										activeFigure={activeFigure}
										handleDragStart={handleDragStart}
										handleUpdateCell={handleUpdateCell}
										figures={figures}
										cells={cells}
										{...cells[cellId]}
									/>
								);
							}) }
						</div>
					<TopIndexes />
				</div>
				<Buttons
					// updateState={this.updateStateFromFirebase}
					// resetState={this.resetState}
					// state={this.state}
				/>
			</div>
		);
	}
}

App.propTypes = {
	handleDragStart: PropTypes.func,
	handleDragEnd: PropTypes.func,
	removeKing: PropTypes.func,
	restoreKing: PropTypes.func,
	activeFigure: PropTypes.string,
	handleUpdateCell: PropTypes.func,
	figureIds: PropTypes.array,
	figures: PropTypes.object,
	cellIds: PropTypes.array,
	cells: PropTypes.object,
	onDrag: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {...state.reducer};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleDragStart: (e) => {
			dispatch(handleDragStart(e));
		},
		handleDragEnd: () => {
			dispatch(handleDragEnd());
		},
		handleUpdateCell: ({variant, id, activeFigure}) => {
			dispatch(handleUpdateCell({variant, id, activeFigure}));
		},
		removeKing: (activeFigure) => {
			dispatch(removeKing(activeFigure));
		},
		restoreKing: (king) => {
			dispatch(restoreKing(king));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);