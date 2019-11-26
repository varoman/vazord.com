import React, {useEffect, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import '../../../components/Sidebar/sidebar.css';


const { Sider } = Layout;
const { SubMenu } = Menu;


const handleLogout = history => {
    localStorage.clear();
    history.push('/admin');
};

const Logout = withRouter(({ history }) => (<p onClick={() => handleLogout(history)}>Logout</p>));

export default () => {

	const [ isSuper, setIsSuper ] = useState(false);
	useEffect(() => {
		try {
			const isSuper = JSON.parse(localStorage.getItem('user') || {}).role === 'super';
			setIsSuper(isSuper)
		} catch (e) {
			console.warn(e);
			setIsSuper(false);
		}
	},  [ isSuper ]);


    return (
        <Sider
            className="App-sider"
            width="300px"
        >
            <Menu
                className="Navigation-container"
                mode="inline"
            >
				<SubMenu title="Manage Content" className="Navigation-text">
					<Menu.Item className="Navigation-text">
						<Link to='/admin/dashboard/topics'/>Topics
					</Menu.Item>
					<Menu.Item className="Navigation-text">
						<Link to='/admin/dashboard/articles'/>Articles
					</Menu.Item>
				</SubMenu>
				<Menu.Item className="Navigation-text">
					<Link to='/admin/dashboard/account'/>Account
				</Menu.Item>
				{ isSuper ?
					<Menu.Item className="Navigation-text">
						<Link to='/admin/dashboard/users'/>Users
					</Menu.Item>
					: null
				}
                <Menu.Item className="Navigation-text logout"><Logout/></Menu.Item>
            </Menu>
        </Sider>
    );
};


