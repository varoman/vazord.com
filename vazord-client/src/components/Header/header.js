import React from 'react';
import { Layout, Affix  } from 'antd';
import logo from '../../images/logo.png';
import fbIcon from '../../images/fb.png';
import emailIcon from '../../images/email.png';
import './header.css';


const { REACT_APP_NODE_ENV } = process.env;
const { Header } = Layout;

const baseURL  = REACT_APP_NODE_ENV === 'heroku' ? 'https://vazord-api.herokuapp.com' : 'http://localhost:3000';

export default () => {
	const onRedirectHome = () => {
		const isAuth = localStorage.getItem('isAuth');
		if (isAuth)
			window.location.href = baseURL + '/admin/dashboard';
		else
			window.location.href =  baseURL;
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
