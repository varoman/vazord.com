import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Sidebar, Article, Admin, AppHeader, Welcome }  from './components';
import './App.css';

const { Content, Footer } = Layout;

const App = () =>  (
    <BrowserRouter>
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
						<Footer style={{ backgroundColor: '#1C9BF7'}}>vazord.com 2020</Footer>
                    </Layout>
                </div>
            )} />
        </Switch>
    </BrowserRouter>
);


export default App;
