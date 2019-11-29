import * as actionTypes from '../actionTypes';

const initialState = {
    moviesList: [],
    favoriteMovies: [],
    isFetching: false
};

const addFavoriteMovie = (state, action) => ({
    ...state,
    favoriteMovies: [...state.favoriteMovies, action.movie]
});

const removeFavoriteMovie = (state, action) => ({
    ...state,
    favoriteMovies: state.favoriteMovies.filter(({ id }) => id !== action.movieId)
});

const refreshMoviesStore = state => ({
    ...state,
    moviesList: [],
    favoriteMovies: []
});

const fetchFavoriteMovies = (state, action) => ({
    ...state,
    favoriteMovies: action.favoriteMovies   
});

const updateMoviesList = (state, action) => ({
    ...state,
    moviesList: action.movies
});

const setIsFetching = (state, action) => ({
    ...state,
    isFetching: action.isFetching
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITE_MOVIE: return addFavoriteMovie(state, action);
        case actionTypes.REMOVE_FAVORITE_MOVIE: return removeFavoriteMovie(state, action);
        case actionTypes.FETCH_FAVORITE_MOVIES: return fetchFavoriteMovies(state, action);
        case actionTypes.UPDATE_MOVIES_LIST: return updateMoviesList(state, action);
        case actionTypes.REFRESH_MOVIES_STORE: return refreshMoviesStore(state);
        case actionTypes.SET_IS_FETCHING: return setIsFetching(state, action);
        default: return state;
    }
};

export default reducer;
