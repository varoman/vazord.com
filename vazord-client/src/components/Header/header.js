import React from 'react';
import { Layout, Affix  } from 'antd';

import logo from '../../images/logo.png'

import './header.css';

const { Header } = Layout;

export default () => (
    <Affix>
        <Header>
            <div className="Header-brand">
                <img
                    className="Header-logo"
                    src={logo} alt="vazord logo"/>
                <i>Vazord.com</i>
            </div>
        </Header>
    </Affix>
);
