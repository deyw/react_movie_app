import React from 'react';
import { Link } from 'react-router';


export default (props) => {

  let nextPage = props.url 
    ? `${parseInt(props.url, 10) + 1}` 
    : `${props.page + 1}`;
  
  const prevPage = props.page > 1 
    ? `${parseInt(props.url, 10) - 1}` 
    : '';
  
  let lastPage = `${props.total_pages}`

  if (props.page === props.total_pages) {
    nextPage = '';
    lastPage = '';
  }

  return (
    <div>
      <p style={{ fontWeight: '600', color: '#454545' }}>
        Current Page: {props.page}
      </p>
        <Link
          disabled={!props.url || props.url === 1}
          className='bttn-bordered bttn-sm bttn-primary' 
          activeClassName='active' 
          to={!props.url ? '' : '/'}>
          First Page
        </Link>
        <Link
          className='bttn-bordered bttn-sm bttn-primary'
          activeClassName='active'
          to={prevPage}>
          Prev
        </Link>
        <Link
          disabled={props.url === props.total_pages}
          className='bttn-bordered bttn-sm bttn-primary'
          activeClassName='active' 
          to={nextPage}>
          Next
        </Link>
        <Link 
          className='bttn-bordered bttn-sm bttn-primary'
          activeClassName='active' 
          to={lastPage}>
          Last Page
        </Link>
    </div>
  );
}
