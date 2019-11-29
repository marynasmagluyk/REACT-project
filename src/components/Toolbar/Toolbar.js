import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Toolbar.scss';

const Toolbar = ({
    isAuthenticated,
    searchValue,
    isFetching,
    onChangeHandler,
    fetchMoviesHandler,
    logout
}) => (
    <div className="Toolbar">
        {
            isAuthenticated &&
                <Input
                    placeholder="Search..."
                    value={searchValue}
                    changed={onChangeHandler}
                />
        }

        <Navigation
            isAuthenticated={isAuthenticated}
            logout={logout}
        />

        {
            isAuthenticated &&
                <Button
                    styles={ isFetching ? 'Disabled' : null }
                    clicked={fetchMoviesHandler}
                >
                    { isFetching ? 'Searching...' : 'Search' }
                </Button>
        }
    </div>
);

Toolbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    fetchMoviesHandler: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

export default Toolbar;
