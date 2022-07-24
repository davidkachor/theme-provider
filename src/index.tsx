import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeContextProvider from './store/theme-context'
import GlobalCss from './global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<ThemeContextProvider>
		<GlobalCss />
		<App />
	</ThemeContextProvider>
)
