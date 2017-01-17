import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import debounce from 'lodash/debounce';
import { fetchPopularMovies, searchMovie } from '../actions';
import './MovieSearch.css';

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }


  // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
  componentWillMount () {
       this.handleSearchDebounced = debounce(function () {
            if (this.state.searchText) {
               this.props.searchMovie.apply(this, [this.state.searchText]);
            }
       }, 500);
    }


  onInputChange(e) {
    this.setState({
      searchText: e.target.value
    });
    if (this.state.searchText.length > 1) {
      this.handleSearchDebounced();
      browserHistory.replace('/');
    } else {
      this.props.fetchPopularMovies();
    }
  }

  render() {
    return (
      <div className='search-box'>
      <label htmlFor="searchInput" className='centeredLabel'>MovieSearch</label>
        <input 
          type="search"
          placeholder='Search...'
          id='searchInput'
          value={this.state.searchText}
          onChange={this.onInputChange.bind(this)}/>
      </div>
    )
  }
}


export default connect(null, { searchMovie, fetchPopularMovies })(MovieSearch);