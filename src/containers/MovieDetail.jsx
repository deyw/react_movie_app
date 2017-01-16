import React, { Component } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

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

  render() {
    const { movie, favoriteMovie } = this.props
    

    if (!movie) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }


    const favoriteMovieIds = favoriteMovie.map(item => item.id)
    const isFav =  favoriteMovieIds.indexOf(movie.id) > -1 
    
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.movie,
    favoriteMovie: state.favoriteMovies
  }
}

export default connect(mapStateToProps, { fetchMovieById, addMovie })(MovieDetail)