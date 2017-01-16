import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPopularMovies } from '../actions';
import { Link } from 'react-router';
import MovieCard from '../components/MovieCard';

class MovieList extends Component {

  componentDidMount() {
    this.props.fetchPopularMovies(this.props.page)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.fetchPopularMovies(nextProps.page)
    }
  }

  render() {
    const {movies, genres, page} = this.props

    let nextPage = page ? `${parseInt(page, 10) + 1}` : `${movies.page + 1}`
    const prevPage = movies.page > 1 ? `${parseInt(page, 10) - 1}` : ''
    let lastPage = `${movies.total_pages}`

    if (movies.page === movies.total_pages) {
      nextPage = ''
      lastPage = ''
    }

    const renderMovies = () => {
      if (movies.length === 0) {
        return <h2>Loading...</h2>
      }


      return movies.results.map(movie => {
        if (!Array.isArray(genres)) {
          const movieGenreIds = movie.genre_ids
          
          const movieGenreNames = movieGenreIds.map(genre_id => {
            return genres.genres.find(genre => {
             return genre.id === genre_id
            }).name
          })
          const mappedMovie = movie
          mappedMovie.movieGenreNames = movieGenreNames.join(', ')

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
        <p style={{ fontWeight: '600', color: '#454545' }}>Current Page: {movies.page}</p>
        <Link disabled={!page || page === 1} className='bttn-bordered bttn-sm bttn-primary' activeClassName='active' to={ !page ? '' : '/'}>First Page</Link>
        <Link className='bttn-bordered bttn-sm bttn-primary' activeClassName='active' to={nextPage}>Next</Link>
        <Link className='bttn-bordered bttn-sm bttn-primary' activeClassName='active' to={prevPage}>Prev</Link>
        <Link className='bttn-bordered bttn-sm bttn-primary' activeClassName='active' to={lastPage}>Last Page</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.allMovies,
    genres: state.movies.genres
  }
}

export default connect(mapStateToProps, { fetchPopularMovies })(MovieList)