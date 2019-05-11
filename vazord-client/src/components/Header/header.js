import React from 'react';
import { Link } from 'react-router-dom';
import { Layout  } from 'antd';

import logo from '../../images/vazord.jpg'

import './header.css';

const { Header } = Layout;

export default () => (
    <Header>
        <div className="Header-brand">
            <Link to="/">
                <span>Վազորդ </span>
                <img
                    className="Header-logo"
                    src={logo} alt="vazord logo"/>
            </Link>
        </div>
    </Header>
);
