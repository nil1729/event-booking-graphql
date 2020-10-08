import {
    LOGIN_USER,
    LOAD_USER,
    AUTH_ERROR
} from '../utils/types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                    isAuthenticated: true,
            };
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                    loading: false,
                    isAuthenticated: true,
            };
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                    loading: false,
                    user: null,
                    token: null,
                    error: action.payload,
            };
        default:
            return state;
    }
}