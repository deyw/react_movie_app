import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './MovieCard.css'
import {addMovie} from '../actions';


class MovieCard extends Component {

  addToFavorite() {
    const {id, title, poster_path} = this.props
    this.props.addMovie({id, title, poster_path})
  }

  render() {
    const {id, title, poster_path, movieGenreNames, favoriteMovie, colorText} = this.props
    const poster_url = poster_path !== null ? `https://image.tmdb.org/t/p/w300/${poster_path}` : '/img/no_image.png'
    const movie_detail_path = `/movie/${id}`
    const tColor = colorText ? colorText : '#222'
    
    const favoriteMovieIds = favoriteMovie.map(item => item.id)
    const isFav =  favoriteMovieIds.indexOf(id) > -1 
    const text = isFav ? 'In Favorites :)' : 'Add to favorites'

    return (
      <div className="movieCard">
        <Link to={movie_detail_path}>
        <img
          src={poster_url}
          alt={title}
          className='movie_card_img'
          style={{ width: '100%' }} />
        <div className="movie_card_description" style={{color: tColor}}>
          {title}
        </div>
        <div style={{padding: '5px'}}><small style={{color: tColor}}>{movieGenreNames}</small></div>
        </Link>
        <button className="bttn-bordered bttn-xs bttn-primary" disabled={isFav} onClick={this.addToFavorite.bind(this)}>{text}</button>
      </div>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    favoriteMovie: state.favoriteMovies
  }
}

export default connect(mapStateToProps, {addMovie})(MovieCard)
