import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Movie from './Movie/Movie';
import './Movies.scss';

const Movies = ({ list }) => (
    <div className="Movies">
        {list.map(({ id, original_title, poster_path }) => (
            <Movie
                key={id}
                id={id}
                original_title={original_title}
                poster_path={poster_path}
            />
        ))}
    </div>
);

Movies.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object.isRequired)
};

export default withRouter(Movies);
