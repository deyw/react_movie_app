
// import type's constants
import * as types from '../actions/actionTypes';


const INITIAL_STATE = { allMovies: [], genres: [], movie: null, searchText: null }

export const movieAPIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_MOVIE:
      return { ...state, movie: action.payload}
    case types.FETCH_SUCCESS:
      return { ...state, allMovies: action.payload, searchText: action.searchText }
    case types.FETCH_GENRE:
      return {...state, genres: action.payload}
    default:
      return state;
  }
}

export const movieFavoriteReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MOVIE:
      return [
        ...state, action.payload
      ]
    case types.REMOVE_MOVIE:
    const movieId = action.payload.id
      return state.filter(movie => movie.id !== movieId )
    case types.ADD_MOVIES:
      return [
        ...state,
        ...action.movies
      ]
  default:
    return state;
  }
}
