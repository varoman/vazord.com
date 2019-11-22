import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import '../../../components/Sidebar/sidebar.css';


const { Sider } = Layout;

const handleLogout = history => {
    localStorage.clear();
    history.push('/admin');
};

const Logout = withRouter(({ history }) => (<p onClick={() => handleLogout(history)}>Logout</p>));

export default () => {

    return (
        <Sider
            className="App-sider"
            width="300px"
        >
            <Menu
                className="Navigation-container"
                mode="inline"
            >
                <Menu.Item className="Navigation-text">
                    <Link to='/admin/dashboard/topics'/>Topics
                </Menu.Item>
                <Menu.Item className="Navigation-text">
                    <Link to='/admin/dashboard/articles'/>Articles
                </Menu.Item>
				<Menu.Item className="Navigation-text">
					<Link to='/admin/dashboard/account'/>Account
				</Menu.Item>
                <Menu.Item className="Navigation-text logout"><Logout/></Menu.Item>
            </Menu>
        </Sider>
    );
};


