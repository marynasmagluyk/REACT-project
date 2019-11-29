import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navigation.scss';

const Navigation = ({ isAuthenticated, logout }) => (
    <nav className="Navigation">
        <ul>
            {
                isAuthenticated && 
                    <li>
                        <NavLink
                            activeClassName="Active"
                            to="/"
                            exact
                        >
                            Home
                        </NavLink>
                    </li>
            }

            {
                !isAuthenticated &&
                    <li>
                        <NavLink
                            activeClassName="Active"
                            to="/auth"
                        >
                            Auth
                        </NavLink>
                    </li>
            }

            <li>
                <NavLink
                    activeClassName="Active"
                    to="/favorite"
                >
                    Favorite
                </NavLink>
            </li>

            {
                isAuthenticated &&
                    <li>
                        <span
                            className="LogoutButton"
                            onClick={logout}
                        >
                            Logout
                        </span>
                    </li>
            }
        </ul>
    </nav>
);

Navigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default Navigation;
