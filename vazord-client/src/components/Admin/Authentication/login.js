import React, { Component } from 'react';
import { Button, Input } from 'antd';
import api from '../../../axios'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        // if the user is authenticated redirect to dashboard
        if (localStorage.getItem('isAuth'))
            this.props.history.push('/admin/dashboard');
    }

    handleInputChange = e => {
        const { name } = e.target;
        this.setState({ [name]: e.target.value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        api
            .post('/auth/login', {
                email,
                password
            })
            .then((res) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('isAuth', 'true');
                this.props.history.push('/admin/dashboard');
            });
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className="Admin-login">
                <form onSubmit={this.handleFormSubmit}>
                    <Input
                        name="email"
                        onChange={this.handleInputChange}
                        value={email}
                        type="email"
                        required
                        placeholder="email" />
                    <Input.Password
                        name="password"
                        onChange={this.handleInputChange}
                        value={password}
                        minLength="8"
                        required
                        placeholder="password" />
                    <div className="Admin-submit">
                        <Button
                            disabled={!email || !password}
                            type="primary"
                            htmlType="submit"
                        >Login</Button>
                    </div>
                </form>
            </div>
        );
    };
}


export default Login;
