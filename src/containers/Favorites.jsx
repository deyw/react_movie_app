import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {removeMovie} from '../actions';

class Favorites extends Component {

  onRemoveMovie(item) {
    let moviesStorageString = localStorage.getItem('movies');
    let moviesStorage = JSON.parse(moviesStorageString);
    const newArr = moviesStorage.filter(value => value.id !== item.id);
    localStorage.setItem('movies', JSON.stringify(newArr));
    this.props.removeMovie(item);
  }

  render() {
    const { movies } = this.props;
    if (!movies || movies.length === 0) {
      return (
        <div className='container'>
          <h2>No Favorite Movies</h2>
        </div>
      );
    }

    const renderFavoriteMovies = () => {
      return movies.map(item => {
        const poster_url = item.poster_path !== null 
          ? `https://image.tmdb.org/t/p/w300/${item.poster_path}` 
          : '/img/no_image.png';
        const movie_detail_path = `/movie/${item.id}`;
        return (
          <div className="movieCard" key={item.id}>
            <Link to={movie_detail_path}>
              <img
                src={poster_url}
                alt={item.title}
                className='movieCardImage'
                style={{ width: '100%' }} />
              <div className="movieCardDescription">
                {item.title}
              </div>
            </Link>
            <button 
              className='bttn-bordered bttn-xs bttn-danger' 
              onClick={this.onRemoveMovie.bind(this, item)}>
              Remove from favorites
            </button>
          </div>
        );
      });
    }

    return (
      <div>
        <section style={{ width: '100%', background: '#141414', paddingTop: '60px' }}>
          <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
            <div className='cards favorites' style={{ marginTop: '20px' }}>
              {renderFavoriteMovies()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.favoriteMovies
  }
}

export default connect(mapStateToProps, {removeMovie})(Favorites);
