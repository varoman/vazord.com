import fbIcon from '../../images/fb.png';
import emailIcon from '../../images/email.png';
import React from 'react';


import { Layout } from 'antd';

const { Footer } = Layout;

export default () => (
    <Footer>
        <a
            rel="noopener noreferrer"
            href="https://www.facebook.com/groups/vazord/"
            target="_blank">
            <img
                src={fbIcon}
                alt="fb-icon"
                className="Header-icons"/></a>
        <a
            rel="noopener noreferrer"
            href="mailto:Narek@vazord.com">
            <img
                src={emailIcon}
                alt="email-icon"
                className="Header-icons"/></a>
    </Footer>
);
