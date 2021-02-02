import React, { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
	const [show, handleShow] = useState(false)
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 120) {
				handleShow(true)
			} else handleShow(false)
		})
		return () => {
			window.removeEventListener('scroll')
		}
	}, [])

	return (
		<div className={`nav ${show && 'nav__black'}`}>
			<img
				className='nav__logo'
				src='../images/netflix-logo.png'
				alt='Netflix Logo'
			></img>
			<img
				className='nav__avatar'
				src='https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png'
				alt='avatar'
			></img>
		</div>
	)
}

export default Navbar
