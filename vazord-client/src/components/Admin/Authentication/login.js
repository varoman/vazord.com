import React, { Component } from 'react';
import { Button, Input } from 'antd';
import api from '../../../axios'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = e => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
        console.log(this.state, 'this.state')
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        api.post('/auth/login', {
            email,
            password
        })
            .then(res => console.log(res, 'res'))
            .catch(err => console.log(err, 'err'))
    };

    render() {
        return (
            <div className="Admin-login">
                <form onSubmit={this.handleFormSubmit}>
                    <Input
                        name="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        type="email"
                        placeholder="email" />
                    <Input
                        name="password"
                        onChange={this.handleInputChange}
                        value={this.state.password}
                        type="password"
                        minLength="8"
                        placeholder="password" />
                    <div className="Admin-submit">
                        <Button
                            disabled={!this.state.email || !this.state.password}
                            type="primary"
                            htmlType="submit"
                        >Login</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
