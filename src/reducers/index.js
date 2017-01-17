import { combineReducers } from 'redux';
import { movieAPIReducer, movieFavoriteReducer} from './movies';

const rootReducer = combineReducers({
  movies: movieAPIReducer,
  favoriteMovies: movieFavoriteReducer
})

export default rootReducer;
