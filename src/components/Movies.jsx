import React, { Component } from 'react';
import MovieSearch from '../containers/MovieSearch';
import MovieList from '../containers/MovieList';
import './Movies.css'

export default class Movies extends Component {
  render() {
    return (
      <div>

      <div className='container'>
        <MovieSearch />
      </div>

        <section style={{width:'100%', background: 'white', borderBottom: '1px solid #dddddd', marginBottom: '60px'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', paddingTop: '5px', paddingBottom: '10px'}}>
            <MovieList page={this.props.params.page} />
          </div>
        </section>
        
      </div>
    )
  }
}