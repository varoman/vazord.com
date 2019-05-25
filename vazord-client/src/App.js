import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Sidebar, Article, Admin, AppHeader, Welcome, ErrorModal }  from './components';
import './App.css';


const { Content } = Layout;

const App = () =>  (
    <BrowserRouter>
        <ErrorModal/>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={() => (
                <div className="App">
                    <Layout>
                        <AppHeader/>
                        <Layout className="App-layout">
                            <Sidebar/>
                            <Content className="App-content">
                                <Route path="/" exact component={Welcome} />
                                <Route path="/articles/:articleTitle" component={Article} />
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            )} />
        </Switch>
    </BrowserRouter>
);


export default App;
