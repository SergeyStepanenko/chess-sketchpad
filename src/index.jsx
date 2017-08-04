import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import App from './container/app.jsx';
import store from './store';

render(
	<AppContainer>
		<Provider store={ store }>
			<App/>
		</Provider>
	</AppContainer>,
	document.getElementById('app'));

if (module && module.hot) {
	module.hot.accept('./container/app.jsx', () => {
		const App = require('./container/app.jsx').default;

		render(
		<AppContainer>
			<Provider store={ store }>
				<App/>
			</Provider>
		</AppContainer>,
			document.getElementById('app')
		);
	});
}
