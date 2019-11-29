import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({
    styling,
    type,
    name,
    placeholder,
    value,
    changed,
    blured,
    focused
}) => (
    <input
        type={type}
        name={name}
        className={ styling ? `Input ${styling}` : 'Input' }
        placeholder={placeholder}
        value={value}
        onChange={changed}
        onBlur={blured}
        onFocus={focused}
    />
);

Input.defaultProps = {
    type: 'text',
    placeholder: ''
};

Input.propTypes = {
    styling: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    blured: PropTypes.func,
    focused: PropTypes.func
};

export default Input;
