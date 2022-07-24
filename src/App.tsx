import React, { useContext } from 'react'
import { ThemeContext, ThemeType } from './store/theme-context'
import styled from 'styled-components'

type ThemeProps = { theme: ThemeType }

const Container = styled.div<ThemeProps>`
	height: 100vh;
	background-color: ${props => (props.theme === 'dark' ? 'black' : 'white')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	transition: all ease-in-out 0.3s;
`
const Title = styled.h1<ThemeProps>`
	color: ${props => (props.theme === 'dark' ? 'white' : 'black')};
	font-size: 50px;
	font-family: Inter, sans-serif;
`
const Button = styled.button`
	padding: 10px;
	border-radius: 10px;
	font-size: 20px;
	font-weight: bold;
	cursor: pointer;
`

function App() {
	const { theme, toggleTheme } = useContext(ThemeContext)

	return (
		<Container theme={theme}>
			<Title theme={theme}>This is {theme} mode</Title>
			<Button onClick={() => toggleTheme()}>Change theme</Button>
		</Container>
	)
}

export default App
