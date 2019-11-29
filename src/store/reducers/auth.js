import * as actionTypes from '../actionTypes';

const initialState = {
    idToken: null,
    localId: null,
    firebaseKey: null,
    error: null,
    isSubmitting: false
};

const saveAuthenticatedUser = (state, action) => ({
    ...state,
    idToken: action.idToken,
    localId: action.localId,
    firebaseKey: action.firebaseKey
});

const saveAuthenticationError = (state, action) => ({
    ...state,
    error: action.error
});

const removeAuthenticationError = state => ({
    ...state,
    error: null
});

const toggleSubmittingStatus = (state, action) => ({
    ...state,
    isSubmitting: action.status
});

const logoutUser = state => ({
    ...state,
    idToken: null,
    localId: null,
    firebaseKey: null
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_AUTHENTICATED_USER: return saveAuthenticatedUser(state, action);
        case actionTypes.SAVE_AUTHENTICATION_ERROR: return saveAuthenticationError(state, action);
        case actionTypes.REMOVE_AUTHENTICATION_ERROR: return removeAuthenticationError(state);
        case actionTypes.TOGGLE_SUBMITTING_STATUS: return toggleSubmittingStatus(state, action);
        case actionTypes.LOGOUT_USER: return logoutUser(state);
        default: return state;
    }
};

export default reducer;
