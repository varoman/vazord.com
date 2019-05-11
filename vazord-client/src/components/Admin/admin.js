import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Authentication/login';

import './admin.css'

export default () => (
    <div>
        <Route path="/admin" exact component={Login} />
        <Route path="/admin/dashboard" component={() => <h1>dashboard</h1>} />
    </div>

);
