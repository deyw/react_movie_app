
import axios from 'axios';
import {
  FETCH_SUCCESS,
  FETCH_MOVIE,
} from './actionTypes'

const API_KEY = process.env.REACT_APP_API_KEY 
const MAIN_URL = 'https://api.themoviedb.org/3'


export const fetchPopularMovies = (page = 1) => {
  return dispatch => {
    axios.get(`${MAIN_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
      .then(response => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_ERROR',
          err
        })
      })
  }
}


// fetch movie by id
export const fetchMovieById = (id) => {
  return dispatch => {
    axios.get(`${MAIN_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(response => {
        dispatch({
          type: FETCH_MOVIE,
          payload: response.data
        })
      })
  }
}

// search movie
export const searchMovie = (searchText) => {
  return dispatch => {
    axios.get(`${MAIN_URL}/search/movie?api_key=${API_KEY}&query=${searchText}&sort_by=popularity.desc`)
      .then(response => {
        if (response.data) {
          dispatch({
            type: FETCH_SUCCESS,
            payload: response.data
          })
        }
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_ERROR',
          err
        })
      })
  }
}

export const addMovie = (movie) => {
  return {
    type: 'ADD_MOVIE',
    payload: movie
  }
}

export const addMovies = (movies) => {
  return {
    type: 'ADD_MOVIES',
    movies
  }
}