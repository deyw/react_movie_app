import React, { Component } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import MovieCard from '../components/MovieCard';
import { fetchMovieById, addMovie } from '../actions'
import './MovieDetail.css'

class MovieDetail extends Component {


  handleSubmit() {
    const { id, title, poster_path } = this.props.movie
    this.props.addMovie({ id, title, poster_path })
  }


  componentDidMount() {
    this.props.fetchMovieById(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.fetchMovieById(nextProps.params.id)
    }
  }

  render() {
    const { movie, similarMovies, genres, favoriteMovie } = this.props

    const renderMovies = () => {
      if (similarMovies.length === 0) {
        return <h2>Loading...</h2>
      }

      return similarMovies.results.map(movie => {

        if (!Array.isArray(genres)) {
          const movieGenreIds = movie.genre_ids
          const movieGenreNames = movieGenreIds.map(genre_id => {
            if (movieGenreIds.length > 0) {
              const temp = genres.genres.find(genre => {
                return genre.id === genre_id
              });
              return temp && temp.name
            } else {
              return 'No genre'
            }
          })

          const mappedMovie = movie
          mappedMovie.movieGenreNames = movieGenreNames
            .filter(genre => genre !== null && genre !== undefined && genre !== '')
            .join(', ')
        }

        return (
          <MovieCard key={movie.id} {...movie}  />
        )
      })
    }


    if (!movie) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }


    const favoriteMovieIds = favoriteMovie.map(item => item.id)
    const isFav = favoriteMovieIds.indexOf(movie.id) > -1

    let text = isFav ? 'In Favorites :)' : 'Add to favorites'

    const backdropPath = `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
    const poster_url = movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : '/img/no_image.png'
    return (
      <div >

        <div className='hero_img'
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.05), 
              rgba(0, 0, 0, 0.95)
            ), url(${backdropPath})`, color: '#ffffff'
          }}>

          <div className="flex-container">
            <div className="movieCard detail" style={{ textAlign: 'left' }}>
              <img
                src={poster_url}
                alt={movie.title}
                className='movie_card_img'
                style={{ width: '100%' }} />
              <span style={{ padding: '5px 3px' }}>
                <button
                  type='button'
                  disabled={isFav}
                  className="bttn-bordered bttn-sm bttn-primary"
                  onClick={this.handleSubmit.bind(this)}>{text}
                </button>
              </span>
            </div>
            <div className="item">
              <h1>{movie.title} </h1>
            </div>
            <div className="item">
              <p>{movie.overview}</p>
            </div>
            <div className="item_back">
              <button className="bttn-bordered bttn-xs bttn-default" onClick={browserHistory.goBack}>Go back</button>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 style={{ color: '#ededed' }}>You may also like</h2>
          <div className="cards">
                    {renderMovies()}
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.movie,
    similarMovies: state.movies.similar,
    favoriteMovie: state.favoriteMovies,
    genres: state.movies.genres,
  }
}

export default connect(mapStateToProps, { fetchMovieById, addMovie })(MovieDetail)