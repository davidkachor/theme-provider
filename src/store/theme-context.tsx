import React, { ReactNode, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export type ThemeType = 'light' | 'dark'

export const ThemeContext = React.createContext<{
	theme: ThemeType
	toggleTheme: () => void
}>({
	theme: 'light',
	toggleTheme: () => {},
})

const isDarkMatchMedia = matchMedia('(prefers-color-scheme: dark)')
const themeStorage = localStorage.getItem('THEME')
const initState =
	themeStorage === 'dark' || themeStorage === 'light'
		? themeStorage
		: isDarkMatchMedia.matches
		? 'dark'
		: 'light'

const ThemeContextProvider: React.FC<{ children: ReactNode }> = props => {
	const [theme, setTheme] = useState<ThemeType>(initState)
	const [themeValueForDebounce, setThemeValueForDebounce] = useState(theme)
	const [debounceTheme] = useDebounce(themeValueForDebounce, 300)

	useEffect(() => {
		const matchMediaListener = () => {
			setThemeValueForDebounce(
				matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			)
		}
		isDarkMatchMedia.addEventListener('change', matchMediaListener)

		return () =>
			isDarkMatchMedia.removeEventListener('change', matchMediaListener)
	}, [])

	useEffect(() => {
		setTheme(debounceTheme)
	}, [debounceTheme])

	const toggleTheme = () =>
		setTheme(prev => {
			const newTheme = prev === 'light' ? 'dark' : 'light'
			localStorage.setItem('THEME', newTheme)
			return newTheme
		})

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
