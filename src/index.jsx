// import React from 'react';
// import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import App from './app.jsx';
//
// render( <AppContainer><App/></AppContainer>, document.querySelector('#app'));
//
// if (module && module.hot) {
// 	module.hot.accept('./app.jsx', () => {
// 		const App = require('./app.jsx').default;
//
// 		render(
// 		<AppContainer>
// 		<App/>
// 		</AppContainer>,
// 			document.querySelector('#app')
// 		);
// 	});
// }

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
	document.querySelector('#app'));

if (module && module.hot) {
	module.hot.accept('./container/app.jsx', () => {
		const App = require('./container/app.jsx').default;

		render(
		<AppContainer>
			<Provider store={ store }>
				<App/>
			</Provider>
		</AppContainer>,
			document.querySelector('#app')
		);
	});
}
