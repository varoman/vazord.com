import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Sidebar, Article, Footer, Admin, AppHeader }  from './components';

import './App.css';


const { Content } = Layout;

const App = () =>  (
    <BrowserRouter>
        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={() => (
                <div className="App">
                    <Layout>
                        <Sidebar/>
                        <Layout>
                            <AppHeader/>
                            <Content className="App-content">
                                <Route path="/" exact component={() => <span>this is home</span>} />
                                <Route path="/articles/:articleTitle" component={Article} />
                            </Content>
                            <Footer/>
                        </Layout>
                    </Layout>
                </div>
            )} />
        </Switch>
    </BrowserRouter>
);

export default App;
