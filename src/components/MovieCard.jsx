import React, { Component } from 'react';
import { Link } from 'react-router';
import './MovieCard.css'


export default class MovieCard extends Component {
  render() {
    const {id, title, poster_path, movieGenreNames} = this.props
    const poster_url = poster_path !== null ? `https://image.tmdb.org/t/p/w300/${poster_path}` : '/img/no_image.png'
    const movie_detail_path = `/movie/${id}`
    return (
      <div className="movieCard">
        <Link to={movie_detail_path}>
        <img
          src={poster_url}
          alt={title}
          className='movie_card_img'
          style={{ width: '100%' }} />
        <div className="movie_card_description">
          {title}
        </div>
        <small>{movieGenreNames}</small>
        </Link>
      </div>
      
    )
  }
}

