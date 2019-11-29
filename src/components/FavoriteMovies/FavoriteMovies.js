import React from 'react';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';
import classes from './FavoriteMovies.module.scss';

const FavoriteMovies = ({ movies, toggleFavoriteMovie }) => {
    if (!movies || !movies.length) return 'Ничего тутачки нету!';

    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className={classes.FavoriteMovies}>
            {movies.map(movie => {
                const {
                    id,
                    backdrop_path,
                    poster_path,
                    original_title,
                    overview,
                    release_date
                } = movie;

                return (
                    <div
                        key={id}
                        className={classes.FavoriteMovie}
                        style={{ backgroundImage: `url(${imageUrl}${backdrop_path})` }}
                    >
                        <h1>{original_title}</h1>
                        
                        <div className={classes.ContentWrapper}>
                            <div className={classes.ImageWrapper}>
                                <img src={imageUrl + poster_path} alt={original_title} />
                            </div>

                            <div className={classes.Content}>
                                <div className={classes.MovieInfo}>
                                    <strong>{release_date}</strong>
                                    <p>{overview}</p>
                                </div>

                                <Button clicked={() => toggleFavoriteMovie(id)}>
                                    {
                                        movies.some(movie => movie.id === id)
                                            ? 'Remove from Favorite'
                                            : 'Add to Favorite'
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

FavoriteMovies.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object.isRequired),
    toggleFavoriteMovie: PropTypes.func.isRequired
};

export default FavoriteMovies;
