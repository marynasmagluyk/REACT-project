import { combineReducers } from 'redux';

import moviesReducer from './reducers/movies';
import authReducer from './reducers/auth';

export default combineReducers({
    movies: moviesReducer,
    auth: authReducer
});
