import React from 'react';
import { Route } from 'react-router-dom';
import { AppHeader } from '../../index';
import Sidebar from '../Sidebar/sidebar'
import Topics from '../Topics/topics'
import { Layout } from 'antd';
import Welcome from '../Welcome/welcome';
import Articles from '../Articles/articles'
import CreateArticleContent from '../Articles/CreateArticleContent/createArticleContent';


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
					<Route path="/admin/dashboard/create-article" component={CreateArticleContent} />
					<Route path="/admin/dashboard/account" component={() => <h1>HELLO</h1>} />
					<Route path="/admin/dashboard" exact component={Welcome} />
                </Content>
            </Layout>
        </Layout>
    );
};
