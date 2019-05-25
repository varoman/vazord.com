import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Authentication/login';
import Dashboard from './Dashboard/dashboard';
import { PrivateRoute } from '../../components'
import './admin.css'


export default () => (
    <div>
        <Switch>
            <PrivateRoute path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin" component={Login} />
        </Switch>
    </div>
);
