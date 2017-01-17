import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPopularMovies, searchMovie } from '../actions';
import MovieCard from '../components/MovieCard';
import Paginator from '../components/Paginator';

class MovieList extends Component {

  componentDidMount() {
    this.props.fetchPopularMovies(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      if (this.props.searchText) {
        this.props.searchMovie(this.props.searchText, nextProps.page);
      } else {
        this.props.fetchPopularMovies(nextProps.page);
      }
    }
  }

  render() {
    const {movies, genres, page} = this.props;

    const renderMovies = () => {
      if (movies.length === 0) {
        return <h2>Loading...</h2>;
      }

      return movies.results.map(movie => {

        if (!Array.isArray(genres)) {
          const movieGenreIds = movie.genre_ids;
          const movieGenreNames = movieGenreIds.map(genre_id => {
            if (movieGenreIds.length > 0) {
              const temp = genres.genres.find(genre => {
                return genre.id === genre_id;
              });
              return temp && temp.name;
            } else {
              return 'No genre';
            }
          })

          const mappedMovie = movie;
          mappedMovie.movieGenreNames = movieGenreNames
            .filter(genre => genre !== null && genre !== undefined && genre !== '')
            .join(', ');
        }

        return (
          <MovieCard key={movie.id} {...movie} page={page} />
        )
      })
    }


    return (
      <div style={{ paddingBottom: '20px' }}>
        <div className='cards'>
          {renderMovies()}
        </div>
        <hr />
        <p>Simple pagination</p>
        <Paginator url={page} {...movies} />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.allMovies,
    searchText: state.movies.searchText,
    genres: state.movies.genres
  }
}

export default connect(mapStateToProps, { fetchPopularMovies, searchMovie })(MovieList);
