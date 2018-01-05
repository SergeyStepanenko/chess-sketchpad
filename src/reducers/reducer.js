import STATE from '../assets/source';
import { fromJS } from 'immutable';

const reducer = (state = fromJS(STATE), action) => {
	switch (action.type) {
	case 'DRAG_START':
		return state.set('onDrag', true).set('activeFigure', action.payload);
	case 'DRAG_END':
		return state.set('onDrag', false).set('activeFigure', null);
	case 'UPDATE_CELL_ADD':
		return state
			.updateIn([ 'cells', action.payload.id, 'figureId' ], () => action.payload.activeFigure)
			.updateIn([ 'cells', action.payload.id, 'empty' ], () => false)
			.set('onDrag', false);
	case 'UPDATE_CELL_REMOVE':
		return state
			.updateIn([ 'cells', action.payload.id, 'figureId' ], () => null)
			.updateIn([ 'cells', action.payload.id, 'empty' ], () => true)
			.set('activeFigure', null)
			.set('onDrag', false);
	case 'REMOVE_KING':
		return state.updateIn([ 'figures', action.payload, 'quantity' ], () => 0);
	case 'RESTORE_KING':
		return state.updateIn([ 'figures', action.payload, 'quantity' ], () => 1);
	default:
		return state;
	}
};

export default reducer;
