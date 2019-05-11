import React, { Component } from 'react';
import { Button, Input } from 'antd';


class Login extends Component {
    render() {
        return (
            <div className="Admin-login">
                <Input placeholder="email" />
                <Input placeholder="password" />
                <div className="Admin-submit">
                    <Button type="primary">Login</Button>
                </div>
            </div>
        )
    }
}

export default Login;
