
// import type's constants
import * as atypes from '../actions/actionTypes';


const INITIAL_STATE = { allMovies: [], genres: [], movie: null }

export const movieAPIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case atypes.FETCH_MOVIE:
      return { ...state, movie: action.payload}
    case atypes.FETCH_SUCCESS:
      return { ...state, allMovies: action.payload }
    case 'FETCH_GENRE':
      return {...state, genres: action.payload}
    default:
      return state
  }
}

export const movieFavoriteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state, action.payload
      ]
    case 'ADD_MOVIES':
      return [
        ...state,
        ...action.movies
      ]
  default:
    return state
  }
}
