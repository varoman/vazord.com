import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import api from '../../axios';
import './sidebar.css';


const { SubMenu } = Menu;
const { Sider } = Layout;

const generateSubcategories = subcategories => {
    let nodes = [];
    subcategories.map( subcategory => {
        nodes.push(
            <Menu.Item key={subcategory.id}><Link to={`/articles/${subcategory.publicUrl}`}>{subcategory.title}</Link></Menu.Item>
        );
        return null;
    });
    return nodes;
};

const generateCategories = topics => {
    let nodes = [];
    topics.map((content, key) => {
        nodes.push(
            <SubMenu
                key={key}
                title={<span className="Navigation-text">{content.title}</span>}
            >
                {generateSubcategories(content.articles)}
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
                className="Navigation-container"
                mode="inline"
            >
                {generateCategories(topics)}
            </Menu>
        </Sider>
    );
};
