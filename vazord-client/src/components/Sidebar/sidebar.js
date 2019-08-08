import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import api from '../../axios';
import './sidebar.css';


const { SubMenu } = Menu;
const { Sider } = Layout;

const generateArticles = articles => {
    let nodes = [];
	articles.map( ({ id, publicUrl, title, topicId }) => {
        nodes.push(
            <Menu.Item
				key={id}><Link to={`/articles/${publicUrl}?id=${id}&topic=${topicId}`}>{title}</Link
			></Menu.Item>
        );
        return null;
    });
    return nodes;
};

const generateTopics = topics => {
    let nodes = [];
    topics.map(({ id, title, articles }) => {
        nodes.push(
            <SubMenu
                key={id}
                title={<span className="Navigation-text">{title}</span>}
            >
                {generateArticles(articles)}
            </SubMenu>
        );
        return null;
    });
    return nodes;
};


export default () => {

    const [ topics, setTopics ] = useState([]);

    useEffect(() => {
        api
            .get('/topic/all')
            .then(res => setTopics(res));
    }, []);

    return (
        <Sider
            className="App-sider"/*
        collapsible={true}
        collapsedWidth="0"*/
            width="300px"
        >
            <Menu
				openKeys={[]}
				selectedKeys={[]}
                className="Navigation-container"
                mode="inline"
            >
                {generateTopics(topics)}
            </Menu>
        </Sider>
    );
};
