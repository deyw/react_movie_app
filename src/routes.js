import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Movies from './components/Movies';
import MovieDetail from './containers/MovieDetail';
import Favorites from './containers/Favorites';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Movies} />
    <Route path='/favorites' component={Favorites} />
    <Route path='/:page' component={Movies} />
    <Route path='/movie/:id' component={MovieDetail} />
    
  </Route>
)