import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reducer from './reducers/reducer';

export default createStore(
	combineReducers(
		{ reducer }),
		{},
		composeWithDevTools(applyMiddleware(
			createLogger({
				collapsed: true,
				stateTransformer: state => ({ ...state.reducer.toJS() })
			})))
	);
