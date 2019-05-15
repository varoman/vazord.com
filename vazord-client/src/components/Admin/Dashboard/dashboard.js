import React from 'react';
import { Route } from 'react-router-dom';
import { AppHeader } from '../../index';
import Sidebar from '../Sidebar/sidebar'
import { Layout } from 'antd';


const { Content } = Layout;

export default () => (
    <Layout>
        <Sidebar/>
        <Layout>
            <AppHeader/>
            <Content className="Dashboard-content">
                <Route path="topics" component={() => <span>this is topics</span>} />
            </Content>
        </Layout>
    </Layout>
);
