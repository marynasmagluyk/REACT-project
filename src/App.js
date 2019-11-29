import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Toolbar from './components/Toolbar/Toolbar';
import Spinner from './components/UI/Spinner/Spinner';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import FullMovie from './components/FullMovie/FullMovie';
import Auth from './containers/Auth/Auth';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import * as moviesActions from './store/actions/movies';
import * as authActions from './store/actions/auth';
import './App.scss';

class App extends PureComponent {
    state = {
        searchValue: ''
    }

    componentDidMount() {
        const idToken = localStorage.getItem('idToken');
        const localId = localStorage.getItem('localId');
        const firebaseKey = localStorage.getItem('firebaseKey');

        if (idToken && localId && firebaseKey) {
            const { saveAuthenticatedUser } = this.props;

            saveAuthenticatedUser(idToken, localId, firebaseKey);
        } else {
            localStorage.removeItem('idToken');
            localStorage.removeItem('localId');
            localStorage.removeItem('firebaseKey');
        }

        const { updateMoviesList, fetchFavoriteMovies, history } = this.props;

        const isAuthenticated = idToken && localId;

        if (isAuthenticated) {
            updateMoviesList();
            fetchFavoriteMovies(firebaseKey);
        } else {
            return history.push('/auth');
        }
    }

    componentDidUpdate(prevProps) {
        const { fetchFavoriteMovies, isAuthenticated, firebaseKey } = this.props;

        if (!prevProps.isAuthenticated && isAuthenticated) {
            fetchFavoriteMovies(firebaseKey);
        }
    }

    onChangeHandler = e => {
        this.setState({ searchValue: e.target.value });
    }

    fetchMoviesHandler = () => {
        const { searchValue } = this.state;
        const { updateMoviesList } = this.props;

        if (!searchValue) return;

        updateMoviesList(searchValue);
    }

    logoutWithRedirect = () => {
        const { refreshMoviesStore, logoutUser, history } = this.props;

        refreshMoviesStore();
        logoutUser();
        history.push('/auth');
    }

    toggleFavoriteMovie = movieId => {
        const {
            moviesList,
            addFavoriteMovie,
            removeFavoriteMovie,
            firebaseKey
        } = this.props;

        const baseUrl = 'https://react-movies-application.firebaseio.com/users/';
        const fullUrl = baseUrl + `${firebaseKey}.json`;

        const compareMoviesId = ({ id }) => id === movieId;

        debugger;

        axios.get(baseUrl + firebaseKey + '/movies.json')
            .then(res => {
                const { data } = res;

                let movies;

                const newMovie = moviesList.find(compareMoviesId);
                
                if (data) {
                    const movieExists = data.some(compareMoviesId);

                    if (movieExists) {
                        movies = data.filter(({ id }) => id !== movieId);

                        removeFavoriteMovie(movieId);
                    } else {
                        movies = [...data, newMovie];

                        addFavoriteMovie(newMovie);
                    }
                } else {
                    movies = [newMovie];

                    addFavoriteMovie(newMovie);
                }

                axios.patch(fullUrl, { movies });
            })
            .catch(err => console.log('[err]', err));
    }

    render() {
        const { searchValue } = this.state;
        const { moviesList, favoriteMovies, isFetching, isAuthenticated } = this.props;

        return (
            <div className="App">
                <Toolbar
                    isAuthenticated={isAuthenticated}
                    searchValue={searchValue}
                    isFetching={isFetching}
                    onChangeHandler={this.onChangeHandler}
                    fetchMoviesHandler={this.fetchMoviesHandler}
                    logout={this.logoutWithRedirect}
                />

                <Switch>
                    {
                        isAuthenticated &&
                            <Route path="/movies/:movieId" render={props => (
                                <FullMovie
                                    {...props}
                                    moviesList={moviesList}
                                    favoriteMovies={favoriteMovies}
                                    toggleFavoriteMovie={this.toggleFavoriteMovie}
                                />
                            )} />
                    }

                    <Route path="/auth" component={Auth} />
                    
                    <Route path="/favorite" render={props => (
                        <FavoriteMovies
                            {...props}
                            movies={favoriteMovies}
                            toggleFavoriteMovie={this.toggleFavoriteMovie}
                        />
                    )} />

                    {
                        isAuthenticated &&
                            <Route path="/" exact render={props => (
                                <Fragment>
                                    { isFetching && <Spinner /> }

                                    <Movies list={moviesList} />
                                </Fragment>
                            )} />
                    }
                </Switch>

                <Footer />
            </div>
        );
    }
};

App.propTypes = {
    localId: PropTypes.string,
    firebaseKey: PropTypes.string,
    moviesList: PropTypes.array.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    localId: state.auth.localId,
    firebaseKey: state.auth.firebaseKey,
    moviesList: state.movies.moviesList,
    favoriteMovies: state.movies.favoriteMovies,
    isFetching: state.movies.isFetching,
    isAuthenticated: !!state.auth.idToken
});

const mapDispatchToProps = dispatch => {
    return {
        updateMoviesList: searchValue => dispatch(moviesActions.updateMoviesList(searchValue)),
        logoutUser: () => dispatch(authActions.logoutUser()),
        saveAuthenticatedUser: (idToken, localId, firebaseKey) => dispatch(authActions.saveAuthenticatedUser(idToken, localId, firebaseKey)),
        fetchFavoriteMovies: firebaseKey => dispatch(moviesActions.fetchFavoriteMovies(firebaseKey)),
        refreshMoviesStore: () => dispatch(moviesActions.refreshMoviesStore()),
        addFavoriteMovie: movie => dispatch(moviesActions.addFavoriteMovie(movie)),
        removeFavoriteMovie: movieId => dispatch(moviesActions.removeFavoriteMovie(movieId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
