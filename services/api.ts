
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_MOVIE_API_KEY ,
  Headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_MOVIE_API_KEY}`,
  },
};
export const fetchMovie = async ({query} :{query: string} )  => {
    const endpoint = query? 
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent (query)}` :
    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc` ;
    const response = await fetch (endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers,

    })
    if (!response.ok) {
 
        throw new Error('failed to fetch movie', );
       
    }
    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (movieId: number) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers,
    });
    if (!response.ok) {
        throw new Error('failed to fetch movie details');
    }
    const data = await response.json();
    return data;
}

export const fetchTrendingMovies = async () => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/movie/day`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers,
    });
    if (!response.ok) {
        throw new Error('failed to fetch trending movies');
    }
    const data = await response.json();
    return data.results;
}

export const fetchTopRatedMovies = async () => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/top_rated`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers,
    });
    if (!response.ok) {
        throw new Error('failed to fetch top rated movies');
    }
    const data = await response.json();
    return data.results;
}


