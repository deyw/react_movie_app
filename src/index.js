import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { Router, browserHistory } from 'react-router';
import { setMovies, getMovies } from './localStorage';
import * as actions from './actions';

import Routes from './routes';
import './normalize.css';
import './index.css';




const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

store.subscribe(() => {
  const state = store.getState()
  setMovies(state.favoriteMovies)
})

const initialMovies = getMovies()
store.dispatch(actions.addMovies(initialMovies))




ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes}>
    </Router>
  </ Provider>,
  document.getElementById('root')
);
