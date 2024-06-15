import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'

import './index.css'

import { store } from './state/store.ts'

import { withTranslation } from 'react-i18next';

const AppWithTranslation = withTranslation()(App);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<AppWithTranslation />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
)
