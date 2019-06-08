import React from 'react';
import { Route } from 'react-router-dom';
import { AppHeader } from '../../index';
import Sidebar from '../Sidebar/sidebar'
import Topics from '../Topics/topics'
import { Layout } from 'antd';
import Welcome from '../Welcome/welcome';
import Subtopics from '../Subtopics/subtopics'


const { Content } = Layout;

export default () => {

    return (
        <Layout>
            <AppHeader/>
            <Layout className="App-layout">
                <Sidebar/>
                <Content className="App-content">
                    <Route path="/admin/dashboard/topics" component={Topics} />
                    <Route path="/admin/dashboard/subtopics" component={Subtopics} />
                    <Route path="/admin/dashboard" exact component={Welcome} />
                </Content>
            </Layout>
        </Layout>
    );
};
