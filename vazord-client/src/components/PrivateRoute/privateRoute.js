import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from '../../axios/';

export default ({ component: Component, ...rest }) => {
    

    const [ isAuthenticated, setAuthentication ] = useState('init');
    const token = localStorage.getItem('token');

    useEffect(() => {
        api
            .get('/auth/isAuth')
            .then(() => setAuthentication(true))
            .catch(() => setAuthentication(false));
    }, [ token ]);

    return (
        <Route {...rest} render={(props) => (
            isAuthenticated === 'init' ? null :  isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to='/admin/' />
        )} />
    )
};