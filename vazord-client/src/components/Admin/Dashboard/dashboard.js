import React from 'react';
import { Route } from 'react-router-dom';
import { AppHeader } from '../../index';
import Sidebar from '../Sidebar/sidebar'
import Topics from '../Topics/topics'
import { Layout } from 'antd';
import Welcome from '../Welcome/welcome';
import Articles from '../Articles/articles'


const { Content } = Layout;

export default () => {

    return (
        <Layout>
            <AppHeader/>
            <Layout className="App-layout">
                <Sidebar/>
                <Content className="App-content">
                    <Route path="/admin/dashboard/topics" component={Topics} />
                    <Route path="/admin/dashboard/articles" component={Articles} />
                    <Route path="/admin/dashboard" exact component={Welcome} />
                </Content>
            </Layout>
        </Layout>
    );
};
