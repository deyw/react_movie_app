/**
 * Save Movie item to localStorage
 * @param {Object} movies
 * @returns {Array<string>} 
 */
export const setMovies = movies => {
  if (Array.isArray(movies)) {
    localStorage.setItem('movies', JSON.stringify(movies));
    return movies;
  }
}

/**
 * Get all movies from localStorage
 * @returns {Array}
 */
export const getMovies = () => {
  let stringMovies = localStorage.getItem('movies');
  let movies = [];

  try {
    // parse to object from string
    movies = JSON.parse(stringMovies);
  } catch (error) {

  }

  return Array.isArray(movies) ? movies : [];
}
