import axios from 'axios';

import { SIGN_UP } from '../../containers/Auth/Auth';
import * as actionTypes from '../actionTypes'

export const authenticateUser = (mode, email, password) => {
    return dispatch => {
        const apiKey = 'AIzaSyByq4mJssDLwZsCTE-C86G-MCl_Hj__xnA';
        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        const url = mode === SIGN_UP ? 'signUp' : 'signInWithPassword';

        dispatch(toggleSubmittingStatus(true));

        const user = {
            name: 'John Doe',
            email,
            password
        };

        const payload = {
            email,
            password,
            returnSecureToken: true
        };

        if (mode === SIGN_UP) {
            axios.post('https://react-movies-application.firebaseio.com/users.json', user)
                .then(res => {
                    const { name } = res.data;

                    payload.displayName = name;
    
                    axios.post(baseUrl + url + `?key=${apiKey}`, payload)
                        .then(res => {
                            console.log('[res.data]', res.data);
    
                            const {
                                idToken,
                                localId,
                                displayName: firebaseKey
                            } = res.data;
    
                            localStorage.setItem('idToken', idToken);
                            localStorage.setItem('localId', localId);
                            localStorage.setItem('firebaseKey', firebaseKey);
    
                            dispatch(saveAuthenticatedUser(idToken, localId, firebaseKey));
                        });
                })
                .catch(errorRes => {
                    const { error } = errorRes.response.data;
                    
                    dispatch(saveAuthenticationError(error));
                })
                .finally(() => dispatch(toggleSubmittingStatus(false)));
        } else {
            axios.post(baseUrl + url + `?key=${apiKey}`, payload)
                .then(res => {
                    console.log('[res.data]', res.data);
                    
                    const {
                        idToken,
                        localId,
                        displayName: firebaseKey
                    } = res.data;

                    localStorage.setItem('idToken', idToken);
                    localStorage.setItem('localId', localId);
                    localStorage.setItem('firebaseKey', firebaseKey);

                    dispatch(saveAuthenticatedUser(idToken, localId, firebaseKey));
                })
                .catch(errorRes => {
                    const { error } = errorRes.response.data;
                    
                    dispatch(saveAuthenticationError(error));
                })
                .finally(() => dispatch(toggleSubmittingStatus(false)));;
        }
    };
};

const toggleSubmittingStatus = status => ({
    type: actionTypes.TOGGLE_SUBMITTING_STATUS,
    status
});

export const saveAuthenticatedUser = (idToken, localId, firebaseKey) => ({
    type: actionTypes.SAVE_AUTHENTICATED_USER,
    idToken,
    localId,
    firebaseKey
});

const saveAuthenticationError = error => ({
    type: actionTypes.SAVE_AUTHENTICATION_ERROR,
    error
});

export const removeAuthenticationError = () => ({
    type: actionTypes.REMOVE_AUTHENTICATION_ERROR
});

export const logoutUser = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('firebaseKey');
    
    return {
        type: actionTypes.LOGOUT_USER
    };
};
