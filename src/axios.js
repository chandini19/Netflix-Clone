import axios from 'axios'

// base url to make requests to the movie database

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
})
// instance.get('/foobar')
// the above line will append /foobar at the end of https://www.themoviedb.org/foobar

export default instance
