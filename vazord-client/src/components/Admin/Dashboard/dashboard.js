import React from 'react';
import { Route } from 'react-router-dom';
import { AppHeader } from '../../index';
import Sidebar from '../Sidebar/sidebar'
import { Layout } from 'antd';


const { Content } = Layout;

export default () => (
    <Layout>
        <AppHeader/>
        <Layout className="App-layout">
            <Sidebar/>
            <Content className="Dashboard-content">
                <Route path="/admin/dashboard/topics" component={() => <h1>this is topics</h1>} />
            </Content>
        </Layout>
    </Layout>
);
