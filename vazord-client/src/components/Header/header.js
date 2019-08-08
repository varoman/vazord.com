import React from 'react';
import { Layout, Affix  } from 'antd';
import logo from '../../images/logo.png';
import fbIcon from '../../images/fb.png';
import emailIcon from '../../images/email.png';
import './header.css';

const { Header } = Layout;

export default () => {

	const onRedirectHome = () => {
		const isAdmin = window.location.pathname.includes('admin');
		if (isAdmin)
			window.location.assign('http://localhost:3000/admin/dashboard');
		else
			window.location.assign('http://localhost:3000/');
	};

	return (
		<Affix>
			<Header>
				<div className="Header-brand" onClick={onRedirectHome}>
					<img
						className="Header-logo"
						src={logo} alt="vazord logo"/>
					<i>Vazord.com</i>
				</div>
				<div className="Header-social">
					<a
						rel="noopener noreferrer"
						href="https://www.facebook.com/VazordCom/"
						target="_blank">
						<img
							src={fbIcon}
							alt="fb-icon"
							className="Header-icons"/></a>
					<a
						rel="noopener noreferrer"
						href="mailto:Narek@vazord.com">
						<img
							src={emailIcon}
							alt="email-icon"
							className="Header-icons"/></a>
				</div>
			</Header>
		</Affix>
	);
}
