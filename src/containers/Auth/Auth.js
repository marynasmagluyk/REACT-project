import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as authActions from '../../store/actions/auth';
import * as moviesActions from '../../store/actions/movies';
import './Auth.scss';

export const SIGN_IN = 'sign-in';
export const SIGN_UP = 'sign-up';

class Auth extends Component {
    state = {
        activeTab: SIGN_IN,
        showPassword: false,
        email: {
            value: '',
            isValid: null,
            rules: ['email', 'minLength'],
            errorMessage: null
        },
        password: {
            value: '',
            isValid: null,
            rules: ['minLength'],
            errorMessage: null
        }
    }

    componentDidUpdate(prevProps) {
        const { isAuthenticated, history } = this.props;

        if (prevProps.isAuthenticated !== isAuthenticated && isAuthenticated) {
            history.push('/');
        }
    }

    componentWillUnmount() {
        const { updateMoviesList } = this.props;

        updateMoviesList();
    }

    switchActiveTabHandler = tabName => {
        this.setState({ activeTab: tabName });
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }

    onChangeHandler = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: {
                ...this.state[name],
                value
            }
        });
    }

    styleInputHandler = field => {
        if (field.isValid === null) return '';

        return field.isValid ? 'Correct' : 'Incorrect';
    }

    onBlurHandler = e => {
        const { name } = e.target;
        const { value } = this.state[name];

        if (value.length) {
            const { isValid, errorMessage } = this.validateField(name);

            this.setState({
                [name]: {
                    ...this.state[name],
                    isValid,
                    errorMessage
                }
            });
        }
    }

    validateField = name => {
        const { rules, value } = this.state[name];

        const validationRules = {
            email(value) {
                const emailPattern = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}$/i;

                if (emailPattern.test(value)) return;

                return 'Invalid email address';
            },
            minLength(value) {
                if (value.length >= 6) return;

                return 'Minimum length should be 6 chars';
            }
        };

        const result = {
            isValid: true,
            errorMessage: null
        };

        for (const rule of rules) {
            const errorMessage = validationRules[rule](value);

            if (errorMessage) {
                result.isValid = false;
                result.errorMessage = errorMessage;
                break;
            }
        }

        return result;
    }

    onSubmitHandler = e => {
        e.preventDefault();

        const { authenticateUser } = this.props;
        const { activeTab, email, password } = this.state;

        authenticateUser(activeTab, email.value, password.value);
    }

    getErrorMessageText = () => {
        const { error } = this.props;

        switch (error.message) {
            case 'EMAIL_EXISTS': return 'This email address has been already taken';
            case 'EMAIL_NOT_FOUND': return 'Provided email was not found';
            default: return error.message;
        }
    }

    removeErrorMessage = () => {
        const { error, removeAuthenticationError } = this.props;

        if (error) {
            removeAuthenticationError();
        }
    }

    render() {
        const { activeTab, showPassword, email, password } = this.state;
        const { isSubmitting, error } = this.props;

        return (
            <div className="Auth">
                <div className="AuthTabs">
                    <div
                        onClick={() => this.switchActiveTabHandler(SIGN_IN)}
                        className={
                            activeTab === SIGN_IN
                                ? 'AuthTab Active'
                                : 'AuthTab'
                        }
                    >
                        Sign In
                    </div>

                    <div
                        onClick={() => this.switchActiveTabHandler(SIGN_UP)}
                        className={
                            activeTab === SIGN_UP
                                ? 'AuthTab Active'
                                : 'AuthTab'
                        }
                    >
                        Sign Up
                    </div>
                </div>

                <form className="AuthForm" onSubmit={this.onSubmitHandler}>
                    <div className="InputWrapper">
                        <Input
                            placeholder="E-mail"
                            styling={this.styleInputHandler(email)}
                            name="email"
                            value={email.value}
                            changed={this.onChangeHandler}
                            blured={this.onBlurHandler}
                            focused={this.removeErrorMessage}
                        />

                        { email.errorMessage && <p className="ErrorMessage">{email.errorMessage}</p> }
                    </div>

                    <div className="InputWrapper">
                        <Input
                            type={ showPassword ? 'text' : 'password' }
                            styling={this.styleInputHandler(password)}
                            name="password"
                            placeholder="Password"
                            value={password.value}
                            changed={this.onChangeHandler}
                            blured={this.onBlurHandler}
                            focused={this.removeErrorMessage}
                        />

                        { password.errorMessage && <p className="ErrorMessage">{password.errorMessage}</p> }

                        <i
                            onClick={this.togglePasswordVisibility}
                            className={
                                showPassword
                                    ? 'far fa-eye-slash'
                                    : 'far fa-eye'
                                }
                        />
                    </div>

                    {
                        error &&
                            <p className="ErrorMessage">
                                {this.getErrorMessageText()}
                            </p>
                    }

                    <Button
                        type="submit"
                        styles={ isSubmitting && 'Disabled' }
                    >
                        { isSubmitting ? 'Submitting...' : 'Submit' }
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.idToken,
    isSubmitting: state.auth.isSubmitting,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    authenticateUser: (mode, email, password) => dispatch(authActions.authenticateUser(mode, email, password)),
    removeAuthenticationError: () => dispatch(authActions.removeAuthenticationError()),
    updateMoviesList: () => dispatch(moviesActions.updateMoviesList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
