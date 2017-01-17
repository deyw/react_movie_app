
// import type's constants
import * as atypes from '../actions/actionTypes';


const INITIAL_STATE = { allMovies: [], genres: [], movie: null, searchText: null, similar: [] }

export const movieAPIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case atypes.FETCH_MOVIE:
      return { ...state, movie: action.payload}
    case atypes.FETCH_SUCCESS:
      return { ...state, allMovies: action.payload, searchText: action.searchText }
    case 'FETCH_GENRE':
      return {...state, genres: action.payload}
    case 'FETCH_SIMILAR':
      return {...state, similar: action.payload}
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
    case 'REMOVE_MOVIE':
    const movieId = action.payload.id
      return state.filter(movie => movie.id !== movieId )
    case 'ADD_MOVIES':
      return [
        ...state,
        ...action.movies
      ]
  default:
    return state
  }
}
