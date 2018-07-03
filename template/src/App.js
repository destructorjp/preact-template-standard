import React from 'preact-compat';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';

import Home from './routes/home';
import configureStore from './store/configureStore';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
	require('preact/debug');
}

const { persistor, store } = configureStore();

export default class App extends React.Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<Router onChange={this.handleRoute}>
							<Home path="/" />
						</Router>
					</PersistGate>
				</Provider>
			</div>
		);
	}
}
