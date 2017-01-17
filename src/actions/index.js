import axios from 'axios';
import {
  FETCH_SUCCESS,
  FETCH_MOVIE,
  FETCH_GENRE,
  ADD_MOVIE,
  ADD_MOVIES,
  REMOVE_MOVIE
} from './actionTypes';

const API_KEY = process.env.REACT_APP_API_KEY;
const MAIN_URL = 'https://api.themoviedb.org/3';

const dispatcher = (path, type, shouldDispatchGenre, shouldDispatchSimilar, method = 'get') => {
  return dispatch => {
    axios[method](path).then(response => {
        if (response.status === 200) {
          dispatch({
            type,
            payload: response.data,
          })
          
          if (shouldDispatchGenre) {
            dispatch(fetchGenre())
          }

          if (shouldDispatchSimilar) {
            dispatch(fetchSimilarMovies(response.data.id))
          }
        }
      })
      .catch()
  }
}

function fetchGenre () {
  const api_path = `${MAIN_URL}/genre/movie/list?api_key=${API_KEY}`;
  return dispatcher(api_path, FETCH_GENRE, false, false);
}

function fetchSimilarMovies (id) {
  const api_path = `${MAIN_URL}/movie/${id}/similar?api_key=${API_KEY}`;
  return dispatcher(api_path, FETCH_SUCCESS, true, false);
}

export const fetchPopularMovies = (page = 1) => {
  const api_path = `${MAIN_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  return dispatcher(api_path, FETCH_SUCCESS, true);
}

export const fetchMovieById = (id) => {
  const api_path = `${MAIN_URL}/movie/${id}?api_key=${API_KEY}`;
  return dispatcher(api_path, FETCH_MOVIE, false, true);
}


// search movie
export const searchMovie = (searchText, page = 1) => {
  return dispatch => {
    axios.get(`${MAIN_URL}/search/movie?api_key=${API_KEY}&query=${searchText}&page=${page}`)
      .then(response => {
        if (response.data) {
          dispatch({
            type: FETCH_SUCCESS,
            payload: response.data,
            searchText
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_ERROR',
          err
        });
      })
  }
}

export const addMovie = (movie) => {
  return {
    type: ADD_MOVIE,
    payload: movie
  }
}

export const removeMovie = (movie) => {
  return {
    type: REMOVE_MOVIE,
    payload: movie
  }
}

export const addMovies = (movies) => {
  return {
    type: ADD_MOVIES,
    movies
  }
}
