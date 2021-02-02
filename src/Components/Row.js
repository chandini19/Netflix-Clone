// component so capital R
import React, { useState, useEffect } from 'react'
import axios from '../axios'
// import requests from './requests'
import './Row.css'
import Youtube from 'react-youtube'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Row({ title, fetchUrl, isLargeRow }) {
	// STATE IS USED TO STORE FOR A SHORT TERM!
	// created an empty movie array using usestate(hooks)
	const [movies, setMovies] = useState([])
	const [trailerUrl, setTrailerUrl] = useState('')

	// Options for react-youtube
	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	}
	// A snippet of code which runs based on a specific condition/variable
	useEffect(() => {
		//we wanna pull info when we load thats why we use this usestate.
		//  if [], run once when the row loads, and dont run again. only on page load.
		async function fetchData() {
			const request = await axios.get(fetchUrl)
			setMovies(request.data.results)

			return request
		}
		fetchData()
	}, [fetchUrl])
	// console.table(movies)
	const handleClick = async (movie) => {
		if (trailerUrl) {
			setTrailerUrl('')
		} else {
			let trailerurl = await axios.get(
				`/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
			)
			setTrailerUrl(trailerurl.data.results[0]?.key)
		}
	}

	return (
		// using BEM NOTATION FOR CODE OPTIMIZATION!
		<div className='row'>
			<h2>{title}</h2>
			<div className='row__posters'>
				{/* several row posters and for each of these picture we need to give a unique key */}
				{movies.map((movie) => (
					<img
						key={movie.id}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
						onClick={() => handleClick(movie)}
					/>
				))}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	)
}

export default Row
