import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Authentication/login';
import Dashboard from './Dashboard/dashboard';

import './admin.css'

export default () => (
    <div>
        <Route path="/admin" exact component={Login} />
        <Route path="/admin/dashboard" component={Dashboard} />
    </div>
);
