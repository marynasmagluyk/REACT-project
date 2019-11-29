import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Movie.scss';

const Movie = ({ id, original_title, poster_path }) => {
    const imageUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="Movie">
            <h1>{original_title}</h1>
            
            <div className="ImageWrapper">
                <img src={imageUrl + poster_path} alt={original_title} />
            </div>
            
            <Link to={'/movies/' + id}>Read More</Link>
        </div>
    );
};

Movie.propTypes = {
    original_title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired
};

export default Movie;
