import React from 'react';

export default React.createContext({
    token: null,
    userID: null,
    tokenExpiresIn: null,
    login: (authData) => {},
    logout: () => {},
});