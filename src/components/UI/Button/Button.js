import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ type, styles, clicked, children }) => (
    <button
        type={type}
        className={ styles ? `Button ${styles}` : 'Button' }
        onClick={clicked}
    >
        {children}
    </button>
);

Button.defaultProps = {
    type: 'button'
};

Button.propTypes = {
    type: PropTypes.string,
    styles: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    clicked: PropTypes.func
};

export default Button;
