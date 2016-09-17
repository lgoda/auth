import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

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

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
        .then( response => {
            dispatch({ type:AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch(response => dispatch(authError('not so good'))); //response.data.error
    }
}

export function authError(error) {
    console.log("dispatch auth error");
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        })
            .then(
                response => {
                    dispatch({
                        type: FETCH_MESSAGE,
                        payload: response.data.message
                    });
                }
            
            );
    };
}

//Same like before but using redux promise instead of redux thunk
export function fetchmessage() {
    const request = axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        });
    return {
        type: FETCH_MESSAGE,
        payload: request
    };
}