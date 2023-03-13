import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import CryptoContext from './CryptoContext';
// import App2 from './App2';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<CryptoContext>
						<App />
					</CryptoContext>
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
