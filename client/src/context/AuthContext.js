import React from 'react';

export default React.createContext({
    token: null,
    userID: null,
    login: (authData) => {},
    logout: () => {},
});