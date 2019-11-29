import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const fetchFavoriteMovies = firebaseKey => {
    return dispatch => {
        const baseUrl = 'https://react-movies-application.firebaseio.com/users/';
        const fullUrl = baseUrl + firebaseKey + '/movies.json';
        
        axios.get(fullUrl)
            .then(res => dispatch(setFavoriteMovies(res.data ? res.data : [])))
            .catch(err => console.log('[err]', err));
    };
};

const setFavoriteMovies = favoriteMovies => ({
    type: actionTypes.FETCH_FAVORITE_MOVIES,
    favoriteMovies
});

export const addFavoriteMovie = movie => ({
    type: actionTypes.ADD_FAVORITE_MOVIE,
    movie
});

export const removeFavoriteMovie = movieId => ({
    type: actionTypes.REMOVE_FAVORITE_MOVIE,
    movieId
});

export const updateMoviesList = (searchValue = 'Pirates') => {
    return dispatch => {
        const apiKey = '1a67fd8fb5bbd9369d8ed3886f1ac2e2';

        const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
        const searchUrl = `&language=en-US&query=${searchValue}&page=1&include_adult=false`;

        dispatch(setIsFetching(true));

        axios.get(baseUrl + searchUrl)
            .then(res => dispatch(setMovies(res.data.results)))
            .then(() => {
                setTimeout(() => {
                    dispatch(setIsFetching(false));
                }, 3000);
            })
            .catch(err => console.log('[err]', err));
    };
};

export const refreshMoviesStore = () => ({
    type: actionTypes.REFRESH_MOVIES_STORE
});

const setMovies = movies => ({
    type: actionTypes.UPDATE_MOVIES_LIST,
    movies
});

const setIsFetching = isFetching => ({
    type: actionTypes.SET_IS_FETCHING,
    isFetching
});
