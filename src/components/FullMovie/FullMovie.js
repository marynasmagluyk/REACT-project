import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '../UI/Button/Button';
import './FullMovie.scss';

const FullMovie = ({ match, moviesList, favoriteMovies, toggleFavoriteMovie }) => {
    const movieId = match.params.movieId;

    const fullMovie = moviesList.find(({ id }) => id === +movieId);

    if (!fullMovie) return <Redirect to="/" />;

    const {
        id,
        backdrop_path,
        poster_path,
        original_title,
        overview,
        release_date
    } = fullMovie;

    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div
            className="FullMovie"
            style={{ backgroundImage: `url(${imageUrl}${backdrop_path})` }}
        >
            <h1>{original_title}</h1>
            
            <div className="ContentWrapper">
                <div className="ImageWrapper">
                    <img src={imageUrl + poster_path} alt={original_title} />
                </div>

                <div className="Content">
                    <div className="MovieInfo">
                        <strong>{release_date}</strong>
                        <p>{overview}</p>
                    </div>

                    <Button clicked={() => toggleFavoriteMovie(id)}>
                        {
                            favoriteMovies.some(movie => movie.id === id)
                                ? 'Remove from Favorite'
                                : 'Add to Favorite'
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};

FullMovie.propTypes = {
    moviesList: PropTypes.arrayOf(PropTypes.object.isRequired),
    favoriteMovies: PropTypes.arrayOf(PropTypes.number.isRequired),
    match: PropTypes.object.isRequired,
    toggleFavoriteMovie: PropTypes.func.isRequired
};

export default FullMovie;
