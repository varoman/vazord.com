import React, { useState } from 'react';
import { Button, Input } from 'antd';
import api from '../../../axios';
import { Notifications } from '../../';


export default (props) => {

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ name, setName ] = useState('');

    let email, token, role;
    try {
        const params = JSON.parse(atob(props.match.params.params));
        email = params.email;
        token = params.token;
        role = params.role;
    } catch (e) {
       console.warn(e);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return Notifications.showError('Passwords don\'t match, try again');
        }

        if (!email || !token || !role) {
            return Notifications.showError('Wrong security keys provided, contact administrators');
        }
        api.post('/user/create', {
            name,
            password,
            token,
        })
            .then((res) => {
                Notifications.showSuccess(res.message);
                localStorage.clear();
                props.history.push('/admin');
            });
    };

    return (
        <div className="Admin-login">
            <form onSubmit={handleFormSubmit}>
                <Input
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    minLength="3"
                    required
                    placeholder="Your name" />
                <Input.Password
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    required
                    placeholder="password" />
                <Input.Password
                    name="password-confirm"
                    minLength="8"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="confirm password" />
                <div className="Admin-submit">
                    <Button
                        disabled={!password || !confirmPassword}
                        type="primary"
                        htmlType="submit"
                    >Register</Button>
                </div>
            </form>
        </div>
    );
}
