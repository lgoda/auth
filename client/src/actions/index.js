import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser( {email, password} ) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
        .then( response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch(() => {
            console.log('dispatching');
            dispatch(authError('Bad Login Info'));
        });
    }
    // Submit email/password to the server

    //If request is good....
    // We update state to say that the customer is authenticated
    // We need to save the token to make other requests
    // redirect to the route feature
    // If request is bad show an error to the user
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}