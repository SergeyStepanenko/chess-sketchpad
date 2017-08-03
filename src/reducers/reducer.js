import STATE from '../assets/source';

const reducer = (state = STATE, action) => {
	switch (action.type) {
	case 'DRAG_START':
		return state = {
			...state,
			onDrag: true,
			activeFigure: action.payload,
		};
	case 'DRAG_END':
		return state = {
			...state,
			onDrag: false,
			activeFigure: null,
		};
	case 'UPDATE_CELL_ADD':
		return state = {
			...state,
			cells: {
				...state.cells,
				[action.payload.id]: {
					...state.cells[action.payload.id],
					figureId: action.payload.activeFigure,
					empty: false
				}
			},
			// activeFigure: null,
			onDrag: false
		};
	case 'UPDATE_CELL_REMOVE':
		return state = {
			...state,
			cells: {
				...state.cells,
				[action.payload.id]: {
					...state.cells[action.payload.id],
					figureId: null,
					empty: true
				}
			},
			activeFigure: null,
			onDrag: false
		};
	case 'REMOVE_KING':
		return state = {
			...state,
			figures: {
				...state.figures,
				[action.payload]: {
					...state.figures[action.payload],
					quantity: 0
				}
			}
		};
	case 'RESTORE_KING':
		return state = {
			...state,
			figures: {
				...state.figures,
				[action.payload]: {
					...state.figures[action.payload],
					quantity: 1
				}
			}
		};
	default:
		return state;
	}
};

export default reducer;
