import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import '../../../components/Sidebar/sidebar.css';


const { Sider } = Layout;


export default () => (
    <Sider
        className="App-sider"
        collapsible={true}
        collapsedWidth="0"
        width="300px"
    >
        <Menu
            className="Navigation-container"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <Menu.Item><Link to='topics'/>Topics</Menu.Item>
            <Menu.Item>Subtopics</Menu.Item>
            <Menu.Item>Articles</Menu.Item>
        </Menu>
    </Sider>
);
